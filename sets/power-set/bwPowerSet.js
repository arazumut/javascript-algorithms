/**
 * BITWISE yaklaşımı kullanarak bir kümenin alt kümelerini bulur.
 *
 * @param {*[]} orijinalKume
 * @return {*[][]}
 */
export default function bwPowerSet(orijinalKume) {
  const altKumeler = [];

  // Orijinal kümenin uzunluğu n ise, 2^n olası kombinasyon olacaktır.
  // Bunun nedeni, orijinal kümenin her bir elemanı için dahil edip etmeyeceğimize karar vermemizdir
  // (her küme elemanı için 2 seçenek).
  const kombinasyonSayisi = 2 ** orijinalKume.length;

  // 0'dan 2^n'e kadar olan aralıktaki her sayı, ikili gösterimde tam olarak ihtiyacımız olanı yapar:
  // bitleri (0 veya 1) ile ilgili elemanı kümeden dahil edip etmeyeceğimizi gösterir.
  // Örneğin, {1, 2, 3} kümesi için 0b010 ikili sayısı, yalnızca "2"yi mevcut kümeye dahil etmemiz gerektiği anlamına gelir.
  for (let kombinasyonIndeksi = 0; kombinasyonIndeksi < kombinasyonSayisi; kombinasyonIndeksi += 1) {
    const altKume = [];

    for (let kumeElemanIndeksi = 0; kumeElemanIndeksi < orijinalKume.length; kumeElemanIndeksi += 1) {
      // Mevcut elemanı alt kümeye dahil edip etmeyeceğimize karar ver.
      if (kombinasyonIndeksi & (1 << kumeElemanIndeksi)) {
        altKume.push(orijinalKume[kumeElemanIndeksi]);
      }
    }

    // Mevcut alt kümeyi tüm alt kümeler listesine ekle.
    altKumeler.push(altKume);
  }

  return altKumeler;
}
