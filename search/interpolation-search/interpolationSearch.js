/**
 * Enterpolasyon araması uygulaması.
 *
 * @param {*[]} sıralıDizi - eşit dağılımlı değerlere sahip sıralı dizi
 * @param {*} arananEleman
 * @return {number}
 */
export default function enterpolasyonAraması(sıralıDizi, arananEleman) {
  let solIndeks = 0;
  let sağIndeks = sıralıDizi.length - 1;

  while (solIndeks <= sağIndeks) {
    const aralıkFarkı = sıralıDizi[sağIndeks] - sıralıDizi[solIndeks];
    const indeksFarkı = sağIndeks - solIndeks;
    const değerFarkı = arananEleman - sıralıDizi[solIndeks];

    // Eğer değerFarkı sıfırdan küçükse, aranan elemanın dizide bulunmadığı anlamına gelir
    // çünkü aralıktaki en düşük eleman zaten aranan elemandan daha yüksektir.
    if (değerFarkı < 0) {
      return -1;
    }

    // Eğer aralık farkı sıfırsa, alt dizi aynı sayılardan oluşur
    // ve bu nedenle aranan eleman bu aralıkta yoksa arama yapılacak bir şey yoktur.
    if (!aralıkFarkı) {
      // Bu şekilde, daha sonra ortaIndeks hesaplanırken sıfıra bölünmeyi de önlemiş oluruz.
      return sıralıDizi[solIndeks] === arananEleman ? solIndeks : -1;
    }

    // Orta indeksi enterpole et.
    const ortaIndeks = solIndeks + Math.floor((değerFarkı * indeksFarkı) / aralıkFarkı);

    // Eğer elemanı bulduysak, pozisyonunu döndür.
    if (sıralıDizi[ortaIndeks] === arananEleman) {
      return ortaIndeks;
    }

    // Bir sonraki arama için hangi yarıyı seçeceğimize karar ver: sol veya sağ.
    if (sıralıDizi[ortaIndeks] < arananEleman) {
      // Dizinin sağ yarısına git.
      solIndeks = ortaIndeks + 1;
    } else {
      // Dizinin sol yarısına git.
      sağIndeks = ortaIndeks - 1;
    }
  }

  return -1;
}
