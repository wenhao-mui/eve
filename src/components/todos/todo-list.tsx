'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TodoCard from './todo-card';
import TodoForm from './todo-form';
import { 
  Plus, 
  Search, 
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Grid3X3,
  List,
  Edit
} from "lucide-react";

// Todo status types
export type TodoStatus = 'not_started' | 'in_progress' | 'completed' | 'cancelled' | 'expired';

// Todo interface
export interface Todo {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  createdBy: string;
  status: TodoStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  attachments: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }>;
  priority: 'low' | 'medium' | 'high';
}

// Mock users for assignment
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: '3', name: 'Mike Johnson', email: 'mike.johnson@example.com' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah.wilson@example.com' },
  { id: '5', name: 'David Brown', email: 'david.brown@example.com' },
];

// Mock todos data
const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Complete Project Proposal',
    description: 'Finish the detailed project proposal document for the new client',
    assignedTo: 'John Doe',
    createdBy: 'Admin User',
    status: 'in_progress',
    dueDate: '2025-01-25',
    createdAt: '2025-01-15',
    updatedAt: '2025-01-18',
    attachments: [
      { id: '1', name: 'proposal-draft.docx', size: 1024000, type: 'document', url: '#' }
    ],
    priority: 'high'
  },
  {
    id: '2',
    title: 'Review Marketing Materials',
    description: 'Review and approve the new marketing campaign materials',
    assignedTo: 'Jane Smith',
    createdBy: 'John Doe',
    status: 'not_started',
    dueDate: '2025-01-30',
    createdAt: '2025-01-16',
    updatedAt: '2025-01-16',
    attachments: [
      { id: '2', name: 'campaign-brief.pdf', size: 2048000, type: 'pdf', url: '#' },
      { id: '3', name: 'design-mockups.zip', size: 5120000, type: 'archive', url: '#' }
    ],
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Database Migration',
    description: 'Execute the database migration to the new server',
    assignedTo: 'Mike Johnson',
    createdBy: 'Admin User',
    status: 'completed',
    dueDate: '2025-01-20',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-20',
    attachments: [
      { id: '4', name: 'migration-script.sql', size: 512000, type: 'sql', url: '#' }
    ],
    priority: 'high'
  },
  {
    id: '4',
    title: 'User Training Session',
    description: 'Conduct training session for new team members',
    assignedTo: 'Sarah Wilson',
    createdBy: 'Jane Smith',
    status: 'cancelled',
    dueDate: '2025-01-22',
    createdAt: '2025-01-12',
    updatedAt: '2025-01-19',
    attachments: [],
    priority: 'low'
  },
  {
    id: '5',
    title: 'Budget Review',
    description: 'Review quarterly budget and prepare report',
    assignedTo: 'David Brown',
    createdBy: 'David Brown',
    status: 'expired',
    dueDate: '2025-01-15',
    createdAt: '2025-01-05',
    updatedAt: '2025-01-15',
    attachments: [
      { id: '5', name: 'budget-data.xlsx', size: 1536000, type: 'spreadsheet', url: '#' }
    ],
    priority: 'medium'
  }
];

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getStatusBadgeVariant = (status: TodoStatus): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'not_started': return 'secondary';
      case 'in_progress': return 'default';
      case 'completed': return 'default';
      case 'cancelled': return 'destructive';
      case 'expired': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: TodoStatus) => {
    switch (status) {
      case 'not_started': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <AlertTriangle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'expired': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityBadgeVariant = (priority: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || todo.status === statusFilter;
    const matchesAssignee = assigneeFilter === 'all' || todo.assignedTo === assigneeFilter;
    const matchesPriority = priorityFilter === 'all' || todo.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesAssignee && matchesPriority;
  });

  const handleCreateTodo = (newTodo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const todo: Todo = {
      ...newTodo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      // Ensure createdBy is set, default to current user if not provided
      createdBy: newTodo.createdBy || 'Admin User',
    };
    setTodos(prev => [todo, ...prev]);
    setShowCreateDialog(false);
  };

  const handleUpdateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
        : todo
    ));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setShowEditDialog(true);
  };

  const handleEditSubmit = (updatedTodo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTodo) {
      handleUpdateTodo(editingTodo.id, updatedTodo);
      setShowEditDialog(false);
      setEditingTodo(null);
    }
  };

  const getStatusCount = (status: TodoStatus) => {
    return todos.filter(todo => todo.status === status).length;
  };

  const getTotalCount = () => todos.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Todo List</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and track your tasks and projects
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {/* View Toggle */}
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8 px-2"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 px-2"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Todo
          </Button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{getTotalCount()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{getStatusCount('not_started')}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Not Started</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{getStatusCount('in_progress')}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{getStatusCount('completed')}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{getStatusCount('cancelled')}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Cancelled</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{getStatusCount('expired')}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Expired</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search todos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="not_started">Not Started</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {mockUsers.map(user => (
                    <SelectItem key={user.id} value={user.name}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Todo Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
              getStatusBadgeVariant={getStatusBadgeVariant}
              getStatusIcon={getStatusIcon}
              getPriorityBadgeVariant={getPriorityBadgeVariant}
              users={mockUsers}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Created By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredTodos.map((todo) => (
                    <tr key={todo.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {todo.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                            {todo.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {todo.assignedTo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {todo.createdBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStatusBadgeVariant(todo.status)}>
                          {getStatusIcon(todo.status)}
                          <span className="ml-1">{todo.status.replace('_', ' ')}</span>
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getPriorityBadgeVariant(todo.priority)}>
                          {todo.priority}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {todo.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditTodo(todo)}
                            className="text-blue-600 hover:text-blue-700"
                            title="Edit Todo"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpdateTodo(todo.id, { status: 'completed' })}
                            disabled={todo.status === 'completed'}
                            title="Mark as Completed"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Delete Todo"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Todo Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Todo</DialogTitle>
            <DialogDescription>
              Add a new task to your todo list
            </DialogDescription>
          </DialogHeader>
          <TodoForm
            onSubmit={handleCreateTodo}
            users={mockUsers}
            onCancel={() => setShowCreateDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Todo Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>
              Update the todo details
            </DialogDescription>
          </DialogHeader>
          {editingTodo && (
            <TodoForm
              onSubmit={handleEditSubmit}
              users={mockUsers}
              onCancel={() => {
                setShowEditDialog(false);
                setEditingTodo(null);
              }}
              initialData={editingTodo}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 