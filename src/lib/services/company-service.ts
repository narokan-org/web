import type { DBCompany } from '$lib/common/entities/db-company';
import type { DBUserCompanyRelationship } from '$lib/common/entities/db-user-company-relationship';
import type { Company } from '$lib/common/models/company';
import { mapDBCompanyToCompany } from '$lib/utils/mappers';
import { parseDBResponse } from '$lib/utils/utils';
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

		const dbCompany = (await parseDBResponse<DBCompany>(response))?.[0];

		if (!dbCompany) {
			return null;
		}

		return mapDBCompanyToCompany(dbCompany);
	}

	async createCompany(company: Omit<Company, 'id'>): Promise<Company | null> {
		const role = await this.userService.getUserRole();
		const currentUser = await this.userService.getUser();

		if (!role || !currentUser) {
			return null;
		}

		const newCompany: Partial<DBCompany> = {
			Name: company.name,
			CreatedByUser_FK: currentUser.id
		};

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

		const dbCompany = (await parseDBResponse<DBCompany>(response))?.[0];

		if (!dbCompany) {
			return null;
		}

		await this.associateCompanyWithUser(dbCompany.Id, currentUser.id);

		return mapDBCompanyToCompany(dbCompany);
	}

	private async associateCompanyWithUser(companyId: number, userId: string): Promise<void> {
		const role = await this.userService.getUserRole();

		if (!role) {
			return;
		}

		const relationship: DBUserCompanyRelationship = {
			UserId: userId,
			CompanyId: companyId,
			Role: 'Administrator'
		};
		this.log.debug(`Creating user company relationship ${JSON.stringify(relationship)}`);

		await this.fetchFn(`/data-api/rest/UserCompanyRelationship`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-MS-API-ROLE': role
			},
			body: JSON.stringify(relationship)
		});
	}
}
