'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  FileText, 
  Users, 
  Settings, 
  ArrowRight,
  Clock
} from "lucide-react";
import Link from "next/link";

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

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Mock notifications data
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'New User Registration',
        message: 'John Doe has registered for an account',
        type: 'info',
        isRead: false,
        timestamp: '2 minutes ago',
        category: 'user',
        actionUrl: '/users'
      },
      {
        id: '2',
        title: 'Document Uploaded',
        message: 'Project Proposal.pdf has been uploaded to Project Documents',
        type: 'success',
        isRead: false,
        timestamp: '5 minutes ago',
        category: 'document',
        actionUrl: '/documents'
      },
      {
        id: '3',
        title: 'System Maintenance',
        message: 'Scheduled maintenance will begin in 30 minutes',
        type: 'warning',
        isRead: true,
        timestamp: '1 hour ago',
        category: 'system'
      },
      {
        id: '4',
        title: 'Security Alert',
        message: 'Multiple failed login attempts detected from IP 192.168.1.100',
        type: 'error',
        isRead: false,
        timestamp: '2 hours ago',
        category: 'security',
        actionUrl: '/settings'
      },
      {
        id: '5',
        title: 'Role Updated',
        message: 'Admin role permissions have been modified',
        type: 'info',
        isRead: true,
        timestamp: '3 hours ago',
        category: 'user',
        actionUrl: '/roles'
      },
      {
        id: '6',
        title: 'Backup Completed',
        message: 'Daily backup has been completed successfully',
        type: 'success',
        isRead: true,
        timestamp: '4 hours ago',
        category: 'system'
      },
      {
        id: '7',
        title: 'New Folder Created',
        message: 'Marketing Materials folder has been created',
        type: 'info',
        isRead: true,
        timestamp: '5 hours ago',
        category: 'document',
        actionUrl: '/documents'
      },
      {
        id: '8',
        title: 'Password Expiry',
        message: 'Your password will expire in 7 days',
        type: 'warning',
        isRead: false,
        timestamp: '6 hours ago',
        category: 'security',
        actionUrl: '/settings'
      },
      {
        id: '9',
        title: 'Storage Warning',
        message: 'Storage usage is at 85% capacity',
        type: 'warning',
        isRead: true,
        timestamp: '1 day ago',
        category: 'system'
      },
      {
        id: '10',
        title: 'Login Success',
        message: 'Successful login from new device',
        type: 'success',
        isRead: true,
        timestamp: '1 day ago',
        category: 'security'
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  const getNotificationIcon = (type: Notification['type'], category: Notification['category']) => {
    if (category === 'user') return <Users className="w-4 h-4" />;
    if (category === 'document') return <FileText className="w-4 h-4" />;
    if (category === 'security') return <AlertCircle className="w-4 h-4" />;
    if (category === 'system') return <Settings className="w-4 h-4" />;
    
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
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

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const recentNotifications = notifications.slice(0, 10);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-96 max-h-[600px] overflow-y-auto" 
        align="end"
        sideOffset={8}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <DropdownMenuLabel className="text-lg font-semibold">
              Notifications
            </DropdownMenuLabel>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Mark all as read
              </Button>
            )}
          </div>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="space-y-1">
          {recentNotifications.length > 0 ? (
            recentNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  notification.isRead 
                    ? 'hover:bg-gray-50 dark:hover:bg-gray-800' 
                    : 'bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => {
                  markAsRead(notification.id);
                  if (notification.actionUrl) {
                    window.location.href = notification.actionUrl;
                  }
                }}
              >
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type, notification.category)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-medium ${
                        notification.isRead 
                          ? 'text-gray-700 dark:text-gray-300' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    
                    <p className={`text-sm ${
                      notification.isRead 
                        ? 'text-gray-600 dark:text-gray-400' 
                        : 'text-gray-700 dark:text-gray-300'
                    } mb-2 line-clamp-2`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getCategoryColor(notification.category)}`}
                      >
                        {notification.category}
                      </Badge>
                      
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{notification.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
              <p>No notifications</p>
            </div>
          )}
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <Link href="/notifications">
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => setIsOpen(false)}
            >
              View all notifications
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 