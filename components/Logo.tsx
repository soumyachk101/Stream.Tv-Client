import React from 'react';

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="none"
            className={className}
        >
            <defs>
                <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
            </defs>
            <rect x="10" y="20" width="80" height="60" rx="15" fill="url(#logo-grad)" />
            <path d="M40 35 L70 50 L40 65 Z" fill="white" />
        </svg>
    );
}
