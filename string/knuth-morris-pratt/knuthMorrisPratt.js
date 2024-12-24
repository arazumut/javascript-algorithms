/**
 * @see https://www.youtube.com/watch?v=GTJr8OvyEVQ
 * @param {string} kelime
 * @return {number[]}
 */
function desenTablosuOlustur(kelime) {
  const desenTablosu = [0];
  let onEkIndeksi = 0;
  let sonEkIndeksi = 1;

  while (sonEkIndeksi < kelime.length) {
    if (kelime[onEkIndeksi] === kelime[sonEkIndeksi]) {
      desenTablosu[sonEkIndeksi] = onEkIndeksi + 1;
      sonEkIndeksi += 1;
      onEkIndeksi += 1;
    } else if (onEkIndeksi === 0) {
      desenTablosu[sonEkIndeksi] = 0;
      sonEkIndeksi += 1;
    } else {
      onEkIndeksi = desenTablosu[onEkIndeksi - 1];
    }
  }

  return desenTablosu;
}

/**
 * @param {string} metin
 * @param {string} kelime
 * @return {number}
 */
export default function knuthMorrisPratt(metin, kelime) {
  if (kelime.length === 0) {
    return 0;
  }

  let metinIndeksi = 0;
  let kelimeIndeksi = 0;

  const desenTablosu = desenTablosuOlustur(kelime);

  while (metinIndeksi < metin.length) {
    if (metin[metinIndeksi] === kelime[kelimeIndeksi]) {
      // Eşleşme bulundu.
      if (kelimeIndeksi === kelime.length - 1) {
        return (metinIndeksi - kelime.length) + 1;
      }
      kelimeIndeksi += 1;
      metinIndeksi += 1;
    } else if (kelimeIndeksi > 0) {
      kelimeIndeksi = desenTablosu[kelimeIndeksi - 1];
    } else {
      metinIndeksi += 1;
    }
  }

  return -1;
}
