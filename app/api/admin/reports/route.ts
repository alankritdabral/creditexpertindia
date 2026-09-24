import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const start = searchParams.get('startDate');
    const end = searchParams.get('endDate');
    const limitQuery = searchParams.get('limit');
    
    let queryRef: any = adminDb.collection('credit_reports');

    if (start && end) {
      // Branch Activity uses Date range
      const startDate = new Date(start);
      const endDate = new Date(end);
      queryRef = queryRef.where('created_at', '>=', startDate).where('created_at', '<=', endDate);
    } else {
      // All Reports uses limit and order
      const qLimit = parseInt(limitQuery || '1000');
      queryRef = queryRef.orderBy('created_at', 'desc').limit(qLimit);
    }

    // Explicitly exclude the huge 'data' field by selecting only what's needed
    queryRef = queryRef.select('name', 'mobile', 'pan', 'bureau', 'credit_score', 'created_at', 'branch', 'search_tokens');

    const snapshot = await queryRef.get();
    
    const reports = snapshot.docs.map((doc: any) => {
      const docData = doc.data();
      return {
        id: doc.id,
        ...docData,
        // Convert Timestamp to simple seconds to be compatible with frontend UI
        created_at: docData.created_at ? { seconds: docData.created_at._seconds } : null
      };
    });

    return NextResponse.json({ success: true, reports });
  } catch (error) {
    console.error('API /admin/reports error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch reports' }, { status: 500 });
  }
}
