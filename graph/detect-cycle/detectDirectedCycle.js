import derinlikÖncelikliArama from '../depth-first-search/depthFirstSearch';

/**
 * Yönlendirilmiş grafikte Derinlik Öncelikli Arama kullanarak döngü tespit et.
 *
 * @param {Graph} graph
 */
export default function yönlendirilmişDöngüTespit(graph) {
  let döngü = null;

  // Ziyaret edilen tüm düğümler için ebeveynleri (önceki düğümleri) saklayacağız.
  // Bu, hangi yolun tam olarak bir döngü olduğunu belirtmek için gerekli olacak.
  const dfsEbeveynHaritası = {};

  // Beyaz küme (ZİYARET EDİLMEMİŞ) henüz hiç ziyaret edilmemiş tüm düğümleri içerir.
  const beyazKüme = {};

  // Gri küme (ZİYARET EDİLİYOR) şu anda ziyaret edilmekte olan tüm düğümleri içerir
  // (mevcut yolda).
  const griKüme = {};

  // Siyah küme (ZİYARET EDİLDİ) tamamen ziyaret edilmiş tüm düğümleri içerir.
  // Yani düğümün tüm çocukları ziyaret edilmiştir.
  const siyahKüme = {};

  // Gri kümede bir düğümle karşılaşırsak, bu bir döngü bulduğumuz anlamına gelir.
  // Çünkü gri kümede bir düğüm olduğunda, komşuları veya komşularının komşuları
  // hala keşfedilmektedir.

  // Beyaz kümeyi başlat ve tüm düğümleri buna ekle.
  /** @param {GraphVertex} düğüm */
  graph.getAllVertices().forEach((düğüm) => {
    beyazKüme[düğüm.getKey()] = düğüm;
  });

  // BFS geri çağırmalarını tanımla.
  const geriÇağırmalar = {
    düğümeGir: ({ mevcutDüğüm, öncekiDüğüm }) => {
      if (griKüme[mevcutDüğüm.getKey()]) {
        // Eğer mevcut düğüm zaten gri kümede ise, bu bir döngü tespit edildiği anlamına gelir.
        // Döngü yolunu tespit edelim.
        döngü = {};

        let mevcutDöngüDüğümü = mevcutDüğüm;
        let öncekiDöngüDüğümü = öncekiDüğüm;

        while (öncekiDöngüDüğümü.getKey() !== mevcutDüğüm.getKey()) {
          döngü[mevcutDöngüDüğümü.getKey()] = öncekiDöngüDüğümü;
          mevcutDöngüDüğümü = öncekiDöngüDüğümü;
          öncekiDöngüDüğümü = dfsEbeveynHaritası[öncekiDöngüDüğümü.getKey()];
        }

        döngü[mevcutDöngüDüğümü.getKey()] = öncekiDöngüDüğümü;
      } else {
        // Aksi takdirde, mevcut düğümü gri kümeye ekleyelim ve beyaz kümeden çıkaralım.
        griKüme[mevcutDüğüm.getKey()] = mevcutDüğüm;
        delete beyazKüme[mevcutDüğüm.getKey()];

        // DFS ebeveynler listesini güncelle.
        dfsEbeveynHaritası[mevcutDüğüm.getKey()] = öncekiDüğüm;
      }
    },
    düğümdenÇık: ({ mevcutDüğüm }) => {
      // Eğer düğümün tüm çocukları ziyaret edilmişse, onu gri kümeden çıkaralım
      // ve siyah kümeye taşıyalım, bu da tüm komşularının ziyaret edildiği anlamına gelir.
      siyahKüme[mevcutDüğüm.getKey()] = mevcutDüğüm;
      delete griKüme[mevcutDüğüm.getKey()];
    },
    geçişeİzinVer: ({ sonrakiDüğüm }) => {
      // Eğer döngü tespit edilmişse, tüm geçişleri yasaklamalıyız çünkü bu
      // sonsuz geçiş döngüsüne neden olacaktır.
      if (döngü) {
        return false;
      }

      // Geçişe sadece siyah kümede olmayan düğümler için izin ver
      // çünkü siyah kümedeki tüm düğümler zaten ziyaret edilmiştir.
      return !siyahKüme[sonrakiDüğüm.getKey()];
    },
  };

  // Düğümleri keşfetmeye başla.
  while (Object.keys(beyazKüme).length) {
    // BFS'ye başlamak için ilk düğümü seç.
    const ilkBeyazAnahtar = Object.keys(beyazKüme)[0];
    const başlangıçDüğümü = beyazKüme[ilkBeyazAnahtar];

    // Derinlik Öncelikli Arama yap.
    derinlikÖncelikliArama(graph, başlangıçDüğümü, geriÇağırmalar);
  }

  return döngü;
}
