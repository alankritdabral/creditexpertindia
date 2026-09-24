import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const start = searchParams.get('startDate');
    const end = searchParams.get('endDate');
    const limitQuery = searchParams.get('limit');
    const branch = searchParams.get('branch');
    
    let queryRef: any = adminDb.collection('credit_reports');

    if (branch) {
      queryRef = queryRef.where('branch', '==', branch);
    }

    if (start && end) {
      // Branch Activity uses Date range
      const startDate = new Date(start);
      const endDate = new Date(end);
      queryRef = queryRef.where('created_at', '>=', startDate).where('created_at', '<=', endDate);
    } else {
      // All Reports uses limit and order
      const qLimit = parseInt(limitQuery || '1000');
      // If branch is provided, Firestore requires a composite index to use orderBy. 
      // We skip orderBy here to avoid the index error, and sort locally instead.
      if (!branch) {
        queryRef = queryRef.orderBy('created_at', 'desc');
      }
      queryRef = queryRef.limit(qLimit);
    }

    // Explicitly exclude the huge 'data' field by selecting only what's needed for performance
    queryRef = queryRef.select('name', 'mobile', 'pan', 'bureau', 'credit_score', 'created_at', 'branch', 'search_tokens', 'fallbackData');

    const snapshot = await queryRef.get();
    
    // Dynamically import parseBureauData just in case
    const { parseBureauData } = await import('@/lib/bureauParsers');

    let reports = snapshot.docs.map((doc: any) => {
      const docData = doc.data();
      
      let score = docData.credit_score;
      if (!score && docData.raw_api_data) {
        try {
          const parsed = parseBureauData(docData.bureau, docData.raw_api_data);
          score = parsed?.personalInfo?.score || null;
          if (!score) {
            console.log("parseBureauData returned null score for", doc.id, "bureau:", docData.bureau);
            // Fallback parsing strategy in case bureauParsers missed something
            if (docData.bureau.startsWith('crif')) {
              let rJson = docData.raw_api_data.result_json;
              if (typeof rJson === 'string') {
                try { rJson = JSON.parse(rJson); } catch(e) {}
              }
              const report = rJson?.B2C_REPORT || rJson?.parsed_data?.['B2C-REPORT'];
              const standardData = report?.['REPORT-DATA']?.['STANDARD-DATA'];
              score = standardData?.SCORE?.[0]?.VALUE || null;
            } else if (docData.bureau.startsWith('experian')) {
              let rJson = docData.raw_api_data.result_json;
              if (typeof rJson === 'string') {
                try { rJson = JSON.parse(rJson); } catch(e) {}
              }
              score = rJson?.INProfileResponse?.SCORE?.BureauScore || rJson?.INProfileResponse?.Score?.BureauScore || null;
            }
          }
        } catch(e) {
          console.error("Error parsing score for", doc.id, e);
        }
      }

      return {
        id: doc.id,
        name: docData.name,
        mobile: docData.mobile,
        pan: docData.pan,
        bureau: docData.bureau,
        credit_score: score,
        branch: docData.branch,
        search_tokens: docData.search_tokens,
        fallbackData: docData.fallbackData,
        // Convert Timestamp to simple seconds to be compatible with frontend UI
        created_at: docData.created_at ? { seconds: docData.created_at._seconds } : null
      };
    });

    if (branch && !(start && end)) {
      reports.sort((a: any, b: any) => {
        const timeA = a.created_at?.seconds || 0;
        const timeB = b.created_at?.seconds || 0;
        return timeB - timeA;
      });
    }

    return NextResponse.json({ success: true, reports });
  } catch (error) {
    console.error('API /admin/reports error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch reports' }, { status: 500 });
  }
}
