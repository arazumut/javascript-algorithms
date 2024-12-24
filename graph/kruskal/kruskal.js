import Graph from '../../../data-structures/graph/Graph';
import QuickSort from '../../sorting/quick-sort/QuickSort';
import DisjointSet from '../../../data-structures/disjoint-set/DisjointSet';

/**
 * @param {Graph} graph
 * @return {Graph}
 */
export default function kruskal(graph) {
  // Algoritma sadece yönsüz grafikler için çalıştığından, grafik yönlü ise hata fırlatılmalıdır.
  if (graph.isDirected) {
    throw new Error('Kruskal algoritması sadece yönsüz grafikler için çalışır');
  }

  // Orijinal grafiğin minimum yayılma ağacını içerecek yeni grafik başlatılır.
  const minimumYayilmaAgaci = new Graph();

  // Tüm grafik kenarlarını artan sırayla sıralayın.
  const siralamaCallbackleri = {
    /**
     * @param {GraphEdge} graphEdgeA
     * @param {GraphEdge} graphEdgeB
     */
    compareCallback: (graphEdgeA, graphEdgeB) => {
      if (graphEdgeA.weight === graphEdgeB.weight) {
        return 1;
      }

      return graphEdgeA.weight <= graphEdgeB.weight ? -1 : 1;
    },
  };
  const siralanmisKenarlar = new QuickSort(siralamaCallbackleri).sort(graph.getAllEdges());

  // Tüm grafik düğümleri için ayrık kümeler oluşturun.
  const anahtarCallback = (graphVertex) => graphVertex.getKey();
  const ayrikKume = new DisjointSet(anahtarCallback);

  graph.getAllVertices().forEach((graphVertex) => {
    ayrikKume.makeSet(graphVertex);
  });

  // Minimum kenardan başlayarak tüm kenarları gözden geçirin ve bunları 
  // minimum yayılma ağacına eklemeye çalışın.
  // Kenarın eklenme kriteri, döngü oluşturup oluşturmadığı olacaktır
  //  (aynı ayrık kümeye ait iki düğümü bağlayıp bağlamadığı).
  for (let kenarIndeksi = 0; kenarIndeksi < siralanmisKenarlar.length; kenarIndeksi += 1) {
    /** @var {GraphEdge} mevcutKenar */
    const mevcutKenar = siralanmisKenarlar[kenarIndeksi];

    // Kenarın döngü oluşturup oluşturmadığını kontrol edin. Eğer oluşturuyorsa atlayın.
    if (!ayrikKume.inSameSet(mevcutKenar.startVertex, mevcutKenar.endVertex)) {
      // İki alt kümeyi birleştirin.
      ayrikKume.union(mevcutKenar.startVertex, mevcutKenar.endVertex);

      // Bu kenarı yayılma ağına ekleyin.
      minimumYayilmaAgaci.addEdge(mevcutKenar);
    }
  }

  return minimumYayilmaAgaci;
}
