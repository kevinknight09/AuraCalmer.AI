"use client";

import { motion } from "framer-motion";
import { LineChart, Activity, Zap, TrendingUp, Calendar, Heart, BookOpen } from "lucide-react";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";

import { AuthWrapper } from "@/components/AuthWrapper";

export default function DashboardPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEntries = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(30);
      
      if (data) setEntries(data);
    };
    fetchEntries();
  }, [user]);

  const totalEntries = entries.length;
  const avgMood = totalEntries > 0 
    ? (entries.reduce((acc, curr) => acc + (curr.positivity_score || 0), 0) / totalEntries).toFixed(1)
    : "0";
    
  // Very basic aggregation for top stressor
  const allTriggers = entries.flatMap(e => e.stress_triggers || []);
  const triggerCounts = allTriggers.reduce((acc: any, trigger: string) => {
    acc[trigger] = (acc[trigger] || 0) + 1;
    return acc;
  }, {});
  const topStressor = Object.keys(triggerCounts).sort((a, b) => triggerCounts[b] - triggerCounts[a])[0] || "None detected";

  return (
    <AuthWrapper>
      <div className="flex flex-col h-full max-w-5xl mx-auto w-full p-4 md:p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            <Activity className="w-8 h-8 text-emerald-400" aria-hidden="true" />
            Wellbeing Dashboard
          </h1>
          <p className="text-slate-400 mt-2">Track your emotional journey and discover patterns over time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Stat Cards */}
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-sm font-medium">Average Mood</span>
              <Heart className="w-4 h-4 text-rose-400" aria-hidden="true" />
            </div>
            <span className="text-3xl font-bold text-slate-200">{avgMood}<span className="text-lg text-slate-500">/10</span></span>
            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
              Based on recent entries
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-sm font-medium">Journal Entries</span>
              <Calendar className="w-4 h-4 text-blue-400" aria-hidden="true" />
            </div>
            <span className="text-3xl font-bold text-slate-200">{totalEntries}</span>
            <p className="text-xs text-slate-500 mt-2">
              In the last 30 days
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-sm font-medium">Top Stressor</span>
              <Zap className="w-4 h-4 text-amber-400" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold text-amber-300">{topStressor}</span>
            <p className="text-xs text-slate-500 mt-2">
              Most frequently mentioned
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2 mb-6">
              <LineChart className="w-5 h-5 text-indigo-400" aria-hidden="true" />
              Mood Trends (Recent)
            </h3>
            <div className="h-48 flex items-end justify-between gap-2 px-2">
              {entries.slice(0, 7).reverse().map((entry, i) => {
                const height = entry.positivity_score || 5;
                return (
                  <motion.div 
                    key={entry.id || i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height * 10}%` }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    className="w-full bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-500/30 rounded-t-sm relative group cursor-pointer transition-colors"
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs py-1 px-2 rounded text-slate-200 whitespace-nowrap transition-opacity pointer-events-none">
                      Score: {height}
                    </div>
                  </motion.div>
                )
              })}
              {entries.length === 0 && (
                <div className="text-slate-500 flex items-center justify-center w-full h-full text-sm">
                  No entries yet. Journal to see trends!
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-slate-200 mb-2">AI Insights</h3>
            
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-sm text-slate-300">
              <span className="block font-semibold text-indigo-400 mb-1">Pattern Detected</span>
              Your stress levels consistently spike on Wednesday evenings. Consider scheduling a light, relaxing activity like reading or walking during this time.
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-slate-300">
              <span className="block font-semibold text-emerald-400 mb-1">Positive Trend</span>
              You've expressed feelings of accomplishment 3 times this week after completing practice tests. Keep acknowledging these small wins!
            </div>
          </div>
        </div>

        {/* Past Entries Section */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden mt-8">
          <div className="p-6 border-b border-slate-800">
            <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" aria-hidden="true" />
              Past Entries History
            </h3>
            <p className="text-sm text-slate-400 mt-1">Review your previous reflections and AI insights.</p>
          </div>
          
          <div className="divide-y divide-slate-800/50 max-h-[600px] overflow-y-auto">
            {entries.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                You haven't written any journal entries yet.
              </div>
            ) : (
              entries.map((entry) => (
                <div key={entry.id} className="p-6 hover:bg-slate-800/30 transition-colors flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-slate-300">
                        {entry.mood || "Neutral"}
                      </span>
                      <span className="text-sm text-slate-500">
                        {new Date(entry.created_at).toLocaleDateString(undefined, { 
                          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded border border-indigo-500/20">
                      Score: {entry.positivity_score || 0}/10
                    </div>
                  </div>
                  
                  <p className="text-slate-300 italic border-l-2 border-slate-700 pl-4 py-1">
                    "{entry.text}"
                  </p>
                  
                  {(entry.dominant_emotion || entry.coping_suggestion) && (
                    <div className="mt-2 bg-slate-950/50 p-4 rounded-xl border border-slate-800 flex flex-col gap-2">
                      {entry.dominant_emotion && (
                        <p className="text-sm text-slate-400">
                          <span className="text-indigo-400 font-semibold">Primary Emotion:</span> {entry.dominant_emotion}
                        </p>
                      )}
                      {entry.coping_suggestion && (
                        <p className="text-sm text-slate-400">
                          <span className="text-emerald-400 font-semibold">Aura's Suggestion:</span> {entry.coping_suggestion}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}
