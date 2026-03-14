import { DashboardMetrics, Machine, Ticket } from '../types';
import * as mockDb from './mockData';

// Simulated latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const DashboardService = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    await delay(300);
    return {
      totalMachines: 120,
      activeFaults: 14,
      closedTickets: 325,
      avgRepairTime: 2.4,
      topFailureType: 'M/C Breakdown',
      monthlyMaintenanceCost: 225000,
    };
  },
  getMaintenanceCostTrend: async () => {
    await delay(300);
    return mockDb.mockMaintenanceCost;
  },
  getFailureTrend: async () => {
    await delay(300);
    return mockDb.mockFailureTrend;
  },
  getPowerConsumptionTrend: async () => {
    await delay(300);
    return mockDb.mockPowerConsumption;
  },
  getDowntimeCauses: async () => {
    await delay(300);
    return mockDb.mockDowntimeCauses;
  },
  getPMBMTrend: async () => {
    await delay(300);
    return mockDb.mockPMBM;
  },
  getBreakdownContribution: async () => {
    await delay(300);
    return mockDb.mockBreakdownContribution;
  }
};

export const MachineService = {
  getMachine: async (id: string): Promise<Machine> => {
    await delay(400);
    return {
      machineId: id,
      machineName: `Machine ${id}`,
      location: 'Plant A - Zone 1',
      installDate: '2020-05-15',
      status: 'Operational'
    };
  }
};

export const TicketService = {
  getTickets: async (): Promise<Ticket[]> => {
    await delay(500);
    return [
      {
        ticketId: 'TKT-1001',
        machineId: 'M-101',
        description: 'Motor overheating',
        priority: 'High',
        createdBy: 'Op-Janice',
        createdAt: '2023-11-01T10:00:00Z',
        status: 'Open',
      },
      {
        ticketId: 'TKT-1002',
        machineId: 'M-205',
        description: 'Conveyor belt stalled',
        priority: 'Critical',
        createdBy: 'Op-John',
        createdAt: '2023-11-01T12:30:00Z',
        status: 'In Progress',
        assignedEngineer: 'Eng-Mike'
      }
    ];
  }
};
