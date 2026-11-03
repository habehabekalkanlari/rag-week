import chromadb

# Yerel persistent client'a bağlanıyoruz
client = chromadb.PersistentClient(path="./chroma_data")

# Koleksiyonu al veya oluştur (PANDAS Hafızası)
collection = client.get_or_create_collection(
    name="rag_week_memory",
    metadata={"description": "PANDAS Component & Code Memory for Rag Week"}
)

# Test edilecek örnek Mapbox bileşen kodunu indeksliyoruz
component_id = "map_container_v1"
component_code = """
'use client';
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
export default function MapContainer({ events }) {
  // Mapbox GL JS dark-v11 entegrasyonu ve pin yönetimi
}
"""

# ChromaDB'ye ekleme işlemi
collection.upsert(
    ids=[component_id],
    documents=[component_code],
    metadatas=[{"type": "react_component", "framework": "nextjs", "feature": "mapbox"}]
)

print(f"[PANDAS] Başarıyla indekslendi: {component_id}")

# Hafızadan arama testi yapalım
results = collection.query(
    query_texts=["Mapbox harita bileşeni nerede?"],
    n_results=1
)

print("\n[PANDAS] Hafızadan Gelen Arama Sonucu:")
print(results)