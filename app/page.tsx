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
import Image from "next/image";

export default function Home() {
  const [contentIdea, setContentIdea] = useState("");
  const [activePrompt, setActivePrompt] = useState("");
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
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
        prompt: activePrompt,
        timestamp: Date.now(),
        result: data,
      };
      setHistory((prev) => [newEntry, ...prev]);
    },
  });

  // Scroll to results when they appear
  useEffect(() => {
    if ((result || mutation.isPending) && resultTopRef.current) {
      resultTopRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result, mutation.isPending]);

  const selectHistoryEntry = (entry: HistoryEntry) => {
    setActivePrompt(entry.prompt);
    setContentIdea("");
    setResult(entry.result);
  };

  const startNewChat = () => {
    setContentIdea("");
    setActivePrompt("");
    setResult(null);
  };

  const handleGenerate = () => {
    if (!contentIdea.trim()) return;
    const promptToSend = contentIdea.trim();
    setActivePrompt(promptToSend);
    setContentIdea("");
    setResult(null);
    mutation.mutate(promptToSend);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#020617] text-slate-100 overflow-hidden font-sans">
      {/* Header */}
      <header className="flex-none flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#020617]/80 backdrop-blur-md z-30">
        <div className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden group-hover:scale-110 transition-transform relative">
            <Image 
              src="/hookify.png" 
              alt="Hookify Logo" 
              fill
              className="object-cover"
            />
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
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={startNewChat}
            className="text-slate-400 hover:text-white hover:bg-slate-800 gap-2"
          >
            <Plus className="h-4 w-4" />
            New
          </Button>
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-900/30 border border-indigo-800">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-xs font-medium text-indigo-300">V4.1 Dark</span>
          </div>
        </div>
      </header>

      {/* Top History Bar */}
      {history.length > 0 && (
        <div className="flex-none bg-[#020617] border-b border-slate-800/50 py-3 px-4 z-20 overflow-hidden">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
            <div className="flex-none flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2 border-r border-slate-800 pr-4">
              <History className="h-3 w-3" />
              History
            </div>
            {history.map((entry) => (
              <button
                key={entry.id}
                onClick={() => selectHistoryEntry(entry)}
                className="flex-none max-w-[150px] px-3 py-1.5 text-xs rounded-full bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800 transition-all truncate text-slate-400 hover:text-slate-200"
              >
                {entry.prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {/* Results Scroll Area */}
        <div className="flex-1 overflow-y-auto pb-40 pt-8">
          <div ref={resultTopRef} />
          <div className="max-w-3xl mx-auto px-6 md:px-8 space-y-12">
            {!activePrompt && !mutation.isPending && (
              <div className="h-[50vh] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-700">
                <div className="relative">
                  <div className="absolute inset-0 blur-3xl bg-indigo-500/20 rounded-full" />
                  <div className="relative h-24 w-24 rounded-3xl bg-slate-900 flex items-center justify-center border border-slate-800 glow-indigo">
                    <Sparkles className="h-12 w-12 text-indigo-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold tracking-tight text-white">
                    What are we creating?
                  </h2>
                  <p className="text-slate-400 max-w-sm mx-auto text-lg">
                    Type your idea below to generate high-converting viral hooks.
                  </p>
                </div>
              </div>
            )}

            {/* Active Prompt (User Message) */}
            {activePrompt && (
              <div className="flex justify-end animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="max-w-[80%] bg-indigo-600/20 border border-indigo-500/30 rounded-2xl px-6 py-4 text-slate-200">
                  <p className="text-lg leading-relaxed">{activePrompt}</p>
                </div>
              </div>
            )}

            {mutation.isPending && (
              <div className="flex flex-col items-center justify-center py-20 space-y-6">
                <div className="relative">
                  <div className="h-20 w-20 border-4 border-indigo-600/10 border-t-indigo-600 rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="h-8 w-8 text-indigo-600 animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-indigo-400 font-bold tracking-widest uppercase text-xs">Processing</p>
                  <p className="text-slate-400 animate-pulse text-sm">AI is crafting your viral content...</p>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Hooks Cards */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <h2 className="text-lg font-bold tracking-tight">Suggested Hooks</h2>
                  </div>
                  <div className="grid gap-4">
                    {result.hooks.map((hook, index) => (
                      <div 
                        key={index}
                        className="group relative glass-dark p-6 rounded-2xl hover:border-indigo-500/50 transition-all duration-300"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 space-y-1">
                            <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Option 0{index + 1}</div>
                            <p className="text-lg font-medium leading-relaxed text-slate-100">
                              {hook}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(hook, index)}
                            className="h-10 w-10 rounded-xl hover:bg-indigo-500/10 hover:text-indigo-500 transition-colors flex-none"
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
                </div>

                {/* Caption Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
                    <MessageSquare className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-lg font-bold tracking-tight">Generated Caption</h2>
                  </div>
                  <div className="relative group glass-dark p-6 rounded-3xl border-indigo-500/10 shadow-indigo-500/5 shadow-2xl">
                    <p className="text-slate-300 whitespace-pre-wrap leading-relaxed text-lg">
                      {result.caption}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-8">
                      {result.hashtags.map((tag, i) => (
                        <span 
                          key={i}
                          className="px-4 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-xl text-xs font-bold border border-indigo-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(result.caption, 99)}
                      className="absolute top-4 right-4 h-12 w-12 rounded-2xl hover:bg-indigo-500/10 hover:text-indigo-500"
                    >
                      {copiedIndex === 99 ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <Copy className="h-6 w-6" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Strategy Cards */}
                <div className="grid md:grid-cols-2 gap-6 pt-6 pb-12">
                  <div className="glass-dark p-6 rounded-3xl border-l-4 border-l-indigo-500">
                    <div className="flex items-center gap-3 mb-4 text-indigo-400">
                      <TrendingUp className="h-5 w-5" />
                      <h3 className="font-bold uppercase text-[10px] tracking-[0.2em]">Strategy</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400">
                      {result.engagementSuggestions}
                    </p>
                  </div>
                  <div className="bg-slate-900/50 p-6 rounded-3xl border border-indigo-500/20 glow-indigo">
                    <div className="flex items-center gap-3 mb-4 text-indigo-400">
                      <Zap className="h-5 w-5" />
                      <h3 className="font-bold uppercase text-[10px] tracking-[0.2em]">Logic</h3>
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

        {/* Fixed Input Area (ChatGPT Style - Side by Side) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#020617] via-[#020617] to-transparent pt-12 pb-10 px-6 z-30">
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-10 group-focus-within:opacity-25 transition duration-700" />
            <div className="relative glass-dark rounded-[2rem] p-3 flex items-end gap-3 border-slate-800 group-focus-within:border-indigo-500/50 transition-all shadow-2xl">
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
                placeholder="Describe your content idea..."
                className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none outline-none resize-none py-4 px-5 text-lg min-h-[64px] max-h-[200px] placeholder:text-slate-600 text-white"
              />
              <Button 
                onClick={handleGenerate}
                disabled={mutation.isPending || !contentIdea.trim()}
                className={cn(
                  "h-14 w-14 rounded-2xl transition-all duration-300 flex-none mb-1",
                  contentIdea.trim() 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 glow-indigo" 
                    : "bg-slate-800 text-slate-600 opacity-50"
                )}
                size="icon"
              >
                {mutation.isPending ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Send className="h-6 w-6" />
                )}
              </Button>
            </div>
            <div className="flex justify-center gap-8 mt-4">
              <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-medium">
                Enter to Generate
              </p>
              <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-medium">
                Shift + Enter for new line
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
