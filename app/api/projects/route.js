import { NextResponse } from 'next/server';
import { getProjects, createProject } from '@/lib/db';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    const projects = getProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
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
      return NextResponse.json({ error: 'Project title is required' }, { status: 400 });
    }

    // Process images array if passed as imagesText
    let images = body.images || [];
    if (typeof body.imagesText === 'string') {
      const parsedUrls = body.imagesText.split('\n').map(s => s.trim()).filter(Boolean);
      images = Array.from(new Set([...(body.coverImage ? [body.coverImage] : []), ...parsedUrls]));
    } else if (body.coverImage && images.length === 0) {
      images = [body.coverImage];
    }

    // Process highlights if passed as text
    let highlights = body.highlights || [];
    if (typeof body.highlightsText === 'string') {
      highlights = body.highlightsText.split('\n').map(s => s.trim()).filter(Boolean);
    }

    const newProject = createProject({
      ...body,
      images,
      highlights,
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
