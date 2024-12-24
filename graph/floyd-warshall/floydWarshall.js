/**
 * @param {Graph} graph
 * @return {{distances: number[][], nextVertices: GraphVertex[][]}}
 */
export default function floydWarshall(graph) {
  // Tüm graf düğümlerini al.
  const vertices = graph.getAllVertices();

  // Önceki düğümler matrisini null ile başlat, yani şu anda
  // en kısa yolu sağlayacak önceki düğümler yok.
  const nextVertices = Array(vertices.length).fill(null).map(() => {
    return Array(vertices.length).fill(null);
  });

  // Mesafeler matrisini sonsuz ile başlat, yani şu anda
  // düğümler arasında yollar yok.
  const distances = Array(vertices.length).fill(null).map(() => {
    return Array(vertices.length).fill(Infinity);
  });

  // Mesafe matrisini mevcut kenarlardan bildiğimiz mesafelerle başlat.
  // Ayrıca kenarlardan önceki düğümleri başlat.
  vertices.forEach((startVertex, startIndex) => {
    vertices.forEach((endVertex, endIndex) => {
      if (startVertex === endVertex) {
        // Düğümün kendisine olan mesafe 0'dır.
        distances[startIndex][endIndex] = 0;
      } else {
        // Başlangıç ve bitiş düğümleri arasındaki kenarı bul.
        const edge = graph.findEdge(startVertex, endVertex);

        if (edge) {
          // Başlangıç düğümünden bitiş düğümüne bir kenar var.
          // Mesafeyi ve önceki düğümü kaydet.
          distances[startIndex][endIndex] = edge.weight;
          nextVertices[startIndex][endIndex] = startVertex;
        } else {
          distances[startIndex][endIndex] = Infinity;
        }
      }
    });
  });

  // Şimdi algoritmanın özüne geçelim.
  // Tüm düğüm çiftlerini (başlangıçtan bitişe) alalım ve aralarında
  // orta düğüm üzerinden daha kısa bir yol olup olmadığını kontrol edelim.
  // Orta düğüm de graf düğümlerinden biri olabilir. Şimdi üç
  // döngü yapacağız: başlangıç, bitiş ve orta düğümler için.
  vertices.forEach((middleVertex, middleIndex) => {
    // Yol başlangıç düğümünden başlar.
    vertices.forEach((startVertex, startIndex) => {
      // Yol bitiş düğümünde sona erer.
      vertices.forEach((endVertex, endIndex) => {
        // Mevcut mesafeyi başlangıç düğümünden bitiş düğümüne karşılaştır,
        // ama orta düğüm üzerinden. En kısa mesafeyi ve önceki düğümü kaydet.
        const distViaMiddle = distances[startIndex][middleIndex] + distances[middleIndex][endIndex];

        if (distances[startIndex][endIndex] > distViaMiddle) {
          // Orta düğüm üzerinden daha kısa bir yol bulduk.
          distances[startIndex][endIndex] = distViaMiddle;
          nextVertices[startIndex][endIndex] = middleVertex;
        }
      });
    });
  });

  // x'den y'ye en kısa mesafe: distance[x][y].
  // x'den y'ye olan yolda x'den sonraki düğüm: nextVertices[x][y].
  return { distances, nextVertices };
}
