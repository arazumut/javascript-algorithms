/**
 * Özyinelemeli Merdiven Problemi (Dinamik Programlama Çözümü).
 *
 * @param {number} basamakSayisi - Tırmanılacak basamak sayısı.
 * @return {number} - Bir merdiveni tırmanmanın yollarının sayısı.
 */
export default function ozyinelemeliMerdivenDP(basamakSayisi) {
  if (basamakSayisi < 0) {
    // Aşağı inmenin bir yolu yok - merdivenleri sadece yukarı tırmanırsınız.
    return 0;
  }

  // Her bir basamağa ulaşmanın tüm olası yollarını tutacak adımlar vektörünü başlat.
  const adimlar = new Array(basamakSayisi + 1).fill(0);

  // 0., 1. ve 2. basamaklara ulaşmanın yollarının sayısını başlat.
  adimlar[0] = 1; // 0. basamağa ulaşmanın 1 yolu vardır (hiç hareket etmemek).
  adimlar[1] = 1; // 1. basamağa ulaşmanın 1 yolu vardır.
  adimlar[2] = 2; // 2. basamağa ulaşmanın 2 yolu vardır.

  if (basamakSayisi <= 2) {
    // 0., 1. veya 2. basamaklara ulaşmanın yollarının sayısını döndür.
    return adimlar[basamakSayisi];
  }

  // Her bir sonraki basamağı iki önceki basamağa göre hesapla.
  for (let mevcutBasamak = 3; mevcutBasamak <= basamakSayisi; mevcutBasamak += 1) {
    adimlar[mevcutBasamak] = adimlar[mevcutBasamak - 1] + adimlar[mevcutBasamak - 2];
  }

  // İstenen basamağa ulaşmanın olası yollarını döndür.
  return adimlar[basamakSayisi];
}
