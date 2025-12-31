import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { getCategories } from '../modules/category/application/getCategories.useCase';
import type { Category } from '../modules/category/domain/category.types';
import { SiteHeader } from '../modules/layout/presentation/siteHeader';
import Footer from '../modules/layout/presentation/siteFooter';
import { Suspense } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Alzaf Store',
    template: 'Alzaf Store',
  },
  description: 'Your one-stop shop for quality products. Built by Mohammad Selim.',
  keywords: ['e-commerce', 'shop', 'products', 'alzaf'],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-slate-50`}
      >
        {/* Header */}
        <Suspense fallback={<div className="h-18 bg-white shadow-sm" />}>
          <SiteHeader categories={categories} />
        </Suspense>

        {/* Main Content */}
        <main className="flex-1 relative">
          <div className="absolute inset-0 bg-white -z-10 opacity-40 mix-blend-multiply pointer-events-none" />
          <div className="container mx-auto px-4 py-8 md:py-12 animate-fade-in">
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer categories={categories} />

      </body>
    </html>
  );
}
