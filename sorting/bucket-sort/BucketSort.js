import RadixSort from '../radix-sort/RadixSort';

/**
 * Kova Sıralaması (Bucket Sort)
 *
 * @param {number[]} dizi - Sıralanacak dizi
 * @param {number} kovaSayisi - Kullanılacak kova sayısı
 * @return {number[]} - Sıralanmış dizi
 */
export default function KovaSiralama(dizi, kovaSayisi = 1) {
  // Kovaları oluştur
  const kovalar = new Array(kovaSayisi).fill(null).map(() => []);

  const minDeger = Math.min(...dizi);
  const maxDeger = Math.max(...dizi);

  const kovaBoyutu = Math.ceil(Math.max(1, (maxDeger - minDeger) / kovaSayisi));

  // Elemanları kovalar içine yerleştir
  for (let i = 0; i < dizi.length; i += 1) {
    const mevcutDeger = dizi[i];
    const kovaIndeksi = Math.floor((mevcutDeger - minDeger) / kovaBoyutu);

    // Maksimum değer için özel durum
    if (kovaIndeksi === kovaSayisi) {
      kovalar[kovaSayisi - 1].push(mevcutDeger);
    } else {
      kovalar[kovaIndeksi].push(mevcutDeger);
    }
  }

  // Bireysel kovaları sırala
  for (let i = 0; i < kovalar.length; i += 1) {
    // Burada Radix Sort kullanıyoruz. Bu, bir kovayı sıralamak için
    // ortalama O(n + k) zaman karmaşıklığı verebilir (burada k, en uzun
    // sayının basamak sayısıdır).
    kovalar[i] = new RadixSort().sort(kovalar[i]);
  }

  // Sıralanmış kovaları nihai çıktıya birleştir
  const siraliDizi = [];
  for (let i = 0; i < kovalar.length; i += 1) {
    siraliDizi.push(...kovalar[i]);
  }

  return siraliDizi;
}
