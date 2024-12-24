/**
 * JUMP GAME problemini çözmek için DİNAMİK PROGRAMLAMA ÜSTTEN AŞAĞI yaklaşımı.
 *
 * Bu, GERİ İZLEME yaklaşımının bir optimizasyonu olarak ortaya çıkar.
 *
 * Bir indeksin iyi/kötü olduğunu belirledikten sonra, bu sonucun asla değişmeyeceği
 * gözlemine dayanır. Bu, sonucu saklayabileceğimiz ve her seferinde yeniden hesaplamamız
 * gerekmediği anlamına gelir.
 *
 * Dizideki bir konumu, o konumdan başlayarak son indekse ulaşabiliyorsak "iyi" olarak adlandırırız.
 * Aksi takdirde, o indeks "kötü" olarak adlandırılır.
 *
 * @param {number[]} sayılar - olası zıplama uzunluklarının dizisi.
 * @param {number} başlangıçIndeksi - zıplamaya başladığımız indeks.
 * @param {number[]} mevcutZıplamalar - mevcut zıplama yolu.
 * @param {boolean[]} hücreİyiliği - hücrenin "iyi" veya "kötü" olup olmadığını tutar.
 * @return {boolean}
 */
export default function dpÜsttenAşağıZıplamaOyunu(
  sayılar,
  başlangıçIndeksi = 0,
  mevcutZıplamalar = [],
  hücreİyiliği = [],
) {
  if (başlangıçIndeksi === sayılar.length - 1) {
    // Doğrudan son hücreye zıpladık. Bu durum bir çözümdür.
    return true;
  }

  // Hücre iyiliği tablosunu boşsa başlat.
  // Bu DİNAMİK PROGRAMLAMA özelliğidir.
  const mevcutHücreİyiliği = [...hücreİyiliği];
  if (!mevcutHücreİyiliği.length) {
    sayılar.forEach(() => mevcutHücreİyiliği.push(undefined));
    // Son hücreyi "iyi" olarak işaretle çünkü nihayetinde ulaşmak istediğimiz yer burası.
    mevcutHücreİyiliği[hücreİyiliği.length - 1] = true;
  }

  // Mevcut pozisyondan yapabileceğimiz en uzun zıplamayı kontrol et.
  // Dizinin ötesine zıplamamıza gerek yok.
  const maxZıplamaUzunluğu = Math.min(
    sayılar[başlangıçIndeksi], // Zıplama dizinin içinde.
    sayılar.length - 1 - başlangıçIndeksi, // Zıplama dizinin ötesine geçiyor.
  );

  // BaşlangıçIndeksi'nden zıplamaya başlayalım ve herhangi bir zıplamanın
  // başarılı olup olmadığını ve dizinin sonuna ulaşıp ulaşmadığını görelim.
  for (let zıplamaUzunluğu = maxZıplamaUzunluğu; zıplamaUzunluğu > 0; zıplamaUzunluğu -= 1) {
    // Sonraki zıplamayı dene.
    const sonrakiIndeks = başlangıçIndeksi + zıplamaUzunluğu;

    // Sadece "iyi" veya "bilinmeyen" hücrelere zıpla.
    // Bu, geri izleme algoritmasının üstten aşağı dinamik programlama optimizasyonudur.
    if (mevcutHücreİyiliği[sonrakiIndeks] !== false) {
      mevcutZıplamalar.push(sonrakiIndeks);

      const zıplamaBaşarılı = dpÜsttenAşağıZıplamaOyunu(
        sayılar,
        sonrakiIndeks,
        mevcutZıplamalar,
        mevcutHücreİyiliği,
      );

      // Mevcut zıplamanın başarılı olup olmadığını kontrol et.
      if (zıplamaBaşarılı) {
        return true;
      }

      // GERİ İZLEME.
      // Önceki zıplama başarılı olmadıysa geri çekil ve bir sonrakini dene.
      mevcutZıplamalar.pop();

      // Mevcut hücreyi "kötü" olarak işaretle, böylece daha sonra derinlemesine ziyaret edilmez.
      mevcutHücreİyiliği[sonrakiIndeks] = false;
    }
  }

  return false;
}
