/**
 * Hisse senetlerini alıp satarak maksimum karı bulur.
 * AKÜMÜLATÖR YAKLAŞIMI.
 *
 * @param {number[]} fiyatlar - Hisse senedi fiyatlarının dizisi, örneğin [7, 6, 4, 3, 1]
 * @param {function(): void} ziyaret - İterasyon sayısını hesaplamak için ziyaret geri çağrımı.
 * @return {number} - Maksimum kar
 */
const akumulatorEnIyiAlSatZamani = (fiyatlar, ziyaret = () => {}) => {
  ziyaret();
  let kar = 0;
  for (let gun = 1; gun < fiyatlar.length; gun += 1) {
    ziyaret();
    // Dünkü fiyat ile bugünkü fiyat arasındaki artışı (eğer varsa) kara ekle.
    kar += Math.max(fiyatlar[gun] - fiyatlar[gun - 1], 0);
  }
  return kar;
};

export default akumulatorEnIyiAlSatZamani;
