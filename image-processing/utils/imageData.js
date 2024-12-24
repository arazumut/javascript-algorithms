/**
 * @typedef {ArrayLike<number> | Uint8ClampedArray} PikselRengi
 */

/**
 * @typedef {Object} PikselKoordinati
 * @property {number} x - yatay koordinat.
 * @property {number} y - dikey koordinat.
 */

/**
 * Pikselin rengini döndüren yardımcı fonksiyon.
 * @param {ImageData} img
 * @param {PikselKoordinati} koordinat
 * @returns {PikselRengi}
 */
export const pikseliAl = (img, { x, y }) => {
  // ImageData veri dizisi düz bir 1D dizidir.
  // Bu nedenle x ve y koordinatlarını doğrusal indekse dönüştürmemiz gerekir.
  const i = y * img.width + x;
  const renkBasinaHücre = 4; // RGBA
  // Daha iyi verimlilik için, yeni bir alt dizi oluşturmak yerine
  // ImageData dizisinin bir kısmına işaretçi döndürüyoruz.
  return img.data.subarray(i * renkBasinaHücre, i * renkBasinaHücre + renkBasinaHücre);
};

/**
 * Pikselin rengini ayarlayan yardımcı fonksiyon.
 * @param {ImageData} img
 * @param {PikselKoordinati} koordinat
 * @param {PikselRengi} renk
 */
export const pikseliAyarla = (img, { x, y }, renk) => {
  // ImageData veri dizisi düz bir 1D dizidir.
  // Bu nedenle x ve y koordinatlarını doğrusal indekse dönüştürmemiz gerekir.
  const i = y * img.width + x;
  const renkBasinaHücre = 4; // RGBA
  img.data.set(renk, i * renkBasinaHücre);
};
