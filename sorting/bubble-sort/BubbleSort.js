import Sort from '../Sort';

export default class BubbleSort extends Sort {
  sort(orijinalDizi) {
    // Değişim olup olmadığını belirten bayrak.
    let degisti = false;
    // Orijinal diziyi klonlayarak değişiklik yapmaktan kaçının.
    const dizi = [...orijinalDizi];

    for (let i = 1; i < dizi.length; i += 1) {
      degisti = false;

      // Ziyaret etme geri çağrısını çağır.
      this.callbacks.visitingCallback(dizi[i]);

      for (let j = 0; j < dizi.length - i; j += 1) {
        // Ziyaret etme geri çağrısını çağır.
        this.callbacks.visitingCallback(dizi[j]);

        // Elemanları yanlış sıradaysa değiştir.
        if (this.comparator.lessThan(dizi[j + 1], dizi[j])) {
          [dizi[j], dizi[j + 1]] = [dizi[j + 1], dizi[j]];

          // Değişimi kaydet.
          degisti = true;
        }
      }

      // Eğer değişim olmadıysa dizi zaten sıralıdır ve devam etmeye gerek yoktur.
      if (!degisti) {
        return dizi;
      }
    }

    return dizi;
  }
}
