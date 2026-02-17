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
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/30 rounded-full blur-[120px]" />
            <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-cyan-500/20 rounded-full blur-[100px]" />

            <div className="glass-panel w-full max-w-[900px] min-h-[550px] rounded-3xl relative overflow-hidden flex shadow-2xl">

                {/* Form Section */}
                <div className={`w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center relative z-10 transition-all duration-500 ${isLogin ? 'md:translate-x-0' : 'md:translate-x-full'}`}>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                        <p className="text-slate-400 text-sm">{isLogin ? 'Please enter your details to sign in.' : 'Join us and start streaming properly.'}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="relative"
                                >
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className="w-full glass-input rounded-xl py-3 pl-10 pr-4"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full glass-input rounded-xl py-3 pl-10 pr-4"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full glass-input rounded-xl py-3 pl-10 pr-4"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            disabled={loading}
                            className="w-full glass-button-primary rounded-xl py-3 font-semibold text-white mt-4 flex items-center justify-center gap-2 group"
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
                            <div className="flex-grow border-t border-slate-700"></div>
                            <span className="flex-shrink-0 mx-4 text-slate-500 text-xs">OR CONTINUE WITH</span>
                            <div className="flex-grow border-t border-slate-700"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <button className="glass-button rounded-xl py-2.5 flex items-center justify-center gap-2 text-sm text-slate-300 hover:text-white" onClick={() => alert("Google Login coming soon")}>
                                {/* Simple text fallback or icon */}
                                <span className="font-bold">G</span> Google
                            </button>
                            <button className="glass-button rounded-xl py-2.5 flex items-center justify-center gap-2 text-sm text-slate-300 hover:text-white" onClick={() => alert("Apple Login coming soon")}>
                                <Github className="w-4 h-4" /> Github
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative / Info Panel */}
                <div className={`hidden md:flex w-1/2 absolute top-0 bottom-0 right-0 bg-gradient-to-br from-blue-600 to-violet-600 items-center justify-center p-12 transition-transform duration-500 ease-in-out z-0 ${isLogin ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                    <div className="relative z-10 text-center">
                        <h2 className="text-4xl font-bold font-sans text-white mb-6">
                            {isLogin ? 'New Here?' : 'Welcome Back!'}
                        </h2>
                        <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                            {isLogin
                                ? "Join the next generation of streaming. Sign up today to start your journey."
                                : "To keep connected with us please login with your personal info."}
                        </p>
                        <button
                            onClick={toggleMode}
                            className="px-8 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                </div>

                {/* Mobile Toggle Text */}
                <div className="md:hidden absolute bottom-6 w-full text-center left-0">
                    <p className="text-slate-400 text-sm">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={toggleMode} className="text-blue-400 hover:text-blue-300 font-semibold ml-1">
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
}
