"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { motion } from "framer-motion";
import { Play, Upload, ArrowRight, Zap, Globe, Shield, Users, Video, Smartphone } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen text-white bg-slate-900 font-sans overflow-x-hidden">
      {/* Dynamic Mesh Gradient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-4 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="glass p-6 rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.3)] border border-blue-400/20 backdrop-blur-xl flex items-center gap-4">
               <Logo className="w-12 h-12 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
               <div className="text-left">
                  <p className="text-xs text-blue-300 font-bold uppercase tracking-wider">Introducing</p>
                  <p className="text-xl font-black tracking-tight"><span className="text-white">Stream</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-light">.Tv</span> 2.0</p>
               </div>
            </div>
          </motion.div>

          <div className="space-y-6 mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight"
            >
              Stream Without <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 glow-text">Boundaries</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed"
            >
              The next generation platform for creators and viewers. Experience crystal clear 4K streaming with zero latency and infinite possibilities.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/dashboard"
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:-translate-y-1"
            >
              <Play className="fill-white w-5 h-5" />
              <span>Start Watching Now</span>
            </Link>

            <Link
              href="/upload"
              className="group px-8 py-4 rounded-full glass font-bold text-lg text-white flex items-center justify-center gap-3 hover:bg-white/10 transition-all border border-white/20 hover:-translate-y-1"
            >
              <Upload className="w-5 h-5" />
              <span>For Creators</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative Floating Elements */}
        <div className="absolute top-1/4 left-5 md:left-20 w-16 h-16 md:w-24 md:h-24 glass rounded-2xl rotate-12 opacity-40 animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 right-5 md:right-20 w-20 h-20 md:w-32 md:h-32 glass rounded-full opacity-30 animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }} />
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-10 border-y border-white/5 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                 <h3 className="text-4xl md:text-5xl font-black text-white">10M+</h3>
                 <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Active Viewers</p>
              </div>
              <div className="space-y-2">
                 <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">4K</h3>
                 <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Ultra HD Quality</p>
              </div>
              <div className="space-y-2">
                 <h3 className="text-4xl md:text-5xl font-black text-white">50K+</h3>
                 <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Content Creators</p>
              </div>
              <div className="space-y-2">
                 <h3 className="text-4xl md:text-5xl font-black text-white">Zero</h3>
                 <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Buffering Issues</p>
              </div>
           </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Why choose <span className="text-blue-400">Stream.Tv</span>?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">We&apos;ve rebuilt video streaming from the ground up to provide the ultimate experience for both viewers and creators.</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
             {/* Feature 1 */}
             <motion.div variants={itemVariants} className="glass-panel-premium p-8 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <Zap className="text-blue-400 w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                <p className="text-slate-400 leading-relaxed">Our globally distributed edge network ensures your videos start instantly and never buffer, no matter where your audience is.</p>
             </motion.div>

             {/* Feature 2 */}
             <motion.div variants={itemVariants} className="glass-panel-premium p-8 rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <Video className="text-purple-400 w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Flawless 4K</h3>
                <p className="text-slate-400 leading-relaxed">Experience every detail with support for stunning 4K resolution, HDR colors, and crystal-clear high-fidelity audio.</p>
             </motion.div>

             {/* Feature 3 */}
             <motion.div variants={itemVariants} className="glass-panel-premium p-8 rounded-3xl border border-white/10 hover:border-cyan-500/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <Users className="text-cyan-400 w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Vibrant Community</h3>
                <p className="text-slate-400 leading-relaxed">Connect with millions of viewers. Live chat, interactive polls, and real-time reactions make watching a shared experience.</p>
             </motion.div>

             {/* Feature 4 */}
             <motion.div variants={itemVariants} className="glass-panel-premium p-8 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <Shield className="text-emerald-400 w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Bank-Grade Security</h3>
                <p className="text-slate-400 leading-relaxed">Your content is yours. End-to-end encryption and advanced DRM protect your streams from unauthorized access and piracy.</p>
             </motion.div>

             {/* Feature 5 */}
             <motion.div variants={itemVariants} className="glass-panel-premium p-8 rounded-3xl border border-white/10 hover:border-orange-500/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <Smartphone className="text-orange-400 w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Any Device, Anywhere</h3>
                <p className="text-slate-400 leading-relaxed">Watch seamlessly on your TV, laptop, tablet, or phone. Our responsive platform adapts perfectly to any screen size.</p>
             </motion.div>

             {/* Feature 6 */}
             <motion.div variants={itemVariants} className="glass-panel-premium p-8 rounded-3xl border border-white/10 hover:border-pink-500/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <Globe className="text-pink-400 w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Global Reach</h3>
                <p className="text-slate-400 leading-relaxed">Automatically translate captions and interact with audiences worldwide without language barriers.</p>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4 mb-10">
        <div className="max-w-5xl mx-auto glass p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden border border-blue-500/30 shadow-[0_0_80px_rgba(59,130,246,0.15)]">
           <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40" />
           <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black">Ready to Dive In?</h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">Join millions of users who have already made Stream.Tv their home for entertainment and creation.</p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                 <Link href="/register" className="px-10 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-slate-200 transition-colors shadow-xl">
                    Create Free Account
                 </Link>
                 <Link href="/dashboard" className="px-10 py-4 rounded-full glass font-bold text-lg border border-white/30 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    Explore Content <ArrowRight className="w-5 h-5" />
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-slate-500 text-sm font-light">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 opacity-50">
               <Logo className="w-5 h-5 text-white" />
               <span className="font-bold text-white tracking-wide">Stream.Tv</span>
            </div>
            <div>© 2026 Stream.Tv Inc. All rights reserved.</div>
            <div className="flex gap-4">
               <Link href="#" className="hover:text-white transition-colors">Terms</Link>
               <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
               <Link href="#" className="hover:text-white transition-colors">Contact</Link>
            </div>
         </div>
      </footer>
    </div>
  );
}
