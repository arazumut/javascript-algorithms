/**
 * Tüm olası yolları bul
 * @param {GraphVertex} başlangıçDüğümü
 * @param {GraphVertex[][]} [yollar]
 * @param {GraphVertex[]} [yol]
 */
function tümYollarıBul(başlangıçDüğümü, yollar = [], yol = []) {
  // Yolu klonla.
  const mevcutYol = [...yol];

  // Başlangıç düğümünü yola ekle.
  mevcutYol.push(başlangıçDüğümü);

  // Ziyaret edilen düğümler kümesini oluştur.
  const ziyaretEdilenlerKümesi = mevcutYol.reduce((birikim, düğüm) => {
    const güncellenmişBirikim = { ...birikim };
    güncellenmişBirikim[düğüm.getKey()] = düğüm;

    return güncellenmişBirikim;
  }, {});

  // Başlangıç düğümünün ziyaret edilmemiş komşularını al.
  const ziyaretEdilmemişKomşular = başlangıçDüğümü.getNeighbors().filter((komşu) => {
    return !ziyaretEdilenlerKümesi[komşu.getKey()];
  });

  // Eğer ziyaret edilmemiş komşu yoksa, mevcut yolu tamamlanmış olarak kabul et ve kaydet.
  if (!ziyaretEdilmemişKomşular.length) {
    yollar.push(mevcutYol);

    return yollar;
  }

  // Tüm komşuları dolaş.
  for (let komşuIndex = 0; komşuIndex < ziyaretEdilmemişKomşular.length; komşuIndex += 1) {
    const mevcutZiyaretEdilmemişKomşu = ziyaretEdilmemişKomşular[komşuIndex];
    tümYollarıBul(mevcutZiyaretEdilmemişKomşu, yollar, mevcutYol);
  }

  return yollar;
}

/**
 * @param {number[][]} komşulukMatrisi
 * @param {object} düğümİndeksleri
 * @param {GraphVertex[]} döngü
 * @return {number}
 */
function döngüAğırlığınıAl(komşulukMatrisi, düğümİndeksleri, döngü) {
  let ağırlık = 0;

  for (let döngüIndex = 1; döngüIndex < döngü.length; döngüIndex += 1) {
    const başlangıçDüğümü = döngü[döngüIndex - 1];
    const bitişDüğümü = döngü[döngüIndex];
    const başlangıçDüğümüIndex = düğümİndeksleri[başlangıçDüğümü.getKey()];
    const bitişDüğümüIndex = düğümİndeksleri[bitişDüğümü.getKey()];
    ağırlık += komşulukMatrisi[başlangıçDüğümüIndex][bitişDüğümüIndex];
  }

  return ağırlık;
}

/**
 * BRUTE FORCE yaklaşımı ile Gezgin Satıcı Problemini çöz.
 *
 * @param {Graph} grafik
 * @return {GraphVertex[]}
 */
export default function bfGezginSatıcı(grafik) {
  // Geziye başlayacağımız başlangıç noktasını seç.
  const başlangıçDüğümü = grafik.getAllVertices()[0];

  // BRUTE FORCE.
  // Başlangıç düğümünden tüm olası yolları oluştur.
  const tümOlasıYollar = tümYollarıBul(başlangıçDüğümü);

  // Döngü olmayan yolları filtrele.
  const tümOlasıDöngüler = tümOlasıYollar.filter((yol) => {
    /** @var {GraphVertex} */
    const sonDüğüm = yol[yol.length - 1];
    const sonDüğümKomşuları = sonDüğüm.getNeighbors();

    return sonDüğümKomşuları.includes(başlangıçDüğümü);
  });

  // Tüm olası döngüleri dolaş ve en düşük toplam ağırlığa sahip olanı seç.
  const komşulukMatrisi = grafik.getAdjacencyMatrix();
  const düğümİndeksleri = grafik.getVerticesIndices();
  let satıcıYolu = [];
  let satıcıYoluAğırlığı = null;
  for (let döngüIndex = 0; döngüIndex < tümOlasıDöngüler.length; döngüIndex += 1) {
    const mevcutDöngü = tümOlasıDöngüler[döngüIndex];
    const mevcutDöngüAğırlığı = döngüAğırlığınıAl(komşulukMatrisi, düğümİndeksleri, mevcutDöngü);

    // Eğer mevcut döngü ağırlığı önceki döngülerden küçükse, mevcut döngüyü en optimal olarak kabul et.
    if (satıcıYoluAğırlığı === null || mevcutDöngüAğırlığı < satıcıYoluAğırlığı) {
      satıcıYolu = mevcutDöngü;
      satıcıYoluAğırlığı = mevcutDöngüAğırlığı;
    }
  }

  // Çözümü döndür.
  return satıcıYolu;
}
