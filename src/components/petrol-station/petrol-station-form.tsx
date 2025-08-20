'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Fuel, 
  Clock, 
  MapPin,
  Phone,
  Mail,
  User,
  Save,
  X
} from 'lucide-react';
import { PetrolStation, FuelType, Service, OperatingHours, DaySchedule } from '@/lib/petrol-station-data';

interface PetrolStationFormProps {
  station?: PetrolStation;
  onSave: (station: Omit<PetrolStation, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const defaultFuelType: Omit<FuelType, 'id' | 'lastUpdated'> = {
  name: 'RON 95',
  currentPrice: 2.05,
  unit: 'per_liter',
  isAvailable: true,
};

const defaultService: Omit<Service, 'id'> = {
  name: 'Mesra Store',
  description: 'Convenience store with local products and essentials',
  isAvailable: true,
  price: undefined,
};

const defaultDaySchedule: DaySchedule = {
  isOpen: true,
  openTime: '06:00',
  closeTime: '22:00',
};

const defaultOperatingHours: OperatingHours = {
  monday: { ...defaultDaySchedule },
  tuesday: { ...defaultDaySchedule },
  wednesday: { ...defaultDaySchedule },
  thursday: { ...defaultDaySchedule },
  friday: { ...defaultDaySchedule },
  saturday: { ...defaultDaySchedule },
  sunday: { ...defaultDaySchedule },
};

export default function PetrolStationForm({
  station,
  onSave,
  onCancel,
}: PetrolStationFormProps) {
  const [formData, setFormData] = useState({
    name: station?.name || '',
    address: station?.address || '',
    city: station?.city || '',
    state: station?.state || '',
    zipCode: station?.zipCode || '',
    phone: station?.phone || '',
    email: station?.email || '',
    manager: station?.manager || '',
    status: station?.status || 'active' as const,
    fuelTypes: station?.fuelTypes || [defaultFuelType],
    services: station?.services || [defaultService],
    operatingHours: station?.operatingHours || defaultOperatingHours,
    coordinates: station?.coordinates || undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.manager.trim()) newErrors.manager = 'Manager is required';

    // Validate fuel types
    formData.fuelTypes.forEach((fuel, index) => {
      if (!fuel.name.trim()) {
        newErrors[`fuelTypes.${index}.name`] = 'Fuel type name is required';
      }
      if (fuel.currentPrice <= 0) {
        newErrors[`fuelTypes.${index}.price`] = 'Price must be greater than 0';
      }
    });

    // Validate services
    formData.services.forEach((service, index) => {
      if (!service.name.trim()) {
        newErrors[`services.${index}.name`] = 'Service name is required';
      }
      if (!service.description.trim()) {
        newErrors[`services.${index}.description`] = 'Service description is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Transform the form data to match the expected interface
      const transformedData = {
        ...formData,
        fuelTypes: formData.fuelTypes.map(fuel => ({
          ...fuel,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          lastUpdated: new Date().toISOString(),
        })),
        services: formData.services.map(service => ({
          ...service,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        })),
      };
      onSave(transformedData);
    }
  };

  const updateFuelType = (index: number, field: keyof FuelType, value: any) => {
    const updatedFuelTypes = [...formData.fuelTypes];
    updatedFuelTypes[index] = { ...updatedFuelTypes[index], [field]: value };
    setFormData({ ...formData, fuelTypes: updatedFuelTypes });
  };

  const addFuelType = () => {
    setFormData({
      ...formData,
      fuelTypes: [...formData.fuelTypes, { ...defaultFuelType }],
    });
  };

  const addCommonFuelTypes = () => {
    const commonFuelTypes = [
      { ...defaultFuelType, name: 'RON 95', currentPrice: 2.05 },
      { ...defaultFuelType, name: 'RON 97', currentPrice: 3.47 },
      { ...defaultFuelType, name: 'Diesel', currentPrice: 2.15 },
    ];
    setFormData({
      ...formData,
      fuelTypes: [...formData.fuelTypes, ...commonFuelTypes],
    });
  };

  const removeFuelType = (index: number) => {
    if (formData.fuelTypes.length > 1) {
      const updatedFuelTypes = formData.fuelTypes.filter((_, i) => i !== index);
      setFormData({ ...formData, fuelTypes: updatedFuelTypes });
    }
  };

  const updateService = (index: number, field: keyof Service, value: any) => {
    const updatedServices = [...formData.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setFormData({ ...formData, services: updatedServices });
  };

  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { ...defaultService }],
    });
  };

  const removeService = (index: number) => {
    if (formData.services.length > 1) {
      const updatedServices = formData.services.filter((_, i) => i !== index);
      setFormData({ ...formData, services: updatedServices });
    }
  };

  const updateOperatingHours = (day: keyof OperatingHours, field: keyof DaySchedule, value: any) => {
    setFormData({
      ...formData,
      operatingHours: {
        ...formData.operatingHours,
        [day]: {
          ...formData.operatingHours[day],
          [field]: value,
        },
      },
    });
  };

  const getDayName = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {station ? 'Edit Petrol Station' : 'Add New Petrol Station'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {station ? 'Update station information' : 'Create a new petrol station'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
                <Label htmlFor="name">Station Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={errors.city ? 'border-red-500' : ''}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className={errors.state ? 'border-red-500' : ''}
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className={errors.zipCode ? 'border-red-500' : ''}
                />
                {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-green-600" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="manager">Manager *</Label>
                <Input
                  id="manager"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  className={errors.manager ? 'border-red-500' : ''}
                />
                {errors.manager && <p className="text-red-500 text-sm mt-1">{errors.manager}</p>}
              </div>
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
          <CardContent className="space-y-4">
            {formData.fuelTypes.map((fuel, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Fuel Type {index + 1}</h4>
                  {formData.fuelTypes.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeFuelType(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Name *</Label>
                    <Input
                      value={fuel.name}
                      onChange={(e) => updateFuelType(index, 'name', e.target.value)}
                      className={errors[`fuelTypes.${index}.name`] ? 'border-red-500' : ''}
                    />
                    {errors[`fuelTypes.${index}.name`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`fuelTypes.${index}.name`]}</p>
                    )}
                  </div>
                  <div>
                    <Label>Price *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={fuel.currentPrice}
                      onChange={(e) => updateFuelType(index, 'currentPrice', parseFloat(e.target.value) || 0)}
                      className={errors[`fuelTypes.${index}.price`] ? 'border-red-500' : ''}
                    />
                    {errors[`fuelTypes.${index}.price`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`fuelTypes.${index}.price`]}</p>
                    )}
                  </div>
                  <div>
                    <Label>Unit</Label>
                                         <select
                       value={fuel.unit}
                       onChange={(e) => updateFuelType(index, 'unit', e.target.value)}
                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                     >
                       <option value="per_liter">Per Liter</option>
                       <option value="per_gallon">Per Gallon</option>
                     </select>
                  </div>
                </div>
                <div className="mt-4">
                  <Label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={fuel.isAvailable}
                      onChange={(e) => updateFuelType(index, 'isAvailable', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Available</span>
                  </Label>
                </div>
              </div>
            ))}
            <div className="flex space-x-2">
              <Button type="button" variant="outline" onClick={addFuelType}>
                <Plus className="h-4 w-4 mr-2" />
                Add Fuel Type
              </Button>
              <Button type="button" variant="outline" onClick={addCommonFuelTypes}>
                <Plus className="h-4 w-4 mr-2" />
                Add Common Malaysian Fuels
              </Button>
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
          <CardContent className="space-y-4">
            {formData.services.map((service, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Service {index + 1}</h4>
                  {formData.services.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeService(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name *</Label>
                    <Input
                      value={service.name}
                      onChange={(e) => updateService(index, 'name', e.target.value)}
                      className={errors[`services.${index}.name`] ? 'border-red-500' : ''}
                    />
                    {errors[`services.${index}.name`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`services.${index}.name`]}</p>
                    )}
                  </div>
                  <div>
                    <Label>Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={service.price || ''}
                      onChange={(e) => updateService(index, 'price', e.target.value ? parseFloat(e.target.value) : undefined)}
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label>Description *</Label>
                  <Textarea
                    value={service.description}
                    onChange={(e) => updateService(index, 'description', e.target.value)}
                    className={errors[`services.${index}.description`] ? 'border-red-500' : ''}
                  />
                  {errors[`services.${index}.description`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`services.${index}.description`]}</p>
                  )}
                </div>
                <div className="mt-4">
                  <Label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={service.isAvailable}
                      onChange={(e) => updateService(index, 'isAvailable', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Available</span>
                  </Label>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addService}>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </CardContent>
        </Card>

        {/* Operating Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span>Operating Hours</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.operatingHours).map(([day, schedule]) => (
                <div key={day} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{getDayName(day)}</h4>
                    <Label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={schedule.isOpen}
                        onChange={(e) => updateOperatingHours(day as keyof OperatingHours, 'isOpen', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>Open</span>
                    </Label>
                  </div>
                  {schedule.isOpen && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Open Time</Label>
                        <Input
                          type="time"
                          value={schedule.openTime}
                          onChange={(e) => updateOperatingHours(day as keyof OperatingHours, 'openTime', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Close Time</Label>
                        <Input
                          type="time"
                          value={schedule.closeTime}
                          onChange={(e) => updateOperatingHours(day as keyof OperatingHours, 'closeTime', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            {station ? 'Update Station' : 'Create Station'}
          </Button>
        </div>
      </form>
    </div>
  );
} 