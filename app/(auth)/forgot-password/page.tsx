'use client';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-gray-900 p-8 shadow-2xl border border-gray-800 text-center">
        <h2 className="text-2xl font-bold text-white">Forgot password?</h2>
        <p className="text-gray-400">
          Password reset is not implemented yet. Please contact support or try signing in with your existing password.
        </p>
        <Link
          href="/login"
          className="inline-block font-medium text-indigo-400 hover:text-indigo-300"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
