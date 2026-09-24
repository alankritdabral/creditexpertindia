import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const docSnap = await adminDb.collection('credit_reports').doc(id).get();
    
    if (!docSnap.exists) {
      return NextResponse.json({ success: false, error: 'Report not found' }, { status: 404 });
    }

    const docData = docSnap.data();
    const report = {
      id: docSnap.id,
      ...docData,
      created_at: docData?.created_at ? { seconds: docData.created_at._seconds } : null
    };

    return NextResponse.json({ success: true, report });
  } catch (error) {
    console.error('API /admin/reports/[id] error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch report' }, { status: 500 });
  }
}
