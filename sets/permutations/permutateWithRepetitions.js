/**
 * @param {*[]} permütasyonSeçenekleri
 * @param {number} permütasyonUzunluğu
 * @return {*[]}
 */
export default function tekrarlarlaPermütasyon(
  permütasyonSeçenekleri,
  permütasyonUzunluğu = permütasyonSeçenekleri.length,
) {
  if (permütasyonUzunluğu === 1) {
    return permütasyonSeçenekleri.map((permütasyonSeçeneği) => [permütasyonSeçeneği]);
  }

  // Permütasyonlar dizisini başlat.
  const permütasyonlar = [];

  // Daha küçük permütasyonları al.
  const dahaKüçükPermütasyonlar = tekrarlarlaPermütasyon(
    permütasyonSeçenekleri,
    permütasyonUzunluğu - 1,
  );

  // Tüm seçenekleri gözden geçir ve daha küçük permütasyonlara ekle.
  permütasyonSeçenekleri.forEach((mevcutSeçenek) => {
    dahaKüçükPermütasyonlar.forEach((dahaKüçükPermütasyon) => {
      permütasyonlar.push([mevcutSeçenek].concat(dahaKüçükPermütasyon));
    });
  });

  return permütasyonlar;
}
