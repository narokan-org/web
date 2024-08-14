import type { DBCompany } from '$lib/common/entities/db-company';
import type { Company } from '$lib/common/models/company';
import { mapDBCompanyToCompany } from '$lib/utils/mappers';
import type { LoggingService } from './logging-service';
import type { UserService } from './user-service';

export class CompanyService {
	constructor(
		private fetchFn: typeof fetch,
		private log: LoggingService,
		private userService: UserService
	) {}

	async getCompany(id: number): Promise<Company | null> {
		const role = await this.userService.getUserRole();

		if (!role) {
			return null;
		}

		const response = await this.fetchFn(`/data-api/rest/Company/Id/${id}`, {
			headers: {
				'X-MS-API-ROLE': role
			}
		});

		if (!response.ok) {
			return null;
		}

		const dbCompany: DBCompany = await response.json();

		return mapDBCompanyToCompany(dbCompany);
	}

	async createCompany(company: Omit<Company, 'id'>): Promise<Company | null> {
		const role = await this.userService.getUserRole();

		if (!role) {
			return null;
		}

		const newCompany = {
			Name: company.name
		} as DBCompany;

		const response = await this.fetchFn('/data-api/rest/Company', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-MS-API-ROLE': role
			},
			body: JSON.stringify(newCompany)
		});

		if (!response.ok) {
			return null;
		}

		const dbCompany: DBCompany = await response.json();

		return mapDBCompanyToCompany(dbCompany);
	}
}
