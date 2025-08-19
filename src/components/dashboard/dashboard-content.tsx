'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Fuel, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Users,
  Calendar,
  Target,
  Zap,
  Shield,
  Thermometer,
  Gauge
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Fuel usage data
const fuelData = {
  ron95: { current: 12500, max: 20000, unit: 'L' },
  ron97: { current: 8500, max: 15000, unit: 'L' },
  diesel: { current: 18000, max: 25000, unit: 'L' }
};

// Rating data
const ratingData = {
  overall: 4.6,
  customerService: 4.8,
  cleanliness: 4.5,
  safety: 4.9,
  fuelQuality: 4.7
};

// Incident data for last 30 days
const incidentData = {
  opened: 12,
  reported: 8,
  resolved: 15,
  pending: 5
};

// Fuel consumption trend data
const fuelTrendData = [
  { date: 'Mon', ron95: 420, ron97: 280, diesel: 600 },
  { date: 'Tue', ron95: 450, ron97: 310, diesel: 580 },
  { date: 'Wed', ron95: 480, ron97: 290, diesel: 620 },
  { date: 'Thu', ron95: 410, ron97: 320, diesel: 590 },
  { date: 'Fri', ron95: 520, ron97: 350, diesel: 680 },
  { date: 'Sat', ron95: 580, ron97: 380, diesel: 720 },
  { date: 'Sun', ron95: 490, ron97: 300, diesel: 650 },
];

// Revenue data
const revenueData = [
  { month: 'Jan', revenue: 125000, fuelSales: 98000, shopSales: 27000 },
  { month: 'Feb', revenue: 118000, fuelSales: 92000, shopSales: 26000 },
  { month: 'Mar', revenue: 132000, fuelSales: 105000, shopSales: 27000 },
  { month: 'Apr', revenue: 128000, fuelSales: 101000, shopSales: 27000 },
  { month: 'May', revenue: 145000, fuelSales: 115000, shopSales: 30000 },
  { month: 'Jun', revenue: 138000, fuelSales: 110000, shopSales: 28000 },
];

// Recent incidents table data
const recentIncidents = [
  { id: 1, type: 'Fuel Spill', severity: 'Medium', status: 'Resolved', date: '2024-01-20', assignedTo: 'John Smith' },
  { id: 2, type: 'Equipment Malfunction', severity: 'Low', status: 'Pending', date: '2024-01-19', assignedTo: 'Sarah Johnson' },
  { id: 3, type: 'Safety Violation', severity: 'High', status: 'Investigating', date: '2024-01-18', assignedTo: 'Mike Wilson' },
  { id: 4, type: 'Customer Complaint', severity: 'Low', status: 'Resolved', date: '2024-01-17', assignedTo: 'Lisa Davis' },
  { id: 5, type: 'Maintenance Required', severity: 'Medium', status: 'In Progress', date: '2024-01-16', assignedTo: 'David Brown' },
];

// Safety metrics
const safetyMetrics = {
  daysWithoutAccident: 45,
  safetyAuditScore: 92,
  emergencyDrills: 3,
  safetyTrainingHours: 24
};

