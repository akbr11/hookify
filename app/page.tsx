import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-slate-900/80">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              hookify
            </span>
          </div>
        </div>
      </header>

      {/* Hero / Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Generate Engaging Content Hooks in Seconds
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Turn your simple ideas into viral-ready content for social media.
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 dark:bg-slate-900 dark:border-slate-800">
            <div className="space-y-2">
              <label 
                htmlFor="content-idea" 
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Describe your content idea
              </label>
              <Textarea 
                id="content-idea"
                placeholder="Ex: A 10-minute recipe for a healthy breakfast that anyone can make..."
                className="min-h-[150px] resize-none border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-700"
              />
            </div>
            <Button className="w-full h-12 text-base bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md hover:shadow-lg">
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Hooks
            </Button>
          </div>

          {/* Result Area Placeholder */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Your Results
            </h2>
            <div className="min-h-[200px] flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl bg-slate-100/50 p-12 text-center dark:border-slate-800 dark:bg-slate-900/50">
              <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center mb-4 dark:bg-slate-800">
                <Sparkles className="h-6 w-6 text-slate-400" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 italic">
                Your generated hooks will appear here...
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-slate-500 dark:border-slate-800">
        <p>© {new Date().getFullYear()} Hookify. Built with Next.js & OpenRouter.</p>
      </footer>
    </div>
  );
}
