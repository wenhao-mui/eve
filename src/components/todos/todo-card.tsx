'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TodoForm from './todo-form';
import { 
  Calendar, 
  User, 
  Paperclip, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock,
  XCircle,
  AlertTriangle,
  Eye
} from "lucide-react";
import { Todo, TodoStatus } from './todo-list';

interface TodoCardProps {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  getStatusBadgeVariant: (status: TodoStatus) => "default" | "secondary" | "destructive" | "outline";
  getStatusIcon: (status: TodoStatus) => React.ReactNode;
  getPriorityBadgeVariant: (priority: string) => "default" | "secondary" | "destructive" | "outline";
  users: Array<{ id: string; name: string; email: string }>;
}

export default function TodoCard({ 
  todo, 
  onUpdate, 
  onDelete, 
  getStatusBadgeVariant, 
  getStatusIcon, 
  getPriorityBadgeVariant,
  users
}: TodoCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const handleStatusChange = (newStatus: TodoStatus) => {
    onUpdate(todo.id, { status: newStatus });
  };

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

  return (
    <>
      <Card className={`hover:shadow-lg transition-all cursor-pointer ${
        isOverdue ? 'border-red-200 bg-red-50 dark:bg-red-900/20' : ''
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {todo.title}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant={getStatusBadgeVariant(todo.status)}>
                  {getStatusIcon(todo.status)}
                  <span className="ml-1">{todo.status.replace('_', ' ')}</span>
                </Badge>
                <Badge variant={getPriorityBadgeVariant(todo.priority)}>
                  {todo.priority}
                </Badge>
                {isOverdue && (
                  <Badge variant="destructive">
                    Overdue
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetailDialog(true);
                }}
                className="h-8 w-8 p-0"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEditDialog(true);
                }}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
            {todo.description}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <User className="w-4 h-4 mr-2" />
              <span className="truncate">Assigned: {todo.assignedTo}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <User className="w-4 h-4 mr-2 opacity-60" />
              <span className="truncate">Created by: {todo.createdBy}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Due: {todo.dueDate}</span>
            </div>
            
            {todo.attachments.length > 0 && (
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Paperclip className="w-4 h-4 mr-2" />
                <span>{todo.attachments.length} attachment{todo.attachments.length !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Updated: {todo.updatedAt}
            </div>
            
            <div className="flex items-center space-x-2">
              {todo.status !== 'completed' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange('completed');
                  }}
                  className="h-8 px-2 text-green-600 border-green-200 hover:bg-green-50"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Complete
                </Button>
              )}
              
              {todo.status === 'not_started' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange('in_progress');
                  }}
                  className="h-8 px-2"
                >
                  Start
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(todo.id);
                }}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{todo.title}</DialogTitle>
            <DialogDescription>
              Detailed view of the todo item
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Description</h4>
              <p className="text-gray-600 dark:text-gray-400">{todo.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Assigned To</h4>
                <p className="text-gray-600 dark:text-gray-400">{todo.assignedTo}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Status</h4>
                <Badge variant={getStatusBadgeVariant(todo.status)}>
                  {getStatusIcon(todo.status)}
                  <span className="ml-1">{todo.status.replace('_', ' ')}</span>
                </Badge>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Priority</h4>
                <Badge variant={getPriorityBadgeVariant(todo.priority)}>
                  {todo.priority}
                </Badge>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Due Date</h4>
                <p className="text-gray-600 dark:text-gray-400">{todo.dueDate}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Timeline</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div>Created: {todo.createdAt}</div>
                <div>Updated: {todo.updatedAt}</div>
              </div>
            </div>
            
            {todo.attachments.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Attachments</h4>
                <div className="space-y-2">
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
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 