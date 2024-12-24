import pascalUcgeni from '../../math/pascal-triangle/pascalUcgeni';

/**
 * @param {number} genislik
 * @param {number} yukseklik
 * @return {number}
 */
export default function benzersizYollar(genislik, yukseklik) {
  const pascalSatiri = genislik + yukseklik - 2;
  const pascalSatirPozisyonu = Math.min(genislik, yukseklik) - 1;

  return pascalUcgeni(pascalSatiri)[pascalSatirPozisyonu];
}
