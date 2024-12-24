/**
 * İki kümenin Kartezyen Çarpımını oluşturur.
 * @param {*[]} kümeA
 * @param {*[]} kümeB
 * @return {*[]}
 */
export default function kartezyenCarpim(kümeA, kümeB) {
  // Girdi kümelerinin boş olup olmadığını kontrol et.
  // Boşsa, Kartezyen Çarpım oluşturamayacağımız için null döndür.
  if (!kümeA || !kümeB || !kümeA.length || !kümeB.length) {
    return null;
  }

  // Çarpım kümesini başlat.
  const carpim = [];

  // Şimdi, birinci ve ikinci kümenin tüm elemanlarını dolaşalım ve tüm olası çiftleri oluşturalım.
  for (let indexA = 0; indexA < kümeA.length; indexA += 1) {
    for (let indexB = 0; indexB < kümeB.length; indexB += 1) {
      // Mevcut çarpım çiftini çarpım kümesine ekle.
      carpim.push([kümeA[indexA], kümeB[indexB]]);
    }
  }

  // Kartezyen çarpım kümesini döndür.
  return carpim;
}
