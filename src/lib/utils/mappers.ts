import type { DBCompany } from '$lib/common/entities/db-company';

import type { Company } from '$lib/common/models/company';
import type { LocalUserPayload } from '$lib/common/models/local-user-payload';
import type { User } from '$lib/common/models/user';
import { dev } from '$app/environment';
import type { DBCompanyRiskCategory } from '$lib/common/entities/db-company-risk-category';
import type { RiskCategory } from '$lib/common/models/risk-category';

export function mapDBCompanyToCompany(dbCompany: DBCompany): Company {
	return {
		id: dbCompany.Id,
		name: dbCompany.Name
	};
}

export function mapLocalUserToUser(localUser: LocalUserPayload): User {
	return {
		id: localUser.clientPrincipal.userId,
		email: dev
			? localUser.clientPrincipal.userDetails
			: localUser.clientPrincipal.claims.find((c) => c.typ === 'emails')!.val,
		onboarded:
			localUser.clientPrincipal.claims
				.find((c) => c.typ === 'extension_Onboarded')
				?.val.toLowerCase() === 'true',
		name: localUser.clientPrincipal.claims.find((c) => c.typ === 'extension_FullName')?.val ?? '',
		roles: localUser.clientPrincipal.userRoles
	};
}

export function mapDBCompanyRiskCategoryToRiskCategory(
	dbCompanyRiskCategory: DBCompanyRiskCategory
): RiskCategory {
	return {
		id: dbCompanyRiskCategory.Id,
		name: dbCompanyRiskCategory.CategoryName
	};
}
