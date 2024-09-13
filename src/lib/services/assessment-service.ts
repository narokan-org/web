import type { LikelihoodOption } from '$lib/common/models/likelihood-option';
import type { ImpactOption } from '$lib/common/models/impact-option';
import type { ResponseOption } from '$lib/common/models/response-option';
import { parseDBResponse } from '$lib/utils/utils';
import type { LoggingService } from './logging-service';
import type { UserService } from './user-service';
import type { DBLikelihoodOption } from '$lib/common/entities/db-likelihood-option';
import type { DBImpactOption } from '$lib/common/entities/db-impact-option';
import type { DBResponseOption } from '$lib/common/entities/db-response-option';

export interface IAssessmentService {
	getLikelihoodOptions(): Promise<LikelihoodOption[]>;
	getImpactOptions(): Promise<ImpactOption[]>;
	getResponseOptions(): Promise<ResponseOption[]>;
}

export class AssessmentService implements IAssessmentService {
	constructor(
		private fetchFn: typeof fetch,
		private log: LoggingService,
		private userService: UserService
	) {}

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
