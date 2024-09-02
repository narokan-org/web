export interface DBUserSurveyAnswer {
	UserId: string;
	TeamSize?: string;
	CompanyRole?:
		| 'Analyst'
		| 'C-Level'
		| 'Director'
		| 'Manager'
		| 'Specialist'
		| 'Stakeholder'
		| 'Other';
}
