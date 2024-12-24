import derinlikÖncelikliArama from '../depth-first-search/depthFirstSearch';

/**
 * Ziyaret edilen düğüm meta verileri için yardımcı sınıf.
 */
class ZiyaretMetaVerisi {
  constructor({ keşifZamanı, düşükKeşifZamanı }) {
    this.keşifZamanı = keşifZamanı;
    this.düşükKeşifZamanı = düşükKeşifZamanı;
  }
}

/**
 * @param {Graph} grafik
 * @return {Object}
 */
export default function grafikKöprüleri(grafik) {
  // DFS sırasında ziyaret ettiğimiz düğümlerin kümesi.
  const ziyaretEdilenKüme = {};

  // Köprülerin kümesi.
  const köprüler = {};

  // Mevcut düğümü keşfetmek için gereken zaman.
  let keşifZamanı = 0;

  // DFS geçişi için başlangıç düğümünü seç.
  const başlangıçDüğümü = grafik.getAllVertices()[0];

  const dfsGeriAramalar = {
    /**
     * @param {GraphVertex} mevcutDüğüm
     */
    düğümeGir: ({ mevcutDüğüm }) => {
      // Keşif zamanını artır.
      keşifZamanı += 1;

      // Mevcut düğümü ziyaret edilen kümeye ekle.
      ziyaretEdilenKüme[mevcutDüğüm.getKey()] = new ZiyaretMetaVerisi({
        keşifZamanı,
        düşükKeşifZamanı: keşifZamanı,
      });
    },
    /**
     * @param {GraphVertex} mevcutDüğüm
     * @param {GraphVertex} öncekiDüğüm
     */
    düğümdenÇık: ({ mevcutDüğüm, öncekiDüğüm }) => {
      if (öncekiDüğüm === null) {
        // Kök düğüm için bir şey yapma.
        return;
      }

      // Mevcut düğümün, önceki düğümden başka bir erken düğüme bağlı olup olmadığını kontrol et.
      ziyaretEdilenKüme[mevcutDüğüm.getKey()].düşükKeşifZamanı = mevcutDüğüm.getNeighbors()
        .filter((erkenKomşu) => erkenKomşu.getKey() !== öncekiDüğüm.getKey())
        .reduce(
          /**
           * @param {number} enDüşükKeşifZamanı
           * @param {GraphVertex} komşu
           */
          (enDüşükKeşifZamanı, komşu) => {
            const komşuDüşükZamanı = ziyaretEdilenKüme[komşu.getKey()].düşükKeşifZamanı;
            return komşuDüşükZamanı < enDüşükKeşifZamanı ? komşuDüşükZamanı : enDüşükKeşifZamanı;
          },
          ziyaretEdilenKüme[mevcutDüğüm.getKey()].düşükKeşifZamanı,
        );

      // Düşük keşif zamanlarını karşılaştır. Mevcut düşük keşif zamanı, önceki düğümdeki düşük keşif zamanından küçükse, önceki düğümün düşük zamanını güncelle.
      const mevcutDüşükKeşifZamanı = ziyaretEdilenKüme[mevcutDüğüm.getKey()].düşükKeşifZamanı;
      const öncekiDüşükKeşifZamanı = ziyaretEdilenKüme[öncekiDüğüm.getKey()].düşükKeşifZamanı;
      if (mevcutDüşükKeşifZamanı < öncekiDüşükKeşifZamanı) {
        ziyaretEdilenKüme[öncekiDüğüm.getKey()].düşükKeşifZamanı = mevcutDüşükKeşifZamanı;
      }

      // Mevcut düğümün düşük keşif zamanını, ebeveyn keşif zamanı ile karşılaştır. Kısa bir yol (geri kenar) olup olmadığını kontrol et. Mevcut düğüme ebeveyn dışında başka bir yolla ulaşamıyorsak, ebeveyn düğüm, mevcut düğüm için bir eklem noktasıdır.
      const ebeveynKeşifZamanı = ziyaretEdilenKüme[öncekiDüğüm.getKey()].keşifZamanı;
      if (ebeveynKeşifZamanı < mevcutDüşükKeşifZamanı) {
        const köprü = grafik.findEdge(öncekiDüğüm, mevcutDüğüm);
        köprüler[köprü.getKey()] = köprü;
      }
    },
    geçişeİzinVer: ({ sonrakiDüğüm }) => {
      return !ziyaretEdilenKüme[sonrakiDüğüm.getKey()];
    },
  };

  // Gönderilen grafik üzerinde Derinlik Öncelikli Arama geçişi yap.
  derinlikÖncelikliArama(grafik, başlangıçDüğümü, dfsGeriAramalar);

  return köprüler;
}
