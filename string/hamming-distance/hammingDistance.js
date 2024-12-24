/**
 * İki string arasındaki Hamming mesafesini hesaplar.
 * @param {string} a - İlk string
 * @param {string} b - İkinci string
 * @return {number} - Hamming mesafesi
 */
export default function hammingMesafesi(a, b) {
  if (a.length !== b.length) {
    throw new Error('Stringler aynı uzunlukta olmalıdır');
  }

  let mesafe = 0;

  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      mesafe += 1;
    }
  }

  return mesafe;
}
