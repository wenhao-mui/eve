'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import ChecklistReportList from '@/components/checklist/checklist-report-list';
import ChecklistReportDetail from '@/components/checklist/checklist-report-detail';
import { ChecklistInstance } from '@/components/checklist/checklist-instance';
import { loadChecklistInstances } from '@/lib/checklist-instances-data';

type ViewMode = 'list' | 'detail';

export default function ChecklistReportsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [reports, setReports] = useState<ChecklistInstance[]>([]);
  const [currentReport, setCurrentReport] = useState<ChecklistInstance | null>(null);

  useEffect(() => {
    // Load checklist instances data
    const loadedInstances = loadChecklistInstances();
    setReports(loadedInstances);
  }, []);

  const handleViewReport = (report: ChecklistInstance) => {
    setCurrentReport(report);
    setViewMode('detail');
  };

  const handleExportReport = (report: ChecklistInstance) => {
    // Generate and download report as JSON
    const reportData = {
      title: report.title,
      description: report.description,
      template: report.template.title,
      assignedTo: report.assignedTo,
      completedAt: report.submittedAt || report.updatedAt,
      status: report.status,
      items: report.items.map(item => ({
        question: item.question,
        description: item.description,
        isMandatory: item.isMandatory,
        response: item.response,
        notes: item.notes,
        attachments: item.attachments.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        }))
      })),
      generalNotes: report.notes,
      summary: {
        totalItems: report.items.length,
        completedItems: report.items.filter(item => item.response !== null).length,
        mandatoryItems: report.items.filter(item => item.isMandatory).length,
        completedMandatory: report.items.filter(item => item.isMandatory && item.response !== null).length,
        yesResponses: report.items.filter(item => item.response === 'yes').length,
        noResponses: report.items.filter(item => item.response === 'no').length,
        naResponses: report.items.filter(item => item.response === 'n/a').length
      }
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `checklist-report-${report.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleBackToList = () => {
    setCurrentReport(null);
    setViewMode('list');
  };

  // Detail view
  if (viewMode === 'detail' && currentReport) {
    return (
      <MainLayout>
        <div className="p-6">
          <ChecklistReportDetail
            report={currentReport}
            onBack={handleBackToList}
            onExport={handleExportReport}
          />
        </div>
      </MainLayout>
    );
  }

  // Main list view
  return (
    <MainLayout>
      <div className="p-6">
        <ChecklistReportList
          reports={reports}
          onView={handleViewReport}
          onExport={handleExportReport}
        />
      </div>
    </MainLayout>
  );
} 