/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
export default function levenshteinMesafesi(a, b) {
  // a alt dizilerini b alt dizilerine dönüştürmek için tüm olası değişiklikler için boş düzenleme mesafesi matrisi oluştur.
  const mesafeMatrisi = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

  // Matrisin ilk satırını doldur.
  // Eğer bu ilk satırsa, boş dizgiyi a'ya dönüştürüyoruz.
  // Bu durumda dönüşüm sayısı a alt dizisinin boyutuna eşittir.
  for (let i = 0; i <= a.length; i += 1) {
    mesafeMatrisi[0][i] = i;
  }

  // Matrisin ilk sütununu doldur.
  // Eğer bu ilk sütunsa, boş dizgiyi b'ye dönüştürüyoruz.
  // Bu durumda dönüşüm sayısı b alt dizisinin boyutuna eşittir.
  for (let j = 0; j <= b.length; j += 1) {
    mesafeMatrisi[j][0] = j;
  }

  // Matrisin geri kalanını doldur.
  for (let j = 1; j <= b.length; j += 1) {
    for (let i = 1; i <= a.length; i += 1) {
      const gösterge = a[i - 1] === b[j - 1] ? 0 : 1;
      mesafeMatrisi[j][i] = Math.min(
        mesafeMatrisi[j][i - 1] + 1, // silme
        mesafeMatrisi[j - 1][i] + 1, // ekleme
        mesafeMatrisi[j - 1][i - 1] + gösterge, // değiştirme
      );
    }
  }

  return mesafeMatrisi[b.length][a.length];
}
