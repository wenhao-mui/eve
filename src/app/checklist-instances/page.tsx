'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import ChecklistInstancesList from '@/components/checklist/checklist-instances-list';
import ChecklistInstanceForm from '@/components/checklist/checklist-instance-form';
import ChecklistInstance, { ChecklistInstance as ChecklistInstanceType } from '@/components/checklist/checklist-instance';
import { ChecklistTemplate } from '@/components/checklist/checklist-form';
import { 
  loadChecklistInstances, 
  saveChecklistInstances, 
  loadUsers,
  createChecklistInstance,
  updateChecklistInstance,
  deleteChecklistInstance,
  exportChecklistInstancesData,
  importChecklistInstancesData
} from '@/lib/checklist-instances-data';
import { loadChecklistTemplates } from '@/lib/checklist-data';

type ViewMode = 'list' | 'create' | 'edit' | 'detail' | 'select-template';

export default function ChecklistInstancesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [instances, setInstances] = useState<ChecklistInstanceType[]>([]);
  const [templates, setTemplates] = useState<ChecklistTemplate[]>([]);
  const [users, setUsers] = useState<Array<{ id: string; name: string; email: string }>>([]);
  const [currentInstance, setCurrentInstance] = useState<ChecklistInstanceType | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ChecklistTemplate | null>(null);

  useEffect(() => {
    // Load initial data
    const loadedInstances = loadChecklistInstances();
    const loadedTemplates = loadChecklistTemplates();
    const loadedUsers = loadUsers();
    
    setInstances(loadedInstances);
    setTemplates(loadedTemplates);
    setUsers(loadedUsers);
  }, []);

  const handleCreateNew = () => {
    setViewMode('select-template');
  };

  const handleSelectTemplate = (template: ChecklistTemplate) => {
    setSelectedTemplate(template);
    setViewMode('create');
  };

  const handleSaveInstance = (instance: ChecklistInstanceType) => {
    if (currentInstance) {
      // Update existing instance
      const updatedInstances = updateChecklistInstance(instance);
      setInstances(updatedInstances);
      setCurrentInstance(null);
      setViewMode('list');
    } else {
      // Create new instance
      const newInstances = createChecklistInstance(instance);
      setInstances(newInstances);
      setSelectedTemplate(null);
      setViewMode('list');
    }
  };

  const handleViewInstance = (instance: ChecklistInstanceType) => {
    setCurrentInstance(instance);
    setViewMode('detail');
  };

  const handleEditInstance = (instance: ChecklistInstanceType) => {
    setCurrentInstance(instance);
    setViewMode('edit');
  };

  const handleDeleteInstance = (id: string) => {
    if (confirm('Are you sure you want to delete this checklist instance?')) {
      const updatedInstances = deleteChecklistInstance(id);
      setInstances(updatedInstances);
      if (currentInstance?.id === id) {
        setCurrentInstance(null);
        setViewMode('list');
      }
    }
  };

  const handleBackToList = () => {
    setCurrentInstance(null);
    setSelectedTemplate(null);
    setViewMode('list');
  };

  const handleExport = () => {
    const data = exportChecklistInstancesData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `checklist-instances-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedInstances = importChecklistInstancesData(content);
          setInstances(importedInstances);
          alert(`Successfully imported ${importedInstances.length} checklist instances`);
        } catch (error) {
          alert(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      };
      reader.readAsText(file);
    }
    // Reset the input
    event.target.value = '';
  };

  // Template selection view
  if (viewMode === 'select-template') {
    return (
      <MainLayout>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToList}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Checklist Instances
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Select Template
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Choose a template to create a new checklist
              </p>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => handleSelectTemplate(template)}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {template.title}
                </h3>
                {template.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {template.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{template.items.length} items</span>
                  <span className="text-blue-600">Click to select →</span>
                </div>
              </div>
            ))}
          </div>

          {templates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No templates available. Please create a template first.
              </p>
              <button
                onClick={handleBackToList}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Back to Checklist Instances
              </button>
            </div>
          )}
        </div>
      </MainLayout>
    );
  }

  // Create new instance view
  if (viewMode === 'create' && selectedTemplate) {
    return (
      <MainLayout>
        <div className="p-6">
          <ChecklistInstanceForm
            template={selectedTemplate}
            onSave={handleSaveInstance}
            onCancel={handleBackToList}
            users={users}
          />
        </div>
      </MainLayout>
    );
  }

  // Edit instance view
  if (viewMode === 'edit' && currentInstance) {
    return (
      <MainLayout>
        <div className="p-6">
          <ChecklistInstance
            instance={currentInstance}
            onSave={handleSaveInstance}
            onBack={handleBackToList}
            onEdit={() => {}} // Not needed in edit mode
            isEditing={true}
          />
        </div>
      </MainLayout>
    );
  }

  // View instance detail
  if (viewMode === 'detail' && currentInstance) {
    return (
      <MainLayout>
        <div className="p-6">
          <ChecklistInstance
            instance={currentInstance}
            onSave={handleSaveInstance}
            onBack={handleBackToList}
            onEdit={() => handleEditInstance(currentInstance)}
            isEditing={false}
          />
        </div>
      </MainLayout>
    );
  }

  // Main list view
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Export/Import Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="import-file"
            />
            <label
              htmlFor="import-file"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              Import
            </label>
          </div>
          <button
            onClick={handleExport}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
          >
            Export
          </button>
        </div>

        <ChecklistInstancesList
          instances={instances}
          onView={handleViewInstance}
          onEdit={handleEditInstance}
          onDelete={handleDeleteInstance}
          onCreateNew={handleCreateNew}
        />
      </div>
    </MainLayout>
  );
} 