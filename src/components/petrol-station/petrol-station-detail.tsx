'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Fuel, 
  Clock, 
  Calendar,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  Activity,
  Zap,
  CreditCard,
  Truck,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock as ClockIcon,
  Droplets,
  Thermometer,
  Gauge
} from 'lucide-react';
import { PetrolStation, FuelType, Service } from '@/lib/petrol-station-data';

interface PetrolStationDetailProps {
  station: PetrolStation;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PetrolStationDetail({
  station,
  onBack,
  onEdit,
  onDelete,
}: PetrolStationDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: MapPin },
    { id: 'operational', label: 'Operational System & Devices', icon: Settings },
  ];
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'inactive':
        return <XCircle className="h-4 w-4" />;
      case 'maintenance':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getDayName = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  const formatTime = (time: string) => {
    return time;
  };

  const getFuelAvailability = (fuel: FuelType) => {
    return fuel.isAvailable ? (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
        Available
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
        Unavailable
      </Badge>
    );
  };

  const getServiceAvailability = (service: Service) => {
    return service.isAvailable ? (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
        Available
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
        Unavailable
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {station.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Station Details & Information
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button onClick={onEdit} variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button onClick={onDelete} variant="outline" className="text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                  <p className="text-gray-900 dark:text-white">{station.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(station.status)}
                    <Badge className={getStatusColor(station.status)}>
                      {station.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</label>
                  <p className="text-gray-900 dark:text-white">{station.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">City, State, ZIP</label>
                  <p className="text-gray-900 dark:text-white">{station.city}, {station.state} {station.zipCode}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                  <p className="text-gray-900 dark:text-white flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    {station.phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                  <p className="text-gray-900 dark:text-white flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    {station.email || 'Not provided'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Manager</label>
                  <p className="text-gray-900 dark:text-white flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    {station.manager}
                  </p>
                </div>
                {station.coordinates && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Coordinates</label>
                    <p className="text-gray-900 dark:text-white">
                      {station.coordinates.latitude.toFixed(4)}, {station.coordinates.longitude.toFixed(4)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Fuel Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Fuel className="h-5 w-5 text-green-600" />
                <span>Fuel Types & Prices</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {station.fuelTypes.map((fuel) => (
                  <div key={fuel.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">{fuel.name}</h4>
                        {getFuelAvailability(fuel)}
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>Price: ${fuel.currentPrice.toFixed(2)} per {fuel.unit === 'per_gallon' ? 'gallon' : 'liter'}</span>
                        <span>Last Updated: {formatDate(fuel.lastUpdated)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <span>Services</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {station.services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">{service.name}</h4>
                        {getServiceAvailability(service)}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{service.description}</p>
                      {service.price && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Price: ${service.price.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Operating Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <span>Operating Hours</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(station.operatingHours).map(([day, schedule]) => (
                  <div key={day} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{getDayName(day)}</h4>
                      <Badge className={schedule.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {schedule.isOpen ? 'Open' : 'Closed'}
                      </Badge>
                    </div>
                    {schedule.isOpen && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatTime(schedule.openTime)} - {formatTime(schedule.closeTime)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Information */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{station.fuelTypes.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Fuel Types</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{station.services.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Services</div>
              </div>
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {station.fuelTypes.filter(f => f.isAvailable).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Available Fuels</div>
              </div>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle>Timestamps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</label>
                <p className="text-gray-900 dark:text-white">{formatDate(station.createdAt)}</p>
              </div>
              <Separator />
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</label>
                <p className="text-gray-900 dark:text-white">{formatDate(station.updatedAt)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={onEdit} className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit Station
              </Button>
              <Button onClick={onDelete} variant="outline" className="w-full text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Station
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      )}

      {activeTab === 'operational' && (
        <div className="space-y-6">
          {/* Dispenser Pumps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <span>Dispenser Pumps</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Pump 1 - RON 95 */}
                <div className="relative p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-700">
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Pump 1</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">RON 95</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2,450</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Liters Today</div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Status</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Last Transaction</span>
                        <span className="font-medium text-gray-900 dark:text-white">14:30</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pump 2 - RON 97 */}
                <div className="relative p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-700">
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Pump 2</h4>
                      <p className="text-sm text-purple-600 dark:text-purple-400">RON 97</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">1,890</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Liters Today</div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Status</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Last Transaction</span>
                        <span className="font-medium text-gray-900 dark:text-white">14:25</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pump 3 - Diesel */}
                <div className="relative p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border border-orange-200 dark:border-orange-700">
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Pump 3</h4>
                      <p className="text-sm text-orange-600 dark:text-orange-400">Diesel</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">0</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Liters Today</div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Status</span>
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Maintenance</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Last Transaction</span>
                        <span className="font-medium text-gray-900 dark:text-white">N/A</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Automatic Tank Gauging */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gauge className="h-5 w-5 text-green-600" />
                <span>Automatic Tank Gauging (ATG)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* RON 95 Tank */}
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">RON 95 Tank</h4>
                      <p className="text-sm text-green-600 dark:text-green-400">Stock Level</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">65%</div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-2">
                        <div className="bg-green-500 h-3 rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Temperature:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">22°C</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Water Level:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">0.1%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RON 97 Tank */}
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">RON 97 Tank</h4>
                      <p className="text-sm text-purple-600 dark:text-purple-400">Stock Level</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">45%</div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-2">
                        <div className="bg-purple-500 h-3 rounded-full transition-all duration-500" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Temperature:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">23°C</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Water Level:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">0.05%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diesel Tank */}
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border border-orange-200 dark:border-orange-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Diesel Tank</h4>
                      <p className="text-sm text-orange-600 dark:text-orange-400">Stock Level</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">78%</div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-2">
                        <div className="bg-orange-500 h-3 rounded-full transition-all duration-500" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Temperature:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">21°C</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Water Level:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">0.2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EV Chargers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span>EV Chargers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fast Charger 1 */}
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Fast Charger 1</h4>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">Available</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">99.2%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">45 kWh</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Energy Today</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Standard Charger 2 */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Standard Charger 2</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Charging</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">98.7%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">32 kWh</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Energy Today</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center animate-pulse">
                        <ClockIcon className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Point of Sale */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-purple-600" />
                <span>Point of Sale (POS)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Today's Sales */}
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Today's Sales</h4>
                      <p className="text-sm text-purple-600 dark:text-purple-400">Total: RM 15,496</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Fuel Sales</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">80.3%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: '80.3%' }}></div>
                      </div>
                      <div className="text-right mt-1">
                        <span className="text-lg font-bold text-purple-600 dark:text-purple-400">RM 12,450</span>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">C-Store Sales</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">18.6%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: '18.6%' }}></div>
                      </div>
                      <div className="text-right mt-1">
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">RM 2,890</span>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">EV Charging</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">1.1%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full transition-all duration-500" style={{ width: '1.1%' }}></div>
                      </div>
                      <div className="text-right mt-1">
                        <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">RM 156</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl border border-indigo-200 dark:border-indigo-700">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Payment Methods</h4>
                      <p className="text-sm text-indigo-600 dark:text-indigo-400">Transaction Breakdown</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Credit Card</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div className="bg-indigo-500 h-3 rounded-full transition-all duration-500" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Cash</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">30%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full transition-all duration-500" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">E-Wallet</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">25%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div className="bg-yellow-500 h-3 rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fuel Delivery System */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-orange-600" />
                <span>Fuel Delivery System</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Next Delivery */}
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border border-orange-200 dark:border-orange-700">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Next Delivery</h4>
                      <p className="text-sm text-orange-600 dark:text-orange-400">Tomorrow, 08:00</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">RON 95</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">15,000 L</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">RON 97</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">8,000 L</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl border border-red-200 dark:border-red-700">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Stock Alerts</h4>
                      <p className="text-sm text-red-600 dark:text-red-400">Monitor & Manage</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">RON 95</span>
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Reorder Soon</Badge>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">RON 97</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Stock OK</Badge>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Diesel</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Stock OK</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 