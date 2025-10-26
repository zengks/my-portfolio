export interface Certificate {
	id: number;
	name: string | null;
	certNumber: string | null;
	dateIssued: Date | null;
	dateExpired: Date | null;
}
