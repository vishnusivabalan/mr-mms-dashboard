import { DashboardDataPayload } from '../types/dashboard';

// Mock data strictly modeled on the request mapping
const MOCK_DATA: DashboardDataPayload = {
  kpis: {
    totalFailures: 142,
    totalMaintenanceCost: 1250000,
    averageRepairTime: 2.4,
    powerConsumption: 450000
  },
  breakdownContribution: [
    { line: 'Line 1', breakdownHours: 45, contributionPercent: 15 },
    { line: 'Line 2', breakdownHours: 85, contributionPercent: 28 },
    { line: 'Line 3', breakdownHours: 120, contributionPercent: 40 },
    { line: 'Line 4', breakdownHours: 50, contributionPercent: 17 }
  ],
  maintenanceCost: [
    { month: 'Jan', maintenanceCost: 120000, budgetCost: 100000 },
    { month: 'Feb', maintenanceCost: 95000, budgetCost: 100000 },
    { month: 'Mar', maintenanceCost: 140000, budgetCost: 100000 },
    { month: 'Apr', maintenanceCost: 110000, budgetCost: 100000 },
    { month: 'May', maintenanceCost: 105000, budgetCost: 100000 },
    { month: 'Jun', maintenanceCost: 115000, budgetCost: 100000 }
  ],
  pmBmManhour: [
    { month: 'Jan', preventiveMaintenanceHr: 120, breakdownMaintenanceHr: 80 },
    { month: 'Feb', preventiveMaintenanceHr: 140, breakdownMaintenanceHr: 60 },
    { month: 'Mar', preventiveMaintenanceHr: 110, breakdownMaintenanceHr: 100 },
    { month: 'Apr', preventiveMaintenanceHr: 130, breakdownMaintenanceHr: 70 }
  ],
  powerConsumption: [
    { month: 'Jan', powerCost: 45000, budgetCost: 40000 },
    { month: 'Feb', powerCost: 42000, budgetCost: 40000 },
    { month: 'Mar', powerCost: 48000, budgetCost: 40000 },
    { month: 'Apr', powerCost: 46000, budgetCost: 40000 }
  ],
  failureStatus: [
    { month: 'Jan', noOfFailures: 24 },
    { month: 'Feb', noOfFailures: 18 },
    { month: 'Mar', noOfFailures: 32 },
    { month: 'Apr', noOfFailures: 15 },
    { month: 'May', noOfFailures: 22 },
    { month: 'Jun', noOfFailures: 12 }
  ],
  breakdownStatus: [
    { month: 'Jan', under1Hr: 15, oneToTwoHrs: 5, over2Hrs: 4, target: 20 },
    { month: 'Feb', under1Hr: 12, oneToTwoHrs: 4, over2Hrs: 2, target: 20 },
    { month: 'Mar', under1Hr: 18, oneToTwoHrs: 8, over2Hrs: 6, target: 20 },
    { month: 'Apr', under1Hr: 10, oneToTwoHrs: 3, over2Hrs: 2, target: 20 }
  ],
  maintenanceStatus: [
    { status: 'Completed', count: 180 },
    { status: 'In Progress', count: 24 },
    { status: 'Pending Approval', count: 12 },
    { status: 'Awaiting Parts', count: 8 }
  ],
  downtimeCause: [
    { cause: 'Mechanical Wear', contributionPercent: 35 },
    { cause: 'Electrical Fault', contributionPercent: 25 },
    { cause: 'Sensor Calibration', contributionPercent: 15 },
    { cause: 'Operator Error', contributionPercent: 10 },
    { cause: 'Material Jam', contributionPercent: 15 }
  ],
  completedVsScheduled: [
    { frequency: 'Daily', scheduled: 300, completed: 285 },
    { frequency: 'Weekly', scheduled: 50, completed: 48 },
    { frequency: 'Monthly', scheduled: 20, completed: 15 },
    { frequency: 'Quarterly', scheduled: 5, completed: 5 }
  ]
};

// Simulate network request
export const DashboardServiceAPI = {
  getDashboardData: (): Promise<DashboardDataPayload> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_DATA);
      }, 800);
    });
  }
};
