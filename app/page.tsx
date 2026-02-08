"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/30 blur-[120px]" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-fuchsia-600/20 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-8 max-w-2xl relative z-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/5 p-6 rounded-3xl shadow-2xl shadow-violet-500/20 backdrop-blur-xl border border-white/10 ring-1 ring-white/20">
            <Logo className="w-24 h-24" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-violet-200 to-violet-400 drop-shadow-sm"
        >
          Stream.Tv
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light"
        >
          The next generation video streaming platform. <br />
          <span className="text-violet-200 font-medium">Share your moments with the world.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center pt-10"
        >
          <Link
            href="/dashboard"
            className="group relative px-8 py-4 bg-violet-600 hover:bg-violet-500 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-violet-600/25 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">Start Watching</span>
          </Link>
          <Link
            href="/upload"
            className="group px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-lg transition-all hover:scale-105 border border-white/10 backdrop-blur-md hover:border-white/20"
          >
            Upload Video
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 text-slate-500 text-sm font-light z-10"
      >
        © 2026 Stream.Tv Inc. • Crafted with space magic
      </motion.div>
    </div>
  );
}
