import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitQuery = searchParams.get('limit') || '200';
    
    let queryRef: any = adminDb.collection('system_logs').orderBy('created_at', 'desc').limit(parseInt(limitQuery));

    const snapshot = await queryRef.get();

    const logs = snapshot.docs.map((doc: any) => {
      const docData = doc.data();
      return {
        id: doc.id,
        ...docData,
        // Convert Timestamp to simple seconds to be compatible with frontend UI
        created_at: docData.created_at ? { seconds: docData.created_at._seconds } : null
      };
    });

    return NextResponse.json({ success: true, logs });
  } catch (error) {
    console.error('API /admin/logs error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch logs' }, { status: 500 });
  }
}
