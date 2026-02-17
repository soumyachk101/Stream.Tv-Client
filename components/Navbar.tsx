'use client';
import Link from 'next/link';
import Logo from './Logo';
import { Upload, User as UserIcon, LogOut, Search, Bell } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const hasToken = !!localStorage.getItem('token');
        if (isLoggedIn !== hasToken) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLoggedIn(hasToken);
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname, isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/login');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/dashboard?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    if (pathname === '/login' || pathname === '/register') return null;

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/5 py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-8">
                    {/* Logo Area */}
                    <Link href="/dashboard" className="flex items-center gap-2 shrink-0 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Logo className="h-8 w-8 text-blue-400 relative z-10" />
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Stream<span className="font-light text-blue-400">.Tv</span>
                        </span>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-lg hidden md:block">
                        <form onSubmit={handleSearch} className="relative group">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search videos..."
                                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:bg-white/10 focus:border-blue-500/50 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                        </form>
                    </div>

                    {/* Actions Area */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {isLoggedIn ? (
                            <>
                                <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors relative">
                                    <Bell size={20} />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                                </button>

                                <Link
                                    href="/upload"
                                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-full transition-colors"
                                    title="Upload Video"
                                >
                                    <Upload size={20} />
                                </Link>

                                <div className="h-8 w-1px bg-white/10 mx-1 hidden md:block"></div>

                                <div className="flex items-center gap-3 pl-1">
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg border border-white/10 ring-2 ring-transparent hover:ring-blue-500/30 transition-all cursor-pointer">
                                        <UserIcon size={16} />
                                    </div>

                                    <button
                                        onClick={handleLogout}
                                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="glass-button-primary px-5 py-2 rounded-full text-sm font-medium"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav >
    );
}
