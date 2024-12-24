/**
 * Kare matrisi saat yönünde 90 derece döndürür.
 * @param {*[][]} orijinalMatris
 * @return {*[][]}
 */
export default function kareMatrisDondur(orijinalMatris) {
  const matris = orijinalMatris.slice();

  // Matrisi sağ üst/sol alt köşegenine göre yansıt.
  for (let satirIndeksi = 0; satirIndeksi < matris.length; satirIndeksi += 1) {
    for (let sutunIndeksi = satirIndeksi + 1; sutunIndeksi < matris.length; sutunIndeksi += 1) {
      // Elemanları değiştir.
      [
        matris[sutunIndeksi][satirIndeksi],
        matris[satirIndeksi][sutunIndeksi],
      ] = [
        matris[satirIndeksi][sutunIndeksi],
        matris[sutunIndeksi][satirIndeksi],
      ];
    }
  }

  // Matrisi yatay olarak yansıt.
  for (let satirIndeksi = 0; satirIndeksi < matris.length; satirIndeksi += 1) {
    for (let sutunIndeksi = 0; sutunIndeksi < matris.length / 2; sutunIndeksi += 1) {
      // Elemanları değiştir.
      [
        matris[satirIndeksi][matris.length - sutunIndeksi - 1],
        matris[satirIndeksi][sutunIndeksi],
      ] = [
        matris[satirIndeksi][sutunIndeksi],
        matris[satirIndeksi][matris.length - sutunIndeksi - 1],
      ];
    }
  }

  return matris;
}
