export const WORK_TYPES = [
  'New Construction',
  'Renovation',
  'Commercial',
  'Structural & Civil Work',
  'Interior & Finishing',
  'Turnkey Construction',
  'Other'
];

export const BUDGET_RANGES = [
  'Under ₹25 Lakhs',
  '₹25 - ₹50 Lakhs',
  '₹50 - ₹80 Lakhs',
  '₹80 Lakhs - ₹1.5 Crores',
  'Above ₹1.5 Crores'
];

export const TIMELINES = [
  'Immediate / Within 15 Days',
  'Within 1 Month',
  'Within 2-3 Months',
  'Planning Phase (3+ Months)'
];

export const ENQUIRY_STATUSES = [
  { value: 'New', label: 'New', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { value: 'Contacted', label: 'Contacted', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { value: 'Estimate Sent', label: 'Estimate Sent', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  { value: 'Closed', label: 'Closed / Won', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
];

export const JAIPUR_AREAS = [
  'Vaishali Nagar',
  'Mansarovar',
  'Malviya Nagar',
  'Jagatpura',
  'C-Scheme',
  'Civil Lines',
  'Ajmer Road / Bhankrota',
  'Tonk Road / Sitapura',
  'Sikar Road / Vidhyadhar Nagar',
  'Raja Park / Tilak Nagar',
  'Bapu Nagar / Gandhi Nagar',
  'Sirsi Road / Khatipura',
  'Kalwar Road / Jhotwara',
  'Chomu & Outskirts',
  'Other Area in Jaipur / Rajasthan'
];

export function validateIndianPhone(phone) {
  if (!phone) return false;
  // Clean non-digits
  const cleaned = phone.toString().replace(/\D/g, '');
  // Match 10 digits starting with 6-9, or 91 followed by 10 digits
  if (cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned)) {
    return true;
  }
  if (cleaned.length === 12 && cleaned.startsWith('91') && /^91[6-9]\d{9}$/.test(cleaned)) {
    return true;
  }
  return false;
}
