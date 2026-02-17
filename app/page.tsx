"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { motion } from "framer-motion";
import { Play, Upload, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Mesh Gradient Background */}
      <div className="absolute inset-0 bg-slate-900 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/30 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/30 blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 blur-[100px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-10 max-w-4xl relative z-10"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          {/* Logo Container - Glass Orb Style */}
          <div className="glass p-8 rounded-full shadow-[0_0_50px_rgba(59,130,246,0.5)] border border-blue-400/30 relative backdrop-blur-xl">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <Logo className="w-20 h-20 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-8xl font-black tracking-tight mb-4"
          >
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Stream</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-light">.Tv</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Experience the future of video streaming. <br />
            <span className="text-blue-200 font-normal glow-text">Crystal clear. Limitless. Yours.</span>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
        >
          <Link
            href="/dashboard"
            className="group px-8 py-4 rounded-full glass-button-primary font-bold text-lg flex items-center justify-center gap-3 transition-all"
          >
            <Play className="fill-white w-5 h-5" />
            <span>Start Watching</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/upload"
            className="group px-8 py-4 rounded-full glass-button font-bold text-lg text-white flex items-center justify-center gap-3 hover:bg-white/10 transition-all border border-white/20"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Video</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 glass rounded-2xl rotate-12 opacity-50 animate-bounce" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-1/3 right-10 w-32 h-32 glass rounded-full opacity-40 animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 text-slate-500 text-sm font-light z-10"
      >
        © 2026 Stream.Tv Inc. • Designed for the future
      </motion.div>
    </div>
  );
}
