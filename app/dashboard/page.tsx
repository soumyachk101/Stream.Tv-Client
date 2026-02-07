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

  if (loading) return <div className="text-center py-20 text-slate-500">Loading videos...</div>;

  if (error) {
    return (
      <div className="text-center py-20 bg-slate-800 rounded-xl border border-slate-700">
        <p className="text-xl text-red-400">{error}</p>
        <Link href="/dashboard" className="mt-2 inline-block text-blue-500 hover:text-violet-400">Try again</Link>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-800 rounded-xl border border-slate-700">
        <p className="text-xl text-slate-400">No videos found</p>
        <p className="text-slate-500 mt-2">Upload your first video to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video) => (
        <Link
          href={`/watch/${video.id}`}
          key={video.id}
          className="group block bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-colors"
        >
          <div className="aspect-video bg-slate-800 relative">
            {video.thumbnailUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-600">
                <Play size={32} />
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play size={48} className="text-white fill-white" />
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg truncate mb-1 text-slate-100">{video.title}</h3>
            <p className="text-slate-400 text-sm">{video.views} views</p>
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
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link
            href="/upload"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} /> Upload Video
          </Link>
        </div>

        <Suspense fallback={<div className="text-slate-500 py-20 text-center">Loading...</div>}>
          <VideoGrid />
        </Suspense>
      </div>
    </div>
  );
}
