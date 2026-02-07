'use client';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-slate-800 p-8 shadow-2xl border border-slate-700 text-center">
        <h2 className="text-2xl font-bold text-white">Forgot password?</h2>
        <p className="text-slate-400">
          Password reset is not implemented yet. Please contact support or try signing in with your existing password.
        </p>
        <Link
          href="/login"
          className="inline-block font-medium text-violet-400 hover:text-violet-300"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
