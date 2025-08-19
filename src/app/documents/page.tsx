'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/documents/file-upload";
import { 
  Folder, 
  File, 
  Upload, 
  Search, 
  Share2, 
  Trash2, 
  MoreHorizontal,
  FolderPlus,
  Users,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Grid3X3,
  List
} from "lucide-react";

// Mock data structure
interface Document {
  id: string;
  name: string;
  type: 'file';
  size: number;
  mimeType: string;
  uploadedBy: string;
  uploadedAt: string;
  sharedWith: string[];
  isPublic: boolean;
  parentFolder?: string;
}

interface Folder {
  id: string;
  name: string;
  type: 'folder';
  description?: string;
  createdBy: string;
  createdAt: string;
  sharedWith: string[];
  isPublic: boolean;
  parentFolder?: string;
  documentCount: number;
}

type RepositoryItem = Document | Folder;

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPath, setCurrentPath] = useState<string[]>(['root']);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [allItems, setAllItems] = useState<RepositoryItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderDescription, setNewFolderDescription] = useState('');
  const [shareEmail, setShareEmail] = useState('');
  const [sharePermission, setSharePermission] = useState<'view' | 'edit'>('view');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data initialization
  useEffect(() => {
    // Initialize with mock data
    const mockFolders: Folder[] = [
      {
        id: '1',
        name: 'Project Documents',
        type: 'folder',
        description: 'All project-related documents and files',
        createdBy: 'Admin User',
        createdAt: '2025-01-15',
        sharedWith: ['john.doe@example.com', 'jane.smith@example.com'],
        isPublic: false,
        documentCount: 12
      },
      {
        id: '2',
        name: 'Marketing Materials',
        type: 'folder',
        description: 'Brand assets and marketing collateral',
        createdBy: 'Admin User',
        createdAt: '2025-01-14',
        sharedWith: ['marketing@example.com'],
        isPublic: true,
        documentCount: 8
      },
      {
        id: '3',
        name: 'Financial Reports',
        type: 'folder',
        description: 'Quarterly and annual financial documents',
        createdBy: 'Admin User',
        createdAt: '2025-01-13',
        sharedWith: ['finance@example.com'],
        isPublic: false,
        documentCount: 5
      }
    ];

    const mockDocuments: Document[] = [
      {
        id: '1',
        name: 'Project Proposal.pdf',
        type: 'file',
        size: 2048576,
        mimeType: 'application/pdf',
        uploadedBy: 'Admin User',
        uploadedAt: '2025-01-15',
        sharedWith: ['john.doe@example.com'],
        isPublic: false
      },
      {
        id: '2',
        name: 'Brand Guidelines.docx',
        type: 'file',
        size: 1048576,
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        uploadedBy: 'Admin User',
        uploadedAt: '2025-01-14',
        sharedWith: [],
        isPublic: true
      },
      {
        id: '3',
        name: 'Q4 Financial Summary.xlsx',
        type: 'file',
        size: 3145728,
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        uploadedBy: 'Admin User',
        uploadedAt: '2025-01-13',
        sharedWith: ['finance@example.com'],
        isPublic: false
      }
    ];

    setFolders(mockFolders);
    setDocuments(mockDocuments);
    setAllItems([...mockFolders, ...mockDocuments]);
  }, []);

  const getFileIcon = (mimeType?: string) => {
    if (!mimeType) return <File className="w-6 h-6" />;
    
    if (mimeType.includes('pdf')) return <FileText className="w-6 h-6 text-red-500" />;
    if (mimeType.includes('word') || mimeType.includes('document')) return <FileText className="w-6 h-6 text-blue-500" />;
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return <FileText className="w-6 h-6 text-green-500" />;
    if (mimeType.includes('image')) return <Image className="w-6 h-6 text-purple-500" />;
    if (mimeType.includes('video')) return <Video className="w-6 h-6 text-orange-500" />;
    if (mimeType.includes('audio')) return <Music className="w-6 h-6 text-pink-500" />;
    if (mimeType.includes('zip') || mimeType.includes('rar')) return <Archive className="w-6 h-6 text-gray-500" />;
    
    return <File className="w-6 h-6" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: Folder = {
        id: Date.now().toString(),
        name: newFolderName,
        type: 'folder',
        description: newFolderDescription,
        createdBy: 'Admin User',
        createdAt: new Date().toISOString().split('T')[0],
        sharedWith: [],
        isPublic: false,
        documentCount: 0
      };
      setFolders(prev => [...prev, newFolder]);
      setAllItems(prev => [...prev, newFolder]);
      setNewFolderName('');
      setNewFolderDescription('');
      setShowCreateFolder(false);
    }
  };

  const handleDeleteItems = () => {
    // Delete selected folders
    setFolders(prev => prev.filter(folder => !selectedItems.includes(folder.id)));
    // Delete selected documents
    setDocuments(prev => prev.filter(doc => !selectedItems.includes(doc.id)));
    setSelectedItems([]);
  };

  const handleShare = () => {
    if (shareEmail.trim() && selectedItems.length > 0) {
      // Update sharing for selected items
      setFolders(prev => prev.map(folder => 
        selectedItems.includes(folder.id) 
          ? { ...folder, sharedWith: [...folder.sharedWith, shareEmail] }
          : folder
      ));
      setDocuments(prev => prev.map(doc => 
        selectedItems.includes(doc.id) 
          ? { ...doc, sharedWith: [...doc.sharedWith, shareEmail] }
          : doc
      ));
      setShareEmail('');
      setShowShareDialog(false);
    }
  };

  const filteredItems = allItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Document Repository</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and organize your documents and folders
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
            variant="outline"
            onClick={() => setShowShareDialog(true)}
            disabled={selectedItems.length === 0}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowUploadDialog(true)}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button
            onClick={() => setShowCreateFolder(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        {currentPath.map((path, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            <button
              onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              {path === 'root' ? 'Home' : path}
            </button>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documents and folders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {folders.length} folders
              </Badge>
              <Badge variant="outline">
                {documents.length} documents
              </Badge>
              <Badge variant="outline">
                {formatFileSize(documents.reduce((sum, doc) => sum + (doc.size || 0), 0))}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Bar */}
      {selectedItems.length > 0 && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-800 dark:text-blue-200">
                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowShareDialog(true)}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeleteItems}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

            {/* Content Display */}
      {viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedItems.includes(item.id) ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
              onClick={() => {
                if (item.type === 'folder') {
                  setCurrentPath([...currentPath, item.name]);
                }
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        if (e.target.checked) {
                          setSelectedItems(prev => [...prev, item.id]);
                        } else {
                          setSelectedItems(prev => prev.filter(id => id !== item.id));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    {item.type === 'folder' ? (
                      <Folder className="w-8 h-8 text-blue-500" />
                    ) : (
                      getFileIcon(item.mimeType)
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">
                    {item.name}
                  </h3>
                  {item.type === 'folder' && item.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{item.type === 'folder' ? item.createdBy : item.uploadedBy}</span>
                    <span>{item.type === 'folder' ? item.createdAt : item.uploadedAt}</span>
                  </div>
                  {item.type === 'file' && (
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{formatFileSize(item.size)}</span>
                      <span>{item.mimeType.split('/')[1]?.toUpperCase()}</span>
                    </div>
                  )}
                  {item.type === 'folder' && (
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{item.documentCount} items</span>
                      <span>{item.isPublic ? 'Public' : 'Private'}</span>
                    </div>
                  )}
                  {item.sharedWith.length > 0 && (
                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                      <Users className="w-3 h-3" />
                      <span>{item.sharedWith.length} shared</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* List View */
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems(filteredItems.map(item => item.id));
                          } else {
                            setSelectedItems([]);
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Modified
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
                        selectedItems.includes(item.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={() => {
                        if (item.type === 'folder') {
                          setCurrentPath([...currentPath, item.name]);
                        }
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            if (e.target.checked) {
                              setSelectedItems(prev => [...prev, item.id]);
                            } else {
                              setSelectedItems(prev => prev.filter(id => id !== item.id));
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          {item.type === 'folder' ? (
                            <Folder className="w-6 h-6 text-blue-500" />
                          ) : (
                            getFileIcon(item.mimeType)
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.name}
                            </div>
                            {item.type === 'folder' && item.description && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {item.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline">
                          {item.type === 'folder' ? 'Folder' : item.mimeType.split('/')[1]?.toUpperCase() || 'File'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {item.type === 'file' ? formatFileSize(item.size) : `${item.documentCount} items`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {item.type === 'folder' ? item.createdAt : item.uploadedAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Badge variant={item.isPublic ? 'default' : 'secondary'}>
                            {item.isPublic ? 'Public' : 'Private'}
                          </Badge>
                          {item.sharedWith.length > 0 && (
                            <Badge variant="outline">
                              <Users className="w-3 h-3 mr-1" />
                              {item.sharedWith.length}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Folder Dialog */}
      <Dialog open={showCreateFolder} onOpenChange={setShowCreateFolder}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Create a new folder to organize your documents
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Folder Name</label>
              <Input
                placeholder="Enter folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description (Optional)</label>
              <Textarea
                placeholder="Enter folder description"
                value={newFolderDescription}
                onChange={(e) => setNewFolderDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateFolder(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateFolder}>
              Create Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Documents</DialogTitle>
            <DialogDescription>
              Select files to upload to the current folder. You can drag and drop multiple files.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <FileUpload
              onFilesSelected={(files) => {
                console.log('Files selected:', files);
                // Handle file upload logic here
              }}
              maxFiles={20}
              maxFileSize={100 * 1024 * 1024} // 100MB
              acceptedTypes={[
                'image/*',
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'text/*',
                'video/*',
                'audio/*',
                'application/zip',
                'application/x-rar-compressed'
              ]}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowUploadDialog(false)}>
              Upload Files
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Items</DialogTitle>
            <DialogDescription>
              Share selected items with other users
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Permission</label>
              <select
                value={sharePermission}
                onChange={(e) => setSharePermission(e.target.value as 'view' | 'edit')}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="view">View Only</option>
                <option value="edit">Can Edit</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleShare}>
              Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 