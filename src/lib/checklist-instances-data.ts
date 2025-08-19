import { ChecklistInstance } from '@/components/checklist/checklist-instance';
import { ChecklistTemplate } from '@/components/checklist/checklist-form';

// Sample checklist instances
export const sampleChecklistInstances: ChecklistInstance[] = [
  {
    id: 'instance-1',
    templateId: 'template-1',
    template: {
      id: 'template-1',
      title: 'Safety Inspection Checklist',
      description: 'Comprehensive safety inspection for manufacturing facilities',
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
          description: 'Verify fire extinguishers are in good condition and easily reachable',
          isMandatory: true,
        },
        {
          id: 'item-3',
          question: 'Are safety goggles available for all workers?',
          description: 'Ensure adequate supply of safety equipment',
          isMandatory: false,
        },
      ],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    title: 'Safety Inspection Checklist - Building A',
    description: 'Monthly safety inspection for Building A manufacturing floor',
    assignedTo: 'John Smith',
    createdBy: 'Safety Manager',
    status: 'in_progress',
    dueDate: '2024-01-25',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    items: [
      {
        id: 'item-1',
        question: 'Are all emergency exits clearly marked and unobstructed?',
        description: 'Check that emergency exit signs are visible and paths are clear',
        isMandatory: true,
        response: 'yes',
        attachments: [],
        notes: 'All exits are properly marked and clear',
      },
      {
        id: 'item-2',
        question: 'Are fire extinguishers properly maintained and accessible?',
        description: 'Verify fire extinguishers are in good condition and easily reachable',
        isMandatory: true,
        response: 'yes',
        attachments: [],
        notes: 'Fire extinguishers checked and in good condition',
      },
      {
        id: 'item-3',
        question: 'Are safety goggles available for all workers?',
        description: 'Ensure adequate supply of safety equipment',
        isMandatory: false,
        response: 'n/a',
        attachments: [],
        notes: 'Not applicable for this area',
      },
    ],
    notes: 'Building A is generally compliant with safety standards. Minor improvements needed in storage area.',
  },
  {
    id: 'instance-2',
    templateId: 'template-2',
    template: {
      id: 'template-2',
      title: 'Quality Control Checklist',
      description: 'Quality assurance checklist for product manufacturing',
      items: [
        {
          id: 'item-1',
          question: 'Are all products meeting dimensional specifications?',
          description: 'Measure sample products against design specifications',
          isMandatory: true,
        },
        {
          id: 'item-2',
          question: 'Is the packaging properly labeled?',
          description: 'Verify all required information is present on packaging',
          isMandatory: true,
        },
        {
          id: 'item-3',
          question: 'Are quality control records being maintained?',
          description: 'Check that QC documentation is up to date',
          isMandatory: false,
        },
      ],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    title: 'Quality Control Checklist - Production Line 3',
    description: 'Daily quality check for production line 3',
    assignedTo: 'Sarah Johnson',
    createdBy: 'Quality Manager',
    status: 'draft',
    dueDate: '2024-01-22',
    createdAt: '2024-01-21T09:00:00Z',
    updatedAt: '2024-01-21T09:00:00Z',
    items: [
      {
        id: 'item-1',
        question: 'Are all products meeting dimensional specifications?',
        description: 'Measure sample products against design specifications',
        isMandatory: true,
        response: null,
        attachments: [],
        notes: '',
      },
      {
        id: 'item-2',
        question: 'Is the packaging properly labeled?',
        description: 'Verify all required information is present on packaging',
        isMandatory: true,
        response: null,
        attachments: [],
        notes: '',
      },
      {
        id: 'item-3',
        question: 'Are quality control records being maintained?',
        description: 'Check that QC documentation is up to date',
        isMandatory: false,
        response: null,
        attachments: [],
        notes: '',
      },
    ],
    notes: 'New production line setup - initial quality assessment needed.',
  },
  {
    id: 'instance-3',
    templateId: 'template-3',
    template: {
      id: 'template-3',
      title: 'Maintenance Checklist',
      description: 'Preventive maintenance checklist for equipment',
      items: [
        {
          id: 'item-1',
          question: 'Are all moving parts properly lubricated?',
          description: 'Check lubrication levels and apply if necessary',
          isMandatory: true,
        },
        {
          id: 'item-2',
          question: 'Are there any unusual noises during operation?',
          description: 'Listen for any abnormal sounds during equipment operation',
          isMandatory: true,
        },
        {
          id: 'item-3',
          question: 'Are safety guards in place and secure?',
          description: 'Verify all safety guards are properly installed',
          isMandatory: true,
        },
      ],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00Z',
    },
    title: 'Maintenance Checklist - Machine Shop Equipment',
    description: 'Weekly maintenance check for machine shop equipment',
    assignedTo: 'Mike Wilson',
    createdBy: 'Maintenance Supervisor',
    status: 'completed',
    dueDate: '2024-01-20',
    createdAt: '2024-01-13T08:00:00Z',
    updatedAt: '2024-01-20T16:00:00Z',
    submittedAt: '2024-01-20T16:00:00Z',
    items: [
      {
        id: 'item-1',
        question: 'Are all moving parts properly lubricated?',
        description: 'Check lubrication levels and apply if necessary',
        isMandatory: true,
        response: 'yes',
        attachments: [],
        notes: 'All equipment properly lubricated',
      },
      {
        id: 'item-2',
        question: 'Are there any unusual noises during operation?',
        description: 'Listen for any abnormal sounds during equipment operation',
        isMandatory: true,
        response: 'no',
        attachments: [],
        notes: 'Equipment operating normally',
      },
      {
        id: 'item-3',
        question: 'Are safety guards in place and secure?',
        description: 'Verify all safety guards are properly installed',
        isMandatory: true,
        response: 'yes',
        attachments: [],
        notes: 'All safety guards secure',
      },
    ],
    notes: 'All equipment in good working condition. No issues found during inspection.',
  },
];

