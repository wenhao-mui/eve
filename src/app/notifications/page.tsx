'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  FileText, 
  Users, 
  Settings, 
  Clock,
  Trash2,
  CheckCheck,
  Search
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  timestamp: string;
  category: 'system' | 'user' | 'document' | 'security';
  actionUrl?: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock notifications data (extended list)
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'New User Registration',
        message: 'John Doe has registered for an account and is pending approval',
        type: 'info',
        isRead: false,
        timestamp: '2 minutes ago',
        category: 'user',
        actionUrl: '/users'
      },
      {
        id: '2',
        title: 'Document Uploaded',
        message: 'Project Proposal.pdf has been uploaded to Project Documents folder',
        type: 'success',
        isRead: false,
        timestamp: '5 minutes ago',
        category: 'document',
        actionUrl: '/documents'
      },
      {
        id: '3',
        title: 'System Maintenance',
        message: 'Scheduled maintenance will begin in 30 minutes. Expected downtime: 2 hours',
        type: 'warning',
        isRead: true,
        timestamp: '1 hour ago',
        category: 'system'
      },
      {
        id: '4',
        title: 'Security Alert',
        message: 'Multiple failed login attempts detected from IP 192.168.1.100. Account temporarily locked',
        type: 'error',
        isRead: false,
        timestamp: '2 hours ago',
        category: 'security',
        actionUrl: '/settings'
      },
      {
        id: '5',
        title: 'Role Updated',
        message: 'Admin role permissions have been modified by system administrator',
        type: 'info',
        isRead: true,
        timestamp: '3 hours ago',
        category: 'user',
        actionUrl: '/roles'
      },
      {
        id: '6',
        title: 'Backup Completed',
        message: 'Daily backup has been completed successfully. 2.3GB of data backed up',
        type: 'success',
        isRead: true,
        timestamp: '4 hours ago',
        category: 'system'
      },
      {
        id: '7',
        title: 'New Folder Created',
        message: 'Marketing Materials folder has been created in the root directory',
        type: 'info',
        isRead: true,
        timestamp: '5 hours ago',
        category: 'document',
        actionUrl: '/documents'
      },
      {
        id: '8',
        title: 'Password Expiry',
        message: 'Your password will expire in 7 days. Please update it to maintain account security',
        type: 'warning',
        isRead: false,
        timestamp: '6 hours ago',
        category: 'security',
        actionUrl: '/settings'
      },
      {
        id: '9',
        title: 'Storage Warning',
        message: 'Storage usage is at 85% capacity. Consider cleaning up old files',
        type: 'warning',
        isRead: true,
        timestamp: '1 day ago',
        category: 'system'
      },
      {
        id: '10',
        title: 'Login Success',
        message: 'Successful login from new device: iPhone 15 Pro (192.168.1.50)',
        type: 'success',
        isRead: true,
        timestamp: '1 day ago',
        category: 'security'
      },
      {
        id: '11',
        title: 'User Permission Changed',
        message: 'Jane Smith\'s permissions have been updated to include document management',
        type: 'info',
        isRead: true,
        timestamp: '2 days ago',
        category: 'user',
        actionUrl: '/users'
      },
      {
        id: '12',
        title: 'File Sync Complete',
        message: 'All documents have been synchronized with cloud storage successfully',
        type: 'success',
        isRead: true,
        timestamp: '2 days ago',
        category: 'document'
      },
      {
        id: '13',
        title: 'Database Optimization',
        message: 'Database performance optimization completed. Query response time improved by 15%',
        type: 'success',
        isRead: true,
        timestamp: '3 days ago',
        category: 'system'
      },
      {
        id: '14',
        title: 'Failed Login Attempt',
        message: 'Failed login attempt for user admin from IP 203.0.113.45',
        type: 'warning',
        isRead: true,
        timestamp: '3 days ago',
        category: 'security'
      },
      {
        id: '15',
        title: 'New Feature Available',
        message: 'Advanced search functionality is now available in the document repository',
        type: 'info',
        isRead: true,
        timestamp: '4 days ago',
        category: 'system'
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  const getNotificationIcon = (type: Notification['type'], category: Notification['category']) => {
    if (category === 'user') return <Users className="w-5 h-5" />;
    if (category === 'document') return <FileText className="w-5 h-5" />;
    if (category === 'security') return <AlertCircle className="w-5 h-5" />;
    if (category === 'system') return <Settings className="w-5 h-5" />;
    
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'warning': return <AlertCircle className="w-5 h-5" />;
      case 'error': return <AlertCircle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
      default: return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400';
    }
  };

  const getCategoryColor = (category: Notification['category']) => {
    switch (category) {
      case 'user': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'document': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'security': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'system': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(notification => !notification.isRead));
  };

  // Filter notifications based on search and filters
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || notification.category === selectedCategory;
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'read' && notification.isRead) ||
                         (selectedStatus === 'unread' && !notification.isRead);
    
    return matchesSearch && matchesCategory && matchesType && matchesStatus;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const readCount = notifications.filter(n => n.isRead).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and view all system notifications
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={deleteAllRead}
            disabled={readCount === 0}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Read
          </Button>
          <Button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{notifications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unread</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{unreadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Read</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{readCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All Categories</option>
                <option value="system">System</option>
                <option value="user">User</option>
                <option value="document">Document</option>
                <option value="security">Security</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="w-full lg:w-48">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="w-full lg:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
          <CardDescription>
            {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all ${
                    notification.isRead 
                      ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
                      : 'bg-blue-50 dark:bg-gray-800 border-blue-200 dark:border-blue-700'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type, notification.category)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-lg font-medium ${
                          notification.isRead 
                            ? 'text-gray-700 dark:text-gray-300' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {!notification.isRead && (
                            <Badge variant="default" className="bg-blue-500">
                              New
                            </Badge>
                          )}
                          <Badge 
                            variant="outline" 
                            className={getCategoryColor(notification.category)}
                          >
                            {notification.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className={`text-gray-600 dark:text-gray-400 mb-3 ${
                        notification.isRead ? 'text-gray-500' : 'text-gray-600'
                      }`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{notification.timestamp}</span>
                          </div>
                          <Badge variant="outline">
                            {notification.type}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {!notification.isRead && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Mark Read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <p className="text-lg font-medium">No notifications found</p>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 