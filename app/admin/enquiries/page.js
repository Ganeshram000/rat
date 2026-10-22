'use client';

import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Search, 
  Phone, 
  MessageSquare, 
  Trash2, 
  Eye, 
  RefreshCw, 
  Loader2, 
  X, 
  Save 
} from 'lucide-react';
import { formatDate, formatShortDate, getWhatsAppUrl } from '@/lib/utils';
import { ENQUIRY_STATUSES } from '@/lib/constants';
import { useToast } from '@/components/admin/Toast';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';

export default function AdminEnquiriesPage() {
  const { showToast } = useToast();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal inspection
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [notesInput, setNotesInput] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  // Deletion modal
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      let url = '/api/enquiries';
      const params = new URLSearchParams();
      if (statusFilter !== 'All') params.set('status', statusFilter);
      if (search.trim()) params.set('search', search.trim());
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch');
      setEnquiries(data.enquiries || []);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Status update failed');
      showToast(`Enquiry status changed to ${newStatus}`, 'success');

      setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: notesInput }),
      });

      if (!res.ok) throw new Error('Failed to save notes');
      showToast('Internal notes saved successfully', 'success');

      setEnquiries(prev => prev.map(e => e.id === selectedEnquiry.id ? { ...e, notes: notesInput } : e));
      setSelectedEnquiry(prev => ({ ...prev, notes: notesInput }));
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/enquiries/${deleteTargetId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete enquiry');
      showToast('Enquiry removed successfully', 'success');
      setEnquiries(prev => prev.filter(e => e.id !== deleteTargetId));
      if (selectedEnquiry?.id === deleteTargetId) setSelectedEnquiry(null);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setDeleting(false);
      setDeleteTargetId(null);
    }
  };

  const openDetailsModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setNotesInput(enquiry.notes || '');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brown-dark">
            Customer Enquiries & Estimates
          </h1>
          <p className="text-xs sm:text-sm text-brown-medium font-sans mt-0.5">
            Track leads, update pipeline statuses, and initiate quick client calls and WhatsApp chats.
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-beige-300 text-brown-dark hover:bg-beige-100 text-xs font-sans font-semibold rounded-xl transition-colors duration-200 shadow-soft"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-beige-300 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4 font-sans">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {['All', ...ENQUIRY_STATUSES.map(s => s.value)].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200 ${
                statusFilter === status
                  ? 'bg-terracotta text-white shadow-terracotta'
                  : 'bg-beige-100 text-brown-dark hover:bg-beige-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-80">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-brown-medium absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, phone, area..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-1.5 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold rounded-xl transition-colors duration-200 shadow-sm"
          >
            Search
          </button>
        </form>
      </div>

      {/* Enquiries Data Table */}
      <div className="bg-white rounded-2xl border border-beige-300 shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center text-brown-medium gap-2 font-sans">
            <Loader2 className="w-6 h-6 animate-spin text-terracotta" />
            <span className="text-xs">Loading client enquiries...</span>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-16 text-center text-brown-medium font-sans text-xs sm:text-sm">
            No enquiries match the current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-beige-100 border-b border-beige-200 text-brown-dark font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Client Name</th>
                  <th className="py-3.5 px-4">Phone Number</th>
                  <th className="py-3.5 px-4">Work Type</th>
                  <th className="py-3.5 px-4">Jaipur Location</th>
                  <th className="py-3.5 px-4">Submitted</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-200 text-brown-dark">
                {enquiries.map((enq) => {
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
                          onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                          className="text-[11px] font-semibold px-2 py-1 rounded-lg border border-beige-300 bg-white focus:outline-none focus:border-terracotta cursor-pointer"
                        >
                          {ENQUIRY_STATUSES.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openDetailsModal(enq)}
                            className="p-1.5 bg-beige-100 hover:bg-beige-200 text-brown-dark rounded-lg transition-colors"
                            title="View Full Details & Notes"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          
                          <a
                            href={`tel:+91${enq.phone}`}
                            className="p-1.5 bg-beige-100 hover:bg-beige-200 text-brown-dark rounded-lg transition-colors"
                            title="Call Customer"
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
                            title="WhatsApp Chat"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => setDeleteTargetId(enq.id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
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

      {/* Detailed Inspection Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brown-deep/80 backdrop-blur-sm animate-fade-in font-sans">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-beige-300 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-beige-200">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-brown-medium">
                  ID: {selectedEnquiry.id}
                </span>
                <h3 className="text-xl font-serif font-bold text-brown-dark">
                  {selectedEnquiry.customerName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 text-brown-medium hover:text-brown-dark rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Row */}
            <div className="py-4 border-b border-beige-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-brown-medium">Pipeline Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                  className="font-semibold px-2.5 py-1 rounded-lg border border-beige-300 focus:outline-none focus:border-terracotta"
                >
                  {ENQUIRY_STATUSES.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:+91${selectedEnquiry.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-beige-100 hover:bg-beige-200 text-brown-dark rounded-lg font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call +91 {selectedEnquiry.phone}</span>
                </a>

                <a
                  href={getWhatsAppUrl(
                    selectedEnquiry.phone,
                    `Hello ${selectedEnquiry.customerName}, this is NeevSaathi Construction regarding your ${selectedEnquiry.workType} estimate request for ${selectedEnquiry.location}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-terracotta hover:bg-terracotta-hover text-white rounded-lg font-semibold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="py-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-3 rounded-xl bg-beige-100/60 border border-beige-200 space-y-1">
                <span className="text-brown-medium block font-medium">Work Type</span>
                <span className="text-brown-dark font-semibold text-sm">{selectedEnquiry.workType}</span>
              </div>

              <div className="p-3 rounded-xl bg-beige-100/60 border border-beige-200 space-y-1">
                <span className="text-brown-medium block font-medium">Project Location</span>
                <span className="text-brown-dark font-semibold text-sm">{selectedEnquiry.location}</span>
              </div>

              <div className="p-3 rounded-xl bg-beige-100/60 border border-beige-200 space-y-1">
                <span className="text-brown-medium block font-medium">Plot / Built-up Area</span>
                <span className="text-brown-dark font-semibold text-sm">{selectedEnquiry.plotArea || 'Not specified'}</span>
              </div>

              <div className="p-3 rounded-xl bg-beige-100/60 border border-beige-200 space-y-1">
                <span className="text-brown-medium block font-medium">Approximate Budget</span>
                <span className="text-brown-dark font-semibold text-sm">{selectedEnquiry.budget || 'Not specified'}</span>
              </div>

              <div className="p-3 rounded-xl bg-beige-100/60 border border-beige-200 space-y-1">
                <span className="text-brown-medium block font-medium">Expected Start Date</span>
                <span className="text-brown-dark font-semibold text-sm">{selectedEnquiry.startDate || 'Not specified'}</span>
              </div>

              <div className="p-3 rounded-xl bg-beige-100/60 border border-beige-200 space-y-1">
                <span className="text-brown-medium block font-medium">Email Address</span>
                <span className="text-brown-dark font-semibold text-sm">{selectedEnquiry.email || 'None provided'}</span>
              </div>
            </div>

            {/* Requirements Text */}
            {selectedEnquiry.requirements && (
              <div className="mb-5 p-4 rounded-xl bg-beige-100 border border-beige-200">
                <span className="text-xs font-bold text-brown-dark block mb-1">
                  Customer Requirements & Remarks:
                </span>
                <p className="text-xs text-brown-medium whitespace-pre-line leading-relaxed">
                  {selectedEnquiry.requirements}
                </p>
              </div>
            )}

            {/* Internal Staff Notes */}
            <div className="space-y-2 pt-2 border-t border-beige-200">
              <label className="block text-xs font-bold text-brown-dark">
                Internal Staff Notes & Site Visit Records:
              </label>
              <textarea
                rows={3}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Log notes about phone discussions, site visit dates, quotation revisions, or customer preferences..."
                className="w-full p-3 text-xs rounded-xl border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta"
              />
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-brown-dark hover:bg-brown-deep text-white rounded-lg text-xs font-semibold transition-colors duration-200 disabled:opacity-70"
              >
                {savingNotes ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save Notes</span>
              </button>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-beige-200 flex items-center justify-between text-xs text-brown-medium">
              <span>Submitted on {formatDate(selectedEnquiry.createdAt)}</span>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 bg-beige-100 hover:bg-beige-200 text-brown-dark font-semibold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Customer Enquiry"
        message="Are you sure you want to permanently delete this customer enquiry? This cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
        loading={deleting}
      />
    </div>
  );
}
