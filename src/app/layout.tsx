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
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        <AuthProvider>
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-y-auto">
              {children}
            </main>
          </div>
          <footer className="w-full text-center py-4 text-sm text-slate-500 border-t border-slate-900 bg-slate-950/80">
            Design and developed by Rounak Saha
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
