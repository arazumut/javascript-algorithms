/**
 * En uzun artan alt diziyi bulmak için dinamik programlama yaklaşımı.
 * Karmaşıklık: O(n * n)
 *
 * @param {number[]} dizi
 * @return {number}
 */
export default function dpEnUzunArtanAltDizi(dizi) {
  // En uzun artan alt dizilerin uzunluklarını içeren bir dizi oluştur
  // ve her bir elemanın kendisinin minimum artan alt dizi olduğunu belirten 1 ile doldur.
  const uzunluklarDizisi = Array(dizi.length).fill(1);

  let oncekiElemanIndeksi = 0;
  let suankiElemanIndeksi = 1;

  while (suankiElemanIndeksi < dizi.length) {
    if (dizi[oncekiElemanIndeksi] < dizi[suankiElemanIndeksi]) {
      // Eğer şu anki eleman önceki elemandan büyükse,
      // şu anki eleman, önceki elemanın artan alt dizisinin uzunluğundan bir fazla olan
      // bir artan alt dizinin parçasıdır.
      const yeniUzunluk = uzunluklarDizisi[oncekiElemanIndeksi] + 1;
      if (yeniUzunluk > uzunluklarDizisi[suankiElemanIndeksi]) {
        // Önceki eleman bize şu anki eleman için zaten sahip olduğumuzdan daha uzun bir alt dizi uzunluğu veriyorsa artır.
        uzunluklarDizisi[suankiElemanIndeksi] = yeniUzunluk;
      }
    }

    // Önceki eleman indeksini sağa kaydır.
    oncekiElemanIndeksi += 1;

    // Eğer önceki eleman indeksi şu anki eleman indeksine eşitse,
    // şu anki elemanı sağa kaydır ve önceki eleman indeksini sıfırla.
    if (oncekiElemanIndeksi === suankiElemanIndeksi) {
      suankiElemanIndeksi += 1;
      oncekiElemanIndeksi = 0;
    }
  }

  // Uzunluklar dizisindeki en büyük elemanı bul.
  // Bu sayı, en uzun artan alt dizinin uzunluğudur.
  let enUzunArtanUzunluk = 0;

  for (let i = 0; i < uzunluklarDizisi.length; i += 1) {
    if (uzunluklarDizisi[i] > enUzunArtanUzunluk) {
      enUzunArtanUzunluk = uzunluklarDizisi[i];
    }
  }

  return enUzunArtanUzunluk;
}
