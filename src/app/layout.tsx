import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AuraCalmer.AI - Your Digital Wellbeing Companion",
  description: "A generative AI-powered solution helping students monitor and improve mental well-being.",
};

import { AuthProvider } from "@/components/AuthProvider";
import { AuthWrapper } from "@/components/AuthWrapper";
import { MobileNav } from "@/components/MobileNav";
import { MobileHeader } from "@/components/MobileHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} antialiased h-full`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans pb-16 md:pb-0">
        <AuthProvider>
          <div className="flex flex-1 overflow-hidden relative">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-y-auto">
              <MobileHeader />
              {children}
            </main>
            <MobileNav />
          </div>
          <footer className="w-full text-center py-4 text-sm text-slate-500 border-t border-slate-900 bg-slate-950/80 mb-16 md:mb-0">
            Design and developed by Rounak Saha
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
