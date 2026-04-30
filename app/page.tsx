"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Sparkles, 
  Zap, 
  Loader2, 
  Copy, 
  CheckCircle2, 
  Lightbulb, 
  TrendingUp, 
  MessageSquare,
  Hash
} from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

interface GenerationResult {
  hooks: string[];
  caption: string;
  hashtags: string[];
  engagementSuggestions: string;
  analyticsFeedback: string;
}

interface HistoryEntry {
  id: string;
  prompt: string;
  timestamp: number;
  result: GenerationResult;
}

import { useEffect, useRef } from "react";
import { Menu, History, Plus, Send } from "lucide-react";

export default function Home() {
  const [contentIdea, setContentIdea] = useState("");
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resultTopRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("hookify_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("hookify_history", JSON.stringify(history));
  }, [history]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [contentIdea]);

  // Scroll to results when they appear
  useEffect(() => {
    if (result && resultTopRef.current) {
      resultTopRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate content");
      }
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
      const newEntry: HistoryEntry = {
        id: Date.now().toString(),
        prompt: contentIdea,
        timestamp: Date.now(),
        result: data,
      };
      setHistory((prev) => [newEntry, ...prev]);
    },
  });

  const selectHistoryEntry = (entry: HistoryEntry) => {
    setContentIdea(entry.prompt);
    setResult(entry.result);
  };

  const startNewChat = () => {
    setContentIdea("");
    setResult(null);
  };

  const handleGenerate = () => {
    if (!contentIdea.trim()) return;
    mutation.mutate(contentIdea);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#020617] overflow-hidden text-slate-900 dark:text-slate-100">
      {/* Sidebar - Prompt History */}
      <aside 
        className={cn(
          "flex flex-col bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out",
          isSidebarOpen ? "w-72" : "w-0 overflow-hidden"
        )}
      >
        <div className="p-4 flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={startNewChat}
            className="flex-1 mr-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 justify-start gap-2"
          >
            <Plus className="h-4 w-4" />
            New Hook
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(false)}
            className="text-slate-500"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Previous Prompts
          </div>
          {history.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-slate-400 italic">
              No history yet
            </div>
          ) : (
            history.map((entry) => (
              <button
                key={entry.id}
                onClick={() => selectHistoryEntry(entry)}
                className="w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors truncate flex items-center gap-2"
              >
                <History className="h-3.5 w-3.5 text-slate-400" />
                <span className="truncate">{entry.prompt}</span>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#020617]/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white glow-indigo group-hover:scale-110 transition-transform">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-glow">
                  Hookify
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium">
                  Future Content Gen
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">V4.0 Futuristic</span>
            </div>
          </div>
        </header>

        {/* Results Scroll Area */}
        <div className="flex-1 overflow-y-auto pb-32 pt-8">
          <div ref={resultTopRef} />
          <div className="max-w-3xl mx-auto px-4 md:px-8 space-y-12">
            {!result && !mutation.isPending && (
              <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 blur-3xl bg-indigo-500/20 rounded-full" />
                  <div className="relative h-20 w-20 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800 animate-bounce">
                    <Sparkles className="h-10 w-10 text-indigo-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    What are we creating today?
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Transform your ideas into high-converting social media hooks and captions.
                  </p>
                </div>
              </div>
            )}

            {mutation.isPending && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="relative">
                  <div className="h-16 w-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-indigo-600 animate-pulse" />
                  </div>
                </div>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium animate-pulse">
                  AI is crafting your viral content...
                </p>
              </div>
            )}

            {result && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Section Header */}
                <div className="flex items-center gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  <h2 className="text-lg font-bold">Suggested Hooks</h2>
                </div>

                {/* Hooks Cards */}
                <div className="grid gap-4">
                  {result.hooks.map((hook, index) => (
                    <div 
                      key={index}
                      className="group relative glass dark:glass-dark p-6 rounded-2xl hover:border-indigo-500/50 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 space-y-1">
                          <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Option 0{index + 1}</div>
                          <p className="text-lg font-medium leading-relaxed">
                            {hook}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(hook, index)}
                          className="h-10 w-10 rounded-xl hover:bg-indigo-500/10 hover:text-indigo-500 transition-colors"
                        >
                          {copiedIndex === index ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Copy className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Caption Section */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-lg font-bold">Generated Caption</h2>
                  </div>
                  <div className="relative group glass dark:glass-dark p-6 rounded-2xl">
                    <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {result.caption}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {result.hashtags.map((tag, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold border border-indigo-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(result.caption, 99)}
                      className="absolute top-4 right-4 h-10 w-10 rounded-xl hover:bg-indigo-500/10 hover:text-indigo-500"
                    >
                      {copiedIndex === 99 ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Strategy Cards */}
                <div className="grid md:grid-cols-2 gap-6 pt-4">
                  <div className="glass dark:glass-dark p-6 rounded-2xl border-l-4 border-l-indigo-500">
                    <div className="flex items-center gap-3 mb-3 text-indigo-600 dark:text-indigo-400">
                      <TrendingUp className="h-5 w-5" />
                      <h3 className="font-bold uppercase text-xs tracking-wider">Engagement Strategy</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {result.engagementSuggestions}
                    </p>
                  </div>
                  <div className="bg-slate-900 p-6 rounded-2xl border border-indigo-500/30 text-white glow-indigo">
                    <div className="flex items-center gap-3 mb-3 text-indigo-400">
                      <Zap className="h-5 w-5" />
                      <h3 className="font-bold uppercase text-xs tracking-wider">The Logic</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-300 italic">
                      "{result.analyticsFeedback}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Input Area (ChatGPT Style) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent dark:from-[#020617] dark:via-[#020617] dark:to-transparent pt-12 pb-8 px-4 z-20">
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
            <div className="relative glass dark:glass-dark rounded-2xl p-2 flex flex-col items-end border-slate-200 dark:border-slate-800 group-focus-within:border-indigo-500/50 transition-all shadow-2xl">
              <textarea
                ref={textareaRef}
                value={contentIdea}
                onChange={(e) => setContentIdea(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
                placeholder="Message Hookify..."
                className="w-full bg-transparent border-0 focus:ring-0 resize-none py-3 px-4 text-lg min-h-[56px] max-h-[200px] placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
              <div className="flex items-center justify-between w-full px-2 pb-1">
                <div className="text-[10px] text-slate-400 dark:text-slate-600 px-2">
                  Shift + Enter for new line
                </div>
                <Button 
                  onClick={handleGenerate}
                  disabled={mutation.isPending || !contentIdea.trim()}
                  className={cn(
                    "h-10 w-10 rounded-xl transition-all glow-indigo",
                    contentIdea.trim() ? "bg-indigo-600 text-white scale-100" : "bg-slate-200 dark:bg-slate-800 text-slate-400 scale-90"
                  )}
                  size="icon"
                >
                  {mutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
            <p className="text-[10px] text-center mt-3 text-slate-400 dark:text-slate-600">
              Hookify can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
