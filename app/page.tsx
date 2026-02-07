import Link from "next/link";
import { Video } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="flex justify-center mb-8">
          <div className="bg-indigo-600 p-6 rounded-3xl shadow-2xl shadow-indigo-500/20">
            <Video size={64} className="text-white" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
          Stream.Tv
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
          The next generation video streaming platform. <br />
          Share your moments with the world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-indigo-900/20"
          >
            Start Watching
          </Link>
          <Link
            href="/upload"
            className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold text-lg transition-all hover:scale-105 border border-gray-700"
          >
            Upload Video
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 text-gray-600 text-sm">
        © 2026 Stream.Tv Inc.
      </div>
    </div>
  );
}
