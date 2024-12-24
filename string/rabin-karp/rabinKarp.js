import PolynomialHash from '../../cryptography/polynomial-hash/PolynomialHash';

/**
 * @param {string} metin - Aranacak kelimeyi içerebilecek metin.
 * @param {string} kelime - Metinde aranan kelime.
 * @return {number} - Kelimenin metindeki konumu.
 */
export default function rabinKarp(metin, kelime) {
  const hasher = new PolynomialHash();

  // Karşılaştırma için kullanılacak kelime hash'ini hesapla.
  const kelimeHash = hasher.hash(kelime);

  let oncekiFrame = null;
  let mevcutFrameHash = null;

  // Eşleşebilecek tüm metin alt dizilerini kontrol et.
  for (let charIndex = 0; charIndex <= (metin.length - kelime.length); charIndex += 1) {
    const mevcutFrame = metin.substring(charIndex, charIndex + kelime.length);

    // Mevcut alt dizinin hash'ini hesapla.
    if (mevcutFrameHash === null) {
      mevcutFrameHash = hasher.hash(mevcutFrame);
    } else {
      mevcutFrameHash = hasher.roll(mevcutFrameHash, oncekiFrame, mevcutFrame);
    }

    oncekiFrame = mevcutFrame;

    // Mevcut alt dizinin hash'i ile aranan kelimenin hash'ini karşılaştır.
    // Hash'ler eşleşirse alt dizilerin eşit olduğundan emin ol.
    // Hash çakışması durumunda diziler eşit olmayabilir.
    if (
      kelimeHash === mevcutFrameHash
      && metin.substr(charIndex, kelime.length) === kelime
    ) {
      return charIndex;
    }
  }

  return -1;
}
