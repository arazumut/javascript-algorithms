/**
 * JUMP GAME çözümü için GERİ İZLEME yaklaşımı.
 *
 * Bu, her bir sıçrama desenini deneyerek ilk pozisyondan son pozisyona
 * ulaşmaya çalıştığımız verimsiz bir çözümdür. İlk pozisyondan başlar
 * ve ulaşılabilir her indexe sıçrarız. Bu işlemi son indexe ulaşana kadar
 * tekrar ederiz. Takıldığımızda geri izleriz.
 *
 * @param {number[]} sayilar - olası sıçrama uzunluklarının dizisi.
 * @param {number} baslangicIndex - sıçramaya başladığımız index.
 * @param {number[]} mevcutSicramalar - mevcut sıçrama yolu.
 * @return {boolean}
 */
export default function geriIzlemeSicramaOyunu(sayilar, baslangicIndex = 0, mevcutSicramalar = []) {
  if (baslangicIndex === sayilar.length - 1) {
    // Doğrudan son hücreye sıçradık. Bu durum bir çözümdür.
    return true;
  }

  // Mevcut pozisyondan yapabileceğimiz en uzun sıçramayı kontrol edelim.
  // Diziyi aşmamıza gerek yok.
  const maxSicramaUzunlugu = Math.min(
    sayilar[baslangicIndex], // Sıçrama dizi içinde.
    sayilar.length - 1 - baslangicIndex, // Sıçrama diziyi aşıyor.
  );

  // Başlangıç indexinden sıçramaya başlayalım ve herhangi bir
  // sıçramanın başarılı olup olmadığını ve dizinin sonuna ulaşıp ulaşmadığını görelim.
  for (let sicramaUzunlugu = maxSicramaUzunlugu; sicramaUzunlugu > 0; sicramaUzunlugu -= 1) {
    // Sonraki sıçramayı dene.
    const sonrakiIndex = baslangicIndex + sicramaUzunlugu;
    mevcutSicramalar.push(sonrakiIndex);

    const sicramaBasariliMi = geriIzlemeSicramaOyunu(sayilar, sonrakiIndex, mevcutSicramalar);

    // Mevcut sıçramanın başarılı olup olmadığını kontrol et.
    if (sicramaBasariliMi) {
      return true;
    }

    // GERİ İZLEME.
    // Önceki sıçrama başarılı olmadıysa geri çekil ve bir sonrakini dene.
    mevcutSicramalar.pop();
  }

  return false;
}
