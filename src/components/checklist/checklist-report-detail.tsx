'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  Download,
  Share,
  CheckCircle,
  XCircle,
  Minus,
  FileText,
  Calendar,
  User,
  Star,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { ChecklistInstance } from './checklist-instance';

interface ChecklistReportDetailProps {
  report: ChecklistInstance;
  onBack: () => void;
  onExport: (report: ChecklistInstance) => void;
}

export default function ChecklistReportDetail({
  report,
  onBack,
  onExport,
}: ChecklistReportDetailProps) {
  const getCompletionStats = () => {
    const totalItems = report.items.length;
    const completedItems = report.items.filter(item => item.response !== null).length;
    const mandatoryItems = report.items.filter(item => item.isMandatory);
    const completedMandatoryItems = mandatoryItems.filter(item => item.response !== null).length;
    const yesResponses = report.items.filter(item => item.response === 'yes').length;
    const noResponses = report.items.filter(item => item.response === 'no').length;
    const naResponses = report.items.filter(item => item.response === 'n/a').length;
    
    return {
      total: totalItems,
      completed: completedItems,
      mandatory: mandatoryItems.length,
      completedMandatory: completedMandatoryItems,
      percentage: Math.round((completedItems / totalItems) * 100),
      yesResponses,
      noResponses,
      naResponses,
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

  const getResponseIcon = (response: string | null) => {
    switch (response) {
      case 'yes':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'no':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'n/a':
        return <Minus className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getResponseBadge = (response: string | null) => {
    switch (response) {
      case 'yes':
        return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Yes</Badge>;
      case 'no':
        return <Badge variant="destructive">No</Badge>;
      case 'n/a':
        return <Badge variant="outline">N/A</Badge>;
      default:
        return <Badge variant="secondary">Not Answered</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const stats = getCompletionStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack} size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reports
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {report.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Completed checklist report based on template: {report.template.title}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onExport(report)}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Report Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completion Score */}
        <Card>
          <CardContent className="p-6 text-center">
            <div className={`text-4xl font-bold ${getScoreColor(stats.percentage)} mb-2`}>
              {stats.completed}/{stats.total}
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Questions Answered
            </div>
            <Progress value={stats.percentage} className="h-3 mb-4" />
            <Badge variant={getScoreBadgeVariant(stats.percentage)} className="text-lg px-4 py-2">
              {getScoreBadge(stats.percentage)} ({stats.percentage}%)
            </Badge>
          </CardContent>
        </Card>

        {/* Response Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Response Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Yes</span>
              </div>
              <div className="text-lg font-bold text-green-600">{stats.yesResponses}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm">No</span>
              </div>
              <div className="text-lg font-bold text-red-600">{stats.noResponses}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Minus className="h-4 w-4 text-gray-500" />
                <span className="text-sm">N/A</span>
              </div>
              <div className="text-lg font-bold text-gray-600">{stats.naResponses}</div>
            </div>
          </CardContent>
        </Card>

        {/* Report Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Report Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">Assigned to:</span>
              <span className="font-medium">{report.assignedTo}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">Completed:</span>
              <span className="font-medium">
                {formatDate(report.submittedAt || report.updatedAt)}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">Template:</span>
              <span className="font-medium">{report.template.title}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Star className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">Status:</span>
              <Badge variant="default">{report.status}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mandatory Items Summary */}
      {stats.mandatory > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Mandatory Items Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg">
                <span className="font-medium">{stats.completedMandatory}</span> of{' '}
                <span className="font-medium">{stats.mandatory}</span> mandatory items completed
              </div>
              <Badge variant={stats.mandatoryComplete ? "default" : "destructive"}>
                {stats.mandatoryComplete ? 'All Mandatory Complete' : 'Mandatory Items Pending'}
              </Badge>
            </div>
            <Progress 
              value={(stats.completedMandatory / stats.mandatory) * 100} 
              className="h-3"
            />
          </CardContent>
        </Card>
      )}

      {/* Detailed Responses */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Responses</CardTitle>
          <CardDescription>
            Complete breakdown of all checklist items and responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {report.items.map((item, index) => (
              <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.question}
                      </h4>
                      {item.isMandatory && (
                        <Badge variant="destructive" className="text-xs">Mandatory</Badge>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {getResponseIcon(item.response)}
                    {getResponseBadge(item.response)}
                  </div>
                </div>

                {/* Response Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Notes */}
                  {item.notes && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Notes:
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded">
                        {item.notes}
                      </p>
                    </div>
                  )}

                  {/* Attachments */}
                  {item.attachments && item.attachments.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Attachments ({item.attachments.length}):
                      </h5>
                      <div className="space-y-2">
                        {item.attachments.map((file, fileIndex) => (
                          <div key={fileIndex} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <FileText className="h-4 w-4" />
                            <span>{file.name}</span>
                            <span className="text-xs">({(file.size / 1024).toFixed(1)} KB)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* General Notes */}
      {report.notes && (
        <Card>
          <CardHeader>
            <CardTitle>General Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-4 rounded">
              {report.notes}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Report Summary */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-900 dark:text-blue-100">
            Report Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-blue-800 dark:text-blue-200 mb-2">
                <strong>Overall Completion:</strong> {stats.completed}/{stats.total} ({stats.percentage}%)
              </p>
              <p className="text-blue-800 dark:text-blue-200 mb-2">
                <strong>Score Rating:</strong> {getScoreBadge(stats.percentage)}
              </p>
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Mandatory Items:</strong> {stats.completedMandatory}/{stats.mandatory} completed
              </p>
            </div>
            <div>
              <p className="text-blue-800 dark:text-blue-200 mb-2">
                <strong>Positive Responses:</strong> {stats.yesResponses} ({Math.round((stats.yesResponses / stats.total) * 100)}%)
              </p>
              <p className="text-blue-800 dark:text-blue-200 mb-2">
                <strong>Areas of Concern:</strong> {stats.noResponses} items need attention
              </p>
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Report Status:</strong> {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 