/**
 * @param {string[]} dizi1
 * @param {string[]} dizi2
 * @return {string[]}
 */
export default function enUzunOrtakAltDizi(dizi1, dizi2) {
  // LCS matrisini başlat.
  const lcsMatrisi = Array(dizi2.length + 1).fill(null).map(() => Array(dizi1.length + 1).fill(null));

  // İlk satırı sıfırlarla doldur.
  for (let sutunIndeksi = 0; sutunIndeksi <= dizi1.length; sutunIndeksi += 1) {
    lcsMatrisi[0][sutunIndeksi] = 0;
  }

  // İlk sütunu sıfırlarla doldur.
  for (let satirIndeksi = 0; satirIndeksi <= dizi2.length; satirIndeksi += 1) {
    lcsMatrisi[satirIndeksi][0] = 0;
  }

  // İki diziyi karşılaştırarak matrisi doldur.
  for (let satirIndeksi = 1; satirIndeksi <= dizi2.length; satirIndeksi += 1) {
    for (let sutunIndeksi = 1; sutunIndeksi <= dizi1.length; sutunIndeksi += 1) {
      if (dizi1[sutunIndeksi - 1] === dizi2[satirIndeksi - 1]) {
        lcsMatrisi[satirIndeksi][sutunIndeksi] = lcsMatrisi[satirIndeksi - 1][sutunIndeksi - 1] + 1;
      } else {
        lcsMatrisi[satirIndeksi][sutunIndeksi] = Math.max(
          lcsMatrisi[satirIndeksi - 1][sutunIndeksi],
          lcsMatrisi[satirIndeksi][sutunIndeksi - 1],
        );
      }
    }
  }

  // LCS matrisine göre en uzun ortak alt diziyi hesapla.
  if (!lcsMatrisi[dizi2.length][dizi1.length]) {
    // Eğer en uzun ortak dizinin uzunluğu sıfırsa, boş dizi döndür.
    return [''];
  }

  const enUzunDizi = [];
  let sutunIndeksi = dizi1.length;
  let satirIndeksi = dizi2.length;

  while (sutunIndeksi > 0 || satirIndeksi > 0) {
    if (dizi1[sutunIndeksi - 1] === dizi2[satirIndeksi - 1]) {
      // Çapraz sol üst hareket et.
      enUzunDizi.unshift(dizi1[sutunIndeksi - 1]);
      sutunIndeksi -= 1;
      satirIndeksi -= 1;
    } else if (lcsMatrisi[satirIndeksi][sutunIndeksi] === lcsMatrisi[satirIndeksi][sutunIndeksi - 1]) {
      // Sola hareket et.
      sutunIndeksi -= 1;
    } else {
      // Yukarı hareket et.
      satirIndeksi -= 1;
    }
  }

  return enUzunDizi;
}
