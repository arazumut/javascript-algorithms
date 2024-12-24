/**
 * @param {number[][]} satrancTahtasi
 * @param {number[]} pozisyon
 * @return {number[][]}
 */
function olasiHamleleriAl(satrancTahtasi, pozisyon) {
  // Tüm at hamlelerini oluştur (tahtanın dışına çıkanlar dahil).
  const olasiHamleler = [
    [pozisyon[0] - 1, pozisyon[1] - 2],
    [pozisyon[0] - 2, pozisyon[1] - 1],
    [pozisyon[0] + 1, pozisyon[1] - 2],
    [pozisyon[0] + 2, pozisyon[1] - 1],
    [pozisyon[0] - 2, pozisyon[1] + 1],
    [pozisyon[0] - 1, pozisyon[1] + 2],
    [pozisyon[0] + 1, pozisyon[1] + 2],
    [pozisyon[0] + 2, pozisyon[1] + 1],
  ];

  // Tahtanın dışına çıkan hamleleri filtrele.
  return olasiHamleler.filter((hamle) => {
    const tahtaBoyutu = satrancTahtasi.length;
    return hamle[0] >= 0 && hamle[1] >= 0 && hamle[0] < tahtaBoyutu && hamle[1] < tahtaBoyutu;
  });
}

/**
 * @param {number[][]} satrancTahtasi
 * @param {number[]} hamle
 * @return {boolean}
 */
function hamleIzinliMi(satrancTahtasi, hamle) {
  return satrancTahtasi[hamle[0]][hamle[1]] !== 1;
}

/**
 * @param {number[][]} satrancTahtasi
 * @param {number[][]} hamleler
 * @return {boolean}
 */
function tahtaTamamenGezildiMi(satrancTahtasi, hamleler) {
  const toplamOlasiHamleSayisi = satrancTahtasi.length ** 2;
  const mevcutHamleSayisi = hamleler.length;

  return toplamOlasiHamleSayisi === mevcutHamleSayisi;
}

/**
 * @param {number[][]} satrancTahtasi
 * @param {number[][]} hamleler
 * @return {boolean}
 */
function atTuruRekursif(satrancTahtasi, hamleler) {
  const mevcutTahta = satrancTahtasi;

  // Eğer tahta tamamen gezildiyse çözüm bulunmuş demektir.
  if (tahtaTamamenGezildiMi(mevcutTahta, hamleler)) {
    return true;
  }

  // Bir sonraki olası at hamlelerini al.
  const sonHamle = hamleler[hamleler.length - 1];
  const olasiHamleler = olasiHamleleriAl(mevcutTahta, sonHamle);

  // Bir sonraki olası hamleleri dene.
  for (let hamleIndex = 0; hamleIndex < olasiHamleler.length; hamleIndex += 1) {
    const mevcutHamle = olasiHamleler[hamleIndex];

    // Mevcut hamlenin izinli olup olmadığını kontrol et. Aynı hücreye iki kez gidilmesine izin verilmez.
    if (hamleIzinliMi(mevcutTahta, mevcutHamle)) {
      // Hamleyi gerçekleştir.
      hamleler.push(mevcutHamle);
      mevcutTahta[mevcutHamle[0]][mevcutHamle[1]] = 1;

      // Eğer mevcut hamleden sonraki hamleler başarılı olursa çözüm bulunmuş demektir.
      if (atTuruRekursif(mevcutTahta, hamleler)) {
        return true;
      }

      // GERİ ADIM ATMA.
      // Eğer mevcut hamle başarısız olursa geri adım at ve başka bir hamle dene.
      hamleler.pop();
      mevcutTahta[mevcutHamle[0]][mevcutHamle[1]] = 0;
    }
  }

  // Eğer çözüm bulunamazsa false döndür.
  return false;
}

/**
 * @param {number} tahtaBoyutu
 * @return {number[][]}
 */
export default function atTuru(tahtaBoyutu) {
  // Satranç tahtasını başlat.
  const satrancTahtasi = Array(tahtaBoyutu).fill(null).map(() => Array(tahtaBoyutu).fill(0));

  // Hamleler dizisini başlat.
  const hamleler = [];

  // İlk hamleyi yap ve atı 0x0 hücresine yerleştir.
  const ilkHamle = [0, 0];
  hamleler.push(ilkHamle);
  satrancTahtasi[ilkHamle[0]][ilkHamle[0]] = 1;

  // Rekürsif olarak bir sonraki hamleyi yapmayı dene.
  const cozumBulundu = atTuruRekursif(satrancTahtasi, hamleler);

  return cozumBulundu ? hamleler : [];
}
