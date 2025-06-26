export interface BlogPost {
  id: number;
  authorId: string;
  title: string;
  content: string | null;
  published: boolean | false;
  createdAt: string;
  updatedAt: string;
  viewsCount: number | 0;
}
