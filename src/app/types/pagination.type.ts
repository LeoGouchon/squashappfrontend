export type PaginatedResponse<T> = {
    content: T[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
}

export type PaginatedRequest = {
    page: number;
    size: number;
}
