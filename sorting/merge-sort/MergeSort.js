import Sort from '../Sort';

export default class MergeSort extends Sort {
  sort(orijinalDizi) {
    // Ziyaret callback'ini çağır.
    this.callbacks.visitingCallback(null);

    // Eğer dizi boşsa veya bir elemandan oluşuyorsa, bu diziyi döndür çünkü zaten sıralıdır.
    if (orijinalDizi.length <= 1) {
      return orijinalDizi;
    }

    // Diziyi iki yarıya böl.
    const ortaIndeks = Math.floor(orijinalDizi.length / 2);
    const solDizi = orijinalDizi.slice(0, ortaIndeks);
    const sağDizi = orijinalDizi.slice(ortaIndeks, orijinalDizi.length);

    // Bölünmüş dizinin iki yarısını sırala.
    const solSıralıDizi = this.sort(solDizi);
    const sağSıralıDizi = this.sort(sağDizi);

    // İki sıralı diziyi birleştir.
    return this.sıralıDizileriBirleştir(solSıralıDizi, sağSıralıDizi);
  }

  sıralıDizileriBirleştir(solDizi, sağDizi) {
    const sıralıDizi = [];

    // Eski elemanları sıralı diziye ekledikten sonra hariç tutmak için dizi işaretçilerini kullan.
    let solIndeks = 0;
    let sağIndeks = 0;

    while (solIndeks < solDizi.length && sağIndeks < sağDizi.length) {
      let minEleman = null;

      // Sol ve sağ dizi arasındaki minimum elemanı bul.
      if (this.comparator.lessThanOrEqual(solDizi[solIndeks], sağDizi[sağIndeks])) {
        minEleman = solDizi[solIndeks];
        // İndeks işaretçisini sağa kaydır
        solIndeks += 1;
      } else {
        minEleman = sağDizi[sağIndeks];
        // İndeks işaretçisini sağa kaydır
        sağIndeks += 1;
      }

      // Minimum elemanı sıralı diziye ekle.
      sıralıDizi.push(minEleman);

      // Ziyaret callback'ini çağır.
      this.callbacks.visitingCallback(minEleman);
    }

    // Sol veya sağ diziden kalan elemanlar olacak
    // Kalan elemanları sıralı diziye ekle
    return sıralıDizi
      .concat(solDizi.slice(solIndeks))
      .concat(sağDizi.slice(sağIndeks));
  }
}
