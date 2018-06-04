export interface ApiResponse<T> {
    status: string;
    code: ApiResponseResult;
    messages: string[];
    result: T;
}

export enum ApiResponseResult {
    success = 200,
    error = 500
}

export interface PaginationResponse<T> {
    metadata: Pagination;
    records: T[];
}

export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
}

export interface PaginationQuery {
    PageSize: number;
    PageIndex: number;
}
