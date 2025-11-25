export interface Certificate {
	id: number;
	name: string;
	issuingOrg: string;
	dateIssued: Date;
	dateExpired: Date | null;
	credentialId: string | null;
	credentialUrl: string | null;
}
