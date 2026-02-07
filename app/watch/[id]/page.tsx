'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { API_BASE } from '@/lib/api';

interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  views: number;
  userId: string;
  createdAt: string;
}

export default function WatchPage() {
  const params = useParams();
  const videoId = typeof params.id === 'string' ? params.id : params.id?.[0] ?? null;
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoId) {
      if (loading) setLoading(false);
      setError('Invalid video');
      return;
    }

    if (!loading) setLoading(true);
    if (error) setError(null);

    fetch(`${API_BASE}/api/videos/${videoId}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) setError('Video not found');
          else setError('Failed to load video');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setVideo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load video');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        {error || 'Video not found'}
      </div>
    );
  }

  const videoSrc = `${API_BASE}${video.videoUrl}`;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl mb-6">
          <video
            src={videoSrc}
            controls
            autoPlay
            className="w-full h-full"
            poster={video.thumbnailUrl || undefined}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">{video.title}</h1>
          <div className="flex items-center text-gray-400 text-sm">
            <span>{video.views} views</span>
            <span className="mx-2">•</span>
            <span>{new Date(video.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-300 whitespace-pre-wrap">
              {video.description || 'No description provided.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
