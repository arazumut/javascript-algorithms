/**
 * Böl ve Yönet çözümü.
 * Karmaşıklık: O(n^2) eğer memoization uygulanmazsa
 *
 * @param {Number[]} inputArray
 * @return {Number}
 */
export default function dcMaximumSubarraySum(inputArray) {
  /**
   * inputArray dizisi boyunca ilerliyoruz ve her eleman için iki seçeneğimiz var:
   * - seçmek
   * - seçmemek
   *
   * Ayrıca, maksimum alt dizinin ardışık olması gerektiğini unutmayın. Bu, bir elemanı seçtiysek,
   * sonraki elemanları seçmeye devam etmemiz veya maksimum toplamı saymayı bırakmamız gerektiği anlamına gelir.
   *
   * @param {number} elementIndex - seçip seçmemeye karar verdiğimiz elemanın indeksi
   * @param {boolean} mustPick - elemanı seçmek veya seçmemek
   * @returns {number} - elde edeceğimiz maksimum alt dizi toplamı
   */
  function solveRecursively(elementIndex, mustPick) {
    if (elementIndex >= inputArray.length) {
      return mustPick ? 0 : -Infinity;
    }
    return Math.max(
      // Seçenek #1: Mevcut elemanı seç ve bir sonrakini seçmeye devam et.
      inputArray[elementIndex] + solveRecursively(elementIndex + 1, true),
      // Seçenek #2: Mevcut elemanı seçme.
      mustPick ? 0 : solveRecursively(elementIndex + 1, false),
    );
  }
  return solveRecursively(0, false);
}
