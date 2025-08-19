'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TodoList from '@/components/todos/todo-list';
import TodoDetail from '@/components/todos/todo-detail';
import { Todo, TodoStatus } from '@/components/todos/todo-list';

export default function TodosPage() {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const router = useRouter();

  const handleUpdateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
        : todo
    ));
    
    // Update selected todo if it's the one being edited
    if (selectedTodo && selectedTodo.id === id) {
      setSelectedTodo(prev => prev ? { 
        ...prev, 
        ...updates, 
        updatedAt: new Date().toISOString().split('T')[0] 
      } : null);
    }
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    
    // Clear selected todo if it's the one being deleted
    if (selectedTodo && selectedTodo.id === id) {
      setSelectedTodo(null);
    }
  };

  const handleBackToList = () => {
    setSelectedTodo(null);
  };

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

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
      case 'not_started': return <span>⏰</span>;
      case 'in_progress': return <span>🔄</span>;
      case 'completed': return <span>✅</span>;
      case 'cancelled': return <span>❌</span>;
      case 'expired': return <span>⏰</span>;
      default: return <span>⏰</span>;
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

  // Mock users for the todo components
  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: '3', name: 'Mike Johnson', email: 'mike.johnson@example.com' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah.wilson@example.com' },
    { id: '5', name: 'David Brown', email: 'david.brown@example.com' },
  ];

  if (selectedTodo) {
    return (
      <TodoDetail
        todo={selectedTodo}
        onUpdate={handleUpdateTodo}
        onDelete={handleDeleteTodo}
        onBack={handleBackToList}
        getStatusBadgeVariant={getStatusBadgeVariant}
        getStatusIcon={getStatusIcon}
        getPriorityBadgeVariant={getPriorityBadgeVariant}
        users={mockUsers}
      />
    );
  }

  return (
    <TodoList />
  );
} 