import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for job status (in production, use a database)
const jobStatuses = new Map<string, { status: string; ipfsHashes?: string[] }>();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  
  const status = jobStatuses.get(jobId) || { status: 'pending' };
  
  return NextResponse.json(status);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  const body = await request.json();
  
  jobStatuses.set(jobId, body);
  
  return NextResponse.json({ success: true });
}
