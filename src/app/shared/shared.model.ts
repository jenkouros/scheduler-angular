export interface ApiResponse<T> {
    status: string;
    code: number;
    messages: string[];
    result: T;
}

export interface PaginationResponse<T> {
    metadata: Pagination;
    records: T[];
}

export interface Pagination {
    page: number;
    page_size: number;
    page_count: number;
    total_count: number;
}
