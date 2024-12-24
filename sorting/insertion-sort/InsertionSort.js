import Sort from '../Sort';

export default class InsertionSort extends Sort {
  sort(orijinalDizi) {
    const dizi = [...orijinalDizi];

    // Tüm dizi elemanlarını dolaş...
    for (let i = 1; i < dizi.length; i += 1) {
      let mevcutIndeks = i;

      // Ziyaret etme geri çağrısını çağır.
      this.callbacks.visitingCallback(dizi[i]);

      // Önceki elemanın mevcut elemandan büyük olup olmadığını kontrol et.
      // Eğer öyleyse, iki elemanı değiştir.
      while (
        dizi[mevcutIndeks - 1] !== undefined
        && this.comparator.lessThan(dizi[mevcutIndeks], dizi[mevcutIndeks - 1])
      ) {
        // Ziyaret etme geri çağrısını çağır.
        this.callbacks.visitingCallback(dizi[mevcutIndeks - 1]);

        // Elemanları değiştir.
        [
          dizi[mevcutIndeks - 1],
          dizi[mevcutIndeks],
        ] = [
          dizi[mevcutIndeks],
          dizi[mevcutIndeks - 1],
        ];

        // Mevcut indeksi sola kaydır.
        mevcutIndeks -= 1;
      }
    }

    return dizi;
  }
}
