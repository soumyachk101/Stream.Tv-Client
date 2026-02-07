'use client';
import Link from 'next/link';
import { Video, Upload, User as UserIcon, LogOut, Search } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, [pathname]);

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
        <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    <Link href="/dashboard" className="flex items-center gap-2 text-indigo-500 font-bold text-xl shrink-0">
                        <Video className="w-8 h-8" />
                        <span className="hidden sm:inline">Stream.Tv</span>
                    </Link>

                    <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:block">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search videos..."
                                className="w-full bg-gray-800 border border-gray-700 rounded-full py-2 px-4 pl-10 text-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        </div>
                    </form>

                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    href="/upload"
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                    title="Upload Video"
                                >
                                    <Upload size={24} />
                                </Link>
                                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold cursor-pointer">
                                    <UserIcon size={18} />
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={24} />
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
