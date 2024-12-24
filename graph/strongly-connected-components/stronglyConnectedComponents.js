import Stack from '../../../data-structures/stack/Stack';
import depthFirstSearch from '../depth-first-search/depthFirstSearch';

/**
 * @param {Graph} graph
 * @return {Stack}
 */
function dfsBitisZamaninaGoreSiralanmisDugumler(graph) {
  // DFS sırasında ziyaret edilen tüm düğümlerin kümesi.
  const ziyaretEdilenDugumlerKumesi = {};

  // Bitiş zamanına göre sıralanmış düğümlerin yığını.
  // Bu yığındaki tüm düğümler azalan bitiş zamanına göre sıralanmıştır.
  // İlk bitirilen düğüm yığının en altında, son bitirilen düğüm ise yığının en üstünde olacaktır.
  const dfsBitisZamaninaGoreDugumler = new Stack();

  // Ziyaret edilecek tüm düğümlerin kümesi.
  const ziyaretEdilmemisDugumlerKumesi = {};
  graph.getAllVertices().forEach((vertex) => {
    ziyaretEdilmemisDugumlerKumesi[vertex.getKey()] = vertex;
  });

  // DFS geçişi geri çağırma fonksiyonları.
  const dfsGeriCagirmalar = {
    enterVertex: ({ currentVertex }) => {
      // Mevcut düğümü ziyaret edilenler kümesine ekle.
      ziyaretEdilenDugumlerKumesi[currentVertex.getKey()] = currentVertex;

      // Mevcut düğümü ziyaret edilmemişler kümesinden sil.
      delete ziyaretEdilmemisDugumlerKumesi[currentVertex.getKey()];
    },
    leaveVertex: ({ currentVertex }) => {
      // Düğümden çıkarken düğümü yığına ekle.
      // Bu, yığının azalan bitiş zamanına göre sıralanmasını sağlar.
      dfsBitisZamaninaGoreDugumler.push(currentVertex);
    },
    allowTraversal: ({ nextVertex }) => {
      // Zaten ziyaret edilmiş düğümlere geçişe izin verme.
      return !ziyaretEdilenDugumlerKumesi[nextVertex.getKey()];
    },
  };

  // Tüm düğümleri ziyaret etmek için ilk DFS geçişini yap.
  while (Object.values(ziyaretEdilmemisDugumlerKumesi).length) {
    // DFS geçişine başlamak için herhangi bir düğümü seç.
    const baslangicDugumuAnahtari = Object.keys(ziyaretEdilmemisDugumlerKumesi)[0];
    const baslangicDugumu = ziyaretEdilmemisDugumlerKumesi[baslangicDugumuAnahtari];
    delete ziyaretEdilmemisDugumlerKumesi[baslangicDugumuAnahtari];

    depthFirstSearch(graph, baslangicDugumu, dfsGeriCagirmalar);
  }

  return dfsBitisZamaninaGoreDugumler;
}

/**
 * @param {Graph} graph
 * @param {Stack} bitisZamaninaGoreDugumler
 * @return {*[]}
 */
function kuvvetliBagliBilesenKumeleri(graph, bitisZamaninaGoreDugumler) {
  // Kuvvetli bağlı düğümlerin dizisi.
  const kuvvetliBagliBilesenKumeleri = [];

  // Bir DFS çalışması sırasında ziyaret edilen tüm düğümleri tutacak dizi.
  let kuvvetliBagliBilesenKumesi = [];

  // Ziyaret edilen düğümlerin kümesi.
  const ziyaretEdilenDugumlerKumesi = {};

  // DFS geçişi geri çağırma fonksiyonları.
  const dfsGeriCagirmalar = {
    enterVertex: ({ currentVertex }) => {
      // Mevcut düğümü geçerli DFS turunun kuvvetli bağlı bileşen kümesine ekle.
      kuvvetliBagliBilesenKumesi.push(currentVertex);

      // Mevcut düğümü ziyaret edilenler kümesine ekle.
      ziyaretEdilenDugumlerKumesi[currentVertex.getKey()] = currentVertex;
    },
    leaveVertex: ({ previousVertex }) => {
      // DFS geçişi tamamlandığında, geçerli DFS turunda bulunan kuvvetli bağlı bileşen kümesini
      // genel kuvvetli bağlı bileşen kümelerine ekle.
      // Geçişin tamamlanmak üzere olduğunun işareti, başlangıç düğümüne geri dönmemizdir.
      if (previousVertex === null) {
        kuvvetliBagliBilesenKumeleri.push([...kuvvetliBagliBilesenKumesi]);
      }
    },
    allowTraversal: ({ nextVertex }) => {
      // Zaten ziyaret edilmiş düğümlere geçişe izin verme.
      return !ziyaretEdilenDugumlerKumesi[nextVertex.getKey()];
    },
  };

  while (!bitisZamaninaGoreDugumler.isEmpty()) {
    /** @var {GraphVertex} baslangicDugumu */
    const baslangicDugumu = bitisZamaninaGoreDugumler.pop();

    // Kuvvetli bağlı düğümler kümesini sıfırla.
    kuvvetliBagliBilesenKumesi = [];

    // Zaten ziyaret edilmiş düğümlerde DFS yapma.
    if (!ziyaretEdilenDugumlerKumesi[baslangicDugumu.getKey()]) {
      // DFS geçişini yap.
      depthFirstSearch(graph, baslangicDugumu, dfsGeriCagirmalar);
    }
  }

  return kuvvetliBagliBilesenKumeleri;
}

/**
 * Kosaraju'nun algoritması.
 *
 * @param {Graph} graph
 * @return {*[]}
 */
export default function kuvvetliBagliBilesenler(graph) {
  // Bu algoritmada grafik üzerinde İKİ DFS GEÇİŞİ yapmamız gerekecek.

  // DFS bitiş zamanına göre sıralanmış düğümlerin yığınını al.
  // Bu yığındaki tüm düğümler azalan bitiş zamanına göre sıralanmıştır:
  // İlk bitirilen düğüm yığının en altında, son bitirilen düğüm ise yığının en üstünde olacaktır.
  const bitisZamaninaGoreDugumler = dfsBitisZamaninaGoreSiralanmisDugumler(graph);

  // Grafiği tersine çevir.
  graph.reverse();

  // Tersine çevrilmiş grafikte tekrar DFS yap.
  return kuvvetliBagliBilesenKumeleri(graph, bitisZamaninaGoreDugumler);
}
