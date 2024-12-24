const DEFAULT_BASE = 37;
const DEFAULT_MODULUS = 101;

export default class PolinomHash {
  /**
   * @param {number} [taban] - Polinom oluşturmak için kullanılan taban sayısı.
   * @param {number} [modül] - Hash'in taşmasını önleyen modül sayısı.
   */
  constructor({ taban = DEFAULT_BASE, modül = DEFAULT_MODULUS } = {}) {
    this.taban = taban;
    this.modül = modül;
  }

  /**
   * Kelimenin hash temsilini oluşturan fonksiyon.
   *
   * Zaman karmaşıklığı: O(kelime.length).
   *
   * @param {string} kelime - Hash'lenmesi gereken string.
   * @return {number}
   */
  hash(kelime) {
    const charKodları = Array.from(kelime).map((char) => this.charToNumber(char));

    let hash = 0;
    for (let charIndex = 0; charIndex < charKodları.length; charIndex += 1) {
      hash *= this.taban;
      hash += charKodları[charIndex];
      hash %= this.modül;
    }

    return hash;
  }

  /**
   * Önceki kelimenin (bir karakter sola kaydırılmış) hash değerine dayalı olarak
   * kelimenin hash temsilini oluşturan fonksiyon.
   *
   * Kelimenin hash temsilini yeniden hesaplar, böylece tüm kelimeyi tekrar dolaşmak gerekmez.
   *
   * Zaman karmaşıklığı: O(1).
   *
   * @param {number} öncekiHash
   * @param {string} öncekiKelime
   * @param {string} yeniKelime
   * @return {number}
   */
  kaydır(öncekiHash, öncekiKelime, yeniKelime) {
    let hash = öncekiHash;

    const öncekiDeğer = this.charToNumber(öncekiKelime[0]);
    const yeniDeğer = this.charToNumber(yeniKelime[yeniKelime.length - 1]);

    let öncekiDeğerÇarpanı = 1;
    for (let i = 1; i < öncekiKelime.length; i += 1) {
      öncekiDeğerÇarpanı *= this.taban;
      öncekiDeğerÇarpanı %= this.modül;
    }

    hash += this.modül;
    hash -= (öncekiDeğer * öncekiDeğerÇarpanı) % this.modül;

    hash *= this.taban;
    hash += yeniDeğer;
    hash %= this.modül;

    return hash;
  }

  /**
   * Karakteri sayıya dönüştürür.
   *
   * @param {string} char
   * @return {number}
   */
  charToNumber(char) {
    let charKodu = char.codePointAt(0);

    // Karakterin surrogate pair olup olmadığını kontrol eder.
    const surrogate = char.codePointAt(1);
    if (surrogate !== undefined) {
      const surrogateShift = 2 ** 16;
      charKodu += surrogate * surrogateShift;
    }

    return charKodu;
  }
}
