'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { 
  Paperclip, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertTriangle,
  ArrowLeft,
  Download,
  Eye,
  Plus,
  X,
  User,
  Calendar,
  Clock,
  XCircle
} from "lucide-react";
import { Todo, TodoStatus } from './todo-list';
import TodoForm from './todo-form';

interface TodoDetailProps {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
  getStatusBadgeVariant: (status: TodoStatus) => "default" | "secondary" | "destructive" | "outline";
  getStatusIcon: (status: TodoStatus) => React.ReactNode;
  getPriorityBadgeVariant: (priority: string) => "default" | "secondary" | "destructive" | "outline";
  users: Array<{ id: string; name: string; email: string }>;
}

export default function TodoDetail({ 
  todo, 
  onUpdate, 
  onDelete, 
  onBack,
  getStatusBadgeVariant, 
  getStatusIcon, 
  getPriorityBadgeVariant,
  users
}: TodoDetailProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAttachmentDialog, setShowAttachmentDialog] = useState(false);
  const [newAttachments, setNewAttachments] = useState<File[]>([]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'document': return '📝';
      case 'spreadsheet': return '📊';
      case 'image': return '🖼️';
      case 'archive': return '📦';
      case 'sql': return '🗄️';
      default: return '📎';
    }
  };

  const isOverdue = new Date(todo.dueDate) < new Date() && todo.status !== 'completed' && todo.status !== 'cancelled';

  const handleStatusChange = (newStatus: TodoStatus) => {
    onUpdate(todo.id, { status: newStatus });
  };

  const handleDelete = () => {
    onDelete(todo.id);
    setShowDeleteDialog(false);
    onBack();
  };

  const handleAddAttachments = (files: File[]) => {
    const newAttachmentObjects = files.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type.split('/')[1] || 'file',
      url: '#'
    }));
    
    onUpdate(todo.id, {
      attachments: [...todo.attachments, ...newAttachmentObjects]
    });
    
    setNewAttachments([]);
    setShowAttachmentDialog(false);
  };

  const handleRemoveAttachment = (attachmentId: string) => {
    const updatedAttachments = todo.attachments.filter(att => att.id !== attachmentId);
    onUpdate(todo.id, { attachments: updatedAttachments });
  };

  const getStatusColor = (status: TodoStatus) => {
    switch (status) {
      case 'not_started': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'in_progress': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'cancelled': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'expired': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Todo Details</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              View and manage todo information
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowEditDialog(true)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${getStatusColor(todo.status)}`}>
              {getStatusIcon(todo.status)}
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">Status</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white capitalize">
              {todo.status.replace('_', ' ')}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${getPriorityColor(todo.priority)}`}>
              <span className="text-lg font-bold">{todo.priority.charAt(0).toUpperCase()}</span>
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">Priority</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white capitalize">
              {todo.priority}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 bg-blue-100 dark:bg-blue-900/20 text-blue-600">
              <User className="w-6 h-6" />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">Assigned To</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {todo.assignedTo}
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
              {todo.createdBy}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 bg-purple-100 dark:bg-purple-900/20 text-purple-600">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">Due Date</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {todo.dueDate}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title and Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{todo.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {todo.description}
              </p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {todo.status !== 'completed' && (
                  <Button
                    onClick={() => handleStatusChange('completed')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Complete
                  </Button>
                )}
                
                {todo.status === 'not_started' && (
                  <Button
                    onClick={() => handleStatusChange('in_progress')}
                    variant="outline"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Start Working
                  </Button>
                )}
                
                {todo.status === 'in_progress' && (
                  <Button
                    onClick={() => handleStatusChange('not_started')}
                    variant="outline"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                )}
                
                {todo.status !== 'cancelled' && (
                  <Button
                    onClick={() => handleStatusChange('cancelled')}
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Paperclip className="w-5 h-5 mr-2" />
                  Attachments ({todo.attachments.length})
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAttachmentDialog(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Attachment
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todo.attachments.length > 0 ? (
                <div className="space-y-3">
                  {todo.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <span className="text-2xl">{getFileIcon(attachment.type)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {attachment.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatFileSize(attachment.size)} • {attachment.type}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveAttachment(attachment.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Paperclip className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No attachments yet</p>
                  <p className="text-sm">Click &quot;Add Attachment&quot; to upload files</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar Info */}
        <div className="space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Created</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{todo.createdAt}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Last Updated</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{todo.updatedAt}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    isOverdue ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Due Date</div>
                    <div className={`text-xs ${
                      isOverdue ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {todo.dueDate}
                      {isOverdue && ' (Overdue)'}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status History */}
          <Card>
            <CardHeader>
              <CardTitle>Status History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Current Status</span>
                  <Badge variant={getStatusBadgeVariant(todo.status)}>
                    {todo.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Priority</span>
                  <Badge variant={getPriorityBadgeVariant(todo.priority)}>
                    {todo.priority}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Assignee</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {todo.assignedTo}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Created By</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {todo.createdBy}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overdue Warning */}
          {isOverdue && (
            <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="text-sm font-medium text-red-800 dark:text-red-200">
                      Overdue
                    </div>
                    <div className="text-xs text-red-600 dark:text-red-300">
                      This todo is past its due date
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>
              Update the todo details
            </DialogDescription>
          </DialogHeader>
          <TodoForm
            onSubmit={(updatedTodo) => {
              onUpdate(todo.id, updatedTodo);
              setShowEditDialog(false);
            }}
            users={users}
            onCancel={() => setShowEditDialog(false)}
            initialData={todo}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Todo</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{todo.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Attachment Dialog */}
      <Dialog open={showAttachmentDialog} onOpenChange={setShowAttachmentDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Attachments</DialogTitle>
            <DialogDescription>
              Upload files to attach to this todo
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Files
              </label>
              <input
                type="file"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setNewAttachments(Array.from(e.target.files));
                  }
                }}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            {newAttachments.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Selected Files ({newAttachments.length})
                </label>
                <div className="space-y-2">
                  {newAttachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Paperclip className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-900 dark:text-white">{file.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ({formatFileSize(file.size)})
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setNewAttachments(prev => prev.filter((_, i) => i !== index))}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setShowAttachmentDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => handleAddAttachments(newAttachments)}
              disabled={newAttachments.length === 0}
            >
              Add Attachments
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 