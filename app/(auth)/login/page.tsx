'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { API_BASE } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return 'Something went wrong. Please try again.';
}

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? false : true; // default to login (true)

  const [isLogin, setIsLogin] = useState(initialMode);

  // Update state if URL changes
  useEffect(() => {
    setIsLogin(searchParams.get('mode') !== 'register');
  }, [searchParams]);

  // Form States
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    // Optional: Update URL without full reload
    const newMode = !isLogin ? 'login' : 'register';
    window.history.pushState(null, '', `?mode=${newMode}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin ? { email, password } : { username, email, password };

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      let data: { message?: string; token?: string };
      try {
        data = await res.json();
      } catch {
        setError('Invalid response from server.');
        return;
      } finally {
        setLoading(false);
      }

      if (!res.ok) {
        setError(data.message || (isLogin ? 'Login failed' : 'Registration failed'));
        return;
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      setError(getErrorMessage(err));
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl h-[600px] bg-slate-800 rounded-2xl shadow-2xl overflow-hidden flex">

        {/* Sliding Panel Overlay */}
        <motion.div
          initial={false}
          animate={{ x: isLogin ? '0%' : '100%' }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="absolute top-0 left-0 w-1/2 h-full bg-blue-600 z-20 flex flex-col items-center justify-center p-12 text-white hidden md:flex"
        >
          <AnimatePresence mode='wait'>
            {isLogin ? (
              <motion.div
                key="login-msg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold mb-4">New Here?</h2>
                <p className="mb-8 text-blue-100">Sign up and discover a great amount of new opportunities!</p>
                <button onClick={toggleMode} className="border-2 border-white px-8 py-2 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-colors">
                  Sign Up
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="register-msg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold mb-4">One of Us?</h2>
                <p className="mb-8 text-blue-100">If you already have an account, just sign in. We've missed you!</p>
                <button onClick={toggleMode} className="border-2 border-white px-8 py-2 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-colors">
                  Sign In
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mobile Toggle (Visible only on small screens) */}
        <div className="md:hidden absolute top-4 right-4 z-30">
          <button onClick={toggleMode} className="text-sm text-blue-400 font-bold">
            {isLogin ? "Need an account?" : "Have an account?"}
          </button>
        </div>


        {/* Forms Container */}
        <div className="w-full h-full relative">

          {/* Login Form Panel (Left Half) */}
          <motion.div
            animate={{
              x: isLogin ? '0%' : '-100%',
              opacity: isLogin ? 1 : 0,
              pointerEvents: isLogin ? 'auto' : 'none'
            }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 right-0 w-full md:w-1/2 h-full flex flex-col justify-center p-12 bg-slate-800"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
              <p className="text-slate-400">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                // No placeholder
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  // No placeholder
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-400 text-sm text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 py-3 rounded-lg font-bold text-white hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Sign In'}
              </button>
            </form>
          </motion.div>


          {/* Register Form Panel (Right Half) */}
          <motion.div
            animate={{
              x: isLogin ? '100%' : '0%',
              opacity: isLogin ? 0 : 1,
              pointerEvents: isLogin ? 'none' : 'auto'
            }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 w-full md:w-1/2 h-full flex flex-col justify-center p-12 bg-slate-800"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">Create Account</h2>
              <p className="text-slate-400">Join our streaming community</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                // No placeholder
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                // No placeholder
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  // No placeholder
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-400 text-sm text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 py-3 rounded-lg font-bold text-white hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Sign Up'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
