import Link from "next/link";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="flex justify-center mb-8">
          <div className="bg-blue-500/10 p-6 rounded-3xl shadow-2xl shadow-blue-500/20 backdrop-blur-sm border border-blue-500/20">
            <Logo className="w-20 h-20" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600">
          Stream.Tv
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 leading-relaxed">
          The next generation video streaming platform. <br />
          Share your moments with the world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-violet-900/20"
          >
            Start Watching
          </Link>
          <Link
            href="/upload"
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-lg transition-all hover:scale-105 border border-slate-700"
          >
            Upload Video
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 text-slate-600 text-sm">
        © 2026 Stream.Tv Inc.
      </div>
    </div>
  );
}
