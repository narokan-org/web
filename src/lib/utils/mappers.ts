import type { DBCompany } from '$lib/common/entities/db-company';
import type { DBUser } from '$lib/common/entities/db-user';

import type { Company } from '$lib/common/models/company';
import type { User } from '$lib/common/models/user';

export function mapDBCompanyToCompany(dbCompany: DBCompany): Company {
	return {
		id: dbCompany.Id,
		name: dbCompany.Name
	};
}

export function mapDBUserToUser(dbUser: DBUser): User {
	return { id: dbUser.Id, email: dbUser.Email, onboarded: dbUser.Onboarded };
}
