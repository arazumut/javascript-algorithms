// Alfabe dizisi oluştur: ['a', 'b', 'c', ..., 'z'].
const ingilizAlfabesi = 'abcdefghijklmnopqrstuvwxyz'.split('');

/**
 * Alfabe kullanarak bir şifreleme haritası oluşturur.
 * Örnek olarak, 3 kaydırma ile: {'a': 'd', 'b': 'e', 'c': 'f', ...}
 *
 * @param {string[]} alfabe - örn. ['a', 'b', 'c', ... , 'z']
 * @param {number} kaydirma - örn. 3
 * @return {Object} - örn. {'a': 'd', 'b': 'e', 'c': 'f', ..., 'z': 'c'}
 */
const sifrelemeHaritasiOlustur = (alfabe, kaydirma) => {
  return alfabe.reduce((harita, mevcutHarf, harfIndeksi) => {
    const haritaKopyasi = { ...harita };
    // Kaydırmayı döngüsel hale getirme (örn. 1 kaydırma ile - 'z' 'a'ya eşlenir).
    let sifreliHarfIndeksi = (harfIndeksi + kaydirma) % alfabe.length;
    // Şifre çözme için negatif kaydırmaları destekleme
    // (örn. -1 kaydırma ile - 'a' 'z'ye eşlenir).
    if (sifreliHarfIndeksi < 0) {
      sifreliHarfIndeksi += alfabe.length;
    }
    haritaKopyasi[mevcutHarf] = alfabe[sifreliHarfIndeksi];
    return haritaKopyasi;
  }, {});
};

/**
 * @param {string} metin
 * @param {number} kaydirma
 * @param {string[]} alfabe
 * @return {string}
 */
export const sezarSifrele = (metin, kaydirma, alfabe = ingilizAlfabesi) => {
  // Şifreleme haritası oluştur:
  const sifrelemeHaritasi = sifrelemeHaritasiOlustur(alfabe, kaydirma);
  return metin
    .toLowerCase()
    .split('')
    .map((harf) => sifrelemeHaritasi[harf] || harf)
    .join('');
};

/**
 * @param {string} metin
 * @param {number} kaydirma
 * @param {string[]} alfabe
 * @return {string}
 */
export const sezarSifreCoz = (metin, kaydirma, alfabe = ingilizAlfabesi) => {
  // Şifre çözme haritası oluştur:
  const sifreCozmeHaritasi = sifrelemeHaritasiOlustur(alfabe, -kaydirma);
  return metin
    .toLowerCase()
    .split('')
    .map((harf) => sifreCozmeHaritasi[harf] || harf)
    .join('');
};
