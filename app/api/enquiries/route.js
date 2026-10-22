import { NextResponse } from 'next/server';
import { getEnquiries, createEnquiry } from '@/lib/db';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(request) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const enquiries = getEnquiries();
    return NextResponse.json({ enquiries });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Anti-bot honeypot check
    if (body.website || body.honeypot) {
      // Silently accept bots without storing
      return NextResponse.json({ success: true, message: 'Enquiry received' });
    }

    const { name, phone, workType, projectLocation, plotArea, budgetRange, timeframe, message } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Please provide your full name' }, { status: 400 });
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json({ error: 'Please provide your mobile number' }, { status: 400 });
    }

    // Clean phone number (strip whitespace, hyphens)
    const cleanPhone = phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit Indian mobile number (e.g. 9829012345)' },
        { status: 400 }
      );
    }

    const newEnquiry = createEnquiry({
      name: name.trim(),
      phone: cleanPhone,
      email: (body.email || '').trim(),
      workType: workType || 'Residential House Construction',
      projectLocation: (projectLocation || '').trim() || 'Jaipur',
      plotArea: (plotArea || '').trim(),
      budgetRange: budgetRange || '₹30L – ₹60L',
      timeframe: timeframe || 'Immediate (Within 1 Month)',
      message: (message || '').trim(),
      source: body.source || 'Website Contact Form',
    });

    return NextResponse.json(
      {
        success: true,
        enquiry: newEnquiry,
        message: 'Thank you! Your construction estimate request has been logged. Our Jaipur engineering team will contact you within 24 hours.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit enquiry. Please try again or call us directly.' },
      { status: 400 }
    );
  }
}
