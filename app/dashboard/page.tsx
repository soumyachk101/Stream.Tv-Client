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
  }, [search, router]); // Keep dependencies but suppress if linter complains about loading/error which are state setters (stable)

  if (loading) return <div className="text-center py-20 text-blue-100 font-serif">Loading videos...</div>;

  if (error) {
    return (
      <div className="text-center py-20 texture-paper rounded-xl border border-white/20 shadow-raised text-slate-800">
        <p className="text-xl text-red-500 font-medium">{error}</p>
        <Link href="/dashboard" className="mt-4 inline-block btn-skeuo btn-skeuo-blue text-sm">Try again</Link>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-20 texture-paper rounded-xl border border-white/20 shadow-raised text-slate-800">
        <p className="text-xl font-bold opacity-70">No videos found</p>
        <p className="text-slate-600 mt-2 font-serif italic">Upload your first video to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {videos.map((video) => (
        <Link
          href={`/watch/${video.id}`}
          key={video.id}
          className="group block card-polaroid hover:z-10 relative"
        >
          <div className="aspect-video bg-slate-800 relative shadow-inner border border-slate-200">
            {video.thumbnailUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover sepia-[.2] group-hover:sepia-0 transition-all duration-300" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                <Play size={32} />
              </div>
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/40">
                <Play size={40} className="text-white fill-white drop-shadow-md" />
              </div>
            </div>
          </div>
          <div className="pt-4 px-1">
            <h3 className="font-bold text-lg truncate mb-1 text-slate-800 font-serif leading-tight">{video.title}</h3>
            <p className="text-slate-500 text-sm font-handwriting italic">{video.views} views</p>
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
      <div className="min-h-screen texture-leather text-white flex items-center justify-center">
        <div className="text-blue-100 text-lg font-serif animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen texture-leather text-white p-8">
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-10 bg-white/5 p-6 rounded-xl shadow-inset border border-white/10 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-embossed text-gradient-multicolor">Dashboard</h1>
          <Link
            href="/upload"
            className="btn-skeuo btn-skeuo-seagreen flex items-center gap-2 transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
          >
            <Plus size={20} className="filter drop-shadow-sm" /> <span className="text-shadow-sm">Upload Video</span>
          </Link>
        </div>

        <Suspense fallback={<div className="text-blue-100 py-20 text-center text-lg">Loading videos...</div>}>
          <VideoGrid />
        </Suspense>
      </div>
    </div>
  );
}
