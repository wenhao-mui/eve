'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { ChecklistList } from '@/components/checklist';
import ChecklistForm, { ChecklistTemplate } from '@/components/checklist/checklist-form';
import ChecklistDetail from '@/components/checklist/checklist-detail';
import { ChecklistItemData } from '@/components/checklist/checklist-item';
import { loadChecklistTemplates, saveChecklistTemplates, exportChecklistData, importChecklistData } from '@/lib/checklist-data';

type ViewMode = 'list' | 'create' | 'edit' | 'detail';

export default function ChecklistsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [templates, setTemplates] = useState<ChecklistTemplate[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<ChecklistTemplate | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<ChecklistTemplate | null>(null);

  // Load checklist templates on component mount
  useEffect(() => {
    const loadedTemplates = loadChecklistTemplates();
    setTemplates(loadedTemplates);
  }, []);

  const handleCreateNew = () => {
    setViewMode('create');
    setEditingTemplate(null);
  };

  const handleEdit = (template: ChecklistTemplate) => {
    setEditingTemplate(template);
    setViewMode('edit');
  };

  const handleView = (template: ChecklistTemplate) => {
    setCurrentTemplate(template);
    setViewMode('detail');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      const updatedTemplates = templates.filter(template => template.id !== id);
      setTemplates(updatedTemplates);
      saveChecklistTemplates(updatedTemplates);
    }
  };

  const handleExport = () => {
    exportChecklistData(templates);
  };

  const handleImport = async (file: File) => {
    try {
      const importedTemplates = await importChecklistData(file);
      setTemplates(importedTemplates);
      saveChecklistTemplates(importedTemplates);
      alert('Checklist templates imported successfully!');
    } catch (error) {
      alert(`Error importing templates: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleSaveTemplate = (template: ChecklistTemplate) => {
    if (editingTemplate) {
      // Update existing template
      setTemplates(prev => prev.map(t => t.id === template.id ? template : t));
    } else {
      // Add new template
      setTemplates(prev => [...prev, template]);
    }
    // Save to localStorage
    const updatedTemplates = editingTemplate 
      ? templates.map(t => t.id === template.id ? template : t)
      : [...templates, template];
    saveChecklistTemplates(updatedTemplates);
    
    setViewMode('list');
    setEditingTemplate(null);
  };

  const handleSaveChecklist = (checklistData: ChecklistItemData[]) => {
    console.log('Saving checklist data:', checklistData);
    // Here you would typically save to a database or API
    alert('Checklist completed and saved successfully!');
    setViewMode('list');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setCurrentTemplate(null);
    setEditingTemplate(null);
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'create':
        return (
          <ChecklistForm
            onSave={handleSaveTemplate}
            onCancel={handleBackToList}
          />
        );
      
      case 'edit':
        return (
          <ChecklistForm
            template={editingTemplate!}
            onSave={handleSaveTemplate}
            onCancel={handleBackToList}
          />
        );
      
      case 'detail':
        return (
          <ChecklistDetail
            template={currentTemplate!}
            onBack={handleBackToList}
            onSave={handleSaveChecklist}
          />
        );
      
      default:
        return (
          <ChecklistList
            templates={templates}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreateNew={handleCreateNew}
            onExport={handleExport}
            onImport={handleImport}
          />
        );
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        {renderContent()}
      </div>
    </MainLayout>
  );
} 