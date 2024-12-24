import OncelikKuyrugu from '../../../data-structures/priority-queue/PriorityQueue';

/**
 * @typedef {Object} EnKisaYollar
 * @property {Object} mesafeler - Tüm düğümlere en kısa mesafeler
 * @property {Object} oncekiDugumler - Tüm düğümlere en kısa yollar
 */

/**
 * Dijkstra algoritmasının en kısa yolları bulma uygulaması.
 * @param {Graf} graf - Dolaşacağımız graf
 * @param {GrafDugumu} baslangicDugumu - Dolaşma başlangıç düğümü
 * @return {EnKisaYollar}
 */
export default function dijkstra(graf, baslangicDugumu) {
  // Dijkstra algoritması için ihtiyaç duyacağımız yardımcı değişkenleri başlat
  const mesafeler = {};
  const ziyaretEdilenDugumler = {};
  const oncekiDugumler = {};
  const kuyruk = new OncelikKuyrugu();

  // Başlangıç düğümü hariç tüm düğümlere şu anda ulaşamayacağımızı 
  // varsayarak tüm mesafeleri sonsuz olarak başlat
  graf.getAllVertices().forEach((dugum) => {
    mesafeler[dugum.getKey()] = Infinity;
    oncekiDugumler[dugum.getKey()] = null;
  });

  // Başlangıç düğümünde olduğumuz için mesafe sıfır
  mesafeler[baslangicDugumu.getKey()] = 0;

  // Düğümler kuyruğunu başlat
  kuyruk.add(baslangicDugumu, mesafeler[baslangicDugumu.getKey()]);

  // Öncelik kuyruğu boşalana kadar düğümleri dolaş
  while (!kuyruk.isEmpty()) {
    // Bir sonraki en yakın düğümü al
    const mevcutDugum = kuyruk.poll();

    // Mevcut düğümün ziyaret edilmemiş tüm komşularını dolaş
    mevcutDugum.getNeighbors().forEach((komsu) => {
      // Zaten ziyaret edilmiş düğümleri ziyaret etme
      if (!ziyaretEdilenDugumler[komsu.getKey()]) {
        // Mevcut düğümden her komşuya olan mesafeleri güncelle
        const kenar = graf.findEdge(mevcutDugum, komsu);

        const mevcutMesafeKomsuya = mesafeler[komsu.getKey()];
        const mevcutDugumdenKomsuyaMesafe = mesafeler[mevcutDugum.getKey()] + kenar.weight;

        // Eğer komşuya daha kısa bir yol bulduysak, güncelle
        if (mevcutDugumdenKomsuyaMesafe < mevcutMesafeKomsuya) {
          mesafeler[komsu.getKey()] = mevcutDugumdenKomsuyaMesafe;

          // Komşunun önceliğini kuyruğa göre değiştir
          if (kuyruk.hasValue(komsu)) {
            kuyruk.changePriority(komsu, mesafeler[komsu.getKey()]);
          }

          // Önceki en yakın düğümü hatırla
          oncekiDugumler[komsu.getKey()] = mevcutDugum;
        }

        // Komşuyu daha sonra ziyaret etmek için kuyruğa ekle
        if (!kuyruk.hasValue(komsu)) {
          kuyruk.add(komsu, mesafeler[komsu.getKey()]);
        }
      }
    });

    // Mevcut düğümü ziyaret edilenlere ekle, böylece tekrar ziyaret edilmez
    ziyaretEdilenDugumler[mevcutDugum.getKey()] = mevcutDugum;
  }

  // Graf'taki tüm düğümlere en kısa mesafeleri ve en kısa yolları döndür
  return {
    mesafeler,
    oncekiDugumler,
  };
}
