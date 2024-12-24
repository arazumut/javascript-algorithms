/**
 * Unique Paths (Benzersiz Yollar) problemini çözmek için GERİ İZLEME (BACKTRACKING) yaklaşımı.
 *
 * @param {number} genislik - Tahtanın genişliği.
 * @param {number} yukseklik - Tahtanın yüksekliği.
 * @param {number[][]} adimlar - Daha önce yapılan adımlar.
 * @param {number} benzersizAdimlar - Toplam benzersiz adım sayısı.
 * @return {number} - Benzersiz yol sayısı.
 */
export default function btUniquePaths(genislik, yukseklik, adimlar = [[0, 0]], benzersizAdimlar = 0) {
  // Tahtadaki mevcut konumu al.
  const mevcutKonum = adimlar[adimlar.length - 1];

  // Eğer sona ulaştıysak kontrol et.
  if (mevcutKonum[0] === genislik - 1 && mevcutKonum[1] === yukseklik - 1) {
    // Eğer sona ulaştıysak toplam benzersiz adım sayısını artır.
    return benzersizAdimlar + 1;
  }

  // Sağa ve aşağıya giderek kaç benzersiz yol olacağını hesaplayalım.
  let sagaBenzersizAdimlar = 0;
  let asagiBenzersizAdimlar = 0;

  // Eğer mümkünse sağa adım at.
  if (mevcutKonum[0] < genislik - 1) {
    adimlar.push([
      mevcutKonum[0] + 1,
      mevcutKonum[1],
    ]);

    // Sağa hareket ederek kaç benzersiz yol elde edeceğimizi hesapla.
    sagaBenzersizAdimlar = btUniquePaths(genislik, yukseklik, adimlar, benzersizAdimlar);

    // GERİ İZLE ve başka bir hareketi dene.
    adimlar.pop();
  }

  // Eğer mümkünse aşağıya adım at.
  if (mevcutKonum[1] < yukseklik - 1) {
    adimlar.push([
      mevcutKonum[0],
      mevcutKonum[1] + 1,
    ]);

    // Aşağıya hareket ederek kaç benzersiz yol elde edeceğimizi hesapla.
    asagiBenzersizAdimlar = btUniquePaths(genislik, yukseklik, adimlar, benzersizAdimlar);

    // GERİ İZLE ve başka bir hareketi dene.
    adimlar.pop();
  }

  // Toplam benzersiz adım sayısı sağa giderek ve aşağıya giderek elde edilen
  // benzersiz adım sayılarının toplamına eşit olacaktır.
  return sagaBenzersizAdimlar + asagiBenzersizAdimlar;
}
