import derinlikÖncelikliArama from '../depth-first-search/depthFirstSearch';

/**
 * Derinlik Öncelikli Arama kullanarak yönsüz grafikte döngü tespit et.
 *
 * @param {Graph} grafik
 */
export default function yönsüzDöngüTespit(grafik) {
  let döngü = null;

  // Ziyaret ettiğimiz düğümlerin listesi.
  const ziyaretEdilenDüğümler = {};

  // Her ziyaret edilen düğüm için ebeveyn düğümlerin listesi.
  const ebeveynler = {};

  // DFS gezintisi için geri arama fonksiyonları.
  const geriAramalar = {
    geçişeİzinVer: ({ mevcutDüğüm, sonrakiDüğüm }) => {
      // Eğer döngü tespit edilmişse daha fazla geçişe izin verme.
      if (döngü) {
        return false;
      }

      // Çocuktan ebeveyne geri geçişe izin verme.
      const mevcutDüğümEbeveyni = ebeveynler[mevcutDüğüm.getKey()];
      const mevcutDüğümEbeveynAnahtarı = mevcutDüğümEbeveyni ? mevcutDüğümEbeveyni.getKey() : null;

      return mevcutDüğümEbeveynAnahtarı !== sonrakiDüğüm.getKey();
    },
    düğümeGir: ({ mevcutDüğüm, öncekiDüğüm }) => {
      if (ziyaretEdilenDüğümler[mevcutDüğüm.getKey()]) {
        // Önceki düğümlerin ebeveynlerine dayalı olarak döngü yolunu derle.
        döngü = {};

        let mevcutDöngüDüğümü = mevcutDüğüm;
        let öncekiDöngüDüğümü = öncekiDüğüm;

        while (öncekiDöngüDüğümü.getKey() !== mevcutDüğüm.getKey()) {
          döngü[mevcutDöngüDüğümü.getKey()] = öncekiDöngüDüğümü;
          mevcutDöngüDüğümü = öncekiDöngüDüğümü;
          öncekiDöngüDüğümü = ebeveynler[öncekiDöngüDüğümü.getKey()];
        }

        döngü[mevcutDöngüDüğümü.getKey()] = öncekiDöngüDüğümü;
      } else {
        // Sonraki düğümü ziyaret edilenler setine ekle.
        ziyaretEdilenDüğümler[mevcutDüğüm.getKey()] = mevcutDüğüm;
        ebeveynler[mevcutDüğüm.getKey()] = öncekiDüğüm;
      }
    },
  };

  // DFS gezintisine başla.
  const başlangıçDüğümü = grafik.getAllVertices()[0];
  derinlikÖncelikliArama(grafik, başlangıçDüğümü, geriAramalar);

  return döngü;
}
