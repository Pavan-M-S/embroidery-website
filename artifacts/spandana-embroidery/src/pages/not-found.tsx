import { Link } from "wouter";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md mx-4 p-8 rounded-3xl border border-rose-100 dark:border-rose-950 bg-white dark:bg-[#181318] text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mx-auto">
          <AlertCircle className="h-8 w-8 text-rose-500" />
          <h1 className="font-serif text-2xl font-bold text-slate-900 dark:text-rose-50">
            404 Page Not Found
          </h1>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-rose-600 dark:text-rose-400 font-medium hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
