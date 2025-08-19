'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Eye, 
  Download, 
  Calendar,
  User,
  CheckCircle,
  FileText,
  Grid3X3,
  List
} from 'lucide-react';
import { ChecklistInstance } from './checklist-instance';

interface ChecklistReportListProps {
  reports: ChecklistInstance[];
  onView: (report: ChecklistInstance) => void;
  onExport: (report: ChecklistInstance) => void;
}

export default function ChecklistReportList({
  reports,
  onView,
  onExport,
}: ChecklistReportListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter reports to only show completed/submitted ones
  const completedReports = reports.filter(report => 
    report.status === 'completed' || report.status === 'submitted'
  );

  const filteredReports = completedReports.filter(report =>
    (report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     report.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     report.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || report.status === statusFilter)
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCompletionStats = (report: ChecklistInstance) => {
    const totalItems = report.items.length;
    const completedItems = report.items.filter(item => item.response !== null).length;
    const mandatoryItems = report.items.filter(item => item.isMandatory);
    const completedMandatoryItems = mandatoryItems.filter(item => item.response !== null).length;
    
    return {
      total: totalItems,
      completed: completedItems,
      mandatory: mandatoryItems.length,
      completedMandatory: completedMandatoryItems,
      percentage: Math.round((completedItems / totalItems) * 100),
      isFullyComplete: completedItems === totalItems,
      mandatoryComplete: completedMandatoryItems === mandatoryItems.length,
    };
  };



  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (percentage: number) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 70) return 'Good';
    if (percentage >= 50) return 'Fair';
    return 'Poor';
  };

  const getScoreBadgeVariant = (percentage: number) => {
    if (percentage >= 90) return 'default';
    if (percentage >= 70) return 'secondary';
    if (percentage >= 50) return 'outline';
    return 'destructive';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Checklist Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View completed checklist reports and performance summaries
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            {completedReports.length} Reports
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="submitted">Submitted</option>
        </select>
        
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

      {/* Reports Display */}
      {filteredReports.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm || statusFilter !== 'all' ? 'No reports found' : 'No completed reports yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search terms or filters'
                : 'Complete and submit checklists to generate reports'
              }
            </p>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        // Grid View
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map((report) => {
            const stats = getCompletionStats(report);
            
            return (
              <Card key={report.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {report.title}
                      </CardTitle>
                      {report.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {report.description}
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Completion Score */}
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(stats.percentage)}`}>
                      {stats.completed}/{stats.total}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Questions Answered
                    </div>
                    <Badge variant={getScoreBadgeVariant(stats.percentage)} className="mt-2">
                      {getScoreBadge(stats.percentage)} ({stats.percentage}%)
                    </Badge>
                  </div>

                  {/* Template Info */}
                  <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    <div>Template: {report.template.title}</div>
                    <div className="mt-1">
                      {stats.mandatory > 0 && (
                        <span className="inline-block mr-2">
                          Mandatory: {stats.completedMandatory}/{stats.mandatory}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Assignment */}
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <User className="h-4 w-4" />
                    <span>{report.assignedTo}</span>
                  </div>

                  {/* Completion Date */}
                  <div className="flex items-center space-x-2 text-xs">
                    <Calendar className="h-3 w-3" />
                    <span className="text-gray-500 dark:text-gray-400">
                      Completed {formatDate(report.submittedAt || report.updatedAt)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(report)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Report
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onExport(report)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Download className="h-4 w-4" />
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
          {filteredReports.map((report) => {
            const stats = getCompletionStats(report);
            
            return (
              <Card key={report.id} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                            {report.title}
                          </h3>
                          {report.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                              {report.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      {/* Completion Score */}
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(stats.percentage)}`}>
                          {stats.completed}/{stats.total}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
                        <Badge variant={getScoreBadgeVariant(stats.percentage)} className="mt-1 text-xs">
                          {stats.percentage}%
                        </Badge>
                      </div>
                      
                      {/* Template */}
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {report.template.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Template</div>
                      </div>
                      
                      {/* Assignment */}
                      <div className="text-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Assigned To
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {report.assignedTo}
                        </div>
                      </div>
                      
                      {/* Completion Date */}
                      <div className="text-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Completed
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatDate(report.submittedAt || report.updatedAt)}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onView(report)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onExport(report)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Download className="h-4 w-4" />
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