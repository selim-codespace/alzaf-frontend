import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CategoryNav } from "../modules/category/presentation/category-nav";
import { getCategories } from "../modules/category/application/get-categories.use-case";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alzaf Task",
  description: "Alzaf Task Develop By Mohammad Selim",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const categories = await getCategories();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">E-Commerce Store</h1>
          </div>
        </header>
        <CategoryNav categories={categories} />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
