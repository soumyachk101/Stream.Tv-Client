'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { API_BASE } from '@/lib/api';

interface AuthModernProps {
    initialMode: 'login' | 'register';
}

export default function AuthModern({ initialMode }: AuthModernProps) {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(initialMode === 'login');

    // Form States
    const [name, setName] = useState(''); // Combined for simplicity or split if needed
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Toggle mode and update URL without reload
    const toggleMode = () => {
        const newMode = !isLogin;
        setIsLogin(newMode);
        setError('');
        // Update URL shallowly
        window.history.pushState(null, '', newMode ? '/login' : '/register');
    };

    const handleGoogleLogin = () => {
        // Placeholder for Google Login logic
        // window.location.href = `${API_BASE}/api/auth/google`;
        alert("Google Login is coming soon!");
    };

    const handleAppleLogin = () => {
        // Placeholder for Apple Login logic
        alert("Apple Login is coming soon!");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!isLogin && !agreeTerms) {
            setError('Please agree to the Terms & Conditions');
            return;
        }

        setLoading(true);

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        // Basic splitting of name for register if needed, or send as username
        const body = isLogin
            ? { email, password }
            : { username: name, email, password };

        try {
            const res = await fetch(`${API_BASE}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Authentication failed');
            }

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

    // Animation variants for the sliding overlay
    const overlayVariants = {
        login: { x: '100%' },
        register: { x: '0%' },
    };

    const panelVariants = {
        login: { x: '0%', opacity: 1, zIndex: 10 },
        register: { x: '100%', opacity: 0, zIndex: 0 },
    };

    // When isLogin is true (showing login form):
    // - Overlay should be on the RIGHT (x: 100% or similar depending on width)
    // - Login Form (Left Panel) should be visible

    // When isLogin is false (showing register form):
    // - Overlay should be on the LEFT (x: 0%)
    // - Register Form (Right Panel) should be visible

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950 p-4 font-sans">
            <div className="relative w-full max-w-[900px] min-h-[600px] bg-white rounded-[30px] shadow-2xl overflow-hidden flex flex-col md:flex-row">

                {/* DESKTOP LAYOUT (Hidden on Mobile) */}

                {/* LEFT PANEL: SIGN IN FORM */}
                {/* Visible when isLogin=true. On Register, this is hidden/covered. */}
                <div className={`hidden md:flex absolute top-0 left-0 w-1/2 h-full flex-col justify-center items-center p-12 transition-all duration-700 ease-in-out ${isLogin ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">Sign In</h2>

                    <div className="grid grid-cols-2 gap-4 mb-6 w-full">
                        <button type="button" onClick={handleGoogleLogin} className="flex items-center justify-center py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition w-full">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.7666 15.9274 23.7666 12.2764Z" fill="#4285F4" />
                                <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853" />
                                <path d="M5.50253 14.3003C5.00236 12.8099 5.00236 11.1961 5.50253 9.70575V6.61481H1.51649C-0.185514 10.0056 -0.185514 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC05" />
                                <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61039L5.50264 9.70134C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335" />
                            </svg>
                        </button>
                        <button type="button" onClick={handleAppleLogin} className="flex items-center justify-center py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition w-full">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-slate-900">
                                <path d="M17.05 20.28C15.82 20.28 14.9 19 13.5 19C12.1 19 11.23 20.23 10 20.23C8.61 20.23 6.94 18.66 5.86 16.88C3.89 13.52 5.09 9.39 8.09 9.39C9.27 9.39 10.3 10.27 11.08 10.27C11.83 10.27 13.06 9.19 14.49 9.19C15.06 9.19 16.74 9.49 17.65 10.96C17.58 11.01 15.86 12.06 15.86 14.54C15.86 17.57 18.25 18.62 18.28 18.63C18.25 18.77 17.89 20.09 17.05 20.28ZM15.42 5.59C16.5 4.14 16.42 2.76 16.39 2C15.17 2.05 13.67 2.92 12.78 4.09C11.97 5.15 11.88 6.65 11.96 7.42C13.25 7.53 14.62 6.66 15.42 5.59Z" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-slate-500 mb-4 text-sm">or use your email account</p>

                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 text-slate-900"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 text-slate-900"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="text-right">
                            <a href="#" className="text-sm font-medium text-slate-900 hover:text-slate-700">Forgot your password?</a>
                        </div>
                        <button disabled={loading} className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition tracking-wide">
                            {loading ? <Loader2 className="animate-spin mx-auto" /> : 'SIGN IN'}
                        </button>
                    </form>
                </div>


                {/* RIGHT PANEL: SIGN UP FORM */}
                {/* Visible when isLogin=false. On Login, this is hidden/covered. */}
                <div className={`hidden md:flex absolute top-0 left-0 w-1/2 h-full flex-col justify-center items-center p-12 transition-all duration-700 ease-in-out ${!isLogin ? 'translate-x-[100%] opacity-100 z-10' : 'translate-x-[100%] opacity-0 z-0'}`}>
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">Create Account</h2>

                    <div className="grid grid-cols-2 gap-4 mb-6 w-full">
                        <button type="button" onClick={handleGoogleLogin} className="flex items-center justify-center py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition w-full">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.7666 15.9274 23.7666 12.2764Z" fill="#4285F4" />
                                <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853" />
                                <path d="M5.50253 14.3003C5.00236 12.8099 5.00236 11.1961 5.50253 9.70575V6.61481H1.51649C-0.185514 10.0056 -0.185514 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC05" />
                                <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61039L5.50264 9.70134C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335" />
                            </svg>
                        </button>
                        <button type="button" onClick={handleAppleLogin} className="flex items-center justify-center py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition w-full">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-slate-900">
                                <path d="M17.05 20.28C15.82 20.28 14.9 19 13.5 19C12.1 19 11.23 20.23 10 20.23C8.61 20.23 6.94 18.66 5.86 16.88C3.89 13.52 5.09 9.39 8.09 9.39C9.27 9.39 10.3 10.27 11.08 10.27C11.83 10.27 13.06 9.19 14.49 9.19C15.06 9.19 16.74 9.49 17.65 10.96C17.58 11.01 15.86 12.06 15.86 14.54C15.86 17.57 18.25 18.62 18.28 18.63C18.25 18.77 17.89 20.09 17.05 20.28ZM15.42 5.59C16.5 4.14 16.42 2.76 16.39 2C15.17 2.05 13.67 2.92 12.78 4.09C11.97 5.15 11.88 6.65 11.96 7.42C13.25 7.53 14.62 6.66 15.42 5.59Z" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-slate-500 mb-4 text-sm">or use your email for registration</p>

                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 text-slate-900"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 text-slate-900"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 text-slate-900"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button disabled={loading} className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition tracking-wide mt-4">
                            {loading ? <Loader2 className="animate-spin mx-auto" /> : 'SIGN UP'}
                        </button>
                    </form>
                </div>


                {/* SLIDING OVERLAY */}
                <div
                    className={`hidden md:block absolute top-0 left-0 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-50 rounded-[inherit]`}
                    style={{ transform: isLogin ? 'translateX(100%)' : 'translateX(0%)' }}
                >
                    <div className={`relative -left-[100%] h-full w-[200%] transition-transform duration-700 ease-in-out bg-slate-900 text-white`}
                        style={{ transform: isLogin ? 'translateX(0%)' : 'translateX(50%)' }}>

                        {/* Left Half of Overlay (Shown when isLogin=false aka Register Mode -> Overlay on Left) */}
                        {/* This shows "Welcome Back" message prompting to Sign In */}
                        <div className="absolute top-0 flex flex-col items-center justify-center w-1/2 h-full p-12 text-center">
                            <div className="absolute inset-0 z-0 opacity-50">
                                {/* Insert image/gradient here. */}
                                <img src="/auth_background.svg" className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="relative z-10">
                                <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                                <p className="text-lg text-slate-300 mb-8">To keep connected with us please login with your personal info</p>
                                <button onClick={toggleMode} className="px-10 py-3 border border-white rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-slate-900 transition">
                                    Sign In
                                </button>
                            </div>
                        </div>

                        {/* Right Half of Overlay (Shown when isLogin=true aka Login Mode -> Overlay on Right) */}
                        {/* This shows "Hello, Friend!" message prompting to Sign Up */}
                        <div className="absolute top-0 right-0 flex flex-col items-center justify-center w-1/2 h-full p-12 text-center">
                            <div className="absolute inset-0 z-0 opacity-50">
                                {/* Insert image/gradient here. */}
                                <img src="/auth_background.svg" className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="relative z-10">
                                <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
                                <p className="text-lg text-slate-300 mb-8">Enter your personal details and start journey with us</p>
                                <button onClick={toggleMode} className="px-10 py-3 border border-white rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-slate-900 transition">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MOBILE VIEW (Stacked) */}
                <div className="md:hidden w-full flex flex-col p-8">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">{isLogin ? 'Sign In' : 'Create Account'}</h2>
                        <p className="text-slate-500">{isLogin ? 'Welcome back! Login to continue.' : 'Join us and start your journey.'}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        )}
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button disabled={loading} className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold">
                            {loading ? <Loader2 className="animate-spin mx-auto" /> : (isLogin ? 'SIGN IN' : 'SIGN UP')}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 mb-2">{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
                        <button onClick={toggleMode} className="text-slate-900 font-bold hover:underline">
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
