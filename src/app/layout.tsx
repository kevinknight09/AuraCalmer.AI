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
      <body className="min-h-full flex bg-slate-950 text-slate-100 font-sans">
        <Sidebar />
        <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
