import enUzunOrtakAltDizi from '../longest-common-subsequence/longestCommonSubsequence';

/**
 * @param {string[]} dizi1
 * @param {string[]} dizi2
 * @return {string[]}
 */

export default function enKısaOrtakÜstdizi(dizi1, dizi2) {
  // Öncelikle iki dizinin en uzun ortak alt dizisini bulalım.
  const uzunOrtakAltDizi = enUzunOrtakAltDizi(dizi1, dizi2);

  // Eğer ortak alt dizi boşsa, en kısa ortak üst dizi sadece iki dizinin birleşimi olur.
  if (uzunOrtakAltDizi.length === 1 && uzunOrtakAltDizi[0] === '') {
    return dizi1.concat(dizi2);
  }

  // Şimdi dizi1 ve dizi2'nin elemanlarını LCS'nin önüne/arasına/sonuna ekleyelim.
  let ustDizi = [];

  let diziIndeksi1 = 0;
  let diziIndeksi2 = 0;
  let lcsIndeksi = 0;
  let diziBeklemede1 = false;
  let diziBeklemede2 = false;

  while (lcsIndeksi < uzunOrtakAltDizi.length) {
    // İlk dizinin elemanlarını doğru sırayla üst diziye ekleyelim.
    if (diziIndeksi1 < dizi1.length) {
      if (!diziBeklemede1 && dizi1[diziIndeksi1] !== uzunOrtakAltDizi[lcsIndeksi]) {
        ustDizi.push(dizi1[diziIndeksi1]);
        diziIndeksi1 += 1;
      } else {
        diziBeklemede1 = true;
      }
    }

    // İkinci dizinin elemanlarını doğru sırayla üst diziye ekleyelim.
    if (diziIndeksi2 < dizi2.length) {
      if (!diziBeklemede2 && dizi2[diziIndeksi2] !== uzunOrtakAltDizi[lcsIndeksi]) {
        ustDizi.push(dizi2[diziIndeksi2]);
        diziIndeksi2 += 1;
      } else {
        diziBeklemede2 = true;
      }
    }

    // Ortak alt dizi elemanını doğru sırayla üst diziye ekleyelim.
    if (diziBeklemede1 && diziBeklemede2) {
      ustDizi.push(uzunOrtakAltDizi[lcsIndeksi]);
      lcsIndeksi += 1;
      diziIndeksi1 += 1;
      diziIndeksi2 += 1;
      diziBeklemede1 = false;
      diziBeklemede2 = false;
    }
  }

  // dizi1'in kalan elemanlarını ekleyelim.
  if (diziIndeksi1 < dizi1.length) {
    ustDizi = ustDizi.concat(dizi1.slice(diziIndeksi1));
  }

  // dizi2'nin kalan elemanlarını ekleyelim.
  if (diziIndeksi2 < dizi2.length) {
    ustDizi = ustDizi.concat(dizi2.slice(diziIndeksi2));
  }

  return ustDizi;
}
