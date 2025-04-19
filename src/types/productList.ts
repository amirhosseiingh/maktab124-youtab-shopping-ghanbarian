import { Product } from "./order";

export interface ProductsResponse {
  records: Product[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  recordsPerPage: number | null;
}