/**
 * Bir stringin palindrom olup olmadığını kontrol eder.
 * @param {string} metin
 * @return {boolean}
 */

export default function palindromMu(metin) {
  let sol = 0;
  let sağ = metin.length - 1;

  while (sol < sağ) {
    if (metin[sol] !== metin[sağ]) {
      return false;
    }
    sol += 1;
    sağ -= 1;
  }

  return true;
}
