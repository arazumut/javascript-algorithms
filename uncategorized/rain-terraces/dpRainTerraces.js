/**
 * Dinamik Programlama yaklaşımı ile Yağmur Suyu Biriktirme probleminin çözümü.
 *
 * @param {number[]} teraslar
 * @return {number}
 */
export default function dpRainTerraces(teraslar) {
  let suMiktari = 0;

  // Belirli pozisyonlar için sol ve sağ maksimum seviyelerin listesini tutacak dizileri başlat.
  const solMaksimumSeviyeler = new Array(teraslar.length).fill(0);
  const sagMaksimumSeviyeler = new Array(teraslar.length).fill(0);

  // Mevcut terasa göre SOL'dan en yüksek teras seviyesini hesapla.
  [solMaksimumSeviyeler[0]] = teraslar;
  for (let terasIndeksi = 1; terasIndeksi < teraslar.length; terasIndeksi += 1) {
    solMaksimumSeviyeler[terasIndeksi] = Math.max(
      teraslar[terasIndeksi],
      solMaksimumSeviyeler[terasIndeksi - 1],
    );
  }

  // Mevcut terasa göre SAĞ'dan en yüksek teras seviyesini hesapla.
  sagMaksimumSeviyeler[teraslar.length - 1] = teraslar[teraslar.length - 1];
  for (let terasIndeksi = teraslar.length - 2; terasIndeksi >= 0; terasIndeksi -= 1) {
    sagMaksimumSeviyeler[terasIndeksi] = Math.max(
      teraslar[terasIndeksi],
      sagMaksimumSeviyeler[terasIndeksi + 1],
    );
  }

  // Şimdi tüm terasları tek tek gez ve her terasın daha önce hesaplanan değerlere göre
  // ne kadar su biriktirebileceğini hesapla.
  for (let terasIndeksi = 0; terasIndeksi < teraslar.length; terasIndeksi += 1) {
    // Sol/sağ en yüksek teraslardan en düşüğünü seç.
    const mevcutTerasSiniri = Math.min(
      solMaksimumSeviyeler[terasIndeksi],
      sagMaksimumSeviyeler[terasIndeksi],
    );

    if (mevcutTerasSiniri > teraslar[terasIndeksi]) {
      suMiktari += mevcutTerasSiniri - teraslar[terasIndeksi];
    }
  }

  return suMiktari;
}
