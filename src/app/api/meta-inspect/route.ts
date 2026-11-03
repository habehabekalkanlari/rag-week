import { NextResponse } from 'next/server';
import { inspectUI } from '@/lib/meta-agent';

export async function POST() {
  try {
    console.log('[API] Kullanıcı arayüzünden ejderha taraması tetiklendi...');
    const result = await inspectUI('http://localhost:3000');
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message, aiAnalysis: `Hata: ${error.message}` },
      { status: 500 }
    );
  }
}