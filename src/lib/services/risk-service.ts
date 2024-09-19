import type { Risk } from '$lib/common/models/risk';
import type { IUserService } from './user-service';
import type { ILoggingService } from './logging-service';
import type { DBRisk } from '$lib/common/entities/db-risk';
import { parseDBResponse } from '$lib/utils/utils';

export interface IRiskService {
	createRisk(risk: Omit<Risk, 'id' | 'createdDate' | 'assessments'>): Promise<Risk | null>;
}

export class RiskService implements IRiskService {
	constructor(
		private readonly fetchFn: typeof fetch,
		private readonly log: ILoggingService,
		private readonly userService: IUserService
	) {}

	async createRisk(risk: Omit<Risk, 'id' | 'createdDate' | 'assessments'>): Promise<Risk | null> {
		const currentUser = await this.userService.getUser();
		const role = currentUser?.roles.find((r) => r === 'authenticated');

		if (!role || !currentUser) {
			return null;
		}

		this.log.debug(`Creating risk ${JSON.stringify(risk)}`);

		const newRisk: Partial<DBRisk> = {
			Title: risk.title,
			Description: risk.description,
			RiskCategoryId: risk.categoryRiskId,
			CompanyId: risk.companyId
		};

		const createRiskResponse = await this.fetchFn('/data-api/rest/Risk', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-MS-API-ROLE': role
			},
			body: JSON.stringify(newRisk)
		});

		if (!createRiskResponse.ok) {
			return null;
		}

		const dbRisk = (await parseDBResponse<DBRisk>(createRiskResponse))?.[0];

		if (!dbRisk) {
			return null;
		}

		return {
			id: dbRisk.Id,
			createdDate: dbRisk.CreatedDate,
			title: dbRisk.Title,
			description: dbRisk.Description,
			companyId: dbRisk.CompanyId,
			categoryRiskId: dbRisk.RiskCategoryId,
			assessments: []
		};
	}
}
