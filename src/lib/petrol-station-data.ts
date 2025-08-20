export interface PetrolStation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email?: string;
  manager: string;
  status: 'active' | 'inactive' | 'maintenance';
  fuelTypes: FuelType[];
  services: Service[];
  operatingHours: OperatingHours;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FuelType {
  id: string;
  name: string;
  currentPrice: number;
  unit: 'per_liter' | 'per_gallon';
  isAvailable: boolean;
  lastUpdated: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  isAvailable: boolean;
  price?: number;
}

export interface OperatingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

// Sample data - Malaysian Petrol Stations
const samplePetrolStations: PetrolStation[] = [
  {
    id: '1',
    name: 'Petronas Station - KLCC',
    address: 'Lot 241, Jalan Ampang',
    city: 'Kuala Lumpur',
    state: 'WP Kuala Lumpur',
    zipCode: '50088',
    phone: '+60-3-2161-0000',
    email: 'klcc@petronas.com.my',
    manager: 'Ahmad bin Ismail',
    status: 'active',
    fuelTypes: [
      {
        id: '1',
        name: 'RON 95',
        currentPrice: 2.05,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '2',
        name: 'RON 97',
        currentPrice: 3.47,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Diesel',
        currentPrice: 2.15,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      }
    ],
    services: [
      {
        id: '1',
        name: 'Mesra Store',
        description: 'Convenience store with snacks, drinks, and essentials',
        isAvailable: true
      },
      {
        id: '2',
        name: 'Car Wash',
        description: 'Professional car wash service',
        isAvailable: true,
        price: 25.00
      },
      {
        id: '3',
        name: 'Air & Water',
        description: 'Free air and water for tires',
        isAvailable: true
      },
      {
        id: '4',
        name: 'ATM',
        description: 'Maybank ATM available 24/7',
        isAvailable: true
      }
    ],
    operatingHours: {
      monday: { isOpen: true, openTime: '06:00', closeTime: '23:00' },
      tuesday: { isOpen: true, openTime: '06:00', closeTime: '23:00' },
      wednesday: { isOpen: true, openTime: '06:00', closeTime: '23:00' },
      thursday: { isOpen: true, openTime: '06:00', closeTime: '23:00' },
      friday: { isOpen: true, openTime: '06:00', closeTime: '23:00' },
      saturday: { isOpen: true, openTime: '07:00', closeTime: '23:00' },
      sunday: { isOpen: true, openTime: '07:00', closeTime: '22:00' }
    },
    coordinates: {
      latitude: 3.1390,
      longitude: 101.6869
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Shell Station - Bukit Bintang',
    address: 'Jalan Bukit Bintang, Lot 123',
    city: 'Kuala Lumpur',
    state: 'WP Kuala Lumpur',
    zipCode: '55100',
    phone: '+60-3-2142-5678',
    email: 'bukitbintang@shell.com.my',
    manager: 'Siti Nurhaliza binti Omar',
    status: 'active',
    fuelTypes: [
      {
        id: '1',
        name: 'RON 95',
        currentPrice: 2.05,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '2',
        name: 'RON 97',
        currentPrice: 3.47,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Diesel',
        currentPrice: 2.15,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      }
    ],
    services: [
      {
        id: '1',
        name: 'Select Store',
        description: 'Shell convenience store with fresh food and beverages',
        isAvailable: true
      },
      {
        id: '2',
        name: 'Car Wash',
        description: 'Express car wash service',
        isAvailable: true,
        price: 20.00
      },
      {
        id: '3',
        name: 'Air & Water',
        description: 'Free air and water for tires',
        isAvailable: true
      }
    ],
    operatingHours: {
      monday: { isOpen: true, openTime: '06:00', closeTime: '23:00' },
      tuesday: { isOpen: true, openTime: '06:00', closeTime: '23:00' },
      wednesday: { isOpen: true, openTime: '06:00', closeTime: '23:00' },
      thursday: { isOpen: true, openTime: '06:00', closeTime: '23:00' },
      friday: { isOpen: true, openTime: '06:00', closeTime: '23:00' },
      saturday: { isOpen: true, openTime: '07:00', closeTime: '23:00' },
      sunday: { isOpen: true, openTime: '07:00', closeTime: '22:00' }
    },
    coordinates: {
      latitude: 3.1429,
      longitude: 101.7068
    },
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Caltex Station - Subang Jaya',
    address: 'Persiaran Kewajipan, SS13',
    city: 'Subang Jaya',
    state: 'Selangor',
    zipCode: '47500',
    phone: '+60-3-5637-8901',
    email: 'subangjaya@caltex.com.my',
    manager: 'Raj Kumar a/l Muthusamy',
    status: 'active',
    fuelTypes: [
      {
        id: '1',
        name: 'RON 95',
        currentPrice: 2.05,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '2',
        name: 'RON 97',
        currentPrice: 3.47,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Diesel',
        currentPrice: 2.15,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      }
    ],
    services: [
      {
        id: '1',
        name: 'Star Mart',
        description: 'Caltex convenience store with local and international products',
        isAvailable: true
      },
      {
        id: '2',
        name: 'Car Wash',
        description: 'Premium car wash with waxing service',
        isAvailable: true,
        price: 30.00
      },
      {
        id: '3',
        name: 'Air & Water',
        description: 'Free air and water for tires',
        isAvailable: true
      },
      {
        id: '4',
        name: 'Tyre Service',
        description: 'Basic tyre repair and replacement service',
        isAvailable: true,
        price: 15.00
      }
    ],
    operatingHours: {
      monday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      tuesday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      wednesday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      thursday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      friday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      saturday: { isOpen: true, openTime: '07:00', closeTime: '22:00' },
      sunday: { isOpen: true, openTime: '07:00', closeTime: '21:00' }
    },
    coordinates: {
      latitude: 3.0738,
      longitude: 101.5183
    },
    createdAt: new Date('2024-02-01').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'BHP Station - Georgetown',
    address: 'Jalan Burma, Georgetown',
    city: 'George Town',
    state: 'Pulau Pinang',
    zipCode: '10050',
    phone: '+60-4-261-2345',
    email: 'georgetown@bhp.com.my',
    manager: 'Lim Chee Keong',
    status: 'active',
    fuelTypes: [
      {
        id: '1',
        name: 'RON 95',
        currentPrice: 2.05,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '2',
        name: 'RON 97',
        currentPrice: 3.47,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Diesel',
        currentPrice: 2.15,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      }
    ],
    services: [
      {
        id: '1',
        name: 'BHP Store',
        description: 'Convenience store with local Penang specialties',
        isAvailable: true
      },
      {
        id: '2',
        name: 'Car Wash',
        description: 'Hand wash service with interior cleaning',
        isAvailable: true,
        price: 35.00
      },
      {
        id: '3',
        name: 'Air & Water',
        description: 'Free air and water for tires',
        isAvailable: true
      },
      {
        id: '4',
        name: 'Tourist Information',
        description: 'Local area maps and tourist guidance',
        isAvailable: true
      }
    ],
    operatingHours: {
      monday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      tuesday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      wednesday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      thursday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      friday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      saturday: { isOpen: true, openTime: '07:00', closeTime: '22:00' },
      sunday: { isOpen: true, openTime: '07:00', closeTime: '21:00' }
    },
    coordinates: {
      latitude: 5.4164,
      longitude: 100.3327
    },
    createdAt: new Date('2024-02-15').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Petron Station - Johor Bahru',
    address: 'Jalan Tebrau, Taman Tebrau',
    city: 'Johor Bahru',
    state: 'Johor',
    zipCode: '81100',
    phone: '+60-7-333-4567',
    email: 'johorbahru@petron.com.my',
    manager: 'Mohd Aziz bin Abdullah',
    status: 'active',
    fuelTypes: [
      {
        id: '1',
        name: 'RON 95',
        currentPrice: 2.05,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '2',
        name: 'RON 97',
        currentPrice: 3.47,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Diesel',
        currentPrice: 2.15,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      }
    ],
    services: [
      {
        id: '1',
        name: 'Petron Store',
        description: 'Convenience store with fresh food and beverages',
        isAvailable: true
      },
      {
        id: '2',
        name: 'Car Wash',
        description: 'Express car wash service',
        isAvailable: true,
        price: 22.00
      },
      {
        id: '3',
        name: 'Air & Water',
        description: 'Free air and water for tires',
        isAvailable: true
      },
      {
        id: '4',
        name: 'Singapore Tourist Info',
        description: 'Information for travelers heading to Singapore',
        isAvailable: true
      }
    ],
    operatingHours: {
      monday: { isOpen: true, openTime: '06:00', closeTime: '23:00' },
      tuesday: { isOpen: true, openTime: '06:00', closeTime: '23:00' },
      wednesday: { isOpen: true, openTime: '06:00', closeTime: '23:00' },
      thursday: { isOpen: true, openTime: '06:00', closeTime: '23:00' },
      friday: { isOpen: true, openTime: '06:00', closeTime: '23:00' },
      saturday: { isOpen: true, openTime: '07:00', closeTime: '23:00' },
      sunday: { isOpen: true, openTime: '07:00', closeTime: '22:00' }
    },
    coordinates: {
      latitude: 1.4927,
      longitude: 103.7414
    },
    createdAt: new Date('2024-03-01').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Esso Station - Malacca',
    address: 'Jalan Tun Razak, Bandar Hilir',
    city: 'Malacca',
    state: 'Melaka',
    zipCode: '75000',
    phone: '+60-6-282-7890',
    email: 'malacca@esso.com.my',
    manager: 'Tan Ah Kow',
    status: 'active',
    fuelTypes: [
      {
        id: '1',
        name: 'RON 95',
        currentPrice: 2.05,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '2',
        name: 'RON 97',
        currentPrice: 3.47,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Diesel',
        currentPrice: 2.15,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      }
    ],
    services: [
      {
        id: '1',
        name: 'On The Run',
        description: 'Esso convenience store with local Malacca products',
        isAvailable: true
      },
      {
        id: '2',
        name: 'Car Wash',
        description: 'Premium car wash with waxing',
        isAvailable: true,
        price: 28.00
      },
      {
        id: '3',
        name: 'Air & Water',
        description: 'Free air and water for tires',
        isAvailable: true
      },
      {
        id: '4',
        name: 'Historical Tours',
        description: 'Information about Malacca historical sites',
        isAvailable: true
      }
    ],
    operatingHours: {
      monday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      tuesday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      wednesday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      thursday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      friday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      saturday: { isOpen: true, openTime: '07:00', closeTime: '22:00' },
      sunday: { isOpen: true, openTime: '07:00', closeTime: '21:00' }
    },
    coordinates: {
      latitude: 2.1896,
      longitude: 102.2501
    },
    createdAt: new Date('2024-03-15').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Petronas Station - Kota Kinabalu',
    address: 'Jalan Gaya, Kota Kinabalu',
    city: 'Kota Kinabalu',
    state: 'Sabah',
    zipCode: '88000',
    phone: '+60-88-234-5678',
    email: 'kotakinabalu@petronas.com.my',
    manager: 'Abdul Rahman bin Hassan',
    status: 'active',
    fuelTypes: [
      {
        id: '1',
        name: 'RON 95',
        currentPrice: 2.05,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '2',
        name: 'RON 97',
        currentPrice: 3.47,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Diesel',
        currentPrice: 2.15,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      }
    ],
    services: [
      {
        id: '1',
        name: 'Mesra Store',
        description: 'Convenience store with local Sabah products',
        isAvailable: true
      },
      {
        id: '2',
        name: 'Car Wash',
        description: 'Professional car wash service',
        isAvailable: true,
        price: 25.00
      },
      {
        id: '3',
        name: 'Air & Water',
        description: 'Free air and water for tires',
        isAvailable: true
      },
      {
        id: '4',
        name: 'Mountain Tours',
        description: 'Information about Mount Kinabalu and local attractions',
        isAvailable: true
      }
    ],
    operatingHours: {
      monday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      tuesday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      wednesday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      thursday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      friday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      saturday: { isOpen: true, openTime: '07:00', closeTime: '22:00' },
      sunday: { isOpen: true, openTime: '07:00', closeTime: '21:00' }
    },
    coordinates: {
      latitude: 5.9804,
      longitude: 116.0735
    },
    createdAt: new Date('2024-04-01').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Shell Station - Kuching',
    address: 'Jalan Tun Abang Haji Openg',
    city: 'Kuching',
    state: 'Sarawak',
    zipCode: '93000',
    phone: '+60-82-234-5678',
    email: 'kuching@shell.com.my',
    manager: 'Dayang Aida binti Abang',
    status: 'active',
    fuelTypes: [
      {
        id: '1',
        name: 'RON 95',
        currentPrice: 2.05,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '2',
        name: 'RON 97',
        currentPrice: 3.47,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Diesel',
        currentPrice: 2.15,
        unit: 'per_liter',
        isAvailable: true,
        lastUpdated: new Date().toISOString()
      }
    ],
    services: [
      {
        id: '1',
        name: 'Select Store',
        description: 'Convenience store with local Sarawak products',
        isAvailable: true
      },
      {
        id: '2',
        name: 'Car Wash',
        description: 'Express car wash service',
        isAvailable: true,
        price: 20.00
      },
      {
        id: '3',
        name: 'Air & Water',
        description: 'Free air and water for tires',
        isAvailable: true
      },
      {
        id: '4',
        name: 'Cultural Tours',
        description: 'Information about local Dayak culture and heritage',
        isAvailable: true
      }
    ],
    operatingHours: {
      monday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      tuesday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      wednesday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      thursday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      friday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
      saturday: { isOpen: true, openTime: '07:00', closeTime: '22:00' },
      sunday: { isOpen: true, openTime: '07:00', closeTime: '21:00' }
    },
    coordinates: {
      latitude: 1.5497,
      longitude: 110.3372
    },
    createdAt: new Date('2024-04-15').toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Local storage key
const STORAGE_KEY = 'petrolStations';

// Load petrol stations from localStorage
export function loadPetrolStations(): PetrolStation[] {
  if (typeof window === 'undefined') return samplePetrolStations;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      // Check if the stored data is the old format (US data) and update it
      const parsedData = JSON.parse(stored);
      const hasOldData = parsedData.some((station: any) => 
        station.city === 'New York' || 
        station.city === 'Los Angeles' ||
        station.fuelTypes?.some((fuel: any) => fuel.unit === 'per_gallon')
      );
      
      if (hasOldData) {
        // Clear old data and use new Malaysian data
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePetrolStations));
        return samplePetrolStations;
      }
      
      return parsedData;
    }
    // Initialize with sample data if nothing stored
    localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePetrolStations));
    return samplePetrolStations;
  } catch (error) {
    console.error('Error loading petrol stations:', error);
    return samplePetrolStations;
  }
}

