"use client";

import { motion } from "framer-motion";
import { LineChart, Activity, Zap, TrendingUp, Calendar, Heart } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
          <Activity className="w-8 h-8 text-emerald-400" />
          Wellbeing Dashboard
        </h1>
        <p className="text-slate-400 mt-2">Track your emotional journey and discover patterns over time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stat Cards */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-sm font-medium">Average Mood</span>
            <Heart className="w-4 h-4 text-rose-400" />
          </div>
          <span className="text-3xl font-bold text-slate-200">7.8<span className="text-lg text-slate-500">/10</span></span>
          <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3" /> +1.2 from last week
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-sm font-medium">Journal Entries</span>
            <Calendar className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-3xl font-bold text-slate-200">12</span>
          <p className="text-xs text-slate-500 mt-2">
            In the last 30 days
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-sm font-medium">Top Stressor</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-xl font-bold text-amber-300">Physics Exams</span>
          <p className="text-xs text-slate-500 mt-2">
            Mentioned in 4 entries
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2 mb-6">
            <LineChart className="w-5 h-5 text-indigo-400" />
            Mood Trends
          </h3>
          <div className="h-48 flex items-end justify-between gap-2 px-2">
            {/* Mock Chart Bars */}
            {[4, 6, 5, 8, 7, 9, 8].map((height, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height * 10}%` }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="w-full bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-500/30 rounded-t-sm relative group cursor-pointer transition-colors"
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs py-1 px-2 rounded text-slate-200 whitespace-nowrap transition-opacity pointer-events-none">
                  Score: {height}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-4 px-2">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
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
    </div>
  );
}
