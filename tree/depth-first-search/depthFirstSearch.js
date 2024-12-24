/**
 * @typedef {Object} GeçişGeriÇağırmaları
 *
 * @property {function(düğüm: İkiliAğaçDüğümü, çocuk: İkiliAğaçDüğümü): boolean} geçişeİzinVer
 * - DFS'nin düğümden çocuğuna geçiş yapıp yapmaması gerektiğini belirler.
 *
 * @property {function(düğüm: İkiliAğaçDüğümü)} düğümeGir - DFS düğüme girdiğinde çağrılır.
 *
 * @property {function(düğüm: İkiliAğaçDüğümü)} düğümdenÇık - DFS düğümden çıktığında çağrılır.
 */

/**
 * Eksik geçiş geri çağırmalarını varsayılan geri çağırmalarla genişletir.
 *
 * @param {GeçişGeriÇağırmaları} [geriÇağırmalar] - Geçiş geri çağırmalarını içeren nesne.
 * @returns {GeçişGeriÇağırmaları} - Varsayılan geri çağırmalarla genişletilmiş geçiş geri çağırmaları.
 */
function geriÇağırmalarıBaşlat(geriÇağırmalar = {}) {
  // Boş geri çağırmalar nesnesini başlat.
  const başlatılanGeriÇağırmalar = {};

  // Kullanıcının gerçek geri çağırma işlevi sağlamadığı durumlarda kullanacağımız boş geri çağırma.
  const boşGeriÇağırma = () => {};
  // Kullanıcı bu işlev için bir geri çağırma sağlamadığı durumda her düğümün geçişine izin vereceğiz.
  const varsayılanGeçişeİzinVerGeriÇağırması = () => true;

  // Orijinal geri çağırmaları başlatılanGeriÇağırmalar nesnesine kopyala veya bunun yerine varsayılan geri çağırmaları kullan.
  başlatılanGeriÇağırmalar.geçişeİzinVer = geriÇağırmalar.geçişeİzinVer || varsayılanGeçişeİzinVerGeriÇağırması;
  başlatılanGeriÇağırmalar.düğümeGir = geriÇağırmalar.düğümeGir || boşGeriÇağırma;
  başlatılanGeriÇağırmalar.düğümdenÇık = geriÇağırmalar.düğümdenÇık || boşGeriÇağırma;

  // İşlenmiş geri çağırmalar listesini döndür.
  return başlatılanGeriÇağırmalar;
}

/**
 * İkili ağaç için özyinelemeli derinlik öncelikli arama geçişi.
 *
 * @param {İkiliAğaçDüğümü} düğüm - Geçişe başlayacağımız ikili ağaç düğümü.
 * @param {GeçişGeriÇağırmaları} geriÇağırmalar - Geçiş geri çağırmalarını içeren nesne.
 */
export function derinlikÖncelikliAramaÖzyinelemeli(düğüm, geriÇağırmalar) {
  // Düğüme girileceğini bildirmek için "düğümeGir" geri çağırmasını çağır.
  geriÇağırmalar.düğümeGir(düğüm);

  // Sol dalı yalnızca sol düğümün geçişine izin verilirse geç.
  if (düğüm.sol && geriÇağırmalar.geçişeİzinVer(düğüm, düğüm.sol)) {
    derinlikÖncelikliAramaÖzyinelemeli(düğüm.sol, geriÇağırmalar);
  }

  // Sağ dalı yalnızca sağ düğümün geçişine izin verilirse geç.
  if (düğüm.sağ && geriÇağırmalar.geçişeİzinVer(düğüm, düğüm.sağ)) {
    derinlikÖncelikliAramaÖzyinelemeli(düğüm.sağ, geriÇağırmalar);
  }

  // Mevcut düğüm ve çocuklarının geçişinin tamamlandığını bildirmek için "düğümdenÇık" geri çağırmasını çağır.
  geriÇağırmalar.düğümdenÇık(düğüm);
}

/**
 * KökDüğümün derinlik öncelikli arama geçişini gerçekleştir.
 * Her geçiş adımı için "geçişeİzinVer", "düğümeGir" ve "düğümdenÇık" geri çağırmalarını çağır.
 * GeriÇağırmalar tür tanımı hakkında daha fazla ayrıntı için GeçişGeriÇağırmaları tür tanımına bakın.
 *
 * @param {İkiliAğaçDüğümü} kökDüğüm - Geçişe başlayacağımız düğüm.
 * @param {GeçişGeriÇağırmaları} [geriÇağırmalar] - Geçiş geri çağırmaları.
 */
export default function derinlikÖncelikliArama(kökDüğüm, geriÇağırmalar) {
  // Kullanıcı bazı geri çağırmaları sağlamadıysa, bunları varsayılan olanlarla değiştirmemiz gerekir.
  const işlenmişGeriÇağırmalar = geriÇağırmalarıBaşlat(geriÇağırmalar);

  // Şimdi, gerekli tüm geri çağırmalara sahip olduğumuzda özyinelemeli geçişe devam edebiliriz.
  derinlikÖncelikliAramaÖzyinelemeli(kökDüğüm, işlenmişGeriÇağırmalar);
}
