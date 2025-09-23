export interface Certificate {
  id: number;
  userId: string;
  name: string | null;
  certNumber: string | null;
  dateIssued: string | null;
  dateExpired: string | null;
  createdAt: string;
  updatedAt: string;
}