export default function DashboardContent() {
  const getFuelPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };



  const getFuelStatusBadge = (percentage: number) => {
    if (percentage >= 80) return 'Critical';
    if (percentage >= 60) return 'Warning';
    return 'Good';
  };

  const getFuelStatusBadgeVariant = (percentage: number) => {
    if (percentage >= 80) return 'destructive';
    if (percentage >= 60) return 'secondary';
    return 'default';
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, Station Manager
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Here&apos;s what&apos;s happening at your petrol station today.
        </p>
      </div>

      {/* Fuel Usage Overview */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fuel className="h-5 w-5" />
              Fuel Usage Overview
            </CardTitle>
            <CardDescription>
              Current fuel levels and capacity utilization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* RON 95 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">RON 95</span>
                  <Badge variant={getFuelStatusBadgeVariant(getFuelPercentage(fuelData.ron95.current, fuelData.ron95.max))}>
                    {getFuelStatusBadge(getFuelPercentage(fuelData.ron95.current, fuelData.ron95.max))}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {fuelData.ron95.current.toLocaleString()} / {fuelData.ron95.max.toLocaleString()} {fuelData.ron95.unit}
                </div>
                <Progress 
                  value={getFuelPercentage(fuelData.ron95.current, fuelData.ron95.max)} 
                  className="h-2"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getFuelPercentage(fuelData.ron95.current, fuelData.ron95.max)}% capacity used
                </p>
              </div>

              {/* RON 97 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">RON 97</span>
                  <Badge variant={getFuelStatusBadgeVariant(getFuelPercentage(fuelData.ron97.current, fuelData.ron97.max))}>
                    {getFuelStatusBadge(getFuelPercentage(fuelData.ron97.current, fuelData.ron97.max))}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {fuelData.ron97.current.toLocaleString()} / {fuelData.ron97.max.toLocaleString()} {fuelData.ron97.unit}
                </div>
                <Progress 
                  value={getFuelPercentage(fuelData.ron97.current, fuelData.ron97.max)} 
                  className="h-2"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getFuelPercentage(fuelData.ron97.current, fuelData.ron97.max)}% capacity used
                </p>
              </div>

              {/* DIESEL */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">DIESEL</span>
                  <Badge variant={getFuelStatusBadgeVariant(getFuelPercentage(fuelData.diesel.current, fuelData.diesel.max))}>
                    {getFuelStatusBadge(getFuelPercentage(fuelData.diesel.current, fuelData.diesel.max))}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {fuelData.diesel.current.toLocaleString()} / {fuelData.diesel.max.toLocaleString()} {fuelData.diesel.unit}
                </div>
                <Progress 
                  value={getFuelPercentage(fuelData.diesel.current, fuelData.diesel.max)} 
                  className="h-2"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getFuelPercentage(fuelData.diesel.current, fuelData.diesel.max)}% capacity used
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Overall Rating */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{ratingData.overall}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.2</span> from last month
            </p>
          </CardContent>
        </Card>

        {/* Incidents Opened */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incidents Opened</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{incidentData.opened}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        {/* Incidents Reported */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incidents Reported</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{incidentData.reported}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        {/* Incidents Resolved */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incidents Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{incidentData.resolved}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Petrol Station Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Safety Score */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safety Score</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{safetyMetrics.safetyAuditScore}%</div>
            <p className="text-xs text-muted-foreground">
              Audit compliance
            </p>
          </CardContent>
        </Card>

        {/* Days Without Accident */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safety Streak</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{safetyMetrics.daysWithoutAccident}</div>
            <p className="text-xs text-muted-foreground">
              Days without accident
            </p>
          </CardContent>
        </Card>

        {/* Customer Traffic */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Customers</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">342</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        {/* Fuel Efficiency */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fuel Efficiency</CardTitle>
            <Gauge className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">94.2%</div>
            <p className="text-xs text-muted-foreground">
              Pump accuracy
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Fuel Consumption Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Fuel Consumption</CardTitle>
            <CardDescription>
              Daily fuel consumption trends by type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fuelTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="ron95" stroke="#3b82f6" strokeWidth={2} name="RON 95" />
                  <Line type="monotone" dataKey="ron97" stroke="#10b981" strokeWidth={2} name="RON 97" />
                  <Line type="monotone" dataKey="diesel" stroke="#f59e0b" strokeWidth={2} name="Diesel" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>
              Revenue breakdown by fuel and shop sales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="fuelSales" fill="#10b981" name="Fuel Sales" />
                  <Bar dataKey="shopSales" fill="#8b5cf6" name="Shop Sales" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Incidents */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
              <CardDescription>
                Latest incidents and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Assigned To</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentIncidents.map((incident) => (
                      <TableRow key={incident.id}>
                        <TableCell className="font-medium">{incident.type}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={incident.severity === 'High' ? 'destructive' : 
                                   incident.severity === 'Medium' ? 'secondary' : 'outline'}
                          >
                            {incident.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={incident.status === 'Resolved' ? 'default' : 
                                   incident.status === 'In Progress' ? 'secondary' : 'outline'}
                          >
                            {incident.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">{incident.date}</TableCell>
                        <TableCell>{incident.assignedTo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Safety Metrics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common station management tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Fuel className="w-4 h-4 mr-2" />
                Check Fuel Levels
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Incident
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Maintenance
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Staff Management
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safety Metrics</CardTitle>
              <CardDescription>
                Current safety performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Safety Audit Score</span>
                  <Badge variant="default">{safetyMetrics.safetyAuditScore}%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Days Without Accident</span>
                  <Badge variant="default">{safetyMetrics.daysWithoutAccident}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Emergency Drills</span>
                  <Badge variant="secondary">{safetyMetrics.emergencyDrills}/month</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Training Hours</span>
                  <Badge variant="secondary">{safetyMetrics.safetyTrainingHours}h</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Petrol Station Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Environmental Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Environmental Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Air Quality</span>
                <Badge variant="default">Excellent</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Water Quality</span>
                <Badge variant="default">Good</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Waste Management</span>
                <Badge variant="default">Compliant</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Equipment Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Fuel Pumps</span>
                <Badge variant="default">8/8 Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Payment Systems</span>
                <Badge variant="default">All Working</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Security Cameras</span>
                <Badge variant="default">12/12 Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Satisfaction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Customer Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Overall Rating</span>
                <Badge variant="default">{ratingData.overall}/5.0</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Customer Service</span>
                <Badge variant="default">{ratingData.customerService}/5.0</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Cleanliness</span>
                <Badge variant="default">{ratingData.cleanliness}/5.0</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 