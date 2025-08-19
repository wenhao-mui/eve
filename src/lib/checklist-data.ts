import { ChecklistTemplate } from '@/components/checklist/checklist-form';

// Sample checklist templates stored in JSON format
export const sampleChecklistTemplates: ChecklistTemplate[] = [
  {
    id: 'template-1',
    title: 'Safety Inspection Checklist',
    description: 'Comprehensive safety inspection checklist for industrial facilities',
    items: [
      {
        id: 'item-1',
        question: 'Are all emergency exits clearly marked and unobstructed?',
        description: 'Check that emergency exit signs are visible and paths are clear',
        isMandatory: true,
      },
      {
        id: 'item-2',
        question: 'Are fire extinguishers properly maintained and accessible?',
        description: 'Verify fire extinguishers are in working order and not blocked',
        isMandatory: true,
      },
      {
        id: 'item-3',
        question: 'Are safety equipment and PPE available?',
        description: 'Ensure personal protective equipment is available and in good condition',
        isMandatory: true,
      },
      {
        id: 'item-4',
        question: 'Are warning signs and labels clearly visible?',
        description: 'Check that all safety warnings and hazard labels are legible',
        isMandatory: false,
      },
      {
        id: 'item-5',
        question: 'Are electrical panels and outlets properly labeled?',
        description: 'Verify electrical equipment has proper identification and safety labels',
        isMandatory: false,
      },
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'template-2',
    title: 'Quality Control Checklist',
    description: 'Quality assurance checklist for manufacturing processes',
    items: [
      {
        id: 'item-1',
        question: 'Are all measurements within specified tolerances?',
        description: 'Verify that all dimensional measurements meet requirements',
        isMandatory: true,
      },
      {
        id: 'item-2',
        question: 'Is the product free from visible defects?',
        description: 'Inspect for scratches, dents, or other surface imperfections',
        isMandatory: true,
      },
      {
        id: 'item-3',
        question: 'Are all required components present?',
        description: 'Check that all parts and accessories are included',
        isMandatory: false,
      },
      {
        id: 'item-4',
        question: 'Does the product meet functional requirements?',
        description: 'Test all functions to ensure they work as specified',
        isMandatory: true,
      },
    ],
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
  },
  {
    id: 'template-3',
    title: 'Office Setup Checklist',
    description: 'Checklist for setting up new office spaces',
    items: [
      {
        id: 'item-1',
        question: 'Are all necessary office supplies available?',
        description: 'Check for pens, paper, staplers, and other essential supplies',
        isMandatory: true,
      },
      {
        id: 'item-2',
        question: 'Is the internet connection working properly?',
        description: 'Test internet speed and connectivity',
        isMandatory: true,
      },
      {
        id: 'item-3',
        question: 'Are all computers and devices set up?',
        description: 'Ensure all equipment is properly configured and working',
        isMandatory: true,
      },
      {
        id: 'item-4',
        question: 'Is the office space clean and organized?',
        description: 'Verify cleanliness and proper organization',
        isMandatory: false,
      },
      {
        id: 'item-5',
        question: 'Are security measures in place?',
        description: 'Check locks, alarms, and access controls',
        isMandatory: false,
      },
    ],
    createdAt: '2024-01-20T08:00:00Z',
    updatedAt: '2024-01-20T08:00:00Z',
  },
  {
    id: 'template-4',
    title: 'Vehicle Maintenance Checklist',
    description: 'Pre-trip and maintenance checklist for vehicles',
    items: [
      {
        id: 'item-1',
        question: 'Are all lights working properly?',
        description: 'Check headlights, taillights, turn signals, and brake lights',
        isMandatory: true,
      },
      {
        id: 'item-2',
        question: 'Are tires in good condition with proper pressure?',
        description: 'Inspect tire tread and check air pressure',
        isMandatory: true,
      },
      {
        id: 'item-3',
        question: 'Are all fluids at proper levels?',
        description: 'Check oil, coolant, brake fluid, and windshield washer fluid',
        isMandatory: true,
      },
      {
        id: 'item-4',
        question: 'Is the vehicle clean and presentable?',
        description: 'Ensure interior and exterior cleanliness',
        isMandatory: false,
      },
      {
        id: 'item-5',
        question: 'Are all documents and registration current?',
        description: 'Verify insurance, registration, and inspection stickers',
        isMandatory: true,
      },
    ],
    createdAt: '2024-01-18T12:00:00Z',
    updatedAt: '2024-01-18T12:00:00Z',
  },
];

// Function to save checklist templates to localStorage
export const saveChecklistTemplates = (templates: ChecklistTemplate[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('checklistTemplates', JSON.stringify(templates));
  }
};

// Function to load checklist templates from localStorage
export const loadChecklistTemplates = (): ChecklistTemplate[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('checklistTemplates');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored checklist templates:', error);
      }
    }
  }
  return sampleChecklistTemplates;
};

// Function to export checklist data as JSON
export const exportChecklistData = (templates: ChecklistTemplate[]): void => {
  const dataStr = JSON.stringify(templates, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'checklist-templates.json';
  link.click();
  URL.revokeObjectURL(url);
};

// Function to import checklist data from JSON
export const importChecklistData = (file: File): Promise<ChecklistTemplate[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const templates = JSON.parse(content) as ChecklistTemplate[];
        
        // Validate the imported data structure
        if (Array.isArray(templates) && templates.every(template => 
          template.id && template.title && Array.isArray(template.items)
        )) {
          resolve(templates);
        } else {
          reject(new Error('Invalid checklist template format'));
        }
              } catch {
          reject(new Error('Failed to parse JSON file'));
        }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}; 