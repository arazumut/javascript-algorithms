/**
 * Özyinelemeli Merdiven Problemi (Yinelemeli Çözüm).
 *
 * @param {number} basamakSayisi - Çıkılacak basamak sayısı.
 * @return {number} - Bir merdiveni çıkmanın yollarının sayısı.
 */
export default function ozyinelemeliMerdiven(basamakSayisi) {
  if (basamakSayisi <= 0) {
    // Aşağı inmenin bir yolu yok - merdivenleri sadece yukarı çıkarsınız.
    // Ayrıca 0. basamakta kalmak için bir şey yapmanıza gerek yok.
    return 0;
  }

  // 0., 1. ve 2. basamaklara ulaşmanın yollarının sayısını başlat.
  const basamaklar = [1, 2];

  if (basamakSayisi <= 2) {
    // 1. veya 2. basamaklara ulaşmanın olası yollarının sayısını döndür.
    return basamaklar[basamakSayisi - 1];
  }

  // Önceki basamaklara dayanarak n'inci basamağa ulaşmanın yollarının sayısını hesapla.
  // Dinamik Programlama çözümüyle karşılaştırıldığında, tüm basamaklar için bilgiyi saklamıyoruz,
  // sadece iki önceki basamak için saklıyoruz.
  for (let mevcutBasamak = 3; mevcutBasamak <= basamakSayisi; mevcutBasamak += 1) {
    [basamaklar[0], basamaklar[1]] = [basamaklar[1], basamaklar[0] + basamaklar[1]];
  }

  // İstenen basamağa ulaşmanın olası yollarını döndür.
  return basamaklar[1];
}
