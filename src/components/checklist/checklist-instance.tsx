'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  User, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Save,
  Edit,
  Download,
  Share
} from 'lucide-react';
import { ChecklistTemplate } from './checklist-form';
import ChecklistItem, { ChecklistItemData } from './checklist-item';

export interface ChecklistInstance {
  id: string;
  templateId: string;
  template: ChecklistTemplate;
  title: string;
  description?: string;
  assignedTo: string;
  createdBy: string;
  status: 'draft' | 'in_progress' | 'completed' | 'submitted';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  items: ChecklistItemData[];
  notes?: string;
}

interface ChecklistInstanceProps {
  instance: ChecklistInstance;
  onSave: (instance: ChecklistInstance) => void;
  onBack: () => void;
  onEdit: () => void;
  isEditing?: boolean;
}

export default function ChecklistInstance({
  instance,
  onSave,
  onBack,
  onEdit,
  isEditing = false,
}: ChecklistInstanceProps) {
  const [checklistItems, setChecklistItems] = useState<ChecklistItemData[]>(instance.items);
  const [notes, setNotes] = useState(instance.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setChecklistItems(instance.items);
    setNotes(instance.notes || '');
  }, [instance]);

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
    const updatedInstance: ChecklistInstance = {
      ...instance,
      items: checklistItems,
      notes,
      status: 'draft',
      updatedAt: new Date().toISOString(),
    };
    onSave(updatedInstance);
  };

  const handleSubmit = async () => {
    const stats = getCompletionStats();
    if (!stats.isComplete) {
      alert('Please complete all checklist items before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedInstance: ChecklistInstance = {
        ...instance,
        items: checklistItems,
        notes,
        status: 'submitted',
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await onSave(updatedInstance);
      alert('Checklist submitted successfully!');
    } catch {
      alert('Error submitting checklist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = getCompletionStats();
  const isOverdue = new Date(instance.dueDate) < new Date() && instance.status !== 'completed' && instance.status !== 'submitted';

  if (isEditing) {
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
                Edit Checklist: {instance.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Based on template: {instance.template.title}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
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

        {/* General Notes */}
        <Card>
          <CardHeader>
            <CardTitle>General Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any general notes or comments about this checklist..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
        </div>
      </div>
    );
  }

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
              {instance.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Based on template: {instance.template.title}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Instance Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 bg-blue-100 dark:bg-blue-900/20 text-blue-600">
              <User className="w-6 h-6" />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">Assigned To</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {instance.assignedTo}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 bg-green-100 dark:bg-green-900/20 text-green-600">
              <User className="w-6 h-6" />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">Created By</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {instance.createdBy}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
              isOverdue ? 'bg-red-100 dark:bg-red-900/20 text-red-600' : 'bg-purple-100 dark:bg-purple-900/20 text-purple-600'
            }`}>
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">Due Date</div>
            <div className={`text-lg font-bold ${
              isOverdue ? 'text-red-600' : 'text-gray-900 dark:text-white'
            }`}>
              {instance.dueDate}
              {isOverdue && ' (Overdue)'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Progress
            </h3>
            <div className="flex items-center space-x-4">
              <Badge variant={instance.status === 'submitted' ? "default" : "secondary"}>
                {instance.status.replace('_', ' ')}
              </Badge>
              <Badge variant={stats.isComplete ? "default" : "secondary"}>
                {stats.completed}/{stats.total} completed
              </Badge>
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
          {stats.isComplete && instance.status !== 'submitted' && (
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

      {/* General Notes */}
      {notes && (
        <Card>
          <CardHeader>
            <CardTitle>General Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">{notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {instance.status !== 'submitted' && (
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!stats.isComplete || isSubmitting}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Submitting...' : 'Submit Checklist'}
          </Button>
        </div>
      )}

      {/* Overdue Warning */}
      {isOverdue && instance.status !== 'submitted' && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-red-800 dark:text-red-200">
              <AlertCircle className="h-5 w-5" />
              <div>
                <div className="text-sm font-medium">
                  Overdue
                </div>
                <div className="text-xs">
                  This checklist is past its due date
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 