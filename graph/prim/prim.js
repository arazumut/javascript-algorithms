import Graph from '../../../data-structures/graph/Graph';
import PriorityQueue from '../../../data-structures/priority-queue/PriorityQueue';

/**
 * @param {Graph} graph
 * @return {Graph}
 */
export default function prim(graph) {
  // Algoritma sadece yönsüz grafikte çalıştığı için, yönlü grafiklerde hata fırlatılmalıdır.
  if (graph.isDirected) {
    throw new Error('Prim algoritması sadece yönsüz grafikte çalışır');
  }

  // Orijinal grafiğin minimum yayılım ağacını içerecek yeni grafiği başlat.
  const minimumSpanningTree = new Graph();

  // Bu öncelik kuyruğu, ziyaret edilen düğümlerden başlayan tüm kenarları içerecek
  // ve kenar ağırlığına göre sıralanacak - böylece her adımda her zaman en düşük ağırlıklı kenarı seçeriz.
  const edgesQueue = new PriorityQueue();

  // Zaten ziyaret edilmiş düğümlerin kümesi.
  const visitedVertices = {};

  // Grafik taramasına başlayacağımız düğüm.
  const startVertex = graph.getAllVertices()[0];

  // Başlangıç düğümünü ziyaret edilenler kümesine ekle.
  visitedVertices[startVertex.getKey()] = startVertex;

  // Başlangıç düğümünün tüm kenarlarını kuyruğa ekle.
  startVertex.getEdges().forEach((graphEdge) => {
    edgesQueue.add(graphEdge, graphEdge.weight);
  });

  // Şimdi tüm sıradaki kenarları keşfedelim.
  while (!edgesQueue.isEmpty()) {
    // En düşük ağırlıklı sıradaki kenarı al.
    /** @var {GraphEdge} currentEdge */
    const currentMinEdge = edgesQueue.poll();

    // Geçilecek bir sonraki ziyaret edilmemiş en düşük düğümü bul.
    let nextMinVertex = null;
    if (!visitedVertices[currentMinEdge.startVertex.getKey()]) {
      nextMinVertex = currentMinEdge.startVertex;
    } else if (!visitedVertices[currentMinEdge.endVertex.getKey()]) {
      nextMinVertex = currentMinEdge.endVertex;
    }

    // Eğer mevcut kenarın tüm düğümleri zaten ziyaret edilmişse bu turu atla.
    if (nextMinVertex) {
      // Mevcut en düşük kenarı MST'ye ekle.
      minimumSpanningTree.addEdge(currentMinEdge);

      // Düğümü ziyaret edilenler kümesine ekle.
      visitedVertices[nextMinVertex.getKey()] = nextMinVertex;

      // Mevcut düğümün tüm kenarlarını kuyruğa ekle.
      nextMinVertex.getEdges().forEach((graphEdge) => {
        // Sadece ziyaret edilmemiş düğümlere bağlanan kenarları ekle.
        if (
          !visitedVertices[graphEdge.startVertex.getKey()]
          || !visitedVertices[graphEdge.endVertex.getKey()]
        ) {
          edgesQueue.add(graphEdge, graphEdge.weight);
        }
      });
    }
  }

  return minimumSpanningTree;
}
