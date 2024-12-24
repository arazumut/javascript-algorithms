/**
 * @param {number[]} adaylar - Seçtiğimiz aday numaraları.
 * @param {number} kalanToplam - MevcutKombinasyona adayları ekledikten sonra kalan toplam.
 * @param {number[][]} nihaiKombinasyonlar - Sonuç olarak elde edilen kombinasyonlar listesi.
 * @param {number[]} mevcutKombinasyon - Şu anda keşfedilen adaylar.
 * @param {number} başlangıç - Daha fazla keşif için adayın başladığı indeks.
 * @return {number[][]}
 */
function kombinasyonToplamıÖzyinelemeli(
  adaylar,
  kalanToplam,
  nihaiKombinasyonlar = [],
  mevcutKombinasyon = [],
  başlangıç = 0,
) {
  if (kalanToplam < 0) {
    // Başka bir aday ekleyerek sıfırın altına indik.
    // Bu, son adayın kabul edilemez olduğu anlamına gelir.
    return nihaiKombinasyonlar;
  }

  if (kalanToplam === 0) {
    // Eğer önceki adayı ekledikten sonra kalan toplam sıfır olduysa,
    // bu, aradığımız cevaplardan biri olduğu için mevcut kombinasyonu kaydetmemiz gerektiği anlamına gelir.
    nihaiKombinasyonlar.push(mevcutKombinasyon.slice());

    return nihaiKombinasyonlar;
  }

  // Henüz sıfıra ulaşmadıysak, kalan tüm olası adayları eklemeye devam edelim.
  for (let adayIndeksi = başlangıç; adayIndeksi < adaylar.length; adayIndeksi += 1) {
    const mevcutAday = adaylar[adayIndeksi];

    // Başka bir aday eklemeyi deneyelim.
    mevcutKombinasyon.push(mevcutAday);

    // Mevcut aday eklenmişken daha fazla seçeneği keşfet.
    kombinasyonToplamıÖzyinelemeli(
      adaylar,
      kalanToplam - mevcutAday,
      nihaiKombinasyonlar,
      mevcutKombinasyon,
      adayIndeksi,
    );

    // GERİ İZLEME.
    // Geri dönelim, mevcut adayı çıkaralım ve daha sonra diğerlerini deneyelim.
    mevcutKombinasyon.pop();
  }

  return nihaiKombinasyonlar;
}

/**
 * Belirli bir toplam için tüm olası kombinasyonları bulma algoritması.
 *
 * @param {number[]} adaylar
 * @param {number} hedef
 * @return {number[][]}
 */
export default function kombinasyonToplamı(adaylar, hedef) {
  return kombinasyonToplamıÖzyinelemeli(adaylar, hedef);
}
