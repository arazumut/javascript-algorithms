import Stack from '../../../data-structures/stack/Stack';
import depthFirstSearch from '../depth-first-search/depthFirstSearch';

/**
 * @param {Graph} graph
 */
export default function topolojikSıralama(graph) {
  // Ziyaret etmek istediğimiz tüm düğümlerin bir kümesini oluşturun.
  const ziyaretEdilmemişKume = {};
  graph.getAllVertices().forEach((vertex) => {
    ziyaretEdilmemişKume[vertex.getKey()] = vertex;
  });

  // Zaten ziyaret ettiğimiz tüm düğümler için bir küme oluşturun.
  const ziyaretEdilenKume = {};

  // Zaten sıralanmış düğümlerin bir yığınını oluşturun.
  const sıralıYığın = new Stack();

  const dfsGeriAramalar = {
    enterVertex: ({ currentVertex }) => {
      // Tüm çocukları keşfedildiyse düğümü ziyaret edilen kümeye ekleyin.
      ziyaretEdilenKume[currentVertex.getKey()] = currentVertex;

      // Bu düğümü ziyaret edilmemiş kümeden çıkarın.
      delete ziyaretEdilmemişKume[currentVertex.getKey()];
    },
    leaveVertex: ({ currentVertex }) => {
      // Düğüm tamamen keşfedildiyse, onu yığına itebiliriz.
      sıralıYığın.push(currentVertex);
    },
    allowTraversal: ({ nextVertex }) => {
      return !ziyaretEdilenKume[nextVertex.getKey()];
    },
  };

  // Hadi tüm ziyaret edilmemiş düğümler için DFS yapalım.
  while (Object.keys(ziyaretEdilmemişKume).length) {
    const currentVertexKey = Object.keys(ziyaretEdilmemişKume)[0];
    const currentVertex = ziyaretEdilmemişKume[currentVertexKey];

    // Mevcut düğüm için DFS yapın.
    depthFirstSearch(graph, currentVertex, dfsGeriAramalar);
  }

  return sıralıYığın.toArray();
}
