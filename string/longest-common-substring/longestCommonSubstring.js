/**
 * En Uzun Ortak Alt Dizi (LCS) (Dinamik Programlama Yaklaşımı).
 *
 * @param {string} string1
 * @param {string} string2
 * @return {string}
 */
export default function enUzunOrtakAltDizi(string1, string2) {
  // Unicode sembollerinin uzunluğunu doğru şekilde ele almak için dizeleri dizilere dönüştür.
  // Örneğin:
  // '𐌵'.length === 2
  // [...'𐌵'].length === 1
  const s1 = [...string1];
  const s2 = [...string2];

  // Dinamik Programlama yaklaşımını kullanmak için tüm alt dizi uzunluklarının matrisini başlat.
  const altDiziMatrisi = Array(s2.length + 1).fill(null).map(() => {
    return Array(s1.length + 1).fill(null);
  });

  // İlk satırı ve ilk sütunu sıfırlarla doldurarak başlangıç değerlerini sağla.
  for (let sutunIndeksi = 0; sutunIndeksi <= s1.length; sutunIndeksi += 1) {
    altDiziMatrisi[0][sutunIndeksi] = 0;
  }

  for (let satirIndeksi = 0; satirIndeksi <= s2.length; satirIndeksi += 1) {
    altDiziMatrisi[satirIndeksi][0] = 0;
  }

  // Dinamik Programlama yaklaşımını kullanmak için tüm alt dizi uzunluklarının matrisini oluştur.
  let enUzunAltDiziUzunlugu = 0;
  let enUzunAltDiziSutunu = 0;
  let enUzunAltDiziSatiri = 0;

  for (let satirIndeksi = 1; satirIndeksi <= s2.length; satirIndeksi += 1) {
    for (let sutunIndeksi = 1; sutunIndeksi <= s1.length; sutunIndeksi += 1) {
      if (s1[sutunIndeksi - 1] === s2[satirIndeksi - 1]) {
        altDiziMatrisi[satirIndeksi][sutunIndeksi] = altDiziMatrisi[satirIndeksi - 1][sutunIndeksi - 1] + 1;
      } else {
        altDiziMatrisi[satirIndeksi][sutunIndeksi] = 0;
      }

      // Tüm ortak alt dizi uzunluklarının en büyüğünü bulmaya çalış
      // ve son karakter pozisyonunu (indeksleri) hatırla
      if (altDiziMatrisi[satirIndeksi][sutunIndeksi] > enUzunAltDiziUzunlugu) {
        enUzunAltDiziUzunlugu = altDiziMatrisi[satirIndeksi][sutunIndeksi];
        enUzunAltDiziSutunu = sutunIndeksi;
        enUzunAltDiziSatiri = satirIndeksi;
      }
    }
  }

  if (enUzunAltDiziUzunlugu === 0) {
    // En uzun ortak alt dizi bulunamadı.
    return '';
  }

  // Matristen en uzun alt diziyi tespit et.
  let enUzunAltDizi = '';

  while (altDiziMatrisi[enUzunAltDiziSatiri][enUzunAltDiziSutunu] > 0) {
    enUzunAltDizi = s1[enUzunAltDiziSutunu - 1] + enUzunAltDizi;
    enUzunAltDiziSatiri -= 1;
    enUzunAltDiziSutunu -= 1;
  }

  return enUzunAltDizi;
}
