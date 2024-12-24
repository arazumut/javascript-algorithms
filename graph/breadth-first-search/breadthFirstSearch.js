import Queue from '../../../data-structures/queue/Queue';

/**
 * @typedef {Object} GeriÇağırmalar
 *
 * @property {function(vertices: Object): boolean} [geçişeİzinVer] -
 *   DFS'in bir köşeden komşusuna (kenar boyunca) geçiş yapıp yapmaması gerektiğini belirler.
 *   Varsayılan olarak aynı köşeyi tekrar ziyaret etmeyi yasaklar.
 *
 * @property {function(vertices: Object)} [köşeyeGir] - BFS köşeye girdiğinde çağrılır.
 *
 * @property {function(vertices: Object)} [köşedenÇık] - BFS köşeden çıktığında çağrılır.
 */

/**
 * @param {GeriÇağırmalar} [geriÇağırmalar]
 * @returns {GeriÇağırmalar}
 */
function geriÇağırmalarıBaşlat(geriÇağırmalar = {}) {
  const başlatılanGeriÇağırma = geriÇağırmalar;

  const yedekGeriÇağırma = () => {};

  const geçişeİzinVerGeriÇağırması = (
    () => {
      const görülenler = {};
      return ({ sonrakiKöşe }) => {
        if (!görülenler[sonrakiKöşe.getKey()]) {
          görülenler[sonrakiKöşe.getKey()] = true;
          return true;
        }
        return false;
      };
    }
  )();

  başlatılanGeriÇağırma.geçişeİzinVer = geriÇağırmalar.geçişeİzinVer || geçişeİzinVerGeriÇağırması;
  başlatılanGeriÇağırma.köşeyeGir = geriÇağırmalar.köşeyeGir || yedekGeriÇağırma;
  başlatılanGeriÇağırma.köşedenÇık = geriÇağırmalar.köşedenÇık || yedekGeriÇağırma;

  return başlatılanGeriÇağırma;
}

/**
 * @param {Graph} grafik
 * @param {GraphVertex} başlangıçKöşesi
 * @param {GeriÇağırmalar} [orijinalGeriÇağırmalar]
 */
export default function genişlikÖncelikliArama(grafik, başlangıçKöşesi, orijinalGeriÇağırmalar) {
  const geriÇağırmalar = geriÇağırmalarıBaşlat(orijinalGeriÇağırmalar);
  const köşeKuyruğu = new Queue();

  // Başlangıç kuyruğu ayarlarını yap.
  köşeKuyruğu.enqueue(başlangıçKöşesi);

  let öncekiKöşe = null;

  // Kuyruktaki tüm köşeleri dolaş.
  while (!köşeKuyruğu.isEmpty()) {
    const mevcutKöşe = köşeKuyruğu.dequeue();
    geriÇağırmalar.köşeyeGir({ mevcutKöşe, öncekiKöşe });

    // Gelecekteki geçişler için tüm komşuları kuyruğa ekle.
    grafik.getNeighbors(mevcutKöşe).forEach((sonrakiKöşe) => {
      if (geriÇağırmalar.geçişeİzinVer({ öncekiKöşe, mevcutKöşe, sonrakiKöşe })) {
        köşeKuyruğu.enqueue(sonrakiKöşe);
      }
    });

    geriÇağırmalar.köşedenÇık({ mevcutKöşe, öncekiKöşe });

    // Bir sonraki döngüden önce mevcut köşeyi hatırla.
    öncekiKöşe = mevcutKöşe;
  }
}
