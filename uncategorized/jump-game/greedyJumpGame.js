/**
 * JUMP GAME problemini GREEDY yaklaşımı ile çözme.
 *
 * Bu, DİNAMİK PROGRAMLAMA BOTTOM_UP yaklaşımının bir optimizasyonu olarak ortaya çıkar.
 *
 * Kodumuzu bottom-up durumuna getirdiğimizde, son bir önemli gözlem yapabiliriz.
 * Belirli bir pozisyondan, İYİ bir pozisyona zıplayıp zıplayamayacağımızı görmeye çalıştığımızda,
 * yalnızca birini - ilkini - kullanırız. Başka bir deyişle, en soldakini.
 * Bu en soldaki İYİ pozisyonu ayrı bir değişken olarak takip edersek, onu dizide aramaktan kaçınabiliriz.
 * Sadece bu değil, diziyi tamamen kullanmayı bırakabiliriz.
 *
 * Dizideki bir pozisyonu, o pozisyondan başlayarak son indekse ulaşabiliyorsak "iyi" olarak adlandırırız.
 * Aksi takdirde, o indeks "kötü" olarak adlandırılır.
 *
 * @param {number[]} sayılar - olası zıplama uzunluklarının dizisi.
 * @return {boolean}
 */
export default function greedyJumpGame(sayılar) {
  // "İyi" hücre, sayılar dizisinin son hücresine zıplayabileceğimiz bir hücredir.

  // Sayılar dizisindeki son hücre kesinlikle "iyi"dir çünkü ulaşmayı hedeflediğimiz yerdir.
  let solİyiPozisyon = sayılar.length - 1;

  // Tüm sayıları sağdan sola doğru geç.
  for (let sayıİndeksi = sayılar.length - 2; sayıİndeksi >= 0; sayıİndeksi -= 1) {
    // Eğer mevcut hücreden "iyi" hücreye ulaşabiliyorsak, mevcut hücre de kesinlikle "iyi"dir.
    // Sonuçta, dizinin sonuna ulaşabileceğiz.
    const maxMevcutZıplamaUzunluğu = sayıİndeksi + sayılar[sayıİndeksi];
    if (maxMevcutZıplamaUzunluğu >= solİyiPozisyon) {
      solİyiPozisyon = sayıİndeksi;
    }
  }

  // Eğer en soldaki "iyi" pozisyon sıfırıncı pozisyon ise, dizinin ilk hücresinden sonuna zıplamanın
  // mümkün olduğunu söyleyebiliriz.
  return solİyiPozisyon === 0;
}
