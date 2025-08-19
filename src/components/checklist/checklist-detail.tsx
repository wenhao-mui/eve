'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Download, Share, CheckCircle, AlertCircle } from 'lucide-react';
import { ChecklistTemplate } from './checklist-form';
import ChecklistItem, { ChecklistItemData } from './checklist-item';

interface ChecklistDetailProps {
  template: ChecklistTemplate;
  onBack: () => void;
  onSave: (checklistData: ChecklistItemData[]) => void;
}

export default function ChecklistDetail({
  template,
  onBack,
  onSave,
}: ChecklistDetailProps) {
  const [checklistItems, setChecklistItems] = useState<ChecklistItemData[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize checklist items from template
  useEffect(() => {
    const items = template.items.map(item => ({
      id: item.id,
      question: item.question,
      description: item.description,
      isMandatory: item.isMandatory,
      response: null as 'yes' | 'no' | 'n/a' | null,
      attachments: [] as File[],
      notes: '',
    }));
    setChecklistItems(items);
  }, [template]);

  const handleResponseChange = (id: string, response: 'yes' | 'no' | 'n/a') => {
    setChecklistItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, response } : item
      )
    );
  };

  const handleAttachmentUpload = (id: string, files: File[]) => {
    setChecklistItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, attachments: [...item.attachments, ...files] } : item
      )
    );
  };

  const handleAttachmentRemove = (id: string, fileIndex: number) => {
    setChecklistItems(prev =>
      prev.map(item =>
        item.id === id 
          ? { ...item, attachments: item.attachments.filter((_, index) => index !== fileIndex) }
          : item
      )
    );
  };

  const handleNotesChange = (id: string, notes: string) => {
    setChecklistItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, notes } : item
      )
    );
  };

  const getCompletionStats = () => {
    const totalItems = checklistItems.length;
    const completedItems = checklistItems.filter(item => item.response !== null).length;
    const mandatoryItems = checklistItems.filter(item => item.isMandatory);
    const completedMandatoryItems = mandatoryItems.filter(item => item.response !== null).length;
    const percentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    
    return {
      total: totalItems,
      completed: completedItems,
      mandatory: mandatoryItems.length,
      completedMandatory: completedMandatoryItems,
      percentage: Math.round(percentage),
      isComplete: completedItems === totalItems && completedMandatoryItems === mandatoryItems.length,
    };
  };

  const handleSave = () => {
    const stats = getCompletionStats();
    if (!stats.isComplete) {
      alert('Please complete all checklist items before saving.');
      return;
    }
    onSave(checklistItems);
    setIsCompleted(true);
  };

  const stats = getCompletionStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack} size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {template.title}
            </h1>
            {template.description && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {template.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Progress Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Progress
            </h3>
            <div className="flex items-center space-x-4">
              <Badge variant={stats.isComplete ? "default" : "secondary"}>
                {stats.completed}/{stats.total} completed
              </Badge>
              {stats.mandatory > 0 && (
                <Badge variant={stats.completedMandatory === stats.mandatory ? "default" : "destructive"}>
                  {stats.completedMandatory}/{stats.mandatory} mandatory
                </Badge>
              )}
            </div>
          </div>
          
          <Progress value={stats.percentage} className="mb-4" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-gray-600 dark:text-gray-400">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-gray-600 dark:text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.mandatory}</div>
              <div className="text-gray-600 dark:text-gray-400">Mandatory</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.percentage}%</div>
              <div className="text-gray-600 dark:text-gray-400">Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checklist Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Checklist Items
          </h3>
          {stats.isComplete && (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">All items completed!</span>
            </div>
          )}
        </div>

        {checklistItems.map((item) => (
          <ChecklistItem
            key={item.id}
            item={item}
            onResponseChange={handleResponseChange}
            onAttachmentUpload={handleAttachmentUpload}
            onAttachmentRemove={handleAttachmentRemove}
            onNotesChange={handleNotesChange}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          disabled={!stats.isComplete}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          {isCompleted ? 'Saved' : 'Save Checklist'}
        </Button>
      </div>

      {/* Completion Alert */}
      {isCompleted && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">
                Checklist completed and saved successfully!
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mandatory Items Warning */}
      {stats.mandatory > 0 && stats.completedMandatory < stats.mandatory && (
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-orange-800 dark:text-orange-200">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">
                Please complete all mandatory items before saving.
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 