// src/app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import I18nProvider from "../contexts/I18nProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NAFIR",
  description: "منصة الاستدعاء العاجل NAFIR",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-950`}>
        <I18nProvider>
          {/* Header */}
          <header className="bg-white dark:bg-gray-900 border-b dark:border-white/10">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
              <Link href="/" className="font-extrabold text-xl text-gray-900 dark:text-white">
                NAFIR
              </Link>

              <nav className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <Link href="/recall-flow" className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  سير الاستدعاء
                </Link>

                {/* الجديد: صفحة المزايا */}
                <Link href="/features" className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  المزايا
                </Link>

                {/* احتفظنا برابط كيف يعمل */}
                <Link href="/how-it-works" className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  كيف يعمل
                </Link>

                {/* شارة توضيحية للغة الحالية */}
                <span className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-default">
                  النسخة العربية
                </span>
              </nav>
            </div>
          </header>

          {/* Page content */}
          <main>{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}
