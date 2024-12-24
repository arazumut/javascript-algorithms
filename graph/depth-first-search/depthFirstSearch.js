/**
 * @typedef {Object} GeriÇağırmalar
 *
 * @property {function(düğüm: Object): boolean} [geçişeİzinVer] -
 *  DFS'nin bir düğümden komşusuna (kenar boyunca) geçiş yapıp yapamayacağını belirler.
 *  Varsayılan olarak aynı düğümü tekrar ziyaret etmeyi yasaklar.
 *
 * @property {function(düğüm: Object)} [düğümGiriş] - DFS düğüme girdiğinde çağrılır.
 *
 * @property {function(düğüm: Object)} [düğümÇıkış] - DFS düğümden çıktığında çağrılır.
 */

/**
 * @param {GeriÇağırmalar} [geriÇağırmalar]
 * @returns {GeriÇağırmalar}
 */
function geriÇağırmalarıBaşlat(geriÇağırmalar = {}) {
  const başlatılanGeriÇağırma = geriÇağırmalar;

  const yedekGeriÇağırma = () => {};

  const geçişeİzinVerGeriÇağırma = (
    () => {
      const görülenler = {};
      return ({ sonrakiDüğüm }) => {
        if (!görülenler[sonrakiDüğüm.getKey()]) {
          görülenler[sonrakiDüğüm.getKey()] = true;
          return true;
        }
        return false;
      };
    }
  )();

  başlatılanGeriÇağırma.geçişeİzinVer = geriÇağırmalar.geçişeİzinVer || geçişeİzinVerGeriÇağırma;
  başlatılanGeriÇağırma.düğümGiriş = geriÇağırmalar.düğümGiriş || yedekGeriÇağırma;
  başlatılanGeriÇağırma.düğümÇıkış = geriÇağırmalar.düğümÇıkış || yedekGeriÇağırma;

  return başlatılanGeriÇağırma;
}

/**
 * @param {Graf} graf
 * @param {GrafDüğümü} mevcutDüğüm
 * @param {GrafDüğümü} öncekiDüğüm
 * @param {GeriÇağırmalar} geriÇağırmalar
 */
function derinlikÖncelikliAramaÖzyinelemeli(graf, mevcutDüğüm, öncekiDüğüm, geriÇağırmalar) {
  geriÇağırmalar.düğümGiriş({ mevcutDüğüm, öncekiDüğüm });

  graf.getNeighbors(mevcutDüğüm).forEach((sonrakiDüğüm) => {
    if (geriÇağırmalar.geçişeİzinVer({ öncekiDüğüm, mevcutDüğüm, sonrakiDüğüm })) {
      derinlikÖncelikliAramaÖzyinelemeli(graf, sonrakiDüğüm, mevcutDüğüm, geriÇağırmalar);
    }
  });

  geriÇağırmalar.düğümÇıkış({ mevcutDüğüm, öncekiDüğüm });
}

/**
 * @param {Graf} graf
 * @param {GrafDüğümü} başlangıçDüğümü
 * @param {GeriÇağırmalar} [geriÇağırmalar]
 */
export default function derinlikÖncelikliArama(graf, başlangıçDüğümü, geriÇağırmalar) {
  const öncekiDüğüm = null;
  derinlikÖncelikliAramaÖzyinelemeli(graf, başlangıçDüğümü, öncekiDüğüm, geriÇağırmalarıBaşlat(geriÇağırmalar));
}
