import Queue from '../../../data-structures/queue/Queue';

/**
 * @typedef {Object} GeriÇağırmalar
 * @property {function(düğüm: İkiliAğaçDüğümü, çocuk: İkiliAğaçDüğümü): boolean} geçişeİzinVer -
 *   BFS'nin düğümden çocuğa geçiş yapıp yapmaması gerektiğini belirler.
 * @property {function(düğüm: İkiliAğaçDüğümü)} düğümeGir - BFS düğüme girdiğinde çağrılır.
 * @property {function(düğüm: İkiliAğaçDüğümü)} düğümdenÇık - BFS düğümden çıktığında çağrılır.
 */

/**
 * @param {GeriÇağırmalar} [geriÇağırmalar]
 * @returns {GeriÇağırmalar}
 */
function geriÇağırmalarıBaşlat(geriÇağırmalar = {}) {
  const başlatılanGeriÇağırmalar = geriÇağırmalar;

  const yedekGeriÇağırma = () => {};
  const varsayılanGeçişeİzinVer = () => true;

  başlatılanGeriÇağırmalar.geçişeİzinVer = geriÇağırmalar.geçişeİzinVer || varsayılanGeçişeİzinVer;
  başlatılanGeriÇağırmalar.düğümeGir = geriÇağırmalar.düğümeGir || yedekGeriÇağırma;
  başlatılanGeriÇağırmalar.düğümdenÇık = geriÇağırmalar.düğümdenÇık || yedekGeriÇağırma;

  return başlatılanGeriÇağırmalar;
}

/**
 * @param {İkiliAğaçDüğümü} kökDüğüm
 * @param {GeriÇağırmalar} [orijinalGeriÇağırmalar]
 */
export default function genişlikÖncelikliArama(kökDüğüm, orijinalGeriÇağırmalar) {
  const geriÇağırmalar = geriÇağırmalarıBaşlat(orijinalGeriÇağırmalar);
  const düğümKuyruğu = new Queue();

  // Başlangıç kuyruğu ayarlarını yap.
  düğümKuyruğu.enqueue(kökDüğüm);

  while (!düğümKuyruğu.isEmpty()) {
    const mevcutDüğüm = düğümKuyruğu.dequeue();

    geriÇağırmalar.düğümeGir(mevcutDüğüm);

    // Gelecekteki geçişler için tüm çocukları kuyruğa ekle.

    // Sol dalı geç.
    if (mevcutDüğüm.sol && geriÇağırmalar.geçişeİzinVer(mevcutDüğüm, mevcutDüğüm.sol)) {
      düğümKuyruğu.enqueue(mevcutDüğüm.sol);
    }

    // Sağ dalı geç.
    if (mevcutDüğüm.sağ && geriÇağırmalar.geçişeİzinVer(mevcutDüğüm, mevcutDüğüm.sağ)) {
      düğümKuyruğu.enqueue(mevcutDüğüm.sağ);
    }

    geriÇağırmalar.düğümdenÇık(mevcutDüğüm);
  }
}
