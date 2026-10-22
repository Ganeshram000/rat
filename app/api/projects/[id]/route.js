import { NextResponse } from 'next/server';
import { getProjectById, updateProject, deleteProject } from '@/lib/db';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const project = getProjectById(params.id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ project });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    let images = body.images || [];
    if (typeof body.imagesText === 'string') {
      const parsedUrls = body.imagesText.split('\n').map(s => s.trim()).filter(Boolean);
      images = Array.from(new Set([...(body.coverImage ? [body.coverImage] : []), ...parsedUrls]));
    } else if (body.coverImage && images.length === 0) {
      images = [body.coverImage];
    }

    let highlights = body.highlights;
    if (typeof body.highlightsText === 'string') {
      highlights = body.highlightsText.split('\n').map(s => s.trim()).filter(Boolean);
    }

    const updated = updateProject(params.id, {
      ...body,
      images,
      ...(highlights ? { highlights } : {}),
    });

    if (!updated) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const deleted = deleteProject(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
