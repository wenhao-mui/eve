'use client';

import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  X, 
  File, 
  CheckCircle, 
  AlertCircle,
  Image,
  Video,
  Music,
  Archive,
  FileText
} from "lucide-react";

interface FileWithProgress {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  acceptedTypes?: string[];
}

export default function FileUpload({ 
  onFilesSelected, 
  maxFiles = 10, 
  maxFileSize = 100 * 1024 * 1024, // 100MB default
  acceptedTypes = ['*/*']
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileWithProgress[]>([]);

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.includes('image')) return <Image className="w-6 h-6 text-purple-500" />;
    if (type.includes('video')) return <Video className="w-6 h-6 text-orange-500" />;
    if (type.includes('audio')) return <Music className="w-6 h-6 text-pink-500" />;
    if (type.includes('zip') || type.includes('rar') || type.includes('7z')) return <Archive className="w-6 h-6 text-gray-500" />;
    if (type.includes('pdf') || type.includes('document') || type.includes('text')) return <FileText className="w-6 h-6 text-blue-500" />;
    return <File className="w-6 h-6 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (file.size > maxFileSize) {
      return `File size exceeds ${formatFileSize(maxFileSize)}`;
    }
    
    if (acceptedTypes.length > 0 && acceptedTypes[0] !== '*/*') {
      const isAccepted = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.slice(0, -1));
        }
        return file.type === type;
      });
      
      if (!isAccepted) {
        return `File type ${file.type} is not accepted`;
      }
    }
    
    return null;
  };

    const handleFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      alert('Some files could not be added:\n' + errors.join('\n'));
    }

    if (validFiles.length > 0) {
      const newFiles: FileWithProgress[] = validFiles.map(file => ({
        file,
        progress: 0,
        status: 'uploading' as const
      }));

      setSelectedFiles(prev => {
        const combined = [...prev, ...newFiles];
        return combined.slice(0, maxFiles);
      });

      // Simulate upload progress
      newFiles.forEach((fileWithProgress) => {
        const interval = setInterval(() => {
          setSelectedFiles(prev => 
            prev.map(f => 
              f.file === fileWithProgress.file 
                ? { ...f, progress: Math.min(f.progress + Math.random() * 20, 100) }
                : f
            )
          );

          if (fileWithProgress.progress >= 100) {
            clearInterval(interval);
            setSelectedFiles(prev => 
              prev.map(f => 
                f.file === fileWithProgress.file 
                  ? { ...f, status: 'completed' as const }
                  : f
            )
            );
          }
        }, 200);
      });

      onFilesSelected(validFiles);
    }
  }, [maxFileSize, acceptedTypes, maxFiles, onFilesSelected, validateFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeFile = (fileToRemove: File) => {
    setSelectedFiles(prev => prev.filter(f => f.file !== fileToRemove));
  };

  const clearAll = () => {
    setSelectedFiles([]);
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Zone */}
      <Card 
        className={`border-2 border-dashed transition-colors ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-8 text-center">
          <Upload className={`w-12 h-12 mx-auto mb-4 transition-colors ${
            isDragOver ? 'text-blue-500' : 'text-gray-400'
          }`} />
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {isDragOver ? 'Drop files here' : 'Drag and drop files here'}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            or click to browse files
          </p>
          <Button variant="outline" onClick={() => document.getElementById('file-input')?.click()}>
            Choose Files
          </Button>
          <input
            id="file-input"
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>Max files: {maxFiles}</p>
            <p>Max file size: {formatFileSize(maxFileSize)}</p>
            {acceptedTypes[0] !== '*/*' && (
              <p>Accepted types: {acceptedTypes.join(', ')}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Selected Files ({selectedFiles.length})</h3>
              <Button variant="outline" size="sm" onClick={clearAll}>
                Clear All
              </Button>
            </div>
            
            <div className="space-y-3">
              {selectedFiles.map((fileWithProgress, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0">
                    {getFileIcon(fileWithProgress.file)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {fileWithProgress.file.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatFileSize(fileWithProgress.file.size)}
                        </span>
                        {fileWithProgress.status === 'completed' && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        {fileWithProgress.status === 'error' && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                    
                    {fileWithProgress.status === 'uploading' && (
                      <Progress value={fileWithProgress.progress} className="h-2" />
                    )}
                    
                    {fileWithProgress.error && (
                      <p className="text-xs text-red-500">{fileWithProgress.error}</p>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(fileWithProgress.file)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 