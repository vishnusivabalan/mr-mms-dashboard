import { BreakdownContribution, MaintenanceCostTrend, PMBMTrend, PowerConsumptionTrend, FailureTrend, DowntimeCause } from '../types';

export const mockMaintenanceCost: MaintenanceCostTrend[] = [
  { month: 'Jan', cost: 200000, budget: 250000 },
  { month: 'Feb', cost: 220000, budget: 250000 },
  { month: 'Mar', cost: 240000, budget: 250000 },
  { month: 'Apr', cost: 250000, budget: 250000 },
  { month: 'May', cost: 225000, budget: 250000 },
  { month: 'Jun', cost: 230000, budget: 250000 },
  { month: 'Jul', cost: 250000, budget: 250000 },
  { month: 'Aug', cost: 400000, budget: 250000 },
  { month: 'Sep', cost: 425000, budget: 250000 },
  { month: 'Oct', cost: 375000, budget: 250000 },
  { month: 'Nov', cost: 265000, budget: 250000 },
  { month: 'Dec', cost: 225000, budget: 250000 },
];

export const mockFailureTrend: FailureTrend[] = [
  { month: 'Jan', failures: 5 },
  { month: 'Feb', failures: 6 },
  { month: 'Mar', failures: 7 },
  { month: 'Apr', failures: 5 },
  { month: 'May', failures: 4 },
  { month: 'Jun', failures: 6 },
  { month: 'Jul', failures: 7 },
  { month: 'Aug', failures: 5 },
  { month: 'Sep', failures: 6 },
  { month: 'Oct', failures: 5 },
  { month: 'Nov', failures: 4 },
  { month: 'Dec', failures: 5 },
];

export const mockPowerConsumption: PowerConsumptionTrend[] = [
  { month: 'Jan', cost: 600000, budget: 750000 },
  { month: 'Feb', cost: 650000, budget: 750000 },
  { month: 'Mar', cost: 700000, budget: 750000 },
  { month: 'Apr', cost: 750000, budget: 750000 },
  { month: 'May', cost: 800000, budget: 750000 },
  { month: 'Jun', cost: 850000, budget: 750000 },
  { month: 'Jul', cost: 900000, budget: 750000 },
  { month: 'Aug', cost: 950000, budget: 750000 },
  { month: 'Sep', cost: 1000000, budget: 750000 },
  { month: 'Oct', cost: 1050000, budget: 750000 },
  { month: 'Nov', cost: 1100000, budget: 750000 },
  { month: 'Dec', cost: 1150000, budget: 750000 },
];

export const mockDowntimeCauses: DowntimeCause[] = [
  { cause: 'M/C Breakdown', contribution: 20 },
  { cause: 'Missing Parts', contribution: 32 },
  { cause: 'Power Cut', contribution: 12 },
  { cause: 'Manpower Short', contribution: 14 },
  { cause: 'PM Planned', contribution: 8 },
  { cause: 'Other', contribution: 14 },
];

export const mockPMBM: PMBMTrend[] = [
  { month: 'Jan', pmHours: 210, bmHours: 95 },
  { month: 'Feb', pmHours: 180, bmHours: 80 },
  { month: 'Mar', pmHours: 240, bmHours: 110 },
  { month: 'Apr', pmHours: 190, bmHours: 85 },
  { month: 'May', pmHours: 120, bmHours: 60 },
  { month: 'Jun', pmHours: 250, bmHours: 115 },
  { month: 'Jul', pmHours: 275, bmHours: 125 },
  { month: 'Aug', pmHours: 230, bmHours: 100 },
  { month: 'Sep', pmHours: 240, bmHours: 110 },
  { month: 'Oct', pmHours: 190, bmHours: 85 },
  { month: 'Nov', pmHours: 120, bmHours: 60 },
  { month: 'Dec', pmHours: 250, bmHours: 115 },
];

export const mockBreakdownContribution: BreakdownContribution[] = [
  { line: 'Line 1', hours: 18, contributionPercent: 7.4 },
  { line: 'Line 2', hours: 24, contributionPercent: 9.8 },
  { line: 'Line 3', hours: 27, contributionPercent: 11.1 },
  { line: 'Line 4', hours: 15, contributionPercent: 6.1 },
  { line: 'Line 5', hours: 12, contributionPercent: 4.9 },
  { line: 'Line 6', hours: 21, contributionPercent: 8.6 },
  { line: 'Line 7', hours: 29, contributionPercent: 11.9 },
  { line: 'Line 8', hours: 19, contributionPercent: 7.8 },
  { line: 'Line 9', hours: 24, contributionPercent: 9.8 },
  { line: 'Line 10', hours: 27, contributionPercent: 11.1 },
  { line: 'Line 11', hours: 15, contributionPercent: 6.1 },
  { line: 'Line 12', hours: 12, contributionPercent: 4.9 },
];
