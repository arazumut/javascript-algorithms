// "kelime" ve "metin" birleştirmesi için kullanılan ayırıcı.
const AYIRICI = '$';

/**
 * @param {string} zDizgesi
 * @return {number[]}
 */
function zDizisiOlustur(zDizgesi) {
  // zDizisini başlat ve sıfırlarla doldur.
  const zDizisi = new Array(zDizgesi.length).fill(null).map(() => 0);

  // Z kutusu sınırları.
  let zKutusuSolIndeksi = 0;
  let zKutusuSagIndeksi = 0;

  // Mevcut zKutusu karakterinin pozisyonu, aynı zamanda önek pozisyonudur.
  let zKutusuKayması = 0;

  // zDizgesinin tüm karakterlerini dolaş.
  for (let karakterIndeksi = 1; karakterIndeksi < zDizgesi.length; karakterIndeksi += 1) {
    if (karakterIndeksi > zKutusuSagIndeksi) {
      // Z kutusunun DIŞINDAYIZ. Bu durumda Z kutusunu 1 uzunluğunda yapalım.
      zKutusuSolIndeksi = karakterIndeksi;
      zKutusuSagIndeksi = karakterIndeksi;

      // Şimdi mevcut ve sonraki karakterlerin önekle aynı olup olmadığını kontrol edelim.
      while (
        zKutusuSagIndeksi < zDizgesi.length
        && zDizgesi[zKutusuSagIndeksi - zKutusuSolIndeksi] === zDizgesi[zKutusuSagIndeksi]
      ) {
        // Z kutusunun sağ sınırını genişletiyoruz.
        zKutusuSagIndeksi += 1;
      }

      // Şimdi mevcut pozisyondan başlayarak kaç karakterin önekle aynı olduğunu hesaplayabiliriz.
      zDizisi[karakterIndeksi] = zKutusuSagIndeksi - zKutusuSolIndeksi;

      // Sağ Z kutusu sınırını bir pozisyon sola kaydır.
      zKutusuSagIndeksi -= 1;
    } else {
      // Z kutusunun İÇİNDEYİZ.

      // İlgili Z kutusu kaymasını hesapla.
      zKutusuKayması = karakterIndeksi - zKutusuSolIndeksi;

      // Daha önce hesaplanan değerin Z kutusunun dışına çıkıp çıkmadığını kontrol et.
      if (zDizisi[zKutusuKayması] < (zKutusuSagIndeksi - karakterIndeksi) + 1) {
        // Hesaplanan değer Z kutusunun dışına çıkmıyorsa, daha önce hesaplanan değeri kullanabiliriz.
        zDizisi[karakterIndeksi] = zDizisi[zKutusuKayması];
      } else {
        // Daha önce hesaplanan değer Z kutusunun dışına çıkıyorsa, bu değerleri yeniden hesaplamamız gerekir.
        zKutusuSolIndeksi = karakterIndeksi;

        // Karakterleri tek tek karşılaştırmaya başla.
        while (
          zKutusuSagIndeksi < zDizgesi.length
          && zDizgesi[zKutusuSagIndeksi - zKutusuSolIndeksi] === zDizgesi[zKutusuSagIndeksi]
        ) {
          zKutusuSagIndeksi += 1;
        }

        zDizisi[karakterIndeksi] = zKutusuSagIndeksi - zKutusuSolIndeksi;

        zKutusuSagIndeksi -= 1;
      }
    }
  }

  // Oluşturulan zDizisini döndür.
  return zDizisi;
}

/**
 * @param {string} metin
 * @param {string} kelime
 * @return {number[]}
 */
export default function zAlgoritmasi(metin, kelime) {
  // Kelimenin metindeki pozisyonlarının listesi.
  const kelimePozisyonlari = [];

  // Kelime ve metni birleştir. Kelime metnin öneki olacak.
  const zDizgesi = `${kelime}${AYIRICI}${metin}`;

  // Birleştirilmiş dizge için Z-dizisini oluştur.
  const zDizisi = zDizisiOlustur(zDizgesi);

  // Z-dizisi özelliklerine göre her hücre, önek ile mevcut alt metin arasındaki eşleşmenin uzunluğunu belirtir.
  for (let karakterIndeksi = 1; karakterIndeksi < zDizisi.length; karakterIndeksi += 1) {
    if (zDizisi[karakterIndeksi] === kelime.length) {
      // Birleştirme işlemi nedeniyle önek ve ayırıcı uzunluklarını çıkarmamız gerekiyor.
      const kelimePozisyonu = karakterIndeksi - kelime.length - AYIRICI.length;
      kelimePozisyonlari.push(kelimePozisyonu);
    }
  }

  // Kelime pozisyonlarının listesini döndür.
  return kelimePozisyonlari;
}
