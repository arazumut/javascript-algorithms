/**
 * @typedef {string[]} Ray
 * @typedef {Ray[]} Çit
 * @typedef {number} Yön
 */

/**
 * @constant YÖNLER
 * @type {object}
 * @property {Yön} YUKARI
 * @property {Yön} AŞAĞI
 */
const YÖNLER = { YUKARI: -1, AŞAĞI: 1 };

/**
 * Belirli sayıda satır içeren bir çit oluşturur.
 *
 * @param {number} satirSayisi
 * @returns {Çit}
 */
const citOlustur = (satirSayisi) => Array(satirSayisi)
  .fill(null)
  .map(() => []);

/**
 * Çiti geçerken (mevcut yöne göre) hareket etmek için bir sonraki yönü alır.
 *
 * @param {object} params
 * @param {number} params.raySayisi - Çitteki satır sayısı
 * @param {number} params.mevcutRay - Ziyaret ettiğimiz mevcut satır
 * @param {Yön} params.yön - Mevcut yön
 * @returns {Yön} - Alınacak bir sonraki yön
 */
const sonrakiYönüAl = ({ raySayisi, mevcutRay, yön }) => {
  switch (mevcutRay) {
    case 0:
      // Çitin üstündeysek aşağı in.
      return YÖNLER.AŞAĞI;
    case raySayisi - 1:
      // Çitin altındaysak yukarı çık.
      return YÖNLER.YUKARI;
    default:
      // Çitin ortasındaysak aynı yönde devam et.
      return yön;
  }
};

/**
 * @param {number} hedefRayIndeksi
 * @param {string} harf
 * @returns {Function}
 */
const rayaHarfEkle = (hedefRayIndeksi, harf) => {
  /**
   * Bir raya, hedefIndeks ile eşleşirse bir harf ekler.
   *
   * @param {Ray} ray
   * @param {number} mevcutRay
   * @returns {Ray}
   */
  function herRayda(ray, mevcutRay) {
    return mevcutRay === hedefRayIndeksi
      ? [...ray, harf]
      : ray;
  }
  return herRayda;
};

/**
 * Karakterleri çite asar.
 *
 * @param {object} params
 * @param {Çit} params.çit
 * @param {number} params.mevcutRay
 * @param {Yön} params.yön
 * @param {string[]} params.karakterler
 * @returns {Çit}
 */
const kodlamaÇitiniDoldur = ({
  çit,
  mevcutRay,
  yön,
  karakterler,
}) => {
  if (karakterler.length === 0) {
    // Tüm karakterler bir çite yerleştirildi.
    return çit;
  }

  const raySayisi = çit.length;

  // Çite yerleştirilecek bir sonraki karakteri al.
  const [harf, ...sonrakiKarakterler] = karakterler;
  const sonrakiYön = sonrakiYönüAl({
    raySayisi,
    mevcutRay,
    yön,
  });

  return kodlamaÇitiniDoldur({
    çit: çit.map(rayaHarfEkle(mevcutRay, harf)),
    mevcutRay: mevcutRay + sonrakiYön,
    yön: sonrakiYön,
    karakterler: sonrakiKarakterler,
  });
};

/**
 * @param {object} params
 * @param {number} params.strUzunluk
 * @param {string[]} params.karakterler
 * @param {Çit} params.çit
 * @param {number} params.hedefRay
 * @param {Yön} params.yön
 * @param {number[]} params.koordinatlar
 * @returns {Çit}
 */
const kodCozmeÇitiniDoldur = (params) => {
  const {
    strUzunluk, karakterler, çit, hedefRay, yön, koordinatlar,
  } = params;

  const raySayisi = çit.length;

  if (karakterler.length === 0) {
    return çit;
  }

  const [mevcutRay, mevcutSütun] = koordinatlar;
  const sonrakiRay = mevcutSütun === strUzunluk - 1 ? hedefRay + 1 : hedefRay;
  const sonrakiKoordinatlar = [
    mevcutSütun === strUzunluk - 1 ? 0 : mevcutRay + sonrakiYönüAl({ raySayisi, mevcutRay, yön }),
    mevcutSütun === strUzunluk - 1 ? 0 : mevcutSütun + 1,
  ];

  const harfEkle = mevcutRay === hedefRay;
  const [mevcutHarf, ...kalanKarakterler] = karakterler;
  const sonrakiKarakterler = harfEkle ? kalanKarakterler : karakterler;
  const sonrakiÇit = harfEkle ? çit.map(rayaHarfEkle(mevcutRay, mevcutHarf)) : çit;

  return kodCozmeÇitiniDoldur({
    strUzunluk,
    karakterler: sonrakiKarakterler,
    çit: sonrakiÇit,
    hedefRay: sonrakiRay,
    yön: sonrakiYönüAl({ raySayisi, mevcutRay, yön }),
    koordinatlar: sonrakiKoordinatlar,
  });
};

/**
 * @param {object} params
 * @param {number} params.strUzunluk
 * @param {Çit} params.çit
 * @param {number} params.mevcutRay
 * @param {Yön} params.yön
 * @param {number[]} params.kod
 * @returns {string}
 */
const çitiÇöz = (params) => {
  const {
    strUzunluk,
    çit,
    mevcutRay,
    yön,
    kod,
  } = params;

  if (kod.length === strUzunluk) {
    return kod.join('');
  }

  const raySayisi = çit.length;

  const [mevcutHarf, ...sonrakiRay] = çit[mevcutRay];
  const sonrakiYön = sonrakiYönüAl({ raySayisi, mevcutRay, yön });

  return çitiÇöz({
    strUzunluk,
    çit: çit.map((ray, idx) => (idx === mevcutRay ? sonrakiRay : ray)),
    mevcutRay: mevcutRay + sonrakiYön,
    yön: sonrakiYön,
    kod: [...kod, mevcutHarf],
  });
};

/**
 * Mesajı Raylı Çit Şifreleme ile şifreler.
 *
 * @param {string} metin - Şifrelenecek metin
 * @param {number} raySayisi - Çitteki ray sayısı
 * @returns {string} - Şifrelenmiş metin
 */
export const rayliCitSifrele = (metin, raySayisi) => {
  const çit = citOlustur(raySayisi);

  const doldurulmuşÇit = kodlamaÇitiniDoldur({
    çit,
    mevcutRay: 0,
    yön: YÖNLER.AŞAĞI,
    karakterler: metin.split(''),
  });

  return doldurulmuşÇit.flat().join('');
};

/**
 * Mesajı Raylı Çit Şifreleme ile çözer.
 *
 * @param {string} metin - Şifrelenmiş metin
 * @param {number} raySayisi - Çitteki ray sayısı
 * @returns {string} - Çözülmüş metin
 */
export const rayliCitCoz = (metin, raySayisi) => {
  const strUzunluk = metin.length;
  const boşÇit = citOlustur(raySayisi);
  const doldurulmuşÇit = kodCozmeÇitiniDoldur({
    strUzunluk,
    karakterler: metin.split(''),
    çit: boşÇit,
    hedefRay: 0,
    yön: YÖNLER.AŞAĞI,
    koordinatlar: [0, 0],
  });

  return çitiÇöz({
    strUzunluk,
    çit: doldurulmuşÇit,
    mevcutRay: 0,
    yön: YÖNLER.AŞAĞI,
    kod: [],
  });
};
