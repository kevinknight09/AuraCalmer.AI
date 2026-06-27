"use client";

import { useAuth } from "./AuthProvider";
import { LoginForm } from "./LoginForm";
import { Loader2 } from "lucide-react";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <>{children}</>;
}
