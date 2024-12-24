/**
 * Tüm olası tahta konfigürasyonlarını kontrol eder.
 *
 * @param {number} tahtaBoyutu - Kare şeklindeki satranç tahtasının boyutu.
 * @param {number} solÇapraz - Mevcut satırdaki ilgili konumun "uygun" olup olmadığını gösteren N bitlik bir dizi
 * (başka kraliçeler sol çaprazdan tehdit etmiyor).
 * @param {number} sütun - Mevcut satırdaki ilgili konumun "uygun" olup olmadığını gösteren N bitlik bir dizi
 * (başka kraliçeler sütunlardan tehdit etmiyor).
 * @param {number} sağÇapraz - Mevcut satırdaki ilgili konumun "uygun" olup olmadığını gösteren N bitlik bir dizi
 * (başka kraliçeler sağ çaprazdan tehdit etmiyor).
 * @param {number} çözümSayısı - Geçerli çözümlerin sayısını takip eder.
 * @return {number} - Olası çözümlerin sayısı.
 */
function nQueensBitwiseRecursive(
  tahtaBoyutu,
  solÇapraz = 0,
  sütun = 0,
  sağÇapraz = 0,
  çözümSayısı = 0,
) {
  // Geçerli çözümlerin sayısını takip eder.
  let geçerliÇözümSayısı = çözümSayısı;

  // Geçerli çözümleri tanımlamaya yardımcı olur.
  // isDone, N'inciye kadar her giriş için 1 olan bir bit dizisine sahiptir. Örneğin,
  // N=5 olduğunda, done 11111 olacaktır. "isDone" değişkeni, N'in ötesindeki bitlerle ilgilenmemize gerek kalmamasını sağlar.
  const isDone = (2 ** tahtaBoyutu) - 1;

  // Tüm sütunlar dolu (örneğin, tahtaBoyutu = 4 için 0b1111), bu yüzden çözüm tamamlanmış olmalı.
  // Algoritma hiçbir zaman bir kraliçeyi yasadışı bir şekilde yerleştirmediğinden (yani, saldırabilir veya saldırıya uğrayabilir),
  // tüm sütunlar doldurulmuşsa, geçerli bir çözümümüz olduğunu biliriz.
  if (sütun === isDone) {
    return geçerliÇözümSayısı + 1;
  }

  // "1" olan bitlerle açık "yuva"ların olduğu bir bit dizisi alır.
  // Burada olan tek şey, col, ld ve rd'yi alıyoruz ve eğer herhangi bir sütun "tehdit altında" ise,
  // bu sütunu poss'da 0 olarak işaretliyoruz, bu da temelde "bu sütuna bir kraliçe koyamayız" anlamına geliyor.
  // Böylece poss'daki '1' olan tüm bit konumları, oraya kraliçe yerleştirmek için uygundur.
  let uygunPozisyonlar = ~(solÇapraz | sağÇapraz | sütun);

  // Başka bir kraliçe koymak için geçerli bir yer olduğu sürece döngü devam eder.
  // N=4 için isDone=0b1111. Sonra eğer uygunPozisyonlar=0b0000 ise (bu, tüm yerlerin tehdit altında olduğu anlamına gelir)
  // bir kraliçe yerleştirmeyi denemeyi bırakmalıyız.
  while (uygunPozisyonlar & isDone) {
    // firstAvailablePosition sadece ilk sıfır olmayan biti saklar (yani, ilk uygun konum).
    // Yani, firstAvailablePosition 0010 olsaydı, bu, mevcut satırın 3. sütununu ifade ederdi.
    // Ve bu, bir sonraki kraliçemizi yerleştireceğimiz konum olacaktır.
    //
    // Örneğin:
    // uygunPozisyonlar = 0b01100
    // firstAvailablePosition = 100
    const firstAvailablePosition = uygunPozisyonlar & -uygunPozisyonlar;

    // Bu satır sadece mevcut satırdaki bu konumu "alınmış" olarak işaretler ve bu sütunu uygunPozisyonlar'da sıfıra çevirir.
    // Bu şekilde, while döngüsü devam ettiğinde, bu konumu tekrar denemememiz gerektiğini biliriz.
    //
    // Örneğin:
    // uygunPozisyonlar = 0b0100
    // firstAvailablePosition = 0b10
    // 0b0110 - 0b10 = 0b0100
    uygunPozisyonlar -= firstAvailablePosition;

    /*
     * >> 1 ve 1 << operatörleri, bir bit dizisindeki tüm bitleri sırasıyla bir basamak sağa veya sola taşır.
     * Yani (rd|bit)<<1 çağrısı, rd ve bit'i bir OR işlemiyle birleştirir, ardından sonuçtaki her şeyi bir basamak sola taşır.
     *
     * Daha spesifik olarak, eğer rd 0001 ise (bu, mevcut satırın 4. sütunundan geçen sağ üstten sol alta çaprazın dolu olduğunu ifade eder),
     * ve bit 0100 ise (bu, mevcut satırın 2. sütununa bir kraliçe yerleştirmeyi planladığımız anlamına gelir), (rd|bit) 0101 ile sonuçlanır
     * (bu, mevcut satırın 2. sütununa bir kraliçe yerleştirdikten sonra, ikinci ve dördüncü sağ üstten sol alta çaprazların dolu olacağı anlamına gelir).
     *
     * Şimdi, << operatörünü eklersek, (rd|bit)<<1, önceki madde noktamızda çalıştığımız 0101'i alır ve her şeyi sola bir basamak taşır.
     * Sonuç, dolayısıyla, 1010 olur.
     */
    geçerliÇözümSayısı += nQueensBitwiseRecursive(
      tahtaBoyutu,
      (solÇapraz | firstAvailablePosition) >> 1,
      sütun | firstAvailablePosition,
      (sağÇapraz | firstAvailablePosition) << 1,
      çözümSayısı,
    );
  }

  return geçerliÇözümSayısı;
}

/**
 * @param {number} tahtaBoyutu - Kare şeklindeki satranç tahtasının boyutu.
 * @return {number} - Olası çözümlerin sayısı.
 * @see http://gregtrowbridge.com/a-bitwise-solution-to-the-n-queens-problem-in-javascript/
 */
export default function nQueensBitwise(tahtaBoyutu) {
  return nQueensBitwiseRecursive(tahtaBoyutu);
}
