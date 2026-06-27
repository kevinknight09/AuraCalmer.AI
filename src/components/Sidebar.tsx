"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, BookOpen, MessageSquare, BarChart2, Settings } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a utils file for cn, otherwise I'll create one.

import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";
import { LogOut, User as UserIcon } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "Companion", href: "/companion", icon: MessageSquare },
  { name: "Insights", href: "/dashboard", icon: BarChart2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/50 backdrop-blur-xl h-full flex flex-col hidden md:flex">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <span className="text-indigo-400 font-bold text-xl">A</span>
          </div>
          <span className="font-bold text-lg text-slate-200 tracking-tight">AuraCalmer.AI</span>
        </Link>
      </div>

      <nav aria-label="Main Navigation" className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.name}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative group",
                isActive ? "text-indigo-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-indigo-500/10 rounded-lg border border-indigo-500/20"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className="w-4 h-4 relative z-10" aria-hidden="true" />
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 flex flex-col gap-2">
        <button aria-label="Settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 w-full transition-colors">
          <Settings className="w-4 h-4" aria-hidden="true" />
          <span>Settings</span>
        </button>
        
        {user ? (
          <div className="mt-2 pt-2 border-t border-slate-800/50 flex flex-col gap-3">
            <div className="flex items-center gap-3 px-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                <UserIcon className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs text-slate-500 font-medium">Logged in as</span>
                <span className="text-sm text-slate-300 truncate" title={user.email}>{user.email}</span>
              </div>
            </div>
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 w-full transition-colors"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <Link 
            href="/journal"
            className="flex items-center justify-center gap-2 mt-2 px-3 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Sign In / Register
          </Link>
        )}
      </div>
    </aside>
  );
}
