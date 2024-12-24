import graphBridges from '../bridges/graphBridges';

/**
 * Euler Yolu Bulma Algoritması (Grafın tüm kenarlarını tam olarak bir kez ziyaret etme).
 *
 * @param {Graph} graph
 * @return {GraphVertex[]}
 */
export default function eulerianPath(graph) {
  const eulerianPathVertices = [];

  // Çift dereceye sahip tüm düğümleri içeren küme.
  const evenRankVertices = {};

  // Tek dereceye sahip tüm düğümleri içeren küme.
  const oddRankVertices = {};

  // Ziyaret edilmemiş tüm kenarların kümesi.
  const notVisitedEdges = {};
  graph.getAllEdges().forEach((edge) => {
    notVisitedEdges[edge.getKey()] = edge;
  });

  // Grafın Eulerian Devresi veya Eulerian Yolu içerip içermediğini tespit et.
  graph.getAllVertices().forEach((vertex) => {
    if (vertex.getDegree() % 2) {
      oddRankVertices[vertex.getKey()] = vertex;
    } else {
      evenRankVertices[vertex.getKey()] = vertex;
    }
  });

  // Eulerian Devresi mi yoksa sadece Eulerian Yolu mu ile uğraştığımızı kontrol et.
  const isCircuit = !Object.values(oddRankVertices).length;

  if (!isCircuit && Object.values(oddRankVertices).length !== 2) {
    throw new Error('Eulerian yolu iki tek dereceli düğüm içermelidir');
  }

  // Geçiş için başlangıç düğümünü seç.
  let startVertex = null;

  if (isCircuit) {
    // Eulerian Devresi için hangi düğümden başladığımız önemli değil, 
    // bu yüzden ilk düğümü seçiyoruz.
    const evenVertexKey = Object.keys(evenRankVertices)[0];
    startVertex = evenRankVertices[evenVertexKey];
  } else {
    // Eulerian Yolu için iki tek dereceli düğümden birinden başlamamız gerekiyor.
    const oddVertexKey = Object.keys(oddRankVertices)[0];
    startVertex = oddRankVertices[oddVertexKey];
  }

  // Grafı gezmeye başla.
  let currentVertex = startVertex;
  while (Object.values(notVisitedEdges).length) {
    // Mevcut düğümü Eulerian yoluna ekle.
    eulerianPathVertices.push(currentVertex);

    // Grafdaki tüm köprüleri tespit et.
    const bridges = graphBridges(graph);

    // Grafdan silinecek bir sonraki kenarı seç.
    const currentEdges = currentVertex.getEdges();
    let edgeToDelete = null;
    if (currentEdges.length === 1) {
      // Eğer sadece bir kenar kaldıysa, onu seç.
      [edgeToDelete] = currentEdges;
    } else {
      // Eğer birçok kenar kaldıysa, köprü olmayan herhangi birini seç.
      [edgeToDelete] = currentEdges.filter((edge) => !bridges[edge.getKey()]);
    }

    // Bir sonraki mevcut düğümü tespit et.
    if (currentVertex.getKey() === edgeToDelete.startVertex.getKey()) {
      currentVertex = edgeToDelete.endVertex;
    } else {
      currentVertex = edgeToDelete.startVertex;
    }

    // Kenarı ziyaret edilmemiş kenarlar kümesinden sil.
    delete notVisitedEdges[edgeToDelete.getKey()];

    // Eğer son kenar silindiyse, bitiş düğümünü Eulerian yoluna ekle.
    if (Object.values(notVisitedEdges).length === 0) {
      eulerianPathVertices.push(currentVertex);
    }

    // Kenarı grafdan sil.
    graph.deleteEdge(edgeToDelete);
  }

  return eulerianPathVertices;
}
