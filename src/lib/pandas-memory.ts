import { ChromaClient } from 'chromadb';

// ChromaDB istemcisini yerel sunucuya bağlıyoruz
const chroma = new ChromaClient({ path: 'http://localhost:8000' });

export class PandasMemory {
  private collectionName = 'rag_week_memory';

  async initCollection() {
    try {
      const collection = await chroma.getOrCreateCollection({
        name: this.collectionName,
        metadata: { description: "PANDAS Component & Code Memory for Rag Week" }
      });
      return collection;
    } catch (error) {
      console.error('ChromaDB bağlantı hatası (PANDAS):', error);
      return null;
    }
  }

  async rememberCode(documentId: string, codeContent: string, metadata: object) {
    const collection = await this.initCollection();
    if (!collection) return;

    await collection.add({
      ids: [documentId],
      documents: [codeContent],
      metadatas: [metadata],
    });
    console.log(`[PANDAS] Kod hafızaya alındı: ${documentId}`);
  }

  async recallContext(queryText: string, nResults: number = 3) {
    const collection = await this.initCollection();
    if (!collection) return [];

    const results = await collection.query({
      queryTexts: [queryText],
      nResults: nResults,
    });

    return results;
  }
}

export const pandas = new PandasMemory();