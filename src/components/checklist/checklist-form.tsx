'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Save } from 'lucide-react';

export interface ChecklistTemplate {
  id: string;
  title: string;
  description?: string;
  items: ChecklistTemplateItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistTemplateItem {
  id: string;
  question: string;
  description?: string;
  isMandatory: boolean;
}

interface ChecklistFormProps {
  template?: ChecklistTemplate;
  onSave: (template: ChecklistTemplate) => void;
  onCancel: () => void;
}

export default function ChecklistForm({ template, onSave, onCancel }: ChecklistFormProps) {
  const [title, setTitle] = useState(template?.title || '');
  const [description, setDescription] = useState(template?.description || '');
  const [items, setItems] = useState<ChecklistTemplateItem[]>(
    template?.items || []
  );

  const addItem = () => {
    const newItem: ChecklistTemplateItem = {
      id: `item-${Date.now()}`,
      question: '',
      description: '',
      isMandatory: false,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof ChecklistTemplateItem, value: string | boolean) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title for the checklist');
      return;
    }

    if (items.length === 0) {
      alert('Please add at least one checklist item');
      return;
    }

    if (items.some(item => !item.question.trim())) {
      alert('Please fill in all question fields');
      return;
    }

    const templateData: ChecklistTemplate = {
      id: template?.id || `template-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      items: items.map(item => ({
        ...item,
        question: item.question.trim(),
        description: item.description?.trim() || '',
      })),
      createdAt: template?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(templateData);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
          {template ? 'Edit Checklist Template' : 'Create New Checklist Template'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Template Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter checklist template title"
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
              placeholder="Enter description for this checklist template"
              className="mt-1"
              rows={3}
            />
          </div>
        </div>

        <Separator />

        {/* Checklist Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold text-gray-900 dark:text-white">
              Checklist Items
            </Label>
            <Button onClick={addItem} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          {items.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No checklist items added yet. Click &quot;Add Item&quot; to get started.
            </div>
          )}

          {items.map((item, index) => (
            <Card key={item.id} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Item {index + 1}
                  </span>
                  <Button
                    onClick={() => removeItem(item.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <Label htmlFor={`question-${item.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Question *
                  </Label>
                  <Input
                    id={`question-${item.id}`}
                    value={item.question}
                    onChange={(e) => updateItem(item.id, 'question', e.target.value)}
                    placeholder="Enter the checklist question"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor={`description-${item.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id={`description-${item.id}`}
                    value={item.description || ''}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Enter additional details for this question"
                    className="mt-1"
                    rows={2}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id={`mandatory-${item.id}`}
                    checked={item.isMandatory}
                    onCheckedChange={(checked) => updateItem(item.id, 'isMandatory', checked)}
                  />
                  <Label htmlFor={`mandatory-${item.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    This item is mandatory
                  </Label>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            {template ? 'Update Template' : 'Create Template'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 