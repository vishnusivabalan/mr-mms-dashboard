export interface TopKPIs {
  totalFailures: number;
  totalMaintenanceCost: number;
  averageRepairTime: number; // hours
  powerConsumption: number; // kWh
}

export interface BreakdownContributionData {
  line: string;
  breakdownHours: number;
  contributionPercent: number;
}

export interface MaintenanceCostData {
  month: string;
  maintenanceCost: number;
  budgetCost: number;
}

export interface PMBMManhourData {
  month: string;
  preventiveMaintenanceHr: number;
  breakdownMaintenanceHr: number;
}

export interface PowerConsumptionData {
  month: string;
  powerCost: number;
  budgetCost: number;
}

export interface FailureStatusData {
  month: string;
  noOfFailures: number;
}

export interface BreakdownStatusData {
  month: string;
  under1Hr: number;
  oneToTwoHrs: number;
  over2Hrs: number;
  target: number;
}

export interface MaintenanceStatusData {
  status: string;
  count: number;
}

export interface DowntimeCauseData {
  cause: string;
  contributionPercent: number;
}

export interface CompletedVsScheduledData {
  frequency: string;
  scheduled: number;
  completed: number;
}

export interface DashboardDataPayload {
  kpis: TopKPIs;
  breakdownContribution: BreakdownContributionData[];
  maintenanceCost: MaintenanceCostData[];
  pmBmManhour: PMBMManhourData[];
  powerConsumption: PowerConsumptionData[];
  failureStatus: FailureStatusData[];
  breakdownStatus: BreakdownStatusData[];
  maintenanceStatus: MaintenanceStatusData[];
  downtimeCause: DowntimeCauseData[];
  completedVsScheduled: CompletedVsScheduledData[];
}
