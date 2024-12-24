import MergeSort from '../../sorting/merge-sort/MergeSort';

export default class SırtÇantası {
  /**
   * @param {SırtÇantasıÖğesi[]} olasıÖğeler
   * @param {number} ağırlıkLimiti
   */
  constructor(olasıÖğeler, ağırlıkLimiti) {
    this.seçilenÖğeler = [];
    this.ağırlıkLimiti = ağırlıkLimiti;
    this.olasıÖğeler = olasıÖğeler;
  }

  olasıÖğeleriAğırlığaGöreSırala() {
    this.olasıÖğeler = new MergeSort({
      /**
       * @var SırtÇantasıÖğesi öğeA
       * @var SırtÇantasıÖğesi öğeB
       */
      karşılaştırmaFonksiyonu: (öğeA, öğeB) => {
        if (öğeA.ağırlık === öğeB.ağırlık) {
          return 0;
        }

        return öğeA.ağırlık < öğeB.ağırlık ? -1 : 1;
      },
    }).sort(this.olasıÖğeler);
  }

  olasıÖğeleriDeğereGöreSırala() {
    this.olasıÖğeler = new MergeSort({
      /**
       * @var SırtÇantasıÖğesi öğeA
       * @var SırtÇantasıÖğesi öğeB
       */
      karşılaştırmaFonksiyonu: (öğeA, öğeB) => {
        if (öğeA.değer === öğeB.değer) {
          return 0;
        }

        return öğeA.değer > öğeB.değer ? -1 : 1;
      },
    }).sort(this.olasıÖğeler);
  }

  olasıÖğeleriDeğerAğırlıkOranınaGöreSırala() {
    this.olasıÖğeler = new MergeSort({
      /**
       * @var SırtÇantasıÖğesi öğeA
       * @var SırtÇantasıÖğesi öğeB
       */
      karşılaştırmaFonksiyonu: (öğeA, öğeB) => {
        if (öğeA.değerAğırlıkOranı === öğeB.değerAğırlıkOranı) {
          return 0;
        }

        return öğeA.değerAğırlıkOranı > öğeB.değerAğırlıkOranı ? -1 : 1;
      },
    }).sort(this.olasıÖğeler);
  }

