/**
 * Hisse senetlerini alıp satarak maksimum karı bulur.
 * DİNAMİK PROGRAMLAMA YAKLAŞIMI.
 *
 * @param {number[]} fiyatlar - Hisse senedi fiyatları dizisi, örneğin [7, 6, 4, 3, 1]
 * @param {function(): void} ziyaret - İterasyon sayısını hesaplamak için ziyaret geri çağrımı.
 * @return {number} - Maksimum kar
 */
const dpEnIyiAlSatZamani = (fiyatlar, ziyaret = () => {}) => {
  ziyaret();
  let sonAlis = -fiyatlar[0];
  let sonSatis = 0;

  for (let gun = 1; gun < fiyatlar.length; gun += 1) {
    ziyaret();
    const mevcutAlis = Math.max(sonAlis, sonSatis - fiyatlar[gun]);
    const mevcutSatis = Math.max(sonSatis, sonAlis + fiyatlar[gun]);
    sonAlis = mevcutAlis;
    sonSatis = mevcutSatis;
  }

  return sonSatis;
};

export default dpEnIyiAlSatZamani;
