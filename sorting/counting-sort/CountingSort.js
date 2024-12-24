import Sort from '../Sort';

export default class CountingSort extends Sort {
  /**
   * @param {number[]} orijinalDizi
   * @param {number} [enKucukEleman]
   * @param {number} [enBuyukEleman]
   */
  sirala(orijinalDizi, enKucukEleman = undefined, enBuyukEleman = undefined) {
    // Daha sonra sayı kovası dizisini oluşturmak için dizideki en büyük ve en küçük elemanları başlat.
    let tespitEdilenEnKucukEleman = enKucukEleman || 0;
    let tespitEdilenEnBuyukEleman = enBuyukEleman || 0;

    if (enKucukEleman === undefined || enBuyukEleman === undefined) {
      orijinalDizi.forEach((eleman) => {
        // Elemanı ziyaret et.
        this.callbacks.visitingCallback(eleman);

        // En büyük elemanı tespit et.
        if (this.comparator.greaterThan(eleman, tespitEdilenEnBuyukEleman)) {
          tespitEdilenEnBuyukEleman = eleman;
        }

        // En küçük elemanı tespit et.
        if (this.comparator.lessThan(eleman, tespitEdilenEnKucukEleman)) {
          tespitEdilenEnKucukEleman = eleman;
        }
      });
    }

    // Kova dizisini başlat.
    // Bu dizi, orijinalDizi'deki her sayının frekansını tutacak.
    const kovalar = Array(tespitEdilenEnBuyukEleman - tespitEdilenEnKucukEleman + 1).fill(0);

    orijinalDizi.forEach((eleman) => {
      // Elemanı ziyaret et.
      this.callbacks.visitingCallback(eleman);

      kovalar[eleman - tespitEdilenEnKucukEleman] += 1;
    });

    // Kovadaki her sayı için önceki frekansları mevcut olana ekle
    // böylece mevcut olanın solunda kaç sayı olması gerektiğini tespit et.
    for (let kovaIndeksi = 1; kovaIndeksi < kovalar.length; kovaIndeksi += 1) {
      kovalar[kovaIndeksi] += kovalar[kovaIndeksi - 1];
    }

    // Şimdi frekansları sağa kaydıralım, böylece doğru sayıları göstersinler.
    kovalar.pop();
    kovalar.unshift(0);

    // Şimdi sıralanmış diziyi oluşturalım.
    const siraliDizi = Array(orijinalDizi.length).fill(null);
    for (let elemanIndeksi = 0; elemanIndeksi < orijinalDizi.length; elemanIndeksi += 1) {
      // Doğru sıralanmış konuma koymak istediğimiz elemanı al.
      const eleman = orijinalDizi[elemanIndeksi];

      // Elemanı ziyaret et.
      this.callbacks.visitingCallback(eleman);

      // Bu elemanın sıralanmış dizideki doğru konumunu al.
      const elemanSiraliKonum = kovalar[eleman - tespitEdilenEnKucukEleman];

      // Elemanı sıralanmış dizide doğru konuma koy.
      siraliDizi[elemanSiraliKonum] = eleman;

      // Gelecekteki doğru yerleştirmeler için mevcut elemanın kovadaki konumunu artır.
      kovalar[eleman - tespitEdilenEnKucukEleman] += 1;
    }

    // Sıralanmış diziyi döndür.
    return siraliDizi;
  }
}
