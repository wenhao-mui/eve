'use client';


import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Paperclip, X, Upload } from 'lucide-react';

export interface ChecklistItemData {
  id: string;
  question: string;
  description?: string;
  isMandatory: boolean;
  response: 'yes' | 'no' | 'n/a' | null;
  attachments: File[];
  notes?: string;
}

interface ChecklistItemProps {
  item: ChecklistItemData;
  onResponseChange: (id: string, response: 'yes' | 'no' | 'n/a') => void;
  onAttachmentUpload: (id: string, files: File[]) => void;
  onAttachmentRemove: (id: string, fileIndex: number) => void;
  onNotesChange: (id: string, notes: string) => void;
}

export default function ChecklistItem({
  item,
  onResponseChange,
  onAttachmentUpload,
  onAttachmentRemove,
  onNotesChange,
}: ChecklistItemProps) {


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      onAttachmentUpload(item.id, files);
    }
  };

  const handleFileRemove = (fileIndex: number) => {
    onAttachmentRemove(item.id, fileIndex);
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.question}
              </h3>
              {item.isMandatory && (
                <Badge variant="destructive" className="text-xs">
                  Mandatory
                </Badge>
              )}
            </div>
            {item.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {item.description}
              </p>
            )}
          </div>
        </div>

        {/* Response Options */}
        <div className="mb-4">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Response *
          </Label>
          <RadioGroup
            value={item.response || ''}
            onValueChange={(value: 'yes' | 'no' | 'n/a') => onResponseChange(item.id, value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id={`yes-${item.id}`} />
              <Label htmlFor={`yes-${item.id}`} className="text-sm">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id={`no-${item.id}`} />
              <Label htmlFor={`no-${item.id}`} className="text-sm">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="n/a" id={`na-${item.id}`} />
              <Label htmlFor={`na-${item.id}`} className="text-sm">N/A</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Notes */}
        <div className="mb-4">
          <Label htmlFor={`notes-${item.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Notes (Optional)
          </Label>
          <textarea
            id={`notes-${item.id}`}
            value={item.notes || ''}
            onChange={(e) => onNotesChange(item.id, e.target.value)}
            placeholder="Add any additional notes..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={2}
          />
        </div>

        {/* Attachments */}
        <div className="mb-4">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Attachments
          </Label>
          
          {/* File Upload */}
          <div className="mb-3">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id={`file-upload-${item.id}`}
            />
            <Label
              htmlFor={`file-upload-${item.id}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 cursor-pointer"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Label>
          </div>

          {/* Attached Files */}
          {item.attachments.length > 0 && (
            <div className="space-y-2">
              {item.attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    <Paperclip className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFileRemove(index)}
                    className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 