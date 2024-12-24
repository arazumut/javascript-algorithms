/**
 * @param {*[]} kombinasyonSeçenekleri
 * @param {number} kombinasyonUzunluğu
 * @return {*[]}
 */
export default function tekrarOlmadanKombinasyonlarıBirleştir(kombinasyonSeçenekleri, kombinasyonUzunluğu) {
  // Eğer kombinasyon uzunluğu 1 ise, orijinal dizinin her bir elemanı kendi başına bir kombinasyondur.
  if (kombinasyonUzunluğu === 1) {
    return kombinasyonSeçenekleri.map((seçenek) => [seçenek]);
  }

  // Kombinasyonlar dizisini başlat.
  const kombinasyonlar = [];

  // Karakterleri tek tek çıkar ve daha küçük uzunluktaki kombinasyonlarla birleştir.
  // Karakterleri çıkarmamız gerekiyor çünkü birleştirmeden sonra tekrar olmasını istemiyoruz.
  kombinasyonSeçenekleri.forEach((mevcutSeçenek, seçenekİndeksi) => {
    // Daha küçük boyutlu kombinasyonlar oluştur.
    const dahaKüçükKombinasyonlar = tekrarOlmadanKombinasyonlarıBirleştir(
      kombinasyonSeçenekleri.slice(seçenekİndeksi + 1),
      kombinasyonUzunluğu - 1,
    );

    // Mevcut seçeneği daha küçük boyutlu tüm kombinasyonlarla birleştir.
    dahaKüçükKombinasyonlar.forEach((küçükKombinasyon) => {
      kombinasyonlar.push([mevcutSeçenek].concat(küçükKombinasyon));
    });
  });

  return kombinasyonlar;
}
