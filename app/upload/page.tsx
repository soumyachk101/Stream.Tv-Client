'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, UploadCloud } from 'lucide-react';
import { API_BASE } from '@/lib/api';

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return 'Something went wrong. Please try again.';
}

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }
    setAuthChecked(true);
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('video', file);
      formData.append('title', title);
      formData.append('description', description);

      const res = await fetch(`${API_BASE}/api/videos/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        router.replace('/login');
        setError('Session expired. Please sign in again.');
        return;
      }

      if (!res.ok) {
        let message = 'Upload failed';
        try {
          const data = await res.json();
          if (data?.message) message = data.message;
        } catch {
          // ignore
        }
        setError(message);
        return;
      }

      router.push('/dashboard');
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8 text-white">
      <div className="mx-auto max-w-2xl bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-xl">
        <h1 className="text-2xl font-bold mb-6">Upload Video</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-400 bg-red-900/50 p-3 rounded border border-red-800">
              {error}
            </div>
          )}

          <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer relative">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center">
              <UploadCloud size={48} className="text-gray-500 mb-2" />
              <p className="text-gray-300 font-medium">
                {file ? file.name : 'Click to select or drag video file'}
              </p>
              <p className="text-gray-500 text-sm mt-1">MP4, WebM (Max 100MB)</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="My awesome video"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 h-32 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              placeholder="Describe your content..."
            />
          </div>

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center transition-colors"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : 'Upload Video'}
          </button>
        </form>
      </div>
    </div>
  );
}
