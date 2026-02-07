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
        <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
                        <Logo className="h-10 w-10" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">Stream.Tv</span>
                    </Link>

                    <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:block">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search videos..."
                                className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 px-4 pl-10 text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                                    className="p-2 text-slate-400 hover:text-white transition-colors"
                                    title="Upload Video"
                                >
                                    <Upload size={24} />
                                </Link>
                                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold cursor-pointer">
                                    <UserIcon size={18} />
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={24} />
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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
