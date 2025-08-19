'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus } from 'lucide-react';
import { ChecklistTemplate } from './checklist-form';
import { ChecklistInstance as ChecklistInstanceType } from './checklist-instance';
import { ChecklistItemData } from './checklist-item';
import { Badge } from '@/components/ui/badge';

interface ChecklistInstanceFormProps {
  template: ChecklistTemplate;
  onSave: (instance: ChecklistInstanceType) => void;
  onCancel: () => void;
  users: Array<{ id: string; name: string; email: string }>;
}

export default function ChecklistInstanceForm({
  template,
  onSave,
  onCancel,
  users,
}: ChecklistInstanceFormProps) {
  const [title, setTitle] = useState(`${template.title} - ${new Date().toLocaleDateString()}`);
  const [description, setDescription] = useState(template.description || '');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !assignedTo.trim() || !dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    // Create checklist items from template
    const items: ChecklistItemData[] = template.items.map(item => ({
      id: item.id,
      question: item.question,
      description: item.description,
      isMandatory: item.isMandatory,
      response: null,
      attachments: [],
      notes: '',
    }));

    const instance: ChecklistInstanceType = {
      id: `instance-${Date.now()}`,
      templateId: template.id,
      template,
      title: title.trim(),
      description: description.trim(),
      assignedTo: assignedTo.trim(),
      createdBy: 'Current User', // This would come from auth context
      status: 'draft',
      dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items,
      notes: notes.trim(),
    };

    onSave(instance);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onCancel} size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Checklist from Template
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Based on: {template.title}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Template Info */}
        <Card>
          <CardHeader>
            <CardTitle>Template Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Template Name
                </Label>
                <Input
                  value={template.title}
                  disabled
                  className="mt-1 bg-gray-50 dark:bg-gray-700"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Template Items
                </Label>
                <Input
                  value={`${template.items.length} items`}
                  disabled
                  className="mt-1 bg-gray-50 dark:bg-gray-700"
                />
              </div>
            </div>
            {template.description && (
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Template Description
                </Label>
                <Textarea
                  value={template.description}
                  disabled
                  className="mt-1 bg-gray-50 dark:bg-gray-700"
                  rows={2}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instance Details */}
        <Card>
          <CardHeader>
            <CardTitle>Checklist Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Checklist Title *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter checklist title"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description for this checklist"
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assignedTo" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Assign To *
                </Label>
                <Select value={assignedTo} onValueChange={setAssignedTo}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.name}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="dueDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Due Date *
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Initial Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any initial notes or instructions..."
                className="mt-1"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Checklist Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total Items:</span>
                <span className="font-medium">{template.items.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Mandatory Items:</span>
                <span className="font-medium">{template.items.filter(item => item.isMandatory).length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Optional Items:</span>
                <span className="font-medium">{template.items.filter(item => !item.isMandatory).length}</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Sample Items:</h4>
              <div className="space-y-2">
                {template.items.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{item.question}</span>
                    {item.isMandatory && (
                      <Badge variant="destructive" className="text-xs">Required</Badge>
                    )}
                  </div>
                ))}
                {template.items.length > 3 && (
                  <div className="text-sm text-gray-500 italic">
                    ... and {template.items.length - 3} more items
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Checklist
          </Button>
        </div>
      </form>
    </div>
  );
} 