import * as matris from '../../math/matrix/Matrix';
import öklidUzaklığı from '../../math/euclidean-distance/euclideanDistance';

/**
 * K-Means algoritmasına dayalı olarak uzaydaki noktayı sınıflandırır.
 *
 * @param {number[][]} veri - veri kümesi noktalarının dizisi, örn. [[0, 1], [3, 4], [5, 7]]
 * @param {number} k - küme sayısı
 * @return {number[]} - noktanın sınıfı
 */
export default function KMeans(
  veri,
  k = 1,
) {
  if (!veri) {
    throw new Error('Veri boş');
  }

  // Başlangıçta k küme merkezini ilk k noktasının konumuna eşitle.
  const veriBoyutu = veri[0].length;
  const kümeMerkezleri = veri.slice(0, k);

  // Yakınsama sağlanana kadar optimizasyona devam et.
  // Optimizasyon tamamlandığında merkezler hareket etmemelidir.
  // Her aday vektörün her küme merkezinden uzaklığını hesapla.
  // Minimum uzaklığa göre her veri vektörüne küme numarası ata.

  // Her veri noktasının her küme merkezine olan uzaklık matrisi.
  const uzaklıklar = matris.zeros([veri.length, k]);

  // Veri noktalarının sınıfları vektörü. -1 değeri henüz bir sınıf atanmadığını gösterir.
  const sınıflar = Array(veri.length).fill(-1);

  let yinele = true;
  while (yinele) {
    yinele = false;

    // Her veri noktasının her kümeden uzaklığını hesapla ve sakla.
    for (let veriIndeksi = 0; veriIndeksi < veri.length; veriIndeksi += 1) {
      for (let kümeIndeksi = 0; kümeIndeksi < k; kümeIndeksi += 1) {
        uzaklıklar[veriIndeksi][kümeIndeksi] = öklidUzaklığı(
          [kümeMerkezleri[kümeIndeksi]],
          [veri[veriIndeksi]],
        );
      }
      // Her veri kümesi noktasına en yakın küme numarasını ata.
      const enYakınKümeIndeksi = uzaklıklar[veriIndeksi].indexOf(
        Math.min(...uzaklıklar[veriIndeksi]),
      );

      // Veri noktası sınıfının değişip değişmediğini kontrol et ve yeniden yineleme gerekip gerekmediğini belirle.
      if (sınıflar[veriIndeksi] !== enYakınKümeIndeksi) {
        yinele = true;
      }

      sınıflar[veriIndeksi] = enYakınKümeIndeksi;
    }

    // Küme merkez değerlerini, altındaki noktaların tüm boyutları üzerinden yeniden hesapla.
    for (let kümeIndeksi = 0; kümeIndeksi < k; kümeIndeksi += 1) {
      // Küme merkezi koordinatlarını sıfırla çünkü onları yeniden hesaplamamız gerekiyor.
      kümeMerkezleri[kümeIndeksi] = Array(veriBoyutu).fill(0);
      let kümeBoyutu = 0;
      for (let veriIndeksi = 0; veriIndeksi < veri.length; veriIndeksi += 1) {
        if (sınıflar[veriIndeksi] === kümeIndeksi) {
          // Mevcut kümenin bir veri noktasını daha kaydet.
          kümeBoyutu += 1;
          for (let boyutIndeksi = 0; boyutIndeksi < veriBoyutu; boyutIndeksi += 1) {
            // Veri noktası koordinatlarını küme merkezi koordinatlarına ekle.
            kümeMerkezleri[kümeIndeksi][boyutIndeksi] += veri[veriIndeksi][boyutIndeksi];
          }
        }
      }
      // Her küme merkezi koordinatı için ortalamayı hesapla.
      for (let boyutIndeksi = 0; boyutIndeksi < veriBoyutu; boyutIndeksi += 1) {
        kümeMerkezleri[kümeIndeksi][boyutIndeksi] = parseFloat(Number(
          kümeMerkezleri[kümeIndeksi][boyutIndeksi] / kümeBoyutu,
        ).toFixed(2));
      }
    }
  }

  // Atanan kümeleri döndür.
  return sınıflar;
}
