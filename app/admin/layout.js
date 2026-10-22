import React from 'react';
import { ToastProvider } from '@/components/admin/Toast';
import AdminShell from './AdminShell';

export const metadata = {
  title: 'Admin Dashboard | NeevSaathi Construction',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <ToastProvider>
      <AdminShell>
        {children}
      </AdminShell>
    </ToastProvider>
  );
}
