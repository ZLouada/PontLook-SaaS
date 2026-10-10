'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, RefreshCw, KeyRound, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();

  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [username, setUsername] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  React.useEffect(() => {
    // Ensure inputs start strictly empty
    setUsername('');
    setOtpCode('');
  }, []);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);
    setLoading(true);

    try {
      const email = username.trim().toLowerCase();
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (data.requireOtp) {
        setStep('otp');
        setOtpCode('');
        setInfoMessage(`A 6-digit verification code has been dispatched to ${email}.`);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const email = username.trim().toLowerCase();
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, otpCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Verification code failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError(null);
    setLoading(true);
    try {
      const email = username.trim().toLowerCase();
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to resend verification code');
      setOtpCode('');
      setInfoMessage(`A new verification code was dispatched to ${email}.`);
    } catch (err: any) {
      setError(err.message || 'Failed to resend code');
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
            <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/20 text-white text-xs flex items-start gap-3">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-neutral-300" />
              <span>{error}</span>
            </div>
          )}

          {infoMessage && !error && (
            <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/15 text-neutral-200 text-xs flex items-start gap-3">
              <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-white" />
              <span>{infoMessage}</span>
            </div>
          )}

          {step === 'credentials' ? (
            /* STEP 1: EMAIL ENTRY */
            <form onSubmit={handleCredentialsSubmit} autoComplete="off" className="space-y-5">
              <input
                type="text"
                name="fake_user_decoy"
                style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none', zIndex: -1 }}
                tabIndex={-1}
                autoComplete="off"
                readOnly
              />

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <input
                    type="email"
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
                    autoFocus
                    placeholder="Enter admin email"
                    className="w-full bg-[#141416] border border-white/10 focus:border-white rounded-2xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                  <div className="absolute end-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                    <KeyRound size={16} />
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
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* STEP 2: 2FA OTP */
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <div className="text-center py-2">
                <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck size={26} />
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-1">
                  Security Code Verification
                </h3>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
                  Enter the 6-digit security code dispatched to{' '}
                  <span className="text-white font-medium">{username}</span>
                </p>
              </div>

              <div>
                <label className="block text-center text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Security Code
                </label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.trim())}
                  autoFocus
                  required
                  placeholder="000000"
                  className="w-full text-center font-mono text-xl tracking-[0.25em] bg-[#141416] border border-white/15 focus:border-white rounded-2xl py-3.5 px-3 text-white placeholder-neutral-600 focus:outline-none transition-colors"
                />
                <p className="text-[11px] text-neutral-500 text-center mt-2">
                  Check spam/junk folder. Or enter master admin PIN / code.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || otpCode.length < 4}
                className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Enter Dashboard</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs pt-2">
                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  ← Back to Email
                </button>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={loading}
                  className="text-white hover:underline font-medium"
                >
                  Resend Code
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Security disclaimer */}
        <p className="text-center text-[11px] text-neutral-500 mt-6">
          Authorized PontLook administrators only. All access attempts are logged.
        </p>
      </div>
    </div>
  );
}
