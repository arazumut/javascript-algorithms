/**
 * Özyinelemeli Merdiven Problemi (Memoizasyon ile Özyinelemeli Çözüm).
 *
 * @param {number} toplamBasamak - Çıkılacak toplam basamak sayısı.
 * @return {number} - Bir merdiveni çıkmanın yollarının sayısı.
 */
export default function ozyinelemeliMerdivenMEM(toplamBasamak) {
  // Memo tablosu, hesaplanan sonuçları saklayarak tekrar hesaplamayı önler.
  const memo = [];

  // Özyinelemeli kapalı fonksiyon.
  const adimlariAl = (basamakSayisi) => {
    if (basamakSayisi <= 0) {
      // Aşağı inmenin bir yolu yok - merdivenleri sadece yukarı çıkarsınız.
      // Ayrıca zemin katta duruyorsanız, başka adım atmanıza gerek yoktur.
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

    // Son zamanlarda hesapladığımız adımlar için özyinelemeyi önleyin.
    if (memo[basamakSayisi]) {
      return memo[basamakSayisi];
    }

    // Bir adım yukarı çıktıktan sonra kaç adım atmamız gerektiğini, iki adım yukarı çıktıktan sonra
    // kaç adım atmamız gerektiği ile toplayın.
    memo[basamakSayisi] = adimlariAl(basamakSayisi - 1) + adimlariAl(basamakSayisi - 2);

    return memo[basamakSayisi];
  };

  // İstenen basamağa ulaşmanın olası yollarını döndürün.
  return adimlariAl(toplamBasamak);
}
