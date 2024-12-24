import AyrıkKüme from '../../../data-structures/disjoint-set/DisjointSet';

/**
 * Ayrık kümeler kullanarak yönsüz grafikte döngü tespiti.
 *
 * @param {Graf} graf
 */
export default function ayrikKumeKullanarakDonguTespiti(graf) {
  // Her graf düğümü için başlangıçta tekil ayrık kümeler oluştur.
  /** @param {GrafDugumu} grafDugumu */
  const anahtarCikartici = (grafDugumu) => grafDugumu.anahtariGetir();
  const ayrikKume = new AyrıkKüme(anahtarCikartici);
  graf.tumDugumleriGetir().forEach((grafDugumu) => ayrikKume.kumeOlustur(grafDugumu));

  // Tüm graf kenarlarını tek tek kontrol et ve kenar düğümlerinin farklı kümelerde olup olmadığını kontrol et.
  // Bu durumda bu kümeleri birleştir. Aynı kümede olan iki düğüm bulana kadar devam et.
  // Bu, mevcut kenarın bir döngü oluşturacağı anlamına gelir.
  let donguBulundu = false;
  /** @param {GrafKenari} grafKenari */
  graf.tumKenarlarıGetir().forEach((grafKenari) => {
    if (ayrikKume.ayniKumedeMi(grafKenari.baslangicDugumu, grafKenari.bitisDugumu)) {
      // Döngü bulundu.
      donguBulundu = true;
    } else {
      ayrikKume.birlestir(grafKenari.baslangicDugumu, grafKenari.bitisDugumu);
    }
  });

  return donguBulundu;
}
