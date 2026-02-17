'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react'; // Added icons
import { API_BASE } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

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
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#0f172a]">
            {/* Ambient Background Orbs with Animation */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-float" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-float-delayed" />
            <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-slow" />

            <div className="glass-panel-premium w-full max-w-[900px] min-h-[600px] rounded-3xl relative overflow-hidden flex shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] z-10">

                {/* Form Section */}
                <div className={`w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center relative z-10 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${isLogin ? 'md:translate-x-0' : 'md:translate-x-full'}`}>
                    <div className="mb-10">
                        <h2 className="text-4xl font-bold text-white mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-slate-400 text-sm font-medium">
                            {isLogin ? 'Enter your credentials to access your stream.' : 'Join the community and start streaming today.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <AnimatePresence mode="popLayout">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="relative"
                                >
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className="w-full glass-input-premium rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium placeholder-slate-500"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full glass-input-premium rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium placeholder-slate-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full glass-input-premium rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium placeholder-slate-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm text-center bg-red-500/10 py-2.5 rounded-lg border border-red-500/20 font-medium"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            disabled={loading}
                            className="w-full glass-button-shimmer rounded-xl py-3.5 font-bold text-white mt-6 flex items-center justify-center gap-2 group shadow-lg"
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                                <>
                                    {isLogin ? 'Sign In' : 'Sign Up'}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-slate-700/50"></div>
                            <span className="flex-shrink-0 mx-4 text-slate-500 text-xs font-semibold tracking-wider">OR CONTINUE WITH</span>
                            <div className="flex-grow border-t border-slate-700/50"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <button className="glass-button rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors" onClick={() => alert("Google Login coming soon")}>
                                <span className="font-bold text-lg">G</span> Google
                            </button>
                            <button className="glass-button rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors" onClick={() => alert("Apple Login coming soon")}>
                                <Github className="w-5 h-5" /> Github
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative / Info Panel */}
                <div className={`hidden md:flex w-1/2 absolute top-0 bottom-0 right-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 items-center justify-center p-12 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) z-0 ${isLogin ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                    <div className="relative z-10 text-center">
                        <motion.div
                            key={isLogin ? "login-text" : "register-text"}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-4xl font-bold font-sans text-white mb-6 drop-shadow-lg">
                                {isLogin ? 'New Here?' : 'Welcome Back!'}
                            </h2>
                            <p className="text-indigo-100 mb-8 text-lg leading-relaxed font-light opacity-90">
                                {isLogin
                                    ? "Discover a world of limitless entertainment. Join us and start your journey today."
                                    : "To keep connected with us please login with your personal info."}
                            </p>
                            <button
                                onClick={toggleMode}
                                className="px-10 py-3.5 rounded-full border-2 border-white/50 text-white font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Mobile Toggle Text */}
                <div className="md:hidden absolute bottom-6 w-full text-center left-0 z-20">
                    <p className="text-slate-400 text-sm">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={toggleMode} className="text-indigo-400 hover:text-indigo-300 font-bold ml-1 transition-colors">
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
}
