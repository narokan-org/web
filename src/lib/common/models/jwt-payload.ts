export interface JwtPayload {
	identityProvider: string;
	userId: string;
	userDetails: string;
	userRoles: string[];
}
