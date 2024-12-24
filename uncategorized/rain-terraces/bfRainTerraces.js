/**
 * Yağmur Suyu Toplama problemini BRUTE FORCE yaklaşımı ile çözme.
 *
 * @param {number[]} teraslar
 * @return {number}
 */
export default function bfRainTerraces(teraslar) {
  let suMiktari = 0;

  for (let terasIndex = 0; terasIndex < teraslar.length; terasIndex += 1) {
    // Sol taraftaki en yüksek terası bul.
    let solEnYuksekSeviye = 0;
    for (let solIndex = terasIndex - 1; solIndex >= 0; solIndex -= 1) {
      solEnYuksekSeviye = Math.max(solEnYuksekSeviye, teraslar[solIndex]);
    }

    // Sağ taraftaki en yüksek terası bul.
    let sagEnYuksekSeviye = 0;
    for (let sagIndex = terasIndex + 1; sagIndex < teraslar.length; sagIndex += 1) {
      sagEnYuksekSeviye = Math.max(sagEnYuksekSeviye, teraslar[sagIndex]);
    }

    // Mevcut terasın su miktarını ekle.
    const terasSinirSeviyesi = Math.min(solEnYuksekSeviye, sagEnYuksekSeviye);
    if (terasSinirSeviyesi > teraslar[terasIndex]) {
      // Eğer sol ve sağdaki en yüksek teraslardan en düşüğü mevcut terastan yüksekse,
      // teras su depolayabilir.
      suMiktari += terasSinirSeviyesi - teraslar[terasIndex];
    }
  }

  return suMiktari;
}
