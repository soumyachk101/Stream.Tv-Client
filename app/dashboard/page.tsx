'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Play, Plus, TrendingUp, Radio, Flame, Music, Gamepad2, Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { API_BASE } from '@/lib/api';
import { motion } from 'framer-motion';

interface Video {
  id: string;
  title: string;
  thumbnailUrl?: string;
  views: number;
}

const CATEGORIES = [
  { name: 'All', icon: Flame },
  { name: 'Live', icon: Radio },
  { name: 'Gaming', icon: Gamepad2 },
  { name: 'Music', icon: Music },
  { name: 'Trending', icon: TrendingUp },
];

function VideoGrid() {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }

    setLoading(true);
    if (error) setError(null);

    const url = search
      ? `${API_BASE}/api/videos?search=${encodeURIComponent(search)}`
      : `${API_BASE}/api/videos`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            router.replace('/login');
            return null;
          }
          throw new Error('Failed to load videos');
        }
        return res.json();
      })
      .then((data) => {
        if (data !== null) setVideos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Failed to load videos');
        setLoading(false);
      });
  }, [search, router]); // eslint-disable-line react-hooks/exhaustive-deps

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="glass-panel-premium aspect-video rounded-2xl animate-pulse bg-white/5" />
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="text-center py-20 bg-red-500/10 rounded-2xl border border-red-500/20 text-slate-200">
        <p className="text-xl font-medium text-red-400">{error}</p>
        <Link href="/dashboard" className="mt-6 inline-block glass-button px-8 py-3 rounded-xl text-sm font-semibold">Try again</Link>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-32 glass-panel-premium rounded-3xl border-dashed border-2 border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 ring-1 ring-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <Play size={32} className="text-white/40 ml-1" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2 relative z-10">It's quiet here...</h3>
        <p className="text-slate-400 max-w-md mx-auto mb-8 relative z-10">Upload your first video to start your streaming journey and share your content with the world.</p>
        <Link href="/upload" className="glass-button-primary px-8 py-3 rounded-xl font-semibold relative z-10">Upload Video</Link>
      </div>
    );
  }

  return (
    <>
      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === cat.name
                ? 'bg-blue-600/20 border-blue-500/50 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
          >
            <cat.icon size={16} />
            {cat.name}
          </button>
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {videos.map((video) => (
          <motion.div variants={item} key={video.id}>
            <Link
              href={`/watch/${video.id}`}
              className="group block glass-panel-premium rounded-2xl overflow-hidden hover:translate-y-[-5px] transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border-0"
            >
              <div className="aspect-video bg-slate-800 relative overflow-hidden">
                {video.thumbnailUrl ? (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900 group-hover:bg-slate-800 transition-colors">
                    <Play size={40} className="opacity-50" />
                  </div>
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform duration-300">
                    <Play size={24} className="text-white fill-white ml-1" />
                  </div>
                </div>

                {/* View Count Badge */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-medium text-white border border-white/10 shadow-lg">
                  {video.views} views
                </div>

                {/* Category decoration */}
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-blue-600/80 backdrop-blur-md rounded-lg text-[10px] font-bold uppercase tracking-wider text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-2 group-hover:translate-y-0 duration-300">
                  Stream
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg leading-tight truncate mb-2 text-white group-hover:text-blue-400 transition-colors">{video.title}</h3>
                <div className="flex items-center gap-3 mt-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 ring-2 ring-white/10"></div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-200">Streamer Name</span>
                    <span className="text-xs text-slate-500">2 hours ago</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.replace('/login');
      return;
    }
    setAuthChecked(true); // eslint-disable-next-line react-hooks/set-state-in-effect
  }, [router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white pt-24 pb-12 font-sans relative">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="mb-12 glass-panel-premium rounded-3xl p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40 opacity-50" />
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] group-hover:bg-blue-500/30 transition-colors duration-700" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Flame size={12} /> Trending Now
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Future</span> of Streaming
              </h1>
              <p className="text-lg text-slate-300 max-w-lg mb-8">
                Discover exclusive content, live events, and a community that never sleeps. Your personal theater awaits.
              </p>
              <div className="flex gap-4">
                <button className="glass-button-primary px-8 py-3.5 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  <Play size={20} fill="currentColor" /> Watch Now
                </button>
                <button className="glass-button px-8 py-3.5 rounded-xl font-medium hover:bg-white/10 transition-colors">
                  Explore
                </button>
              </div>
            </div>

            {/* Hero Stats/Decor */}
            <div className="hidden lg:flex gap-6">
              <div className="glass-panel p-4 rounded-xl text-center min-w-[120px]">
                <div className="text-2xl font-bold text-white">4.2K</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Live Viewers</div>
              </div>
              <div className="glass-panel p-4 rounded-xl text-center min-w-[120px]">
                <div className="text-2xl font-bold text-blue-400">128</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">New Streams</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
              <TrendingUp className="text-blue-400" size={24} />
              Recommended for You
            </h2>
            <p className="text-slate-400 text-sm">Curated content based on your preferences.</p>
          </div>

          <Link
            href="/upload"
            className="glass-button gap-2 px-6 py-3 rounded-xl flex items-center text-sm font-semibold hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-blue-300 transition-all group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" /> <span>Upload Video</span>
          </Link>
        </div>

        <Suspense fallback={<div className="text-slate-500 py-20 text-center animate-pulse">Loading feed...</div>}>
          <VideoGrid />
        </Suspense>
      </div>
    </div>
  );
}
