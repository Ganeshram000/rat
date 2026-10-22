import { NextResponse } from 'next/server';
import { getGallery, addGalleryItem } from '@/lib/db';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    const gallery = getGallery();
    return NextResponse.json({ gallery });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    if (!body.imageUrl || !body.imageUrl.trim()) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const newItem = addGalleryItem({
      title: body.title || 'Construction Milestone',
      category: body.category || 'Residential',
      location: body.location || 'Jaipur, Rajasthan',
      imageUrl: body.imageUrl,
      description: body.description || '',
    });

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error) {
    console.error('Error adding gallery item:', error);
    return NextResponse.json({ error: 'Failed to add gallery item' }, { status: 500 });
  }
}
