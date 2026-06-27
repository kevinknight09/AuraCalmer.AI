"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Smile, Meh, Frown, Sparkles, AlertCircle, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const moods = [
  { label: "Great", icon: Smile, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Okay", icon: Meh, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Stressed", icon: Frown, color: "text-rose-400", bg: "bg-rose-500/10" },
];

interface AnalysisResult {
  dominantEmotion: string;
  stressTriggers: string[];
  copingSuggestion: string;
  positivityScore: number;
}

export default function JournalPage() {
  const [text, setText] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mood: selectedMood }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
        setText("");
        setSelectedMood(null);
      } else {
        console.error("Failed to analyze");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-8 flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">Journal & Reflect</h1>
        <p className="text-slate-400 mt-2">A safe space to pour your thoughts. We'll help you unpack them.</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col gap-6">
          <div>
            <label className="text-sm font-medium text-slate-400 mb-3 block">How are you feeling right now?</label>
            <div className="flex gap-3" role="group" aria-label="Mood selector">
              {moods.map((mood) => {
                const isSelected = selectedMood === mood.label;
                return (
                  <button
                    key={mood.label}
                    aria-label={`Select mood ${mood.label}`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedMood(mood.label)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300",
                      isSelected 
                        ? `border-${mood.color.split("-")[1]}-500 ${mood.bg} ${mood.color}` 
                        : "border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-800/50"
                    )}
                  >
                    <mood.icon className="w-4 h-4" aria-hidden="true" />
                    <span className="text-sm font-medium">{mood.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <textarea
            aria-label="Journal Entry"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind? Don't hold back..."
            className="w-full bg-transparent text-slate-200 placeholder-slate-600 resize-none outline-none min-h-[200px] text-lg leading-relaxed"
          />

          <div className="flex justify-end pt-4 border-t border-slate-800/50">
            <Button 
              onClick={handleAnalyze} 
              disabled={!text.trim() || isAnalyzing}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-2 h-auto flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze Entry
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="bg-indigo-500/10 border border-indigo-500/20 p-5 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold">
                <Heart className="w-5 h-5" />
                <h3>Emotional Insight</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Your primary emotion seems to be <span className="font-bold text-indigo-300">{result.dominantEmotion}</span>. 
                Your overall positivity score is {result.positivityScore}/10.
              </p>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Sparkles className="w-5 h-5" />
                <h3>Coping Strategy</h3>
              </div>
              <p className="text-slate-300 text-sm">
                {result.copingSuggestion}
              </p>
            </div>

            {result.stressTriggers.length > 0 && (
              <div className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-xl md:col-span-2 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-rose-400 font-semibold">
                  <AlertCircle className="w-5 h-5" />
                  <h3>Detected Triggers</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.stressTriggers.map((trigger, i) => (
                    <span key={i} className="px-3 py-1 bg-rose-500/20 text-rose-300 text-xs rounded-full border border-rose-500/20">
                      {trigger}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
