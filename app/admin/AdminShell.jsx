'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Layers,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  KeyRound,
  Loader2,
  Lock
} from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useToast } from '@/components/admin/Toast';

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();

  const isLoginPage = pathname === '/admin/login';

  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Password change modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Check session
  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.replace('/admin/login');
          return;
        }
        const data = await res.json();
        setAdminUser(data.user);
      } catch (err) {
        router.replace('/admin/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      showToast('Logged out successfully', 'info');
      router.push('/admin/login');
    } catch (err) {
      router.push('/admin/login');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      setPasswordError('Please fill all password fields');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to change password');

      showToast('Password changed successfully!', 'success');
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brown-deep flex flex-col items-center justify-center text-white gap-3 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
        <span className="text-sm font-medium tracking-wide">Authenticating NeevSaathi Admin Portal...</span>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Enquiries', href: '/admin/enquiries', icon: Inbox },
    { label: 'Services', href: '/admin/services', icon: Briefcase },
    { label: 'Projects', href: '/admin/projects', icon: Layers },
    { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { label: 'Website Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-beige-100 flex font-sans">
      {/* Desktop Sidebar (Left) */}
      <aside className="hidden lg:flex flex-col justify-between w-64 bg-brown-deep text-beige-200 border-r border-brown-dark flex-shrink-0">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-brown-dark">
            <Logo variant="light" size="default" />
            <div className="mt-2 text-[10px] uppercase font-sans font-bold text-sand tracking-wider">
              Control Panel & CMS
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 font-sans">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-terracotta text-white font-semibold shadow-terracotta'
                      : 'text-beige-300 hover:bg-brown-dark hover:text-white'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom: Admin info & Site link */}
        <div className="p-4 border-t border-brown-dark space-y-3 font-sans">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-brown-dark/70 text-beige-300 hover:text-white text-xs font-medium hover:bg-brown-dark transition-colors duration-200"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="px-3 py-2 bg-brown-dark/40 rounded-xl flex items-center justify-between">
            <div className="truncate pr-2">
              <span className="block text-[11px] text-beige-300 truncate">{adminUser?.email}</span>
              <span className="block text-[10px] text-sand font-semibold uppercase">Superadmin</span>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="p-1.5 hover:bg-brown-dark rounded-lg text-sand hover:text-white transition-colors duration-200"
              title="Change Password"
            >
              <KeyRound className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Body (Header + Content) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-beige-300 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-soft">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 text-brown-dark hover:bg-beige-100 rounded-lg transition-colors"
              aria-label="Toggle mobile navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="font-serif font-bold text-base sm:text-lg text-brown-dark">
              NeevSaathi Management Dashboard
            </div>
          </div>

          <div className="flex items-center gap-3 font-sans">
            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-beige-300 text-xs font-semibold text-brown-dark hover:bg-beige-100 rounded-lg transition-colors duration-200"
            >
              <Lock className="w-3.5 h-3.5 text-terracotta" />
              <span>Security</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-lg transition-colors duration-200 border border-red-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex font-sans">
            <div 
              className="fixed inset-0 bg-brown-deep/80 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-64 bg-brown-deep text-white flex flex-col justify-between p-4 z-10">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-brown-dark">
                  <Logo variant="light" size="default" />
                  <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-beige-300">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="pt-4 space-y-1">
                  {navItems.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-200 ${
                          pathname === item.href ? 'bg-terracotta text-white' : 'text-beige-300 hover:bg-brown-dark'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-brown-dark space-y-2">
                <Link
                  href="/"
                  target="_blank"
                  className="block text-center py-2 text-xs bg-brown-dark rounded-lg text-beige-200"
                >
                  View Public Website &rarr;
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center py-2 text-xs bg-red-950/80 rounded-lg text-red-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content Container */}
        <main className="p-4 sm:p-8 flex-1 overflow-x-hidden font-sans">
          {children}
        </main>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brown-deep/80 backdrop-blur-sm font-sans">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-beige-300">
            <div className="flex items-center justify-between pb-3 border-b border-beige-200 mb-4">
              <h3 className="font-serif font-bold text-brown-dark text-base flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-terracotta" />
                <span>Change Admin Password</span>
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-1 text-brown-medium hover:text-brown-dark rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {passwordError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs mb-4">
                {passwordError}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-brown-dark mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta"
                  placeholder="Enter your current password"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown-dark mb-1">
                  New Password (min 6 characters)
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta"
                  placeholder="Enter a new strong password"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown-dark mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta"
                  placeholder="Re-type new password"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-brown-dark hover:bg-beige-100 rounded-lg border border-beige-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="px-4 py-2 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-70 flex items-center gap-1.5"
                >
                  {passwordLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
