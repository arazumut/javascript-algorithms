/**
 * Özyinelemeli Merdiven Problemi (Kaba Kuvvet Çözümü).
 *
 * @param {number} basamakSayisi - Tırmanılacak basamak sayısı.
 * @return {number} - Bir merdiveni tırmanmanın yollarının sayısı.
 */
export default function ozyinelemeliMerdivenBF(basamakSayisi) {
  if (basamakSayisi <= 0) {
    // Aşağı inmenin bir yolu yok - merdivenleri sadece yukarı tırmanırsınız.
    // Ayrıca, zemin katta duruyorsanız, başka adım atmanıza gerek yoktur.
    return 0;
  }

  if (basamakSayisi === 1) {
    // İlk basamağa gitmenin sadece bir yolu vardır.
    return 1;
  }

  if (basamakSayisi === 2) {
    // İkinci basamağa gitmenin iki yolu vardır: (1 + 1) veya (2).
    return 2;
  }

  // Bir adım yukarı çıktıktan sonra kaç adım atmamız gerektiğini, iki adım yukarı çıktıktan sonra
  // kaç adım atmamız gerektiği ile toplarız.
  return ozyinelemeliMerdivenBF(basamakSayisi - 1) + ozyinelemeliMerdivenBF(basamakSayisi - 2);
}
