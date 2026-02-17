"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen texture-leather text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Lighting/Shadows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-sea-green-light/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-medium/20 blur-[150px]" />
        <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-purple-medium/10 blur-[120px]" />
        <div className="absolute inset-0 bg-black/20 z-0" />
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
          {/* Logo Container - Embossed Badge Style */}
          <div className="bg-gradient-to-br from-off-white to-yellowish-white p-8 rounded-full shadow-raised-lg border-2 border-white/20 relative stitching">
            <div className="absolute inset-0 rounded-full shadow-inset-deep pointer-events-none" />
            <Logo className="w-24 h-24 filter drop-shadow-md text-sea-green-medium" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter text-gradient-multicolor mb-4 text-embossed"
        >
          Stream.Tv
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl md:text-2xl text-blue-100 leading-relaxed font-serif text-engraved"
        >
          The next generation video streaming platform. <br />
          <span className="text-sea-green-accent font-medium text-shadow-sm">Share your moments with the world.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center pt-10"
        >
          <Link
            href="/dashboard"
            className="btn-skeuo btn-skeuo-purple group text-lg"
          >
            <span className="relative z-10">Start Watching</span>
          </Link>
          <Link
            href="/upload"
            className="btn-skeuo btn-skeuo-seagreen group text-lg"
          >
            <span className="relative z-10">Upload Video</span>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 text-blue-200/60 text-sm font-serif z-10 text-debossed"
      >
        © 2026 Stream.Tv Inc. • Crafted with space magic
      </motion.div>
    </div>
  );
}