  // 0/1 sırt çantası problemini çöz
  // Dinamik Programlama yaklaşımı.
  sıfırBirSırtÇantasıProbleminiÇöz() {
    // Eşit ağırlıklar ama farklı değerler durumunda en değerli öğeleri önce almak için iki sıralama yapıyoruz.
    this.olasıÖğeleriDeğereGöreSırala();
    this.olasıÖğeleriAğırlığaGöreSırala();

    this.seçilenÖğeler = [];

    // Sırt çantası değerleri matrisi oluştur.
    const satırSayısı = this.olasıÖğeler.length;
    const sütunSayısı = this.ağırlıkLimiti;
    const sırtÇantasıMatrisi = Array(satırSayısı).fill(null).map(() => {
      return Array(sütunSayısı + 1).fill(null);
    });

    // İlk sütunu sıfırlarla doldur çünkü ağırlık limiti sıfır olduğunda sırt çantasına ekleyebileceğimiz öğe yoktur.
    for (let öğeIndex = 0; öğeIndex < this.olasıÖğeler.length; öğeIndex += 1) {
      sırtÇantasıMatrisi[öğeIndex][0] = 0;
    }

    // İlk satırı, sadece ilk öğeyi sırt çantasına ekleyerek veya eklemeyerek elde edebileceğimiz maksimum değerlerle doldur.
    for (let ağırlıkIndex = 1; ağırlıkIndex <= this.ağırlıkLimiti; ağırlıkIndex += 1) {
      const öğeIndex = 0;
      const öğeAğırlık = this.olasıÖğeler[öğeIndex].ağırlık;
      const öğeDeğer = this.olasıÖğeler[öğeIndex].değer;
      sırtÇantasıMatrisi[öğeIndex][ağırlıkIndex] = öğeAğırlık <= ağırlıkIndex ? öğeDeğer : 0;
    }

    // Dinamik Programlama yaklaşımı kullanarak sırt çantasına öğe ekleme kombinasyonlarını gözden geçir ve elde edebileceğimiz ağırlık/değeri belirle.
    for (let öğeIndex = 1; öğeIndex < this.olasıÖğeler.length; öğeIndex += 1) {
      for (let ağırlıkIndex = 1; ağırlıkIndex <= this.ağırlıkLimiti; ağırlıkIndex += 1) {
        const mevcutÖğeAğırlık = this.olasıÖğeler[öğeIndex].ağırlık;
        const mevcutÖğeDeğer = this.olasıÖğeler[öğeIndex].değer;

        if (mevcutÖğeAğırlık > ağırlıkIndex) {
          // Eğer öğenin ağırlığı şu anda izin verilen ağırlıktan büyükse, sırt çantasına ekleyemeyiz ve şu anda elde edebileceğimiz maksimum değer, önceki öğe için elde ettiğimiz maksimum değerdir.
          sırtÇantasıMatrisi[öğeIndex][ağırlıkIndex] = sırtÇantasıMatrisi[öğeIndex - 1][ağırlıkIndex];
        } else {
          // Aksi takdirde, şu anda elde edebileceğimiz maksimum değeri mevcut değeri ekleyerek veya sadece önceki öğeyi şu anki ağırlık için tutarak düşünmemiz gerekir.
          sırtÇantasıMatrisi[öğeIndex][ağırlıkIndex] = Math.max(
            mevcutÖğeDeğer + sırtÇantasıMatrisi[öğeIndex - 1][ağırlıkIndex - mevcutÖğeAğırlık],
            sırtÇantasıMatrisi[öğeIndex - 1][ağırlıkIndex],
          );
        }
      }
    }

    // Şimdi sırt çantası matrisini geri izleyerek sırt çantasına hangi öğeleri ekleyeceğimizi görelim.
    let öğeIndex = this.olasıÖğeler.length - 1;
    let ağırlıkIndex = this.ağırlıkLimiti;

    while (öğeIndex > 0) {
      const mevcutÖğe = this.olasıÖğeler[öğeIndex];
      const öncekiÖğe = this.olasıÖğeler[öğeIndex - 1];

      // Matris değerinin üstten (önceki öğeden) gelip gelmediğini kontrol edin.
      // Bu durumda, önceki öğeyi seçilen öğeler listesine eklememiz gerektiği anlamına gelir.
      if (
        sırtÇantasıMatrisi[öğeIndex][ağırlıkIndex]
        && sırtÇantasıMatrisi[öğeIndex][ağırlıkIndex] === sırtÇantasıMatrisi[öğeIndex - 1][ağırlıkIndex]
      ) {
        // Aynı ağırlığa sahip ancak farklı değerlere sahip birkaç öğe olup olmadığını kontrol edin.
        // En yüksek değeri elde etmek için matrisin mümkün olan en yüksek öğesini eklememiz gerekir.
        const öncekiToplamDeğer = sırtÇantasıMatrisi[öğeIndex - 1][ağırlıkIndex];
        const öncekiÖncekiToplamDeğer = sırtÇantasıMatrisi[öğeIndex - 2][ağırlıkIndex];
        if (
          !öncekiToplamDeğer
          || (öncekiToplamDeğer && öncekiÖncekiToplamDeğer !== öncekiToplamDeğer)
        ) {
          this.seçilenÖğeler.push(öncekiÖğe);
        }
      } else if (sırtÇantasıMatrisi[öğeIndex - 1][ağırlıkIndex - mevcutÖğe.ağırlık]) {
        this.seçilenÖğeler.push(öncekiÖğe);
        ağırlıkIndex -= mevcutÖğe.ağırlık;
      }

      öğeIndex -= 1;
    }
  }

  // Sınırsız sırt çantası problemini çöz.
  // Açgözlü yaklaşım.
  sınırsızSırtÇantasıProbleminiÇöz() {
    this.olasıÖğeleriDeğereGöreSırala();
    this.olasıÖğeleriDeğerAğırlıkOranınaGöreSırala();

    for (let öğeIndex = 0; öğeIndex < this.olasıÖğeler.length; öğeIndex += 1) {
      if (this.toplamAğırlık < this.ağırlıkLimiti) {
        const mevcutÖğe = this.olasıÖğeler[öğeIndex];

        // Mevcut öğelerden kaç tanesini sırt çantasına ekleyebileceğimizi belirleyin.
        const mevcutAğırlık = this.ağırlıkLimiti - this.toplamAğırlık;
        const maksimumOlasıÖğeSayısı = Math.floor(mevcutAğırlık / mevcutÖğe.ağırlık);

        if (maksimumOlasıÖğeSayısı > mevcutÖğe.stoktakiÖğeler) {
          // Eğer stokta izin verilen sayıda öğeden fazlası varsa, maksimum izin verilen sayıda öğe ekleyelim.
          mevcutÖğe.miktar = mevcutÖğe.stoktakiÖğeler;
        } else if (maksimumOlasıÖğeSayısı) {
          // Eğer stokta belirtilen sayıda öğe yoksa, sadece stokta olan öğeleri ekleyelim.
          mevcutÖğe.miktar = maksimumOlasıÖğeSayısı;
        }

        this.seçilenÖğeler.push(mevcutÖğe);
      }
    }
  }

  get toplamDeğer() {
    /** @var {SırtÇantasıÖğesi} öğe */
    return this.seçilenÖğeler.reduce((toplam, öğe) => {
      return toplam + öğe.toplamDeğer;
    }, 0);
  }

  get toplamAğırlık() {
    /** @var {SırtÇantasıÖğesi} öğe */
    return this.seçilenÖğeler.reduce((toplam, öğe) => {
      return toplam + öğe.toplamAğırlık;
    }, 0);
  }
}
