/**
 * Satranç tahtasındaki vezir pozisyonunu temsil eden sınıf.
 */
export default class VezirPozisyonu {
  /**
   * @param {number} satirIndeksi
   * @param {number} sutunIndeksi
   */
  constructor(satirIndeksi, sutunIndeksi) {
    this.satirIndeksi = satirIndeksi;
    this.sutunIndeksi = sutunIndeksi;
  }

  /**
   * @return {number}
   */
  get solDiagonal() {
    // Aynı sol (\) diyagonal üzerindeki her pozisyonun
    // satirIndeksi ve sutunIndeksi farkı aynıdır. Bu durum,
    // iki pozisyonun (vezirin) aynı sol diyagonal üzerinde olup olmadığını
    // hızlıca kontrol etmek için kullanılabilir.
    // @see https://youtu.be/xouin83ebxE?t=1m59s
    return this.satirIndeksi - this.sutunIndeksi;
  }

  /**
   * @return {number}
   */
  get sagDiagonal() {
    // Aynı sağ (/) diyagonal üzerindeki her pozisyonun
    // satirIndeksi ve sutunIndeksi toplamı aynıdır. Bu durum,
    // iki pozisyonun (vezirin) aynı sağ diyagonal üzerinde olup olmadığını
    // hızlıca kontrol etmek için kullanılabilir.
    // @see https://youtu.be/xouin83ebxE?t=1m59s
    return this.satirIndeksi + this.sutunIndeksi;
  }

  toString() {
    return `${this.satirIndeksi},${this.sutunIndeksi}`;
  }
}
