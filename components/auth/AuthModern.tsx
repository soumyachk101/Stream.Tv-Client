'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { API_BASE } from '@/lib/api';
import { motion } from 'framer-motion';

interface AuthModernProps {
    initialMode: 'login' | 'register';
}

export default function AuthModern({ initialMode }: AuthModernProps) {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(initialMode === 'login');

    // Form States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        window.history.pushState(null, '', !isLogin ? '/login' : '/register');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        const body = isLogin ? { email, password } : { username: name, email, password };

        try {
            const res = await fetch(`${API_BASE}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Authentication failed');

            if (data.token) {
                localStorage.setItem('token', data.token);
                router.push('/dashboard');
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#f0f2f5] font-sans">
            {/* Main Container - Rounded Corners */}
            <div className="w-full max-w-[1200px] h-[800px] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex relative">

                {/* LEFT SIDE - Artistic Background */}
                <div className="hidden md:flex w-1/2 relative bg-[#0a0a0a] text-white flex-col justify-between p-12 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        {/* Abstract Space Background to match reference vibe */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614726365723-49faaa56430e?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
                    </div>

                    {/* Top Content */}
                    <div className="relative z-10 w-full flex justify-between items-center">
                        <span className="text-sm font-semibold tracking-wide opacity-80">Featured Stream</span>
                        <div className="flex gap-4 items-center">
                            <button onClick={toggleMode} className="text-sm font-medium hover:text-white/80 transition-colors">
                                {isLogin ? 'Create Account' : 'Sign In'}
                            </button>
                            <button className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-xs font-semibold uppercase tracking-wider">
                                Join Us
                            </button>
                        </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="relative z-10">
                        <div className="flex items-end justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white/20 p-0.5">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full rounded-full bg-slate-800" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg leading-tight">ProGamer.tv</h4>
                                    <p className="text-xs text-white/60">Live Streaming & Gaming</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                    <ArrowLeft size={16} />
                                </button>
                                <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - Form */}
                <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 md:p-20 relative">
                    {/* Brand Logo Top Left (Mobile only or Absolute) */}
                    <div className="absolute top-10 left-10 md:left-20 font-bold text-2xl tracking-tighter text-slate-900">
                        Stream.Tv
                    </div>

                    <div className="absolute top-10 right-10">
                        <div className="px-3 py-1 rounded-full border border-slate-200 flex items-center gap-2 cursor-pointer hover:border-slate-400 transition-colors">
                            <span className="text-xs font-bold text-slate-700">🇺🇸 EN</span>
                        </div>
                    </div>

                    <div className="max-w-md w-full mx-auto mt-10">
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-3 text-center md:text-left">
                            {isLogin ? 'Welcome Back' : 'Hi Streamer'}
                        </h1>
                        <p className="text-slate-500 mb-10 text-center md:text-left">
                            {isLogin ? 'Welcome back to Stream.Tv' : 'Create your account to start streaming.'}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {!isLogin && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className="w-full px-4 py-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </motion.div>
                            )}

                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full px-4 py-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-end">
                                <button type="button" className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors">
                                    Forgot password?
                                </button>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg text-center">
                                    {error}
                                </div>
                            )}

                            {/* Divider */}
                            <div className="relative flex py-4 items-center">
                                <div className="flex-grow border-t border-slate-200"></div>
                                <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-semibold">or</span>
                                <div className="flex-grow border-t border-slate-200"></div>
                            </div>

                            <button type="button" className="w-full py-3.5 rounded-xl border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors text-slate-700 font-bold text-sm" onClick={() => alert("Google Login coming soon")}>
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                                {isLogin ? 'Login with Google' : 'Sign up with Google'}
                            </button>

                            <button
                                disabled={loading}
                                className="w-full py-4 rounded-xl bg-[#EA4335] hover:bg-[#d63d30] text-white font-bold text-sm shadow-lg shadow-red-500/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
                            >
                                {loading ? <Loader2 className="animate-spin mx-auto text-white" /> : (isLogin ? 'Login' : 'Sign Up')}
                            </button>

                            <div className="text-center mt-6">
                                <span className="text-slate-500 text-sm">
                                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                                    <button type="button" onClick={toggleMode} className="text-[#EA4335] font-bold hover:underline">
                                        {isLogin ? 'Sign up' : 'Login'}
                                    </button>
                                </span>
                            </div>

                        </form>

                        {/* Social Icons Bottom */}
                        <div className="mt-10 flex justify-center gap-6 opacity-60">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 cursor-pointer transition-colors"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
