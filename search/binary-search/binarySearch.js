import Kıyaslayıcı from '../../../utils/comparator/Comparator';

/**
 * İkili arama (Binary search) uygulaması.
 *
 * @param {*[]} sıralıDizi
 * @param {*} arananEleman
 * @param {function(a, b)} [kıyaslayıcıCallback]
 * @return {number}
 */

export default function ikiliArama(sıralıDizi, arananEleman, kıyaslayıcıCallback) {
  // KıyaslayıcıCallback fonksiyonundan kıyaslayıcı oluşturalım.
  // Kıyaslayıcı nesnesi bize equal() ve lessThan() gibi ortak kıyaslama yöntemleri verecek.
  const kıyaslayıcı = new Kıyaslayıcı(kıyaslayıcıCallback);

  // Bu iki indeks mevcut dizinin (alt dizinin) sınırlarını içerecek.
  let başlangıçIndeksi = 0;
  let bitişIndeksi = sıralıDizi.length - 1;

  // Sınırlar çakışana ve artık bölünecek bir şey kalmayana kadar diziyi bölmeye devam edelim.
  while (başlangıçIndeksi <= bitişIndeksi) {
    // Ortadaki elemanın indeksini hesaplayalım.
    const ortaIndeks = başlangıçIndeksi + Math.floor((bitişIndeksi - başlangıçIndeksi) / 2);

    // Eğer elemanı bulduysak, pozisyonunu döndürelim.
    if (kıyaslayıcı.equal(sıralıDizi[ortaIndeks], arananEleman)) {
      return ortaIndeks;
    }

    // Bir sonraki arama için hangi yarıyı seçeceğimize karar verelim: sol veya sağ.
    if (kıyaslayıcı.lessThan(sıralıDizi[ortaIndeks], arananEleman)) {
      // Dizinin sağ yarısına geçelim.
      başlangıçIndeksi = ortaIndeks + 1;
    } else {
      // Dizinin sol yarısına geçelim.
      bitişIndeksi = ortaIndeks - 1;
    }
  }

  // Eğer hiçbir şey bulamadıysak -1 döndürelim.
  return -1;
}
