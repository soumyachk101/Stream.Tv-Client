'use client';
import Link from 'next/link';
import Logo from './Logo';
import { Upload, User as UserIcon, LogOut, Search } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const hasToken = !!localStorage.getItem('token');
        if (isLoggedIn !== hasToken) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLoggedIn(hasToken);
        }
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
        <nav className="texture-brushed-metal border-b border-white/10 sticky top-0 z-50 shadow-raised">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    <Link href="/dashboard" className="flex items-center gap-2 shrink-0 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Logo className="h-10 w-10 text-white drop-shadow-md relative z-10" />
                        </div>
                        <span className="text-xl font-bold text-white text-embossed tracking-wide">Stream.Tv</span>
                    </Link>

                    <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:block">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search videos..."
                                className="w-full input-skeuo pl-10 focus:ring-2 focus:ring-sea-green-medium/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        </div>
                    </form>

                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    href="/upload"
                                    className="p-2 text-blue-100 hover:text-white transition-colors hover:bg-white/10 rounded-full"
                                    title="Upload Video"
                                >
                                    <Upload size={24} className="filter drop-shadow-sm" />
                                </Link>
                                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold cursor-pointer shadow-raised border border-white/20">
                                    <UserIcon size={18} />
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-blue-100 hover:text-red-300 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={24} className="filter drop-shadow-sm" />
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="btn-skeuo btn-skeuo-blue py-2 px-6 text-sm"
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
