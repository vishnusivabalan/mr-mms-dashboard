export interface Machine {
  machineId: string;
  machineName: string;
  location: string;
  installDate: string;
  status: 'Operational' | 'Faulty' | 'Maintenance';
}

export interface Ticket {
  ticketId: string;
  machineId: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  createdBy: string;
  createdAt: string;
  status: 'Open' | 'In Progress' | 'Closed';
  assignedEngineer?: string;
  closedAt?: string;
}

export interface MaintenanceRecord {
  ticketId: string;
  rootCause: string;
  repairNotes: string;
  sparePartsUsed: string[];
  repairDuration: number; // in hours
  repairCost: number;
}

export interface DashboardMetrics {
  totalMachines: number;
  activeFaults: number;
  closedTickets: number;
  avgRepairTime: number; // hours
  topFailureType: string;
  monthlyMaintenanceCost: number;
}

// Analytics and Dashboard Data Types mapping the Excel sheet
export interface BreakdownContribution {
  line: string;
  hours: number;
  contributionPercent: number;
}

export interface MaintenanceCostTrend {
  month: string;
  cost: number;
  budget: number;
}

export interface PMBMTrend {
  month: string;
  pmHours: number;
  bmHours: number;
}

export interface PowerConsumptionTrend {
  month: string;
  cost: number;
  budget: number;
}

export interface FailureTrend {
  month: string;
  failures: number;
}

export interface DowntimeCause {
  cause: string;
  contribution: number;
}
