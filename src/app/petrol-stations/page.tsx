'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { PetrolStationList, PetrolStationDetail, PetrolStationForm } from '@/components/petrol-station';
import { 
  loadPetrolStations, 
  savePetrolStations, 
  exportPetrolStationData, 
  importPetrolStationData,
  addPetrolStation,
  updatePetrolStation,
  deletePetrolStation,
  clearAndResetToMalaysianData
} from '@/lib/petrol-station-data';
import { PetrolStation } from '@/lib/petrol-station-data';

type ViewMode = 'list' | 'create' | 'edit' | 'detail';

export default function PetrolStationsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [stations, setStations] = useState<PetrolStation[]>([]);
  const [currentStation, setCurrentStation] = useState<PetrolStation | null>(null);
  const [editingStation, setEditingStation] = useState<PetrolStation | null>(null);

  // Load petrol stations on component mount
  useEffect(() => {
    const loadedStations = loadPetrolStations();
    setStations(loadedStations);
  }, []);

  const handleCreateNew = () => {
    setViewMode('create');
    setEditingStation(null);
  };

  const handleEdit = (station: PetrolStation) => {
    setEditingStation(station);
    setViewMode('edit');
  };

  const handleView = (station: PetrolStation) => {
    setCurrentStation(station);
    setViewMode('detail');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this petrol station?')) {
      const success = deletePetrolStation(id);
      if (success) {
        const updatedStations = stations.filter(station => station.id !== id);
        setStations(updatedStations);
        if (currentStation?.id === id) {
          setCurrentStation(null);
          setViewMode('list');
        }
      }
    }
  };

  const handleExport = () => {
    exportPetrolStationData();
  };

  const handleImport = async (file: File) => {
    try {
      const importedStations = await importPetrolStationData(file);
      setStations(importedStations);
      alert('Petrol stations imported successfully!');
    } catch (error) {
      alert(`Error importing stations: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleRefresh = () => {
    if (confirm('This will refresh the data to the latest Malaysian petrol stations. Continue?')) {
      const refreshedStations = clearAndResetToMalaysianData();
      setStations(refreshedStations);
      alert('Data refreshed to latest Malaysian petrol stations!');
    }
  };

  const handleSaveStation = (stationData: Omit<PetrolStation, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingStation) {
      // Update existing station
      const updatedStation = updatePetrolStation(editingStation.id, stationData);
      if (updatedStation) {
        setStations(prev => prev.map(s => s.id === editingStation.id ? updatedStation : s));
        if (currentStation?.id === editingStation.id) {
          setCurrentStation(updatedStation);
        }
      }
    } else {
      // Add new station
      const newStation = addPetrolStation(stationData);
      setStations(prev => [...prev, newStation]);
    }
    
    setViewMode('list');
    setEditingStation(null);
  };

  const handleBackToList = () => {
    setViewMode('list');
    setCurrentStation(null);
    setEditingStation(null);
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'create':
        return (
          <PetrolStationForm
            onSave={handleSaveStation}
            onCancel={handleBackToList}
          />
        );
      
      case 'edit':
        return (
          <PetrolStationForm
            station={editingStation!}
            onSave={handleSaveStation}
            onCancel={handleBackToList}
          />
        );
      
      case 'detail':
        return (
          <PetrolStationDetail
            station={currentStation!}
            onBack={handleBackToList}
            onEdit={() => handleEdit(currentStation!)}
            onDelete={() => handleDelete(currentStation!.id)}
          />
        );
      
      default:
        return (
          <PetrolStationList
            stations={stations}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreateNew={handleCreateNew}
            onExport={handleExport}
            onImport={handleImport}
            onRefresh={handleRefresh}
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