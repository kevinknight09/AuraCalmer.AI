"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 text-center max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-indigo-500/30">
          <Sparkles className="w-10 h-10 text-indigo-400" />
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-100 mb-6 leading-tight">
          Find your center with <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">AuraCalmer.AI</span>
        </h1>
        
        <p className="text-xl text-slate-400 mb-6 max-w-2xl mx-auto">
          Your intelligent digital companion for academic stress. Log your thoughts, chat with an empathetic AI, and uncover emotional insights.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium mb-10">
          <Sparkles className="w-4 h-4" />
          <span>Keep all your test worries behind</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/journal"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-all hover:scale-105"
          >
            Start Journaling
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/companion"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full font-semibold transition-all"
          >
            Chat with Aura
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
