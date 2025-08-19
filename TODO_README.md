# Todo List Feature

This document describes the todo list functionality implemented in the Eve Portal application.

## Features

### Todo Management
- **Create**: Add new todos with title, description, assignee, due date, priority, and status
- **Read**: View todo list and individual todo details
- **Update**: Edit todo information and change status
- **Delete**: Remove todos from the system

### Todo Properties
- **Title**: Required field for todo name
- **Description**: Optional detailed description
- **Assigned To**: User responsible for the todo
- **Status**: 
  - Not Started
  - In Progress
  - Completed
  - Cancelled
  - Expired
- **Priority**: Low, Medium, High
- **Due Date**: Required deadline for the todo
- **Attachments**: File uploads related to the todo
- **Timestamps**: Creation and update dates

### Status Management
- **Status Transitions**: 
  - Not Started → In Progress → Completed
  - Can be cancelled or marked as expired
- **Overdue Detection**: Automatically identifies overdue todos
- **Quick Actions**: One-click status changes

### File Attachments
- **Drag & Drop**: Upload files by dragging them into the interface
- **File Types**: Supports various file formats (documents, images, archives, etc.)
- **Progress Tracking**: Shows upload progress for files
- **File Management**: View, download, and remove attachments

### User Interface
- **Grid/List Views**: Toggle between different display modes
- **Search & Filtering**: Find todos by text, status, assignee, or priority
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Consistent with the application theme

## Navigation

The todo list is accessible from the main sidebar navigation:
- **Icon**: CheckSquare (✓)
- **Route**: `/todos`
- **Position**: Between Documents and Database

## Components

### TodoList
Main component displaying all todos with:
- Status summary cards
- Search and filtering
- Create new todo button
- Grid/list view toggle

### TodoCard
Individual todo display with:
- Status and priority badges
- Quick action buttons
- Attachment indicators
- Edit and detail view options

### TodoForm
Form for creating and editing todos:
- Input validation
- File upload interface
- User assignment dropdown
- Status and priority selection

### TodoDetail
Detailed view of a single todo:
- Complete information display
- Timeline and history
- Quick status changes
- Attachment management

## Data Structure

```typescript
interface Todo {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
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

type TodoStatus = 'not_started' | 'in_progress' | 'completed' | 'cancelled' | 'expired';
```

## Usage

### Creating a Todo
1. Navigate to `/todos`
2. Click "New Todo" button
3. Fill in required fields (title, assignee, due date)
4. Add optional description and attachments
5. Set priority and initial status
6. Click "Create Todo"

### Managing Todos
- **View Details**: Click the eye icon on any todo card
- **Edit**: Click the edit icon or use the edit button in detail view
- **Change Status**: Use quick action buttons or edit form
- **Delete**: Use delete button with confirmation dialog

### Filtering and Search
- **Text Search**: Search by title or description
- **Status Filter**: Filter by current status
- **Assignee Filter**: Filter by assigned user
- **Priority Filter**: Filter by priority level

## Technical Implementation

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom components
- **State Management**: React hooks (useState)
- **File Handling**: Drag & drop with progress simulation
- **Type Safety**: Full TypeScript implementation
- **UI Components**: Custom component library with Radix UI primitives

## Future Enhancements

Potential improvements for the todo system:
- **Real-time Updates**: WebSocket integration for live updates
- **Notifications**: Email/SMS reminders for due dates
- **Recurring Todos**: Support for repeating tasks
- **Team Collaboration**: Comments and activity tracking
- **Calendar Integration**: Sync with external calendar systems
- **Mobile App**: Native mobile application
- **API Integration**: RESTful API for external access
- **Reporting**: Analytics and progress tracking
- **Templates**: Predefined todo templates for common workflows
- **Import/Export**: CSV, JSON, and other format support 