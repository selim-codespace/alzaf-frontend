export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    meta?: {
        pagination?: Pagination;
    };
}
