'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, ArrowRight, RefreshCw, KeyRound, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    // Ensure inputs start strictly empty
    setUsername('');
    setPassword('');
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-neutral-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle monochrome ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-md">
        {/* Brand Logo Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="h-9 w-9 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center p-1.5 shadow-md">
              <Image
                src="/images/brand/pontlook-icon-white.png"
                alt="PontLook"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
              PontLook
            </span>
          </Link>
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span>RESOURCES CMS ADMIN PORTAL</span>
          </div>
        </div>

        {/* Card Box */}
        <div className="bg-[#0c0c0e] border border-white/15 rounded-3xl p-7 sm:p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-start gap-3">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} autoComplete="off" className="space-y-5">
            {/* Anti-autofill decoys to absorb browser credential autofill */}
            <input
              type="text"
              name="fake_user_decoy"
              style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none', zIndex: -1 }}
              tabIndex={-1}
              autoComplete="off"
              readOnly
            />
            <input
              type="password"
              name="fake_pass_decoy"
              style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none', zIndex: -1 }}
              tabIndex={-1}
              autoComplete="new-password"
              readOnly
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="pontlook_admin_usr"
                  id="pontlook_admin_usr"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  data-lpignore="true"
                  data-form-type="other"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter username"
                  className="w-full bg-[#141416] border border-white/10 focus:border-white rounded-2xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                />
                <div className="absolute end-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                  <KeyRound size={16} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="pontlook_admin_pwd"
                  id="pontlook_admin_pwd"
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  data-lpignore="true"
                  data-form-type="other"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className="w-full bg-[#141416] border border-white/10 focus:border-white rounded-2xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                />
                <div className="absolute end-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                  <Lock size={16} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-6 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Log In to Dashboard</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security disclaimer */}
        <p className="text-center text-[11px] text-neutral-500 mt-6">
          Authorized PontLook operators only. All login activities and IP traces are logged.
        </p>
      </div>
    </div>
  );
}
