/**
 * k-en yakın komşu algoritmasına dayalı olarak uzaydaki noktayı sınıflandırır.
 *
 * @param {number[][]} veriSeti - veri noktalarının dizisi, örn. [[0, 1], [3, 4], [5, 7]]
 * @param {number[]} etiketler - sınıfların (etiketlerin) dizisi, örn. [1, 1, 2]
 * @param {number[]} siniflandirilacak - sınıflandırılması gereken uzaydaki nokta, örn. [5, 4]
 * @param {number} k - dikkate alınacak en yakın komşu sayısı (tercihen tek sayı)
 * @return {number} - noktanın sınıfı
 */

import euclideanDistance from '../../math/euclidean-distance/euclideanDistance';

export default function kNN(
  veriSeti,
  etiketler,
  siniflandirilacak,
  k = 3,
) {
  if (!veriSeti || !etiketler || !siniflandirilacak) {
    throw new Error('Veri seti, etiketler veya sınıflandırılacak nokta belirtilmemiş');
  }

  // siniflandirilacak noktanın veriSeti içindeki her noktaya olan uzaklığını hesapla.
  // Uzaklığı ve noktanın etiketini distances listesine kaydet.
  const uzakliklar = [];
  for (let i = 0; i < veriSeti.length; i += 1) {
    uzakliklar.push({
      uzaklik: euclideanDistance([veriSeti[i]], [siniflandirilacak]),
      etiket: etiketler[i],
    });
  }

  // Uzaklıklar listesini sırala (yakın noktadan uzak noktaya doğru).
  // İlk k değeri al, sınıf indeksi ile say.
  const kEnYakin = uzakliklar.sort((a, b) => {
    if (a.uzaklik === b.uzaklik) {
      return 0;
    }
    return a.uzaklik < b.uzaklik ? -1 : 1;
  }).slice(0, k);

  // İlk k üyede her sınıfın örnek sayısını say.
  const etiketSayaci = {};
  let enYuksekSinif = 0;
  let enYuksekSinifSayisi = 0;
  for (let i = 0; i < kEnYakin.length; i += 1) {
    if (kEnYakin[i].etiket in etiketSayaci) {
      etiketSayaci[kEnYakin[i].etiket] += 1;
    } else {
      etiketSayaci[kEnYakin[i].etiket] = 1;
    }
    if (etiketSayaci[kEnYakin[i].etiket] > enYuksekSinifSayisi) {
      enYuksekSinifSayisi = etiketSayaci[kEnYakin[i].etiket];
      enYuksekSinif = kEnYakin[i].etiket;
    }
  }

  // En yüksek sayıya sahip sınıfı döndür.
  return enYuksekSinif;
}
