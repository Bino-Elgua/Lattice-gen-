import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Mock minting process
  const digest = body.digest || 'mock-digest-' + Date.now();
  
  return NextResponse.json({ 
    success: true, 
    digest,
    message: 'NFTs minted successfully' 
  });
}
