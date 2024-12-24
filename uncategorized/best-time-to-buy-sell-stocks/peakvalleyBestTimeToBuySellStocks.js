/**
 * Hisse senetlerini alıp satmaktan elde edilebilecek maksimum karı bulur.
 * ZİRVE VADİ YAKLAŞIMI.
 *
 * @param {number[]} fiyatlar - Hisse senedi fiyatlarının dizisi, örneğin [7, 6, 4, 3, 1]
 * @param {function(): void} ziyaret - İterasyon sayısını hesaplamak için ziyaret geri çağrımı.
 * @return {number} - Maksimum kar
 */
const zirveVadiEnIyiAlSatZamani = (fiyatlar, ziyaret = () => {}) => {
  ziyaret();
  let kar = 0;
  let dusuk = fiyatlar[0];
  let yuksek = fiyatlar[0];

  fiyatlar.slice(1).forEach((guncelFiyat) => {
    ziyaret();
    if (guncelFiyat < yuksek) {
      // Fiyat düştüyse, satmamız gerekiyor.
      kar += yuksek - dusuk;
      dusuk = guncelFiyat;
      yuksek = guncelFiyat;
    } else {
      // Fiyat yükseldiyse, sadece yüksek kaydını artırmamız yeterli.
      yuksek = guncelFiyat;
    }
  });

  // Fiyat son gün yükseldiyse ve forEach döngüsü içinde satma şansımız olmadıysa
  kar += yuksek - dusuk;

  return kar;
};

export default zirveVadiEnIyiAlSatZamani;
