import { laya } from './src/lib/laya-engine';

async function runTest() {
  const testPrompt = "Mapbox harita bileşeninde siyah ekran hatası alıyorum, acil fix lazım!";
  console.log(`[LAYA] Gelen İstek: "${testPrompt}"`);
  
  const decision = await laya.evaluateIntent(testPrompt);
  console.log('[LAYA] Karar Sonucu:', decision);
}

runTest();