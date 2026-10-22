'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Inbox, 
  Briefcase, 
  Layers, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  Clock, 
  Plus,
  RefreshCw
} from 'lucide-react';
import { formatShortDate, getWhatsAppUrl } from '@/lib/utils';
import { ENQUIRY_STATUSES } from '@/lib/constants';
import { useToast } from '@/components/admin/Toast';

export default function AdminDashboardPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    newEnquiries: 0,
    totalProjects: 0,
    totalServices: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [enqRes, srvRes, projRes] = await Promise.all([
        fetch('/api/enquiries'),
        fetch('/api/services'),
        fetch('/api/projects')
      ]);

      const enqData = await enqRes.json();
      const srvData = await srvRes.json();
      const projData = await projRes.json();

      const enquiries = enqData.enquiries || [];
      const newCount = enquiries.filter(e => e.status === 'New').length;

      setStats({
        totalEnquiries: enquiries.length,
        newEnquiries: newCount,
        totalServices: srvData.services?.length || 0,
        totalProjects: projData.projects?.length || 0,
      });

      setRecentEnquiries(enquiries.slice(0, 5));
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      showToast('Failed to load dashboard metrics', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleQuickStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Status update failed');
      
      showToast(`Status updated to ${newStatus}`, 'success');
      fetchDashboardData();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-7">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brown-dark">
            Operational Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-brown-medium font-sans mt-0.5">
            Real-time status of enquiries, service offerings, and construction projects in Jaipur.
          </p>
        </div>

        <div className="flex items-center gap-2.5 font-sans">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="p-2 bg-white border border-beige-300 text-brown-dark hover:bg-beige-100 rounded-xl transition-colors duration-200 text-xs font-semibold flex items-center gap-1.5 shadow-soft"
            title="Refresh statistics"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brown-dark hover:bg-brown-deep text-white rounded-xl text-xs font-semibold transition-colors duration-200 shadow-soft"
          >
            <Plus className="w-3.5 h-3.5 text-sand" />
            <span>Add Project</span>
          </Link>

          <Link
            href="/admin/services"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl text-xs font-semibold shadow-terracotta transition-colors duration-200"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Service</span>
          </Link>
        </div>
      </div>

      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Enquiries */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-beige-300 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-brown-medium font-sans font-semibold">
              Total Enquiries
            </span>
            <div className="text-3xl font-serif font-bold text-brown-dark mt-1">
              {stats.totalEnquiries}
            </div>
            <Link href="/admin/enquiries" className="text-[11px] font-sans text-terracotta hover:underline mt-1 inline-block">
              View all enquiries &rarr;
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-beige-200 text-terracotta flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        {/* New Enquiries */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-sand/60 bg-sand-50/30 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-sand-dark font-sans font-semibold">
              New Enquiries
            </span>
            <div className="text-3xl font-serif font-bold text-terracotta mt-1">
              {stats.newEnquiries}
            </div>
            <span className="text-[11px] font-sans text-sand-dark mt-1 inline-block">
              Requires engineer response
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-beige-200 text-terracotta flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Total Projects */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-beige-300 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-brown-medium font-sans font-semibold">
              Portfolio Projects
            </span>
            <div className="text-3xl font-serif font-bold text-brown-dark mt-1">
              {stats.totalProjects}
            </div>
            <Link href="/admin/projects" className="text-[11px] font-sans text-brown-dark hover:underline mt-1 inline-block">
              Manage portfolio &rarr;
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-beige-200 text-brown-dark flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Total Services */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-beige-300 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-brown-medium font-sans font-semibold">
              Active Services
            </span>
            <div className="text-3xl font-serif font-bold text-brown-dark mt-1">
              {stats.totalServices}
            </div>
            <Link href="/admin/services" className="text-[11px] font-sans text-brown-dark hover:underline mt-1 inline-block">
              Edit services &rarr;
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-beige-200 text-brown-dark flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-2xl border border-beige-300 shadow-soft overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-beige-200 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-brown-dark">
              Recent Estimate Requests
            </h2>
            <p className="text-xs text-brown-medium font-sans">
              Latest client enquiries submitted from the public website
            </p>
          </div>

          <Link
            href="/admin/enquiries"
            className="text-xs font-sans font-semibold text-terracotta hover:underline flex items-center gap-1"
          >
            <span>Open Enquiry Manager</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="p-12 text-center text-brown-medium font-sans text-xs sm:text-sm">
            No customer enquiries recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-beige-100 border-b border-beige-200 text-brown-dark font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Phone / Contact</th>
                  <th className="py-3.5 px-4">Work Type</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-200 text-brown-dark">
                {recentEnquiries.map((enq) => {
                  return (
                    <tr key={enq.id} className="hover:bg-beige-100/60 transition-colors duration-150">
                      <td className="py-3.5 px-4 font-semibold text-brown-dark">
                        {enq.customerName}
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        +91 {enq.phone}
                      </td>
                      <td className="py-3.5 px-4 font-medium">
                        {enq.workType}
                      </td>
                      <td className="py-3.5 px-4 text-brown-medium">
                        {enq.location}
                      </td>
                      <td className="py-3.5 px-4 text-brown-medium">
                        {formatShortDate(enq.createdAt)}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={enq.status}
                          disabled={updatingId === enq.id}
                          onChange={(e) => handleQuickStatusChange(enq.id, e.target.value)}
                          className="text-[11px] font-semibold px-2 py-1 rounded-lg border border-beige-300 bg-white focus:outline-none focus:border-terracotta cursor-pointer"
                        >
                          {ENQUIRY_STATUSES.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`tel:+91${enq.phone}`}
                            className="p-1.5 bg-beige-100 hover:bg-beige-200 text-brown-dark rounded-lg transition-colors"
                            title="Call client"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={getWhatsAppUrl(
                              enq.phone,
                              `Hello ${enq.customerName}, this is NeevSaathi Construction regarding your ${enq.workType} estimate request for ${enq.location}. Let's discuss!`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-beige-100 hover:bg-beige-200 text-terracotta rounded-lg transition-colors"
                            title="WhatsApp client"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
