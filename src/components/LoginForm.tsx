"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Sparkles, Loader2, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Success! Please check your email for a confirmation link, or log in if auto-confirm is enabled.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm relative overflow-hidden">
        {/* Decorative Blur */}
        <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Aura</h1>
          <p className="text-slate-400 text-sm">Your empathetic digital companion.</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-slate-500"
              />
            </div>
          </div>
          
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-slate-500"
              />
            </div>
          </div>

          {error && <p className="text-rose-400 text-sm text-center bg-rose-500/10 py-2 rounded-lg">{error}</p>}
          {message && <p className="text-emerald-400 text-sm text-center bg-emerald-500/10 py-2 rounded-lg">{message}</p>}

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 h-auto flex items-center justify-center gap-2 mt-4 transition-all"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isSignUp ? "Create Account" : "Sign In")}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            type="button"
          >
            {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