// Sample users for assignment
export const sampleUsers = [
  { id: 'user-1', name: 'John Smith', email: 'john.smith@company.com' },
  { id: 'user-2', name: 'Sarah Johnson', email: 'sarah.johnson@company.com' },
  { id: 'user-3', name: 'Mike Wilson', email: 'mike.wilson@company.com' },
  { id: 'user-4', name: 'Emily Davis', email: 'emily.davis@company.com' },
  { id: 'user-5', name: 'David Brown', email: 'david.brown@company.com' },
];

// Local storage keys
const INSTANCES_STORAGE_KEY = 'checklist-instances';
const USERS_STORAGE_KEY = 'checklist-users';

// Save checklist instances to localStorage
export const saveChecklistInstances = (instances: ChecklistInstance[]): void => {
  try {
    localStorage.setItem(INSTANCES_STORAGE_KEY, JSON.stringify(instances));
  } catch (error) {
    console.error('Error saving checklist instances:', error);
  }
};

// Load checklist instances from localStorage
export const loadChecklistInstances = (): ChecklistInstance[] => {
  try {
    const stored = localStorage.getItem(INSTANCES_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading checklist instances:', error);
  }
  
  // Return sample data if no stored data
  return sampleChecklistInstances;
};

// Save users to localStorage
export const saveUsers = (users: Array<{ id: string; name: string; email: string }>): void => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

// Load users from localStorage
export const loadUsers = (): Array<{ id: string; name: string; email: string }> => {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
  
  // Return sample data if no stored data
  return sampleUsers;
};

// Create a new checklist instance
export const createChecklistInstance = (instance: ChecklistInstance): ChecklistInstance[] => {
  const instances = loadChecklistInstances();
  const newInstances = [...instances, instance];
  saveChecklistInstances(newInstances);
  return newInstances;
};

// Update an existing checklist instance
export const updateChecklistInstance = (updatedInstance: ChecklistInstance): ChecklistInstance[] => {
  const instances = loadChecklistInstances();
  const newInstances = instances.map(instance => 
    instance.id === updatedInstance.id ? updatedInstance : instance
  );
  saveChecklistInstances(newInstances);
  return newInstances;
};

// Delete a checklist instance
export const deleteChecklistInstance = (id: string): ChecklistInstance[] => {
  const instances = loadChecklistInstances();
  const newInstances = instances.filter(instance => instance.id !== id);
  saveChecklistInstances(newInstances);
  return newInstances;
};

// Get checklist instance by ID
export const getChecklistInstanceById = (id: string): ChecklistInstance | undefined => {
  const instances = loadChecklistInstances();
  return instances.find(instance => instance.id === id);
};

// Export checklist instances data
export const exportChecklistInstancesData = (): string => {
  const instances = loadChecklistInstances();
  const data = {
    instances,
    exportDate: new Date().toISOString(),
    version: '1.0',
  };
  return JSON.stringify(data, null, 2);
};

// Import checklist instances data
export const importChecklistInstancesData = (jsonData: string): ChecklistInstance[] => {
  try {
    const data = JSON.parse(jsonData);
    if (data.instances && Array.isArray(data.instances)) {
      saveChecklistInstances(data.instances);
      return data.instances;
    } else {
      throw new Error('Invalid data format');
    }
  } catch (error) {
    console.error('Error importing checklist instances data:', error);
    throw new Error('Failed to import data. Please check the file format.');
  }
};

// Get instances by status
export const getInstancesByStatus = (status: string): ChecklistInstance[] => {
  const instances = loadChecklistInstances();
  return instances.filter(instance => instance.status === status);
};

// Get instances by assignee
export const getInstancesByAssignee = (assignee: string): ChecklistInstance[] => {
  const instances = loadChecklistInstances();
  return instances.filter(instance => 
    instance.assignedTo.toLowerCase().includes(assignee.toLowerCase())
  );
};

// Get overdue instances
export const getOverdueInstances = (): ChecklistInstance[] => {
  const instances = loadChecklistInstances();
  const now = new Date();
  return instances.filter(instance => 
    new Date(instance.dueDate) < now && 
    instance.status !== 'completed' && 
    instance.status !== 'submitted'
  );
};

// Get instances due soon (within 3 days)
export const getInstancesDueSoon = (): ChecklistInstance[] => {
  const instances = loadChecklistInstances();
  const now = new Date();
  const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  
  return instances.filter(instance => {
    const dueDate = new Date(instance.dueDate);
    return dueDate >= now && dueDate <= threeDaysFromNow && 
           instance.status !== 'completed' && 
           instance.status !== 'submitted';
  });
}; 