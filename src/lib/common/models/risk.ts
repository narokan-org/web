import type { Assessment } from './assessment';

export interface Risk {
	id: number;
	title: string;
	description?: string;
	createdDate: Date;
	companyId: number;
	categoryRiskId: number;
	assessments: Assessment[];
}
