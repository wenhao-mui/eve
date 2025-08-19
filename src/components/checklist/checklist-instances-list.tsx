'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertTriangle,
  Grid3X3,
  List
} from 'lucide-react';
import { ChecklistInstance } from './checklist-instance';

interface ChecklistInstancesListProps {
  instances: ChecklistInstance[];
  onView: (instance: ChecklistInstance) => void;
  onEdit: (instance: ChecklistInstance) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
}

export default function ChecklistInstancesList({
  instances,
  onView,
  onEdit,
  onDelete,
  onCreateNew,
}: ChecklistInstancesListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredInstances = instances.filter(instance =>
    instance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instance.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instance.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'draft': return 'secondary';
      case 'in_progress': return 'default';
      case 'completed': return 'default';
      case 'submitted': return 'default';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Clock className="h-4 w-4" />;
      case 'in_progress': return <AlertTriangle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'submitted': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getCompletionStats = (instance: ChecklistInstance) => {
    const totalItems = instance.items.length;
    const completedItems = instance.items.filter(item => item.response !== null).length;
    const percentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    
    return {
      total: totalItems,
      completed: completedItems,
      percentage: Math.round(percentage),
    };
  };

  const isOverdue = (instance: ChecklistInstance) => {
    return new Date(instance.dueDate) < new Date() && 
           instance.status !== 'completed' && 
           instance.status !== 'submitted';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Checklist Instances
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and manage your active checklists
          </p>
        </div>
        <Button onClick={onCreateNew} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Checklist
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search checklists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="h-8 px-3"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="h-8 px-3"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Instances Display */}
      {filteredInstances.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'No checklists found' : 'No checklist instances yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Create your first checklist from a template to get started'
              }
            </p>
            {!searchTerm && (
              <Button onClick={onCreateNew} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create New Checklist
              </Button>
            )}
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        // Grid View
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInstances.map((instance) => {
            const stats = getCompletionStats(instance);
            const overdue = isOverdue(instance);
            
            return (
              <Card key={instance.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {instance.title}
                      </CardTitle>
                      {instance.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {instance.description}
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Status and Progress */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(instance.status)}
                      <Badge variant={getStatusBadgeVariant(instance.status)}>
                        {instance.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{stats.completed}/{stats.total}</div>
                      <div className="text-xs text-gray-500">{stats.percentage}%</div>
                    </div>
                  </div>

                  {/* Assignment */}
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <User className="h-4 w-4" />
                    <span>{instance.assignedTo}</span>
                  </div>

                  {/* Due Date */}
                  <div className="flex items-center space-x-2 text-xs">
                    <Calendar className="h-3 w-3" />
                    <span className={overdue ? 'text-red-500 font-medium' : 'text-gray-500 dark:text-gray-400'}>
                      Due {formatDate(instance.dueDate)}
                      {overdue && ' (Overdue)'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(instance)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {instance.status !== 'submitted' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(instance)}
                        className="flex-1"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(instance.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        // List View
        <div className="space-y-3">
          {filteredInstances.map((instance) => {
            const stats = getCompletionStats(instance);
            const overdue = isOverdue(instance);
            
            return (
              <Card key={instance.id} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            {getStatusIcon(instance.status)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                            {instance.title}
                          </h3>
                          {instance.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                              {instance.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      {/* Progress */}
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {stats.completed}/{stats.total}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Items</div>
                      </div>
                      
                      {/* Status */}
                      <div className="text-center">
                        <Badge variant={getStatusBadgeVariant(instance.status)}>
                          {instance.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      {/* Assignment */}
                      <div className="text-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Assigned To
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {instance.assignedTo}
                        </div>
                      </div>
                      
                      {/* Due Date */}
                      <div className="text-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Due Date
                        </div>
                        <div className={`text-sm font-medium ${
                          overdue ? 'text-red-500' : 'text-gray-900 dark:text-white'
                        }`}>
                          {formatDate(instance.dueDate)}
                          {overdue && ' (Overdue)'}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onView(instance)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {instance.status !== 'submitted' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(instance)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(instance.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
} 