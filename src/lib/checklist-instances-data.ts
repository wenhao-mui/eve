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
    status: 'completed',
    dueDate: '2024-01-25',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    submittedAt: '2024-01-20T14:30:00Z',
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
  {
    id: 'instance-4',
    templateId: 'template-4',
    template: {
      id: 'template-4',
      title: 'Fuel Station Safety Audit',
      description: 'Comprehensive safety audit for petrol station operations',
      items: [
        {
          id: 'item-1',
          question: 'Are fuel dispensers properly maintained and leak-free?',
          description: 'Check for any fuel leaks or maintenance issues',
          isMandatory: true,
        },
        {
          id: 'item-2',
          question: 'Are emergency shutdown procedures clearly posted?',
          description: 'Verify emergency procedures are visible to staff',
          isMandatory: true,
        },
        {
          id: 'item-3',
          question: 'Are fire suppression systems operational?',
          description: 'Test fire suppression system functionality',
          isMandatory: true,
        },
        {
          id: 'item-4',
          question: 'Are safety barriers properly installed?',
          description: 'Check vehicle safety barriers and bollards',
          isMandatory: false,
        },
        {
          id: 'item-5',
          question: 'Are spill containment measures in place?',
          description: 'Verify spill kits and containment procedures',
          isMandatory: true,
        },
      ],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    title: 'Fuel Station Safety Audit - Main Station',
    description: 'Monthly safety audit for main petrol station location',
    assignedTo: 'Emily Davis',
    createdBy: 'Station Manager',
    status: 'completed',
    dueDate: '2024-01-18',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-18T15:45:00Z',
    submittedAt: '2024-01-18T15:45:00Z',
    items: [
      {
        id: 'item-1',
        question: 'Are fuel dispensers properly maintained and leak-free?',
        description: 'Check for any fuel leaks or maintenance issues',
        isMandatory: true,
        response: 'yes',
        attachments: [],
        notes: 'All dispensers operating normally, no leaks detected',
      },
      {
        id: 'item-2',
        question: 'Are emergency shutdown procedures clearly posted?',
        description: 'Verify emergency procedures are visible to staff',
        isMandatory: true,
        response: 'yes',
        attachments: [],
        notes: 'Emergency procedures posted in all required locations',
      },
      {
        id: 'item-3',
        question: 'Are fire suppression systems operational?',
        description: 'Test fire suppression system functionality',
        isMandatory: true,
        response: 'yes',
        attachments: [],
        notes: 'Fire suppression systems tested and operational',
      },
      {
        id: 'item-4',
        question: 'Are safety barriers properly installed?',
        description: 'Check vehicle safety barriers and bollards',
        isMandatory: false,
        response: 'yes',
        attachments: [],
        notes: 'All safety barriers in good condition',
      },
      {
        id: 'item-5',
        question: 'Are spill containment measures in place?',
        description: 'Verify spill kits and containment procedures',
        isMandatory: true,
        response: 'yes',
        attachments: [],
        notes: 'Spill kits fully stocked and procedures updated',
      },
    ],
    notes: 'Excellent safety compliance. All mandatory items completed successfully. Station operating at high safety standards.',
  },
  {
    id: 'instance-5',
    templateId: 'template-5',
    template: {
      id: 'template-5',
      title: 'Equipment Maintenance Checklist',
      description: 'Preventive maintenance for fuel station equipment',
      items: [
        {
          id: 'item-1',
          question: 'Are fuel pumps calibrated correctly?',
          description: 'Verify fuel pump accuracy and calibration',
          isMandatory: true,
        },
        {
          id: 'item-2',
          question: 'Are air compressors functioning properly?',
          description: 'Check air compressor operation and pressure',
          isMandatory: true,
        },
        {
          id: 'item-3',
          question: 'Are car wash systems operational?',
          description: 'Test car wash functionality and water systems',
          isMandatory: false,
        },
        {
          id: 'item-4',
          question: 'Are lighting systems working correctly?',
          description: 'Check all station lighting and signage',
          isMandatory: true,
        },
        {
          id: 'item-5',
          question: 'Are security cameras operational?',
          description: 'Verify CCTV system functionality',
          isMandatory: true,
        },
      ],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    title: 'Equipment Maintenance - Fuel Station Equipment',
    description: 'Weekly maintenance check for all station equipment',
    assignedTo: 'David Brown',
    createdBy: 'Maintenance Manager',
    status: 'completed',
    dueDate: '2024-01-19',
    createdAt: '2024-01-12T09:00:00Z',
    updatedAt: '2024-01-19T11:20:00Z',
    submittedAt: '2024-01-19T11:20:00Z',
    items: [
      {
        id: 'item-1',
        question: 'Are fuel pumps calibrated correctly?',
        description: 'Verify fuel pump accuracy and calibration',
        isMandatory: true,
        response: 'yes',
        attachments: [],
        notes: 'All pumps calibrated and accurate',
      },
      {
        id: 'item-2',
        question: 'Are air compressors functioning properly?',
        description: 'Check air compressor operation and pressure',
        isMandatory: true,
        response: 'yes',
        attachments: [],
        notes: 'Air compressors operating at optimal pressure',
      },
      {
        id: 'item-3',
        question: 'Are car wash systems operational?',
        description: 'Test car wash functionality and water systems',
        isMandatory: false,
        response: 'n/a',
        attachments: [],
        notes: 'Car wash system not installed at this location',
      },
      {
        id: 'item-4',
        question: 'Are lighting systems working correctly?',
        description: 'Check all station lighting and signage',
        isMandatory: true,
        response: 'no',
        attachments: [],
        notes: 'Two LED lights need replacement in forecourt area',
      },
      {
        id: 'item-5',
        question: 'Are security cameras operational?',
          description: 'Verify CCTV system functionality',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'All cameras working and recording properly',
        },
      ],
      notes: 'Most equipment in good condition. Two LED lights need replacement. Maintenance scheduled for next week.',
    },
    {
      id: 'instance-6',
      templateId: 'template-6',
      template: {
        id: 'template-6',
        title: 'Customer Service Quality Check',
        description: 'Quality assessment for customer service standards',
        items: [
          {
            id: 'item-1',
            question: 'Are staff greeting customers promptly?',
            description: 'Observe staff interaction with customers',
            isMandatory: true,
          },
          {
            id: 'item-2',
            question: 'Is the station clean and well-maintained?',
            description: 'Assess overall cleanliness and appearance',
            isMandatory: true,
          },
          {
            id: 'item-3',
            question: 'Are prices clearly displayed?',
            description: 'Check fuel price signage visibility',
            isMandatory: true,
          },
          {
            id: 'item-4',
            question: 'Are staff wearing proper uniforms?',
            description: 'Verify staff appearance and uniform compliance',
            isMandatory: false,
          },
          {
            id: 'item-5',
            question: 'Is the shop area organized and stocked?',
            description: 'Check shop organization and product availability',
            isMandatory: true,
          },
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      title: 'Customer Service Quality - Downtown Station',
      description: 'Monthly customer service quality assessment',
      assignedTo: 'Sarah Johnson',
      createdBy: 'Customer Service Manager',
      status: 'completed',
      dueDate: '2024-01-17',
      createdAt: '2024-01-10T14:00:00Z',
      updatedAt: '2024-01-17T16:30:00Z',
      submittedAt: '2024-01-17T16:30:00Z',
      items: [
        {
          id: 'item-1',
          question: 'Are staff greeting customers promptly?',
          description: 'Observe staff interaction with customers',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'Staff consistently greeting customers within 30 seconds',
        },
        {
          id: 'item-2',
          question: 'Is the station clean and well-maintained?',
          description: 'Assess overall cleanliness and appearance',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'Station maintained to high cleanliness standards',
        },
        {
          id: 'item-3',
          question: 'Are prices clearly displayed?',
          description: 'Check fuel price signage visibility',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'All prices clearly visible and up to date',
        },
        {
          id: 'item-4',
          question: 'Are staff wearing proper uniforms?',
          description: 'Verify staff appearance and uniform compliance',
          isMandatory: false,
          response: 'yes',
          attachments: [],
          notes: 'All staff properly uniformed and professional',
        },
        {
          id: 'item-5',
          question: 'Is the shop area organized and stocked?',
          description: 'Check shop organization and product availability',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'Shop well-organized with good product variety',
        },
      ],
      notes: 'Excellent customer service standards maintained. Staff performing above expectations.',
    },
    {
      id: 'instance-7',
      templateId: 'template-7',
      template: {
        id: 'template-7',
        title: 'Environmental Compliance Check',
        description: 'Environmental compliance and sustainability assessment',
        items: [
          {
            id: 'item-1',
            question: 'Are fuel spill containment measures adequate?',
            description: 'Check spill prevention and response equipment',
            isMandatory: true,
          },
          {
            id: 'item-2',
            question: 'Are waste disposal procedures followed?',
            description: 'Verify proper waste handling and disposal',
            isMandatory: true,
          },
          {
            id: 'item-3',
            question: 'Are recycling bins available and used?',
            description: 'Check recycling infrastructure and usage',
            isMandatory: false,
          },
          {
            id: 'item-4',
            question: 'Are energy-efficient lighting systems installed?',
            description: 'Verify LED lighting and energy efficiency',
            isMandatory: true,
          },
          {
            id: 'item-5',
            question: 'Are water conservation measures in place?',
            description: 'Check water usage and conservation practices',
            isMandatory: false,
          },
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      title: 'Environmental Compliance - Green Station Initiative',
      description: 'Environmental compliance assessment for sustainability program',
      assignedTo: 'Mike Wilson',
      createdBy: 'Environmental Officer',
      status: 'completed',
      dueDate: '2024-01-16',
      createdAt: '2024-01-09T10:00:00Z',
      updatedAt: '2024-01-16T13:15:00Z',
      submittedAt: '2024-01-16T13:15:00Z',
      items: [
        {
          id: 'item-1',
          question: 'Are fuel spill containment measures adequate?',
          description: 'Check spill prevention and response equipment',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'Comprehensive spill containment system in place',
        },
        {
          id: 'item-2',
          question: 'Are waste disposal procedures followed?',
          description: 'Verify proper waste handling and disposal',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'All waste properly segregated and disposed',
        },
        {
          id: 'item-3',
          question: 'Are recycling bins available and used?',
          description: 'Check recycling infrastructure and usage',
          isMandatory: false,
          response: 'yes',
          attachments: [],
          notes: 'Recycling program well-established and utilized',
        },
        {
          id: 'item-4',
          question: 'Are energy-efficient lighting systems installed?',
          description: 'Verify LED lighting and energy efficiency',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: '100% LED lighting installed, significant energy savings achieved',
        },
        {
          id: 'item-5',
          question: 'Are water conservation measures in place?',
          description: 'Check water usage and conservation practices',
          isMandatory: false,
          response: 'yes',
          attachments: [],
          notes: 'Low-flow fixtures and water monitoring systems installed',
        },
      ],
      notes: 'Outstanding environmental compliance. Station leading industry standards in sustainability.',
    },
    {
      id: 'instance-8',
      templateId: 'template-8',
      template: {
        id: 'template-8',
        title: 'Inventory Management Check',
        description: 'Fuel and shop inventory management assessment',
        items: [
          {
            id: 'item-1',
            question: 'Are fuel levels properly monitored?',
            description: 'Check fuel tank monitoring systems',
            isMandatory: true,
          },
          {
            id: 'item-2',
            question: 'Are shop products properly stocked?',
            description: 'Verify shop inventory levels and organization',
            isMandatory: true,
          },
          {
            id: 'item-3',
            question: 'Are expiry dates checked regularly?',
            description: 'Check product expiry date monitoring',
            isMandatory: true,
          },
          {
            id: 'item-4',
            question: 'Are theft prevention measures adequate?',
            description: 'Verify security and theft prevention systems',
            isMandatory: false,
          },
          {
            id: 'item-5',
            question: 'Are delivery schedules maintained?',
            description: 'Check fuel delivery and restocking schedules',
            isMandatory: true,
          },
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      title: 'Inventory Management - Central Station',
      description: 'Weekly inventory management assessment',
      assignedTo: 'Emily Davis',
      createdBy: 'Inventory Manager',
      status: 'completed',
      dueDate: '2024-01-15',
      createdAt: '2024-01-08T11:00:00Z',
      updatedAt: '2024-01-15T09:45:00Z',
      submittedAt: '2024-01-15T09:45:00Z',
      items: [
        {
          id: 'item-1',
          question: 'Are fuel levels properly monitored?',
          description: 'Check fuel tank monitoring systems',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'Tank monitoring systems functioning perfectly',
        },
        {
          id: 'item-2',
          question: 'Are shop products properly stocked?',
          description: 'Verify shop inventory levels and organization',
          isMandatory: true,
          response: 'no',
          attachments: [],
          notes: 'Several popular items running low, restocking needed',
        },
        {
          id: 'item-3',
          question: 'Are expiry dates checked regularly?',
          description: 'Check product expiry date monitoring',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'Expiry date monitoring system working well',
        },
        {
          id: 'item-4',
          question: 'Are theft prevention measures adequate?',
          description: 'Verify security and theft prevention systems',
          isMandatory: false,
          response: 'yes',
          attachments: [],
          notes: 'Security cameras and anti-theft measures in place',
        },
        {
          id: 'item-5',
          question: 'Are delivery schedules maintained?',
          description: 'Check fuel delivery and restocking schedules',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'All deliveries on schedule this week',
        },
      ],
      notes: 'Good overall inventory management. Need to restock several shop items. Fuel levels optimal.',
    },
    {
      id: 'instance-9',
      templateId: 'template-9',
      template: {
        id: 'template-9',
        title: 'Staff Training Assessment',
        description: 'Staff competency and training verification',
        items: [
          {
            id: 'item-1',
            question: 'Are staff trained in emergency procedures?',
            description: 'Verify emergency response training completion',
            isMandatory: true,
          },
          {
            id: 'item-2',
            question: 'Are safety protocols understood?',
            description: 'Assess staff knowledge of safety procedures',
            isMandatory: true,
          },
          {
            id: 'item-3',
            question: 'Are customer service standards met?',
            description: 'Evaluate customer service performance',
            isMandatory: true,
          },
          {
            id: 'item-4',
            question: 'Are equipment operation skills adequate?',
            description: 'Check staff equipment operation competency',
            isMandatory: false,
          },
          {
            id: 'item-5',
            question: 'Are compliance requirements understood?',
            description: 'Verify understanding of regulatory requirements',
            isMandatory: true,
          },
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      title: 'Staff Training Assessment - Q1 2024',
      description: 'Quarterly staff training and competency assessment',
      assignedTo: 'David Brown',
      createdBy: 'Training Manager',
      status: 'completed',
      dueDate: '2024-01-14',
      createdAt: '2024-01-07T13:00:00Z',
      updatedAt: '2024-01-14T17:20:00Z',
      submittedAt: '2024-01-14T17:20:00Z',
      items: [
        {
          id: 'item-1',
          question: 'Are staff trained in emergency procedures?',
          description: 'Verify emergency response training completion',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'All staff completed emergency procedure training',
        },
        {
          id: 'item-2',
          question: 'Are safety protocols understood?',
          description: 'Assess staff knowledge of safety procedures',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'Staff demonstrated excellent safety knowledge',
        },
        {
          id: 'item-3',
          question: 'Are customer service standards met?',
          description: 'Evaluate customer service performance',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'Customer service standards consistently exceeded',
        },
        {
          id: 'item-4',
          question: 'Are equipment operation skills adequate?',
          description: 'Check staff equipment operation competency',
          isMandatory: false,
          response: 'yes',
          attachments: [],
          notes: 'All staff competent in equipment operation',
        },
        {
          id: 'item-5',
          question: 'Are compliance requirements understood?',
          description: 'Verify understanding of regulatory requirements',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'Full compliance understanding demonstrated',
        },
      ],
      notes: 'Outstanding staff performance. All training objectives met and exceeded. Team ready for advanced training.',
    },
    {
      id: 'instance-10',
      templateId: 'template-10',
      template: {
        id: 'template-10',
        title: 'Financial Compliance Check',
        description: 'Financial procedures and compliance verification',
        items: [
          {
            id: 'item-1',
            question: 'Are cash handling procedures followed?',
            description: 'Verify cash management and security procedures',
            isMandatory: true,
          },
          {
            id: 'item-2',
            question: 'Are credit card transactions secure?',
            description: 'Check payment security and PCI compliance',
            isMandatory: true,
          },
          {
            id: 'item-3',
            question: 'Are daily sales reconciled?',
            description: 'Verify daily sales reconciliation procedures',
            isMandatory: true,
          },
          {
            id: 'item-4',
            question: 'Are expense reports submitted on time?',
            description: 'Check expense reporting compliance',
            isMandatory: false,
          },
          {
            id: 'item-5',
            question: 'Are tax records properly maintained?',
            description: 'Verify tax documentation and compliance',
            isMandatory: true,
          },
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      title: 'Financial Compliance - Monthly Review',
      description: 'Monthly financial compliance and procedure verification',
      assignedTo: 'Sarah Johnson',
      createdBy: 'Finance Manager',
      status: 'completed',
      dueDate: '2024-01-13',
      createdAt: '2024-01-06T15:00:00Z',
      updatedAt: '2024-01-13T10:30:00Z',
      submittedAt: '2024-01-13T10:30:00Z',
      items: [
        {
          id: 'item-1',
          question: 'Are cash handling procedures followed?',
          description: 'Verify cash management and security procedures',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'All cash handling procedures strictly followed',
        },
        {
          id: 'item-2',
          question: 'Are credit card transactions secure?',
          description: 'Check payment security and PCI compliance',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'Payment systems fully compliant with PCI standards',
        },
        {
          id: 'item-3',
          question: 'Are daily sales reconciled?',
          description: 'Verify daily sales reconciliation procedures',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'Daily reconciliation completed without issues',
        },
        {
          id: 'item-4',
          question: 'Are expense reports submitted on time?',
          description: 'Check expense reporting compliance',
          isMandatory: false,
          response: 'n/a',
          attachments: [],
          notes: 'No expense reports due this period',
        },
        {
          id: 'item-5',
          question: 'Are tax records properly maintained?',
          description: 'Verify tax documentation and compliance',
          isMandatory: true,
          response: 'yes',
          attachments: [],
          notes: 'Tax records complete and properly organized',
        },
      ],
      notes: 'Excellent financial compliance. All mandatory procedures followed correctly. No issues identified.',
    },
];

// Sample users for assignment
export const sampleUsers = [
  { id: 'user-1', name: 'John Smith', email: 'john.smith@company.com' },
  { id: 'user-2', name: 'Sarah Johnson', email: 'sarah.johnson@company.com' },
  { id: 'user-3', name: 'Mike Wilson', email: 'mike.wilson@company.com' },
  { id: 'user-4', name: 'Emily Davis', email: 'emily.davis@company.com' },
  { id: 'user-5', name: 'David Brown', email: 'david.brown@company.com' },
  { id: 'user-6', name: 'Lisa Chen', email: 'lisa.chen@company.com' },
  { id: 'user-7', name: 'Robert Martinez', email: 'robert.martinez@company.com' },
  { id: 'user-8', name: 'Jennifer Lee', email: 'jennifer.lee@company.com' },
  { id: 'user-9', name: 'Thomas Anderson', email: 'thomas.anderson@company.com' },
  { id: 'user-10', name: 'Amanda Rodriguez', email: 'amanda.rodriguez@company.com' },
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

// Get completed reports for analytics
export const getCompletedReports = (): ChecklistInstance[] => {
  const instances = loadChecklistInstances();
  return instances.filter(instance => 
    instance.status === 'completed' || instance.status === 'submitted'
  );
};

// Get reports by template type
export const getReportsByTemplate = (templateTitle: string): ChecklistInstance[] => {
  const instances = loadChecklistInstances();
  return instances.filter(instance => 
    instance.template.title.toLowerCase().includes(templateTitle.toLowerCase())
  );
};

// Get reports by date range
export const getReportsByDateRange = (startDate: Date, endDate: Date): ChecklistInstance[] => {
  const instances = loadChecklistInstances();
  return instances.filter(instance => {
    const reportDate = new Date(instance.submittedAt || instance.updatedAt);
    return reportDate >= startDate && reportDate <= endDate;
  });
};

// Get performance statistics
export const getPerformanceStats = () => {
  const completedReports = getCompletedReports();
  
  if (completedReports.length === 0) {
    return {
      totalReports: 0,
      averageCompletion: 0,
      totalItems: 0,
      completedItems: 0,
      overallPercentage: 0,
      mandatoryCompletion: 0,
      responseBreakdown: { yes: 0, no: 0, na: 0 },
      topPerformers: [],
      areasOfConcern: []
    };
  }

  let totalItems = 0;
  let completedItems = 0;
  let mandatoryItems = 0;
  let completedMandatory = 0;
  let yesResponses = 0;
  let noResponses = 0;
  let naResponses = 0;

  completedReports.forEach(report => {
    totalItems += report.items.length;
    completedItems += report.items.filter(item => item.response !== null).length;
    mandatoryItems += report.items.filter(item => item.isMandatory).length;
    completedMandatory += report.items.filter(item => item.isMandatory && item.response !== null).length;
    
    report.items.forEach(item => {
      if (item.response === 'yes') yesResponses++;
      else if (item.response === 'no') noResponses++;
      else if (item.response === 'n/a') naResponses++;
    });
  });

  const overallPercentage = Math.round((completedItems / totalItems) * 100);
  const mandatoryCompletion = Math.round((completedMandatory / mandatoryItems) * 100);

  // Get top performers (reports with highest completion rates)
  const topPerformers = completedReports
    .map(report => ({
      title: report.title,
      assignee: report.assignedTo,
      completion: Math.round((report.items.filter(item => item.response !== null).length / report.items.length) * 100)
    }))
    .sort((a, b) => b.completion - a.completion)
    .slice(0, 5);

  // Get areas of concern (items with most "no" responses)
  const concernMap = new Map<string, number>();
  completedReports.forEach(report => {
    report.items.forEach(item => {
      if (item.response === 'no') {
        const key = item.question;
        concernMap.set(key, (concernMap.get(key) || 0) + 1);
      }
    });
  });

  const areasOfConcern = Array.from(concernMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([question, count]) => ({ question, count }));

  return {
    totalReports: completedReports.length,
    averageCompletion: Math.round(completedItems / totalItems * 100),
    totalItems,
    completedItems,
    overallPercentage,
    mandatoryCompletion,
    responseBreakdown: { yes: yesResponses, no: noResponses, na: naResponses },
    topPerformers,
    areasOfConcern
  };
}; 