import Karsilastirici from '../../../utils/comparator/Comparator';

/**
 * Doğrusal arama (Linear search) uygulaması.
 *
 * @param {*[]} dizi - Aranacak dizi
 * @param {*} arananEleman - Aranan eleman
 * @param {function(a, b)} [karsilastiriciCallback] - Karşılaştırma fonksiyonu (isteğe bağlı)
 * @return {number[]} - Bulunan elemanların indeksleri
 */
export default function dogrusalArama(dizi, arananEleman, karsilastiriciCallback) {
  const karsilastirici = new Karsilastirici(karsilastiriciCallback);
  const bulunanIndeksler = [];

  dizi.forEach((eleman, indeks) => {
    if (karsilastirici.esit(eleman, arananEleman)) {
      bulunanIndeksler.push(indeks);
    }
  });

  return bulunanIndeksler;
}