// Save petrol stations to localStorage
export function savePetrolStations(stations: PetrolStation[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stations));
  } catch (error) {
    console.error('Error saving petrol stations:', error);
  }
}

// Add new petrol station
export function addPetrolStation(station: Omit<PetrolStation, 'id' | 'createdAt' | 'updatedAt'>): PetrolStation {
  const stations = loadPetrolStations();
  const newStation: PetrolStation = {
    ...station,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  stations.push(newStation);
  savePetrolStations(stations);
  return newStation;
}

// Update existing petrol station
export function updatePetrolStation(id: string, updates: Partial<PetrolStation>): PetrolStation | null {
  const stations = loadPetrolStations();
  const index = stations.findIndex(station => station.id === id);
  
  if (index === -1) return null;
  
  stations[index] = {
    ...stations[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  savePetrolStations(stations);
  return stations[index];
}

// Delete petrol station
export function deletePetrolStation(id: string): boolean {
  const stations = loadPetrolStations();
  const filteredStations = stations.filter(station => station.id !== id);
  
  if (filteredStations.length === stations.length) return false;
  
  savePetrolStations(filteredStations);
  return true;
}

// Get petrol station by ID
export function getPetrolStationById(id: string): PetrolStation | null {
  const stations = loadPetrolStations();
  return stations.find(station => station.id === id) || null;
}

// Search petrol stations
export function searchPetrolStations(query: string): PetrolStation[] {
  const stations = loadPetrolStations();
  const lowerQuery = query.toLowerCase();
  
  return stations.filter(station =>
    station.name.toLowerCase().includes(lowerQuery) ||
    station.address.toLowerCase().includes(lowerQuery) ||
    station.city.toLowerCase().includes(lowerQuery) ||
    station.state.toLowerCase().includes(lowerQuery) ||
    station.manager.toLowerCase().includes(lowerQuery)
  );
}

// Export data
export function exportPetrolStationData(): void {
  const stations = loadPetrolStations();
  const dataStr = JSON.stringify(stations, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `petrol-stations-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
}

// Import data
export async function importPetrolStationData(file: File): Promise<PetrolStation[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedStations = JSON.parse(content) as PetrolStation[];
        
        // Validate the imported data
        if (!Array.isArray(importedStations)) {
          throw new Error('Invalid data format');
        }
        
        // Update timestamps for imported stations
        const updatedStations = importedStations.map(station => ({
          ...station,
          updatedAt: new Date().toISOString()
        }));
        
        savePetrolStations(updatedStations);
        resolve(updatedStations);
      } catch (error) {
        reject(new Error('Failed to parse imported file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

// Force refresh to Malaysian data
export function refreshToMalaysianData(): PetrolStation[] {
  if (typeof window === 'undefined') return samplePetrolStations;
  
  // Clear existing data and use new Malaysian sample data
  localStorage.removeItem(STORAGE_KEY);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePetrolStations));
  return samplePetrolStations;
}

// Clear all data and reset to Malaysian sample data
export function clearAndResetToMalaysianData(): PetrolStation[] {
  if (typeof window === 'undefined') return samplePetrolStations;
  
  // Clear localStorage completely
  localStorage.clear();
  
  // Set only the petrol stations data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePetrolStations));
  return samplePetrolStations;
} 