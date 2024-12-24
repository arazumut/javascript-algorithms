import QueenPosition from './QueenPosition';

/**
 * @param {QueenPosition[]} vezirPozisyonlari
 * @param {number} satirIndeksi
 * @param {number} sutunIndeksi
 * @return {boolean}
 */
function guvenliMi(vezirPozisyonlari, satirIndeksi, sutunIndeksi) {
  // Yeni vezir pozisyonu.
  const yeniVezirPozisyonu = new QueenPosition(satirIndeksi, sutunIndeksi);

  // Yeni vezir pozisyonunun diğer vezirlerle çakışıp çakışmadığını kontrol et.
  for (let vezirIndeksi = 0; vezirIndeksi < vezirPozisyonlari.length; vezirIndeksi += 1) {
    const mevcutVezirPozisyonu = vezirPozisyonlari[vezirIndeksi];

    if (
      // Vezirin zaten yerleştirilip yerleştirilmediğini kontrol et.
      mevcutVezirPozisyonu
      && (
        // Aynı sütunda başka bir vezir olup olmadığını kontrol et.
        yeniVezirPozisyonu.sutunIndeksi === mevcutVezirPozisyonu.sutunIndeksi
        // Aynı satırda başka bir vezir olup olmadığını kontrol et.
        || yeniVezirPozisyonu.satirIndeksi === mevcutVezirPozisyonu.satirIndeksi
        // Aynı sol çaprazda başka bir vezir olup olmadığını kontrol et.
        || yeniVezirPozisyonu.solCapraz === mevcutVezirPozisyonu.solCapraz
        // Aynı sağ çaprazda başka bir vezir olup olmadığını kontrol et.
        || yeniVezirPozisyonu.sagCapraz === mevcutVezirPozisyonu.sagCapraz
      )
    ) {
      // Mevcut pozisyona vezir yerleştirilemez çünkü diğer vezirler tehdit ediyor.
      return false;
    }
  }

  // Güvenli görünüyor.
  return true;
}

/**
 * @param {QueenPosition[][]} cozumler
 * @param {QueenPosition[]} oncekiVezirPozisyonlari
 * @param {number} vezirSayisi
 * @param {number} satirIndeksi
 * @return {boolean}
 */
function nVezirlerRekursif(cozumler, oncekiVezirPozisyonlari, vezirSayisi, satirIndeksi) {
  // Pozisyonlar dizisini klonla.
  const vezirPozisyonlari = [...oncekiVezirPozisyonlari].map((vezirPozisyonu) => {
    return !vezirPozisyonu ? vezirPozisyonu : new QueenPosition(
      vezirPozisyonu.satirIndeksi,
      vezirPozisyonu.sutunIndeksi,
    );
  });

  if (satirIndeksi === vezirSayisi) {
    // Tahtanın sonuna başarıyla ulaştık.
    // Çözümü çözümler listesine ekle.
    cozumler.push(vezirPozisyonlari);

    // Çözüm bulundu.
    return true;
  }

  // Veziri satirIndeksi satırına güvenli sütun pozisyonuna yerleştirmeyi deneyelim.
  for (let sutunIndeksi = 0; sutunIndeksi < vezirSayisi; sutunIndeksi += 1) {
    if (guvenliMi(vezirPozisyonlari, satirIndeksi, sutunIndeksi)) {
      // Mevcut veziri mevcut pozisyonuna yerleştir.
      vezirPozisyonlari[satirIndeksi] = new QueenPosition(satirIndeksi, sutunIndeksi);

      // Diğer tüm vezirleri de yerleştirmeyi dene.
      nVezirlerRekursif(cozumler, vezirPozisyonlari, vezirSayisi, satirIndeksi + 1);

      // GERİ İZLEME.
      // Veziri satırdan kaldır, böylece guvenliMi() false döndürmez.
      vezirPozisyonlari[satirIndeksi] = null;
    }
  }

  return false;
}

/**
 * @param {number} vezirSayisi
 * @return {QueenPosition[][]}
 */
export default function nVezirler(vezirSayisi) {
  // NxN satranç tahtasını sıfırlarla başlat.
  // const satrancTahtasi = Array(vezirSayisi).fill(null).map(() => Array(vezirSayisi).fill(0));

  // Bu dizi, her bir N vezirinin pozisyonlarını veya koordinatlarını [satirIndeksi, sutunIndeksi] şeklinde tutacaktır.
  const vezirPozisyonlari = Array(vezirSayisi).fill(null);

  /** @var {QueenPosition[][]} cozumler */
  const cozumler = [];

  // Problemi rekursif olarak çöz.
  nVezirlerRekursif(cozumler, vezirPozisyonlari, vezirSayisi, 0);

  return cozumler;
}
