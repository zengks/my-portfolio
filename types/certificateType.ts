export interface Certificate {
	id: number;
	name: string;
	issuingOrg: string;
	companyLogoUrl: string | null;
	dateIssued: Date;
	dateExpired: Date | null;
	credentialId: string | null;
	credentialUrl: string | null;
}
