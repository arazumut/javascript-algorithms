/**
 * Brute Force çözümü.
 * Karmaşıklık: O(n^2)
 *
 * @param {Number[]} girdiDizisi
 * @return {Number[]}
 */
export default function bfMaksimumAltDizi(girdiDizisi) {
  let maksAltDiziBaslangicIndeksi = 0;
  let maksAltDiziUzunlugu = 0;
  let maksAltDiziToplami = null;

  for (let baslangicIndeksi = 0; baslangicIndeksi < girdiDizisi.length; baslangicIndeksi += 1) {
    let altDiziToplami = 0;
    for (let diziUzunlugu = 1; diziUzunlugu <= (girdiDizisi.length - baslangicIndeksi); diziUzunlugu += 1) {
      altDiziToplami += girdiDizisi[baslangicIndeksi + (diziUzunlugu - 1)];
      if (maksAltDiziToplami === null || altDiziToplami > maksAltDiziToplami) {
        maksAltDiziToplami = altDiziToplami;
        maksAltDiziBaslangicIndeksi = baslangicIndeksi;
        maksAltDiziUzunlugu = diziUzunlugu;
      }
    }
  }

  return girdiDizisi.slice(maksAltDiziBaslangicIndeksi, maksAltDiziBaslangicIndeksi + maksAltDiziUzunlugu);
}
