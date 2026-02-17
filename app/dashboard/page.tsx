'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Play, Plus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { API_BASE } from '@/lib/api';

interface Video {
  id: string;
  title: string;
  thumbnailUrl?: string;
  views: number;
}

function VideoGrid() {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }

    if (!loading) setLoading(true); // Only set if not already loading
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, router]);

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="glass-panel aspect-video rounded-xl animate-pulse bg-white/5" />
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="text-center py-20 bg-red-500/10 rounded-xl border border-red-500/20 text-slate-200">
        <p className="text-xl font-medium text-red-400">{error}</p>
        <Link href="/dashboard" className="mt-4 inline-block glass-button px-6 py-2 rounded-lg text-sm">Try again</Link>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-24 glass-panel rounded-2xl border-dashed border-2 border-white/20">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <Play size={32} className="text-white/20 ml-1" />
        </div>
        <p className="text-xl font-bold text-white mb-2">No videos found</p>
        <p className="text-slate-400">Upload your first video to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video) => (
        <Link
          href={`/watch/${video.id}`}
          key={video.id}
          className="group block glass-card rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
        >
          <div className="aspect-video bg-slate-800 relative">
            {video.thumbnailUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900">
                <Play size={32} />
              </div>
            )}

            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Play size={20} className="text-white fill-white ml-1" />
              </div>
            </div>

            {/* View Count Badge */}
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs text-white border border-white/10">
              {video.views} views
            </div>
          </div>

          <div className="p-4 glass-panel border-t-0 rounded-t-none">
            <h3 className="font-semibold text-lg truncate mb-1 text-white group-hover:text-blue-400 transition-colors">{video.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
              <p className="text-slate-400 text-xs">Streamer</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuthChecked(true);
  }, [router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6 pt-24 font-sans relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-1">Dashboard</h1>
            <p className="text-slate-400 text-sm">Welcome back to your streaming hub.</p>
          </div>

          <Link
            href="/upload"
            className="glass-button-primary px-6 py-3 rounded-xl flex items-center gap-2 font-medium"
          >
            <Plus size={20} /> <span>Upload Video</span>
          </Link>
        </div>

        <Suspense fallback={<div className="text-slate-500 py-20 text-center">Loading feed...</div>}>
          <VideoGrid />
        </Suspense>
      </div>
    </div>
  );
}
