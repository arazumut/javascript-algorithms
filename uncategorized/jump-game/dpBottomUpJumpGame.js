/**
 * Dinamik Programlama Alt-Yukarı yaklaşımı ile Jump Game çözümü.
 *
 * Bu, Dinamik Programlama Üst-Aşağı yaklaşımının bir optimizasyonu olarak ortaya çıkar.
 *
 * Burada yapılacak gözlem, her zaman sağa doğru zıpladığımızdır.
 * Bu, dizinin sağından başlarsak, her seferinde sağımızdaki bir pozisyonu sorgulayacağımız anlamına gelir,
 * bu pozisyonun İYİ veya KÖTÜ olduğu zaten belirlenmiştir. Bu, artık yinelememize gerek olmadığı anlamına gelir,
 * çünkü her zaman memo tablosuna ulaşacağız.
 *
 * Dizideki bir pozisyonu "iyi" olarak adlandırırız, eğer o pozisyondan başlayarak son indekse ulaşabiliyorsak.
 * Aksi takdirde, o indeks "kötü" olarak adlandırılır.
 *
 * @param {number[]} sayılar - olası zıplama uzunluklarının dizisi.
 * @return {boolean}
 */
export default function dpAltYukarıZıplamaOyunu(sayılar) {
  // Hücre iyilik tablosunu başlat.
  const hücreİyiliği = Array(sayılar.length).fill(undefined);
  // Son hücreyi "iyi" olarak işaretle çünkü nihayetinde ulaşmak istediğimiz yer burası.
  hücreİyiliği[hücreİyiliği.length - 1] = true;

  // Son hücre zaten "iyi" olduğu için sondan bir önceki hücreden başlayarak tüm hücreleri dolaş
  // ve hücreİyiliği tablosunu doldur.
  for (let hücreIndeksi = sayılar.length - 2; hücreIndeksi >= 0; hücreIndeksi -= 1) {
    const maxZıplamaUzunluğu = Math.min(
      sayılar[hücreIndeksi],
      sayılar.length - 1 - hücreIndeksi,
    );

    for (let zıplamaUzunluğu = maxZıplamaUzunluğu; zıplamaUzunluğu > 0; zıplamaUzunluğu -= 1) {
      const sonrakiIndeks = hücreIndeksi + zıplamaUzunluğu;
      if (hücreİyiliği[sonrakiIndeks] === true) {
        hücreİyiliği[hücreIndeksi] = true;
        // Mevcut hücrenin iyi olduğunu tespit ettiğimizde, daha fazla hücre kontrolüne gerek yok.
        break;
      }
    }
  }

  // Şimdi, eğer sıfırıncı hücre iyi ise, dizinin sonuna kadar zıplayabiliriz.
  return hücreİyiliği[0] === true;
}
