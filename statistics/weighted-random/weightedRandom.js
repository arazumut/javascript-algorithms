/**
 * Ağırlığına göre rastgele bir öğe seçer.
 * Daha yüksek ağırlığa sahip öğeler daha sık (daha yüksek bir olasılıkla) seçilecektir.
 *
 * Örneğin:
 * - öğeler = ['muz', 'portakal', 'elma']
 * - ağırlıklar = [0, 0.2, 0.8]
 * - weightedRandom(öğeler, ağırlıklar) %80 olasılıkla 'elma', %20 olasılıkla 'portakal' dönecek
 * ve 'muz' hiç dönmeyecek (çünkü muzun seçilme olasılığı %0)
 *
 * @param {any[]} öğeler
 * @param {number[]} ağırlıklar
 * @returns {{öğe: any, indeks: number}}
 */
/* eslint-disable consistent-return */
export default function weightedRandom(öğeler, ağırlıklar) {
  if (öğeler.length !== ağırlıklar.length) {
    throw new Error('Öğeler ve ağırlıklar aynı boyutta olmalıdır');
  }

  if (!öğeler.length) {
    throw new Error('Öğeler boş olmamalıdır');
  }

  // Kümülatif ağırlıklar dizisini hazırlama.
  // Örneğin:
  // - ağırlıklar = [1, 4, 3]
  // - kümülatifAğırlıklar = [1, 5, 8]
  const kümülatifAğırlıklar = [];
  for (let i = 0; i < ağırlıklar.length; i += 1) {
    kümülatifAğırlıklar[i] = ağırlıklar[i] + (kümülatifAğırlıklar[i - 1] || 0);
  }

  // [0...toplam(ağırlıklar)] aralığında rastgele bir sayı elde etme
  // Örneğin:
  // - ağırlıklar = [1, 4, 3]
  // - maxKümülatifAğırlık = 8
  // - rastgele sayı aralığı [0...8]
  const maxKümülatifAğırlık = kümülatifAğırlıklar[kümülatifAğırlıklar.length - 1];
  const rastgeleSayı = maxKümülatifAğırlık * Math.random();

  // Ağırlığına göre rastgele öğeyi seçme.
  // Daha yüksek ağırlığa sahip öğeler daha sık seçilecektir.
  for (let öğeIndeksi = 0; öğeIndeksi < öğeler.length; öğeIndeksi += 1) {
    if (kümülatifAğırlıklar[öğeIndeksi] >= rastgeleSayı) {
      return {
        öğe: öğeler[öğeIndeksi],
        indeks: öğeIndeksi,
      };
    }
  }
}
