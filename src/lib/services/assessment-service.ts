import type { LikelihoodOption } from '$lib/common/models/likelihood-option';
import type { ImpactOption } from '$lib/common/models/impact-option';
import type { ResponseOption } from '$lib/common/models/response-option';
import { parseDBResponse } from '$lib/utils/utils';
import type { LoggingService } from './logging-service';
import type { UserService } from './user-service';
import type { DBLikelihoodOption } from '$lib/common/entities/db-likelihood-option';
import type { DBImpactOption } from '$lib/common/entities/db-impact-option';
import type { DBResponseOption } from '$lib/common/entities/db-response-option';
import type { Assessment } from '$lib/common/models/assessment';
import type { DBAssessment } from '$lib/common/entities/db-assessment';
import type { DBRiskAssessment } from '$lib/common/entities/db-risk-assessment';

export interface IAssessmentService {
	getLikelihoodOptions(): Promise<LikelihoodOption[]>;
	getImpactOptions(): Promise<ImpactOption[]>;
	getResponseOptions(): Promise<ResponseOption[]>;
	createAssessment({
		riskId,
		assessment
	}: {
		riskId: number;
		assessment: Omit<Assessment, 'id' | 'createdDate'>;
	}): Promise<Assessment | null>;
}

export class AssessmentService implements IAssessmentService {
	constructor(
		private fetchFn: typeof fetch,
		private log: LoggingService,
		private userService: UserService
	) {}

	async createAssessment({
		riskId,
		assessment
	}: {
		riskId: number;
		assessment: Omit<Assessment, 'id' | 'createdDate'>;
	}): Promise<Assessment | null> {
		const currentUser = await this.userService.getUser();
		const role = currentUser?.roles.find((r) => r === 'authenticated');

		if (!role || !currentUser) {
			return null;
		}

		const newAssessment: Partial<DBAssessment> = {
			ImpactOptionId: assessment.impactOptionId,
			LikelihoodOptionId: assessment.likelihoodOptionId,
			ResponseOptionId: assessment.responseOptionId,
			Notes: assessment.notes ?? ''
		};
		const createAssessmentResponse = await this.fetchFn('/data-api/rest/Assessment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-MS-API-ROLE': role
			},
			body: JSON.stringify(newAssessment)
		});

		if (!createAssessmentResponse.ok) {
			return null;
		}

		const dbAssessment = (await parseDBResponse<DBAssessment>(createAssessmentResponse))?.[0];

		if (!dbAssessment) {
			return null;
		}

		const riskAssessment: DBRiskAssessment = {
			RiskId: riskId,
			AssessmentId: dbAssessment.Id
		};

		const createRiskAssessmentResponse = await this.fetchFn('/data-api/rest/RiskAssessment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-MS-API-ROLE': role
			},
			body: JSON.stringify(riskAssessment)
		});

		if (!createRiskAssessmentResponse.ok) {
			return null;
		}

		return {
			id: dbAssessment.Id,
			createdDate: dbAssessment.CreatedDate,
			likelihoodOptionId: assessment.likelihoodOptionId,
			impactOptionId: assessment.impactOptionId,
			responseOptionId: assessment.responseOptionId,
			notes: assessment.notes
		};
	}
	async getLikelihoodOptions(): Promise<LikelihoodOption[]> {
		const role = (await this.userService.getUser())?.roles.find((r) => r === 'authenticated');

		if (!role) {
			return [];
		}

		const response = await this.fetchFn(`/data-api/rest/LikelihoodOption/`, {
			headers: {
				'X-MS-API-ROLE': role
			}
		});

		if (!response.ok) {
			return [];
		}

		const dbLikelihoodOptions = await parseDBResponse<DBLikelihoodOption>(response);

		return (
			dbLikelihoodOptions?.map((o) => ({
				id: o.Id,
				name: o.Name,
				value: o.Value
			})) ?? []
		);
	}

	async getImpactOptions(): Promise<ImpactOption[]> {
		const role = (await this.userService.getUser())?.roles.find((r) => r === 'authenticated');

		if (!role) {
			return [];
		}

		const response = await this.fetchFn(`/data-api/rest/ImpactOption/`, {
			headers: {
				'X-MS-API-ROLE': role
			}
		});

		if (!response.ok) {
			return [];
		}

		const dbImpactOptions = await parseDBResponse<DBImpactOption>(response);

		return (
			dbImpactOptions?.map((o) => ({
				id: o.Id,
				name: o.Name,
				value: o.Value
			})) ?? []
		);
	}

	async getResponseOptions(): Promise<ResponseOption[]> {
		const role = (await this.userService.getUser())?.roles.find((r) => r === 'authenticated');

		if (!role) {
			return [];
		}

		const response = await this.fetchFn(`/data-api/rest/ResponseOption/`, {
			headers: {
				'X-MS-API-ROLE': role
			}
		});

		if (!response.ok) {
			return [];
		}

		const dbResponseOptions = await parseDBResponse<DBResponseOption>(response);

		return (
			dbResponseOptions?.map((o) => ({
				id: o.Id,
				name: o.Name
			})) ?? []
		);
	}
}
