'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  FileText,
  Paperclip
} from "lucide-react";
import { Todo, TodoStatus } from './todo-list';

interface User {
  id: string;
  name: string;
  email: string;
}

interface TodoFormProps {
  onSubmit: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  users: User[];
  onCancel: () => void;
  initialData?: Partial<Todo>;
}

interface FileWithProgress {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

export default function TodoForm({ onSubmit, users, onCancel, initialData }: TodoFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    assignedTo: initialData?.assignedTo || '',
    createdBy: initialData?.createdBy || 'Admin User',
    status: (initialData?.status as TodoStatus) || 'not_started',
    priority: initialData?.priority || 'medium',
    dueDate: initialData?.dueDate || new Date().toISOString().split('T')[0],
  });

  const [attachments, setAttachments] = useState<FileWithProgress[]>([]);
  const [existingAttachments, setExistingAttachments] = useState(initialData?.attachments || []);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.assignedTo.trim() || !formData.dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    const todoData = {
      ...formData,
      attachments: [
        ...existingAttachments,
        ...attachments.map(att => ({
          id: att.file.name,
          name: att.file.name,
          size: att.file.size,
          type: att.file.type.split('/')[1] || 'file',
          url: '#'
        }))
      ]
    };

    onSubmit(todoData);
  };

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

  const handleFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const newFiles: FileWithProgress[] = fileArray.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const
    }));

    setAttachments(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((fileWithProgress) => {
      const interval = setInterval(() => {
        setAttachments(prev => 
          prev.map(f => 
            f.file === fileWithProgress.file 
              ? { ...f, progress: Math.min(f.progress + Math.random() * 20, 100) }
              : f
          )
        );

        if (fileWithProgress.progress >= 100) {
          clearInterval(interval);
          setAttachments(prev => 
            prev.map(f => 
              f.file === fileWithProgress.file 
                ? { ...f, status: 'completed' as const }
                : f
          )
          );
        }
      }, 200);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (fileToRemove: File) => {
    setAttachments(prev => prev.filter(f => f.file !== fileToRemove));
  };

  const removeExistingAttachment = (attachmentId: string) => {
    setExistingAttachments(prev => prev.filter(att => att.id !== attachmentId));
  };

  const clearAllFiles = () => {
    setAttachments([]);
  };

  const clearAllExistingAttachments = () => {
    setExistingAttachments([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter todo title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="mt-1"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <Textarea
            placeholder="Enter todo description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Assigned To <span className="text-red-500">*</span>
            </label>
            <Select value={formData.assignedTo} onValueChange={(value) => handleInputChange('assignedTo', value)}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.name}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Created By
            </label>
            <Select value={formData.createdBy} onValueChange={(value) => handleInputChange('createdBy', value)}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select creator" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.name}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Due Date <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              className="mt-1"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <Select value={formData.status} onValueChange={(value: TodoStatus) => handleInputChange('status', value)}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_started">Not Started</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Priority
            </label>
            <Select value={formData.priority} onValueChange={(value: 'low' | 'medium' | 'high') => handleInputChange('priority', value)}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* File Attachments */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {initialData ? 'Add New Attachments' : 'Attachments'}
          </label>
          
          {/* Drag & Drop Zone */}
          <Card 
            className={`mt-2 border-2 border-dashed transition-colors ${
              isDragOver 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CardContent className="p-6 text-center">
              <Paperclip className={`w-8 h-8 mx-auto mb-2 transition-colors ${
                isDragOver ? 'text-blue-500' : 'text-gray-400'
              }`} />
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                {isDragOver ? 'Drop files here' : 'Drag and drop files here'}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                or click to browse files
              </p>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                Choose Files
              </Button>
              <input
                id="file-input"
                type="file"
                multiple
                onChange={handleFileInput}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Existing Attachments */}
          {existingAttachments.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Existing Attachments ({existingAttachments.length})
                  </h4>
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm" 
                    onClick={clearAllExistingAttachments}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Remove All
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {existingAttachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center space-x-3 p-2 border rounded-lg">
                      <div className="flex-shrink-0">
                        <span className="text-2xl">
                          {attachment.type === 'pdf' ? '📄' : 
                           attachment.type === 'document' ? '📝' : 
                           attachment.type === 'spreadsheet' ? '📊' : 
                           attachment.type === 'image' ? '🖼️' : 
                           attachment.type === 'archive' ? '📦' : 
                           attachment.type === 'sql' ? '🗄️' : '📎'}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {attachment.name}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatFileSize(attachment.size)}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {attachment.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExistingAttachment(attachment.id)}
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

          {/* Selected Files List */}
          {attachments.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Selected Files ({attachments.length})
                  </h4>
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm" 
                    onClick={clearAllFiles}
                  >
                    Clear All
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {attachments.map((fileWithProgress, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 border rounded-lg">
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
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${fileWithProgress.progress}%` }}
                            />
                          </div>
                        )}
                        
                        {fileWithProgress.error && (
                          <p className="text-xs text-red-500">{fileWithProgress.error}</p>
                        )}
                      </div>
                      
                      <Button
                        type="button"
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
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {initialData ? 'Update Todo' : 'Create Todo'}
        </Button>
      </div>
    </form>
  );
} 