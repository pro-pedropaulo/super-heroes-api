export interface IPageResponse<T> {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  content: T[];
}
