import { getPixel, setPixel } from '../utils/imageData';

/**
 * Dikiş, bir dizi piksel (koordinatlar) dizisidir.
 * @typedef {PixelCoordinate[]} Seam
 */

/**
 * Enerji haritası, hesaplandığı görüntü ile aynı genişlik ve yüksekliğe sahip 2D bir dizidir.
 * @typedef {number[][]} EnergyMap
 */

/**
 * Dikişteki piksellerin meta verileri.
 * @typedef {Object} SeamPixelMeta
 * @property {number} energy - pikselin enerjisi.
 * @property {PixelCoordinate} coordinate - pikselin koordinatı.
 * @property {?PixelCoordinate} previous - dikişteki önceki piksel.
 */

/**
 * Görüntü boyutunu (genişlik ve yükseklik) tanımlayan tür.
 * @typedef {Object} ImageSize
 * @property {number} w - görüntü genişliği.
 * @property {number} h - görüntü yüksekliği.
 */

/**
 * @typedef {Object} ResizeImageWidthArgs
 * @property {ImageData} img - yeniden boyutlandırmak istediğimiz görüntü verisi.
 * @property {number} toWidth - görüntünün küçültülmesini istediğimiz nihai genişlik.
 */

/**
 * @typedef {Object} ResizeImageWidthResult
 * @property {ImageData} img - yeniden boyutlandırılmış görüntü verisi.
 * @property {ImageSize} size - yeniden boyutlandırılmış görüntü boyutu.
 */

/**
 * Belirli bir boyutta (w x h) bir matris (2D dizi) oluşturan ve belirtilen değerle dolduran yardımcı fonksiyon.
 * @param {number} w
 * @param {number} h
 * @param {?(number | SeamPixelMeta)} filler
 * @returns {?(number | SeamPixelMeta)[][]}
 */
const matrix = (w, h, filler) => {
  return new Array(h)
    .fill(null)
    .map(() => {
      return new Array(w).fill(filler);
    });
};

/**
 * Bir pikselin enerjisini hesaplar.
 * @param {?PixelColor} left
 * @param {PixelColor} middle
 * @param {?PixelColor} right
 * @returns {number}
 */
const getPixelEnergy = (left, middle, right) => {
  const [mR, mG, mB] = middle;

  let lEnergy = 0;
  if (left) {
    const [lR, lG, lB] = left;
    lEnergy = (lR - mR) ** 2 + (lG - mG) ** 2 + (lB - mB) ** 2;
  }

  let rEnergy = 0;
  if (right) {
    const [rR, rG, rB] = right;
    rEnergy = (rR - mR) ** 2 + (rG - mG) ** 2 + (rB - mB) ** 2;
  }

  return Math.sqrt(lEnergy + rEnergy);
};

/**
 * Görüntünün her pikselinin enerjisini hesaplar.
 * @param {ImageData} img
 * @param {ImageSize} size
 * @returns {EnergyMap}
 */
const calculateEnergyMap = (img, { w, h }) => {
  const energyMap = matrix(w, h, Infinity);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const left = (x - 1) >= 0 ? getPixel(img, { x: x - 1, y }) : null;
      const middle = getPixel(img, { x, y });
      const right = (x + 1) < w ? getPixel(img, { x: x + 1, y }) : null;
      energyMap[y][x] = getPixelEnergy(left, middle, right);
    }
  }
  return energyMap;
};

/**
 * Dinamik Programlama yaklaşımını kullanarak en düşük enerjiye sahip dikişi (üstten alta kadar olan piksel dizisi) bulur.
 * @param {EnergyMap} energyMap
 * @param {ImageSize} size
 * @returns {Seam}
 */
const findLowEnergySeam = (energyMap, { w, h }) => {
  const seamPixelsMap = matrix(w, h, null);

  for (let x = 0; x < w; x += 1) {
    const y = 0;
    seamPixelsMap[y][x] = {
      energy: energyMap[y][x],
      coordinate: { x, y },
      previous: null,
    };
  }

  for (let y = 1; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      let minPrevEnergy = Infinity;
      let minPrevX = x;
      for (let i = (x - 1); i <= (x + 1); i += 1) {
        if (i >= 0 && i < w && seamPixelsMap[y - 1][i].energy < minPrevEnergy) {
          minPrevEnergy = seamPixelsMap[y - 1][i].energy;
          minPrevX = i;
        }
      }

      seamPixelsMap[y][x] = {
        energy: minPrevEnergy + energyMap[y][x],
        coordinate: { x, y },
        previous: { x: minPrevX, y: y - 1 },
      };
    }
  }

  let lastMinCoordinate = null;
  let minSeamEnergy = Infinity;
  for (let x = 0; x < w; x += 1) {
    const y = h - 1;
    if (seamPixelsMap[y][x].energy < minSeamEnergy) {
      minSeamEnergy = seamPixelsMap[y][x].energy;
      lastMinCoordinate = { x, y };
    }
  }

  const seam = [];

  const { x: lastMinX, y: lastMinY } = lastMinCoordinate;

  let currentSeam = seamPixelsMap[lastMinY][lastMinX];
  while (currentSeam) {
    seam.push(currentSeam.coordinate);
    const prevMinCoordinates = currentSeam.previous;
    if (!prevMinCoordinates) {
      currentSeam = null;
    } else {
      const { x: prevMinX, y: prevMinY } = prevMinCoordinates;
      currentSeam = seamPixelsMap[prevMinY][prevMinX];
    }
  }

  return seam;
};

/**
 * Dikişi görüntü verilerinden siler.
 * Her satırdaki pikseli siler ve ardından satırdaki diğer pikselleri sola kaydırırız.
 * @param {ImageData} img
 * @param {Seam} seam
 * @param {ImageSize} size
 */
const deleteSeam = (img, seam, { w }) => {
  seam.forEach(({ x: seamX, y: seamY }) => {
    for (let x = seamX; x < (w - 1); x += 1) {
      const nextPixel = getPixel(img, { x: x + 1, y: seamY });
      setPixel(img, { x, y: seamY }, nextPixel);
    }
  });
};

/**
 * İçerik duyarlı görüntü genişliği yeniden boyutlandırmasını dikiş oyma yöntemi kullanarak gerçekleştirir.
 * @param {ResizeImageWidthArgs} args
 * @returns {ResizeImageWidthResult}
 */
const resizeImageWidth = ({ img, toWidth }) => {
  const size = { w: img.width, h: img.height };

  const pxToRemove = img.width - toWidth;

  let energyMap = null;
  let seam = null;

  for (let i = 0; i < pxToRemove; i += 1) {
    energyMap = calculateEnergyMap(img, size);
    seam = findLowEnergySeam(energyMap, size);
    deleteSeam(img, seam, size);
    size.w -= 1;
  }

  return { img, size };
};

export default resizeImageWidth;
