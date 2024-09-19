export interface Assessment {
	id: number;
	likelihoodOptionId: number;
	impactOptionId: number;
	responseOptionId: number;
	notes?: string;
	createdDate: Date;
}
