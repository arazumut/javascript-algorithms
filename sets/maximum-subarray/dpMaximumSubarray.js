/**
 * Dinamik Programlama çözümü.
 * Karmaşıklık: O(n)
 *
 * @param {Number[]} inputArray
 * @return {Number[]}
 */
export default function dpMaximumSubarray(inputArray) {
  // inputArray üzerinde bir kez iterasyon yapıyoruz ve gördüğümüz en büyük toplamı ve mevcut toplamı
  // takip etmek için açgözlü bir yaklaşım kullanıyoruz.
  //
  // currentSum değişkeni 0'ın altına düştüğünde sıfırlanır.
  //
  // maxSum değişkeni -Infinity olarak ayarlanır, böylece tüm sayılar negatifse, en yüksek negatif
  // sayı maksimum alt dizi olur.

  let maxSum = -Infinity;
  let currentSum = 0;

  // maxSum'a katkıda bulunan başlangıç ve bitiş indekslerini takip etmemiz gerekiyor
  // böylece gerçek alt diziyi döndürebiliriz. Başlangıçta tüm dizinin maxSum'a katkıda bulunduğunu varsayıyoruz.
  let maxStartIndex = 0;
  let maxEndIndex = inputArray.length - 1;
  let currentStartIndex = 0;

  inputArray.forEach((currentNumber, currentIndex) => {
    currentSum += currentNumber;

    // Yeni bir maksimum bulduysak maxSum ve ilgili indeksleri güncelle.
    if (maxSum < currentSum) {
      maxSum = currentSum;
      maxStartIndex = currentStartIndex;
      maxEndIndex = currentIndex;
    }

    // currentSum 0'ın altına düşerse currentSum ve currentStartIndex'i sıfırla.
    if (currentSum < 0) {
      currentSum = 0;
      currentStartIndex = currentIndex + 1;
    }
  });

  return inputArray.slice(maxStartIndex, maxEndIndex + 1);
}
