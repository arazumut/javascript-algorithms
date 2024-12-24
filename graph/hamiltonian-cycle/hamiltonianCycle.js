import GraphVertex from '../../../data-structures/graph/GraphVertex';

/**
 * @param {number[][]} adjacencyMatrix
 * @param {object} verticesIndices
 * @param {GraphVertex[]} cycle
 * @param {GraphVertex} vertexCandidate
 * @return {boolean}
 */
function güvenliMi(adjacencyMatrix, verticesIndices, cycle, vertexCandidate) {
  const sonDüğüm = cycle[cycle.length - 1];

  // Son ve aday düğümlerin komşuluk matrisi indekslerini al.
  const adayDüğümKomşulukİndeksi = verticesIndices[vertexCandidate.getKey()];
  const sonDüğümKomşulukİndeksi = verticesIndices[sonDüğüm.getKey()];

  // Yoldaki son düğüm ile aday düğümün komşu olup olmadığını kontrol et.
  if (adjacencyMatrix[sonDüğümKomşulukİndeksi][adayDüğümKomşulukİndeksi] === Infinity) {
    return false;
  }

  // Aday düğümün yola ilk kez eklenip eklenmediğini kontrol et.
  const adayTekrarı = cycle.find((vertex) => vertex.getKey() === vertexCandidate.getKey());

  return !adayTekrarı;
}

/**
 * @param {number[][]} adjacencyMatrix
 * @param {object} verticesIndices
 * @param {GraphVertex[]} cycle
 * @return {boolean}
 */
function döngüMü(adjacencyMatrix, verticesIndices, cycle) {
  // Hamilton yolu üzerindeki ilk ve son düğümlerin komşu olup olmadığını kontrol et.

  // Yoldan başlangıç ve bitiş düğümlerini al.
  const başlangıçDüğümü = cycle[0];
  const sonDüğüm = cycle[cycle.length - 1];

  // Başlangıç/bitiş düğümlerinin komşuluk matrisi indekslerini al.
  const başlangıçDüğümüKomşulukİndeksi = verticesIndices[başlangıçDüğümü.getKey()];
  const sonDüğümKomşulukİndeksi = verticesIndices[sonDüğüm.getKey()];

  // Son düğümden başlangıç düğümüne gidip gidilemeyeceğini kontrol et.
  return adjacencyMatrix[sonDüğümKomşulukİndeksi][başlangıçDüğümüKomşulukİndeksi] !== Infinity;
}

/**
 * @param {number[][]} adjacencyMatrix
 * @param {GraphVertex[]} vertices
 * @param {object} verticesIndices
 * @param {GraphVertex[][]} cycles
 * @param {GraphVertex[]} cycle
 */
function hamiltonianCycleRecursive({
  adjacencyMatrix,
  vertices,
  verticesIndices,
  cycles,
  cycle,
}) {
  // Döngüyü klonla, böylece diğer DFS dalları tarafından değiştirilmesini önle.
  const mevcutDöngü = [...cycle].map((vertex) => new GraphVertex(vertex.value));

  if (vertices.length === mevcutDöngü.length) {
    // Hamilton yolu bulundu.
    // Şimdi bunun bir döngü olup olmadığını kontrol etmemiz gerekiyor.
    if (döngüMü(adjacencyMatrix, verticesIndices, mevcutDöngü)) {
      // Başka bir çözüm bulundu. Kaydet.
      cycles.push(mevcutDöngü);
    }
    return;
  }

  for (let vertexIndex = 0; vertexIndex < vertices.length; vertexIndex += 1) {
    // Bir sonraki yol adımına koymayı deneyeceğimiz ve uyup uymadığını göreceğimiz aday düğümü al.
    const adayDüğüm = vertices[vertexIndex];

    // Aday düğümü döngüye koymanın güvenli olup olmadığını kontrol et.
    if (güvenliMi(adjacencyMatrix, verticesIndices, mevcutDöngü, adayDüğüm)) {
      // Aday düğümü döngü yoluna ekle.
      mevcutDöngü.push(adayDüğüm);

      // Döngüdeki diğer düğümleri bulmaya çalış.
      hamiltonianCycleRecursive({
        adjacencyMatrix,
        vertices,
        verticesIndices,
        cycles,
        cycle: mevcutDöngü,
      });

      // GERİ İZLEME.
      // Aday düğümü döngü yolundan çıkar, böylece başka birini deneyebilirsin.
      mevcutDöngü.pop();
    }
  }
}

/**
 * @param {Graph} graph
 * @return {GraphVertex[][]}
 */
export default function hamiltonianCycle(graph) {
  // Çözüm sırasında ihtiyaç duyacağımız grafik hakkında bazı bilgiler topla.
  const verticesIndices = graph.getVerticesIndices();
  const adjacencyMatrix = graph.getAdjacencyMatrix();
  const vertices = graph.getAllVertices();

  // Başlangıç düğümünü tanımla. Her zaman ilkini seçeceğiz,
  // çünkü bir döngüde hangi düğümü seçeceğimiz önemli değil.
  // Her düğüm bir döngüde olduğu için herhangi birinden başlayabiliriz.
  const başlangıçDüğümü = vertices[0];

  // Tüm çözümleri tutacak döngüler dizisini başlat.
  const cycles = [];

  // Mevcut döngü yolunu tutacak döngü dizisini başlat.
  const cycle = [başlangıçDüğümü];

  // Döngüleri Derinlik Öncelikli Arama sırasına göre özyinelemeli olarak bulmaya çalış.
  hamiltonianCycleRecursive({
    adjacencyMatrix,
    vertices,
    verticesIndices,
    cycles,
    cycle,
  });

  // Bulunan döngüleri döndür.
  return cycles;
}
