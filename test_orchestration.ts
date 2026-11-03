import { inspectUI } from './src/lib/meta-agent';

async function runOrchestration() {
  console.log('--- 🤖 RAG WEEK AGENTIC PIPELINE BAŞLATILIYOR ---');
  console.log('1. Kullanıcı İsteği: "Mapbox harita bileşeninde görünüm nasıl?"');
  console.log('2. LAYA Karar Motoru: DESIGN_CHECK');
  console.log('3. PANDAS Hafıza: map_container_v1');
  console.log('\n4. META Ejderha Gözü Devrede...');
  
  const visualCheck = await inspectUI('http://localhost:3000');
  console.log('META Sonucu:', visualCheck);
  
  if (visualCheck.aiAnalysis) {
    console.log(`\n🐉 --- DRACARYS EJDERHA RAPORU --- 🐉\n${visualCheck.aiAnalysis}\n----------------------------------`);
  }
  console.log('\n--- ✨ OTONOM DÖNGÜ TAMAMLANDI ---');
}

runOrchestration().catch(console.error);
