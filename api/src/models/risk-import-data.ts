export interface RiskImportData {
  id: string;
  name: string;
  entity: string;
  entityDescription: string;
  riskDescription: string;
  mitigationPlan: string;
  lastAssessment: Date;
  lastUpdated: Date;
  inherentRisk: string;
  inherentRiskValue: number;
  controlStrength: number;
  residualRisk: string;
  residualRiskValue: number;
  riskCategory: string;
}
