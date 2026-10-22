import { NextResponse } from 'next/server';
import { getServices, createService } from '@/lib/db';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    const services = getServices();
    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ error: 'Service title is required' }, { status: 400 });
    }

    // Process includedWork if passed as multiline string
    let includedWork = body.includedWork;
    if (typeof includedWork === 'string') {
      includedWork = includedWork.split('\n').map(s => s.trim()).filter(Boolean);
    }

    const newService = createService({
      ...body,
      includedWork: includedWork || [],
    });

    return NextResponse.json({ success: true, service: newService }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
