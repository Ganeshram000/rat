'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, Loader2, AlertCircle, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useToast } from '@/components/admin/Toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFillCredentials = () => {
    setEmail('admin@neevsaathi.com');
    setPassword('NeevSaathi@2025');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please check credentials.');
      }

      showToast('Logged in successfully', 'success');
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige-100 flex flex-col justify-center items-center p-4 sm:p-6 relative text-brown-dark font-sans">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#A3452F 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Decorative ambient sand glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sand/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Logo and Back to website */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/" className="inline-block transition-transform hover:scale-102">
            <Logo size="large" />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-beige-200 border border-beige-300 text-brown-dark text-[11px] font-medium mt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />
            <span>Authorized Management Portal</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-beige-300 shadow-card p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-brown-dark">
              Admin Sign In
            </h1>
            <p className="text-xs sm:text-sm text-brown-medium font-sans mt-1">
              Manage enquiries, services, projects & website settings.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700 animate-slide-up">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            <div>
              <label className="block text-xs font-semibold text-brown-dark mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@neevsaathi.com"
                  autoComplete="email"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark bg-beige-50/50"
                />
                <Mail className="w-4 h-4 text-brown-medium absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brown-dark mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full pl-9 pr-10 py-2.5 text-xs rounded-xl border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark bg-beige-50/50"
                />
                <Lock className="w-4 h-4 text-brown-medium absolute left-3 top-3 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-brown-medium hover:text-brown-dark transition-colors p-0.5"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold rounded-xl shadow-terracotta transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Test Helper */}
          <div className="mt-6 pt-5 border-t border-beige-200">
            <div className="p-3 bg-beige-100 rounded-xl border border-beige-300/80 text-[11px] text-brown-dark">
              <div className="font-semibold text-terracotta mb-1 flex items-center justify-between">
                <span>Default Credentials</span>
                <button
                  type="button"
                  onClick={handleFillCredentials}
                  className="text-terracotta hover:underline font-bold text-[10px] uppercase tracking-wider"
                >
                  Auto-fill
                </button>
              </div>
              <div className="space-y-0.5 text-brown-medium">
                <div>Email: <code className="text-brown-dark font-mono font-semibold">admin@neevsaathi.com</code></div>
                <div>Password: <code className="text-brown-dark font-mono font-semibold">NeevSaathi@2025</code></div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-brown-medium hover:text-terracotta font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

