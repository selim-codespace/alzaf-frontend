'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { Pagination as PaginationType } from '../domain/types';

interface PaginationProps {
    pagination: PaginationType;
}

export function Pagination({ pagination }: PaginationProps) {
    const searchParams = useSearchParams();
    const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(page));
        return `/?${params.toString()}#products`;
    };

    if (totalPages <= 1) return null;


    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showPages = 5;

        let start = Math.max(1, currentPage - Math.floor(showPages / 2));
        let end = Math.min(totalPages, start + showPages - 1);


        if (end - start < showPages - 1) {
            start = Math.max(1, end - showPages + 1);
        }

        if (start > 1) {
            pages.push(1);
            if (start > 2) pages.push('...');
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <nav className="flex items-center justify-center gap-1 mt-8" aria-label="Pagination">
            {/* Previous Button */}
            {hasPrevPage ? (
                <Link
                    href={createPageUrl(currentPage - 1)}
                    className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                    aria-label="Previous page"
                >
                    Prev
                </Link>
            ) : (
                <span className="px-3 py-2 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed">
                    Prev
                </span>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) =>
                    typeof page === 'number' ? (
                        <Link
                            key={index}
                            href={createPageUrl(page)}
                            className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg transition-colors ${page === currentPage
                                ? 'bg-green-600 text-white font-medium'
                                : 'border border-gray-300 hover:bg-gray-50'
                                }`}
                            aria-current={page === currentPage ? 'page' : undefined}
                        >
                            {page}
                        </Link>
                    ) : (
                        <span
                            key={index}
                            className="min-w-[40px] h-10 flex items-center justify-center text-gray-400"
                        >
                            {page}
                        </span>
                    )
                )}
            </div>

            {/* Next Button */}
            {hasNextPage ? (
                <Link
                    href={createPageUrl(currentPage + 1)}
                    className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                    aria-label="Next page"
                >
                    Next
                </Link>
            ) : (
                <span className="px-3 py-2 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed">
                    Next
                </span>
            )}
        </nav>
    );
}
