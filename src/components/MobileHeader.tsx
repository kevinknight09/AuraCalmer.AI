"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";
import { LogOut, User as UserIcon } from "lucide-react";

export function MobileHeader() {
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
          <span className="text-indigo-400 font-bold text-xl">A</span>
        </div>
        <span className="font-bold text-lg text-slate-200 tracking-tight">AuraCalmer.AI</span>
      </Link>
      
      {user ? (
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 font-medium">Logged in as</span>
            <span className="text-xs text-slate-300 max-w-[100px] truncate" title={user.email || ""}>
              {user.email}
            </span>
          </div>
          <button 
            onClick={handleSignOut}
            className="p-2 rounded-lg text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-colors"
            aria-label="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <Link 
          href="/journal"
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Sign In
        </Link>
      )}
    </div>
  );
}
