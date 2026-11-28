import Link from "next/link";
import { Zap, ArrowLeft, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-700 dark:text-lime-400 text-xs font-display font-bold uppercase tracking-widest mb-5">
        <Zap className="w-3.5 h-3.5" /> Page Not Found
      </div>

      <h1 className="text-5xl sm:text-7xl font-display font-black tracking-tight text-stone-900 dark:text-white mb-4">
        404
      </h1>

      <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-md mb-8 leading-relaxed">
        The RAYO Batteries page you are looking for could not be found. Explore our 48V, 60V &amp; 72V Lithium-Ion packs or contact our team.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-lime-500 hover:bg-lime-400 text-stone-950 font-display font-black text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2 rayo-glow"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <Link
          href="/contact-us"
          className="px-6 py-3 rounded-full border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors inline-flex items-center gap-2"
        >
          <Phone className="w-4 h-4 text-lime-600 dark:text-lime-400" /> Contact Us
        </Link>
      </div>
    </div>
  );
}
