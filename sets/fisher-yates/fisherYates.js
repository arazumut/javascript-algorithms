/**
 * Fisher-Yates Karıştırma Algoritması
 * @param {*[]} orijinalDizi - Karıştırılacak olan orijinal dizi
 * @return {*[]} - Karıştırılmış dizi
 */
export default function fisherYates(orijinalDizi) {
  // Orijinal diziyi değiştirmemek için diziyi klonla (test amaçlı).
  const dizi = orijinalDizi.slice(0);

  for (let i = (dizi.length - 1); i > 0; i -= 1) {
    const rastgeleIndeks = Math.floor(Math.random() * (i + 1));
    [dizi[i], dizi[rastgeleIndeks]] = [dizi[rastgeleIndeks], dizi[i]];
  }

  return dizi;
}
