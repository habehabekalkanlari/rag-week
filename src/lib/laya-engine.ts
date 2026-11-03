import { pandas } from './pandas-memory';

export type TaskIntent = 'ERROR_FIX' | 'DESIGN_CHECK' | 'SEO_OPTIMIZATION' | 'CODE_GENERATION';

export class LayaEngine {
  /**
   * Gelen isteği veya hatayı analiz eder, niyet (intent) belirler 
   * ve en hızlı rotayı çizer.
   */
  async evaluateIntent(prompt: string): Promise<{ intent: TaskIntent; confidence: number; recommendedAction: string }> {
    const lower = prompt.toLowerCase();
    
    // Hız motoru karar kuralları
    if (lower.includes('hata') || lower.includes('fix') || lower.includes('bug') || lower.includes('patladı') || lower.includes('çalışmıyor')) {
      return { 
        intent: 'ERROR_FIX', 
        confidence: 0.95, 
        recommendedAction: 'PANDAS hafızasından benzer kod bloğunu çağır ve META (Playwright) ile ekranı incele.' 
      };
    } else if (lower.includes('tasarım') || lower.includes('renk') || lower.includes('harita') || lower.includes('ui') || lower.includes('görsel')) {
      return { 
        intent: 'DESIGN_CHECK', 
        confidence: 0.90, 
        recommendedAction: 'META (Qwen-VL) görsel denetim katmanını tetikle.' 
      };
    } else if (lower.includes('seo') || lower.includes('meta')) {
      return { 
        intent: 'SEO_OPTIMIZATION', 
        confidence: 0.85, 
        recommendedAction: 'Sayfa yapıısını ve meta etiketlerini tarayarak optimize et.' 
      };
    } else {
      return { 
        intent: 'CODE_GENERATION', 
        confidence: 0.80, 
        recommendedAction: 'PANDAS vektör hafızasından referans kod çekerek yeni bileşeni üret.' 
      };
    }
  }
}

export const laya = new LayaEngine();