'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CategoryNav } from '@/src/modules/category/presentation/categoryNav';
import type { Category } from '@/src/modules/category/domain/category.types';

interface SiteHeaderProps {
    categories: Category[];
}

export function SiteHeader({ categories }: SiteHeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
                <div className="container mx-auto px-4 h-18 flex items-center justify-between">

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Branding - Centered on Mobile, Left on Desktop */}
                    <Link href="/" className="flex items-center gap-2 group absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                        <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-lg cursor-pointer transition-transform group-hover:scale-105 group-hover:rotate-3 shadow-lg shadow-blue-500/30">
                            A
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 hidden md:block">
                            Alzaf Store
                        </span>
                        <span className="text-xl font-bold text-gray-900 md:hidden">
                            Alzaf
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors relative group"
                        >
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full" />
                        </Link>
                        <Link
                            href="/?sort=price-asc"
                            className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors relative group"
                        >
                            Deals
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full" />
                        </Link>
                    </nav>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-500 hover:text-green-600 transition-colors relative group">
                            <span className="sr-only">Cart</span>
                            
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white transform scale-0 group-hover:scale-100 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Integrated Category Nav */}
                <CategoryNav categories={categories} />
            </header>

            {/* Mobile Menu Backdrop & Drawer */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute top-0 left-0 w-[80%] max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col gap-6 animate-slide-in-left">
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900">Menu</span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-full"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <nav className="flex flex-col gap-4 text-lg font-medium text-gray-700">
                            <Link
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-between py-2 border-b border-gray-100"
                            >
                                Home
                                <span className="text-gray-400">→</span>
                            </Link>
                            <Link
                                href="/?sort=price-asc"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-between py-2 border-b border-gray-100"
                            >
                                Deals
                                <span className="text-gray-400">→</span>
                            </Link>
                            <Link
                                href="/?sort=rating-desc"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-between py-2 border-b border-gray-100"
                            >
                                Top Rated
                                <span className="text-gray-400">→</span>
                            </Link>
                        </nav>

                        <div className="mt-auto">
                            <p className="text-sm text-gray-400">© 2025 Alzaf Store</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
