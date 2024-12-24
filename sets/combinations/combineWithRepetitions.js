/**
 * @param {*[]} kombinasyonSeçenekleri
 * @param {number} kombinasyonUzunluğu
 * @return {*[]}
 */
export default function tekrarIleKombinasyon(kombinasyonSeçenekleri, kombinasyonUzunluğu) {
  // Eğer kombinasyon uzunluğu 1 ise, orijinal dizinin her bir elemanı
  // kendi başına bir kombinasyondur.
  if (kombinasyonUzunluğu === 1) {
    return kombinasyonSeçenekleri.map((seçenek) => [seçenek]);
  }

  // Kombinasyonlar dizisini başlat.
  const kombinasyonlar = [];

  // Elemanları tek tek hatırla ve onları daha küçük uzunluktaki kombinasyonlarla birleştir.
  // Burada elemanları çıkarmıyoruz çünkü tekrarlar izinlidir.
  kombinasyonSeçenekleri.forEach((mevcutSeçenek, seçenekIndeksi) => {
    // Daha küçük boyutlu kombinasyonlar oluştur.
    const küçükKombinasyonlar = tekrarIleKombinasyon(
      kombinasyonSeçenekleri.slice(seçenekIndeksi),
      kombinasyonUzunluğu - 1,
    );

    // Mevcut seçeneği daha küçük boyutlu tüm kombinasyonlarla birleştir.
    küçükKombinasyonlar.forEach((küçükKombinasyon) => {
      kombinasyonlar.push([mevcutSeçenek].concat(küçükKombinasyon));
    });
  });

  return kombinasyonlar;
}
