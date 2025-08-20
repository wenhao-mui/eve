'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  MapPin,
  Phone,
  Fuel,
  Clock,
  Grid3X3,
  List,
  Filter,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';
import { PetrolStation } from '@/lib/petrol-station-data';

interface PetrolStationListProps {
  stations: PetrolStation[];
  onView: (station: PetrolStation) => void;
  onEdit: (station: PetrolStation) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onRefresh: () => void;
}

export default function PetrolStationList({
  stations,
  onView,
  onEdit,
  onDelete,
  onCreateNew,
  onExport,
  onImport,
  onRefresh,
}: PetrolStationListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredStations = stations.filter(station => {
    const matchesSearch = 
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.manager.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || station.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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

  const getFuelTypeCount = (station: PetrolStation) => {
    return station.fuelTypes.filter(fuel => fuel.isAvailable).length;
  };

  const getServiceCount = (station: PetrolStation) => {
    return station.services.filter(service => service.isAvailable).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Petrol Stations
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your petrol station network and operations
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <input
            type="file"
            accept=".json"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImport(file);
            }}
            className="hidden"
            id="import-file"
          />
          <label
            htmlFor="import-file"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 cursor-pointer"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </label>
          <Button onClick={onCreateNew} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Station
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search stations by name, address, city, or manager..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Maintenance</option>
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

      {/* Stations Display */}
      {filteredStations.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Fuel className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm || statusFilter !== 'all' ? 'No stations found' : 'No petrol stations yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search terms or filters'
                : 'Add your first petrol station to get started'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button onClick={onCreateNew} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Station
              </Button>
            )}
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        // Grid View
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStations.map((station) => (
            <Card key={station.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {station.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{station.city}, {station.state}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(station.status)}>
                    {station.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="h-3 w-3" />
                    <span>{station.phone}</span>
                  </div>
                  {station.email && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {station.email}
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Fuel className="h-4 w-4" />
                    <span>{getFuelTypeCount(station)} fuel types</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{getServiceCount(station)} services</span>
                  </div>
                </div>

                {/* Manager */}
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Manager: {station.manager}
                </div>

                {/* Date */}
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3" />
                  <span>Updated {formatDate(station.updatedAt)}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(station)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(station)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(station.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // List View
        <div className="space-y-3">
          {filteredStations.map((station) => (
            <Card key={station.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <Fuel className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                          {station.name}
                        </h3>
                        <Badge className={getStatusColor(station.status)}>
                          {station.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{station.city}, {station.state}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{station.phone}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    {/* Stats */}
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {getFuelTypeCount(station)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Fuel Types</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {getServiceCount(station)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Services</div>
                    </div>
                    
                    {/* Manager */}
                    <div className="text-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Manager</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {station.manager}
                      </div>
                    </div>
                    
                    {/* Date */}
                    <div className="text-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Updated
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatDate(station.updatedAt)}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onView(station)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(station)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(station.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 