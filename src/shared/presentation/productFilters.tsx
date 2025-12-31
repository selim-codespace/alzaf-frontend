'use client';

import { SortOption } from '@/src/modules/product/domain/productFilter.types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useTransition, useEffect, useRef } from 'react'; 

const SORT_OPTIONS: { value: SortOption | ''; label: string }[] = [
    { value: '', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'rating-desc', label: 'Rating: Top Rated' },
];

export function ProductFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false); // Mobile Drawer State
    const [isFocused, setIsFocused] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

    const currentSort = searchParams.get('sort') || '';

    // Synchronize state with URL params
    useEffect(() => {
        setSearch(searchParams.get('search') || '');
        setMinPrice(searchParams.get('minPrice') || '');
        setMaxPrice(searchParams.get('maxPrice') || '');
    }, [searchParams]);

    const updateFilters = useCallback(
        (updates: Record<string, string | undefined>) => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('page');

            Object.entries(updates).forEach(([key, value]) => {
                if (value) params.set(key, value);
                else params.delete(key);
            });

            startTransition(() => {
                router.push(`/?${params.toString()}#products`);
            });
        },
        [router, searchParams]
    );

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilters({ search: search.trim() || undefined });
        searchInputRef.current?.blur();
    };

    const handlePriceBlur = () => {
        updateFilters({
            minPrice: minPrice || undefined,
            maxPrice: maxPrice || undefined,
        });
    };

    const clearSearch = () => {
        setSearch('');
        updateFilters({ search: undefined });
        searchInputRef.current?.focus();
    };

    const hasActiveFilters = minPrice || maxPrice || currentSort || search;

    const FilterControls = () => (
        <>
            {/* Price Inputs */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <span className="text-sm font-medium text-gray-700 md:text-gray-500">Price Range</span>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        onBlur={handlePriceBlur}
                        placeholder="Min"
                        className="w-24 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-black"
                    />
                    <span className="text-gray-300">-</span>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        onBlur={handlePriceBlur}
                        placeholder="Max"
                        className="w-24 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-black"
                    />
                </div>
                <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block" />
            </div>

            {/* Sort Dropdown */}
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                <span className="text-sm font-medium text-gray-700 md:hidden">Sort By</span>
                <div className="relative group w-full md:w-auto">
                    <select
                        value={currentSort}
                        onChange={(e) => updateFilters({ sort: e.target.value || undefined })}
                        className="w-full md:w-auto appearance-none bg-gray-50 md:bg-transparent border border-gray-200 md:border-none rounded-lg px-4 py-3 md:pl-3 md:pr-8 md:py-2 text-sm font-medium text-gray-700 hover:text-green-600 focus:outline-none cursor-pointer"
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="w-full mb-8 relative z-30">
            {/* Search Bar - Centerpiece */}
            <div className={`relative max-w-3xl mx-auto transition-all duration-300 ${isFocused ? '-translate-y-1' : ''}`}>
                <div className={`absolute inset-0 bg-blue-500/20 blur-2xl rounded-full transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />

                <form onSubmit={handleSearchSubmit} className="relative group">
                    <div className={`
                flex items-center w-full bg-white rounded-2xl shadow-soft transition-all duration-300 border border-transparent
                ${isFocused ? 'shadow-xl ring-4 ring-blue-500/10 border-blue-500/20' : 'hover:shadow-medium hover:border-gray-200'}
            `}>
                        <div className="pl-6 text-gray-400 group-focus-within:text-green-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <input
                            ref={searchInputRef}
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Search for anything..."
                            className="w-full bg-transparent px-4 py-5 text-lg text-gray-900 placeholder-gray-400 focus:outline-0 outline-0 focus:ring-0 focus:border-0 "
                        />

                        {/* Clear Button or Loading Spinner */}
                        <div className="pr-4 flex items-center gap-2">
                            {isPending ? (
                                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            ) : search ? (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            ) : null}
                        </div>
                    </div>
                </form>
            </div>

            {/* Filter Toolbar (Desktop) */}
            <div className="hidden md:flex mt-6 items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-2 p-1.5 bg-white/80 backdrop-blur-md rounded-xl border border-white/50 shadow-sm">
                    <FilterControls />
                </div>
            </div>

            {/* Mobile Filter Trigger */}
            <div className="md:hidden mt-4 flex justify-center">
                <button
                    onClick={() => setIsMobileDrawerOpen(true)}
                    className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                    Filters & Sort
                    {hasActiveFilters && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                </button>
            </div>

            {/* Mobile Filter Drawer (Overlay) */}
            {isMobileDrawerOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                        onClick={() => setIsMobileDrawerOpen(false)}
                    />

                    {/* Drawer Content */}
                    <div className="relative w-full max-w-sm h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                            <button
                                onClick={() => setIsMobileDrawerOpen(false)}
                                className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-full"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="p-6 flex-1 overflow-y-auto space-y-8">
                            <FilterControls />
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50 sticky bottom-0">
                            <button
                                onClick={() => setIsMobileDrawerOpen(false)}
                                className="w-full py-3 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
                            >
                                Show Results
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Active Filter Chips */}
            {hasActiveFilters && (
                <div className="flex flex-wrap justify-center gap-2 mt-4 px-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
                    {(minPrice || maxPrice) && (
                        <button
                            onClick={() => { setMinPrice(''); setMaxPrice(''); handlePriceBlur(); }}
                            className="group flex items-center gap-1.5 pl-3 pr-2 py-1 bg-white border border-blue-100 text-blue-700 rounded-full text-xs font-semibold shadow-sm hover:bg-blue-50 transition-all cursor-pointer"
                        >
                            Price: ${minPrice || 0} - ${maxPrice || '∞'}
                            <span className="p-0.5 rounded-full hover:bg-blue-200 transition-colors">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </span>
                        </button>
                    )}
                    {currentSort && (
                        <button
                            onClick={() => updateFilters({ sort: undefined })}
                            className="group flex items-center gap-1.5 pl-3 pr-2 py-1 bg-white border border-blue-100 text-blue-700 rounded-full text-xs font-semibold shadow-sm hover:bg-blue-50 transition-all cursor-pointer"
                        >
                            Sort: {SORT_OPTIONS.find(o => o.value === currentSort)?.label}
                            <span className="p-0.5 rounded-full hover:bg-blue-200 transition-colors">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
