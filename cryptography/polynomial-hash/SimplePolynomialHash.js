const DEFAULT_BASE = 17;

export default class BasitPolinomHash {
  /**
   * @param {number} [taban] - Polinom oluşturmak için kullanılan taban sayısı.
   */
  constructor(taban = DEFAULT_BASE) {
    this.taban = taban;
  }

  /**
   * Kelimenin hash temsilini oluşturan fonksiyon.
   *
   * Zaman karmaşıklığı: O(kelime.length).
   *
   * @varsayım: Bu fonksiyon modül operatörünü kullanmaz.
   * Bu nedenle Number.MAX_SAFE_INTEGER'dan büyük sayılar üreterek taşmalara neden olabilir.
   * Bu fonksiyon basitlik ve ÖĞRENME amaçları için burada belirtilmiştir.
   *
   * @param {string} kelime - Hashlenmesi gereken string.
   * @return {number}
   */
  hash(kelime) {
    let hash = 0;
    for (let charIndex = 0; charIndex < kelime.length; charIndex += 1) {
      hash += kelime.charCodeAt(charIndex) * (this.taban ** charIndex);
    }

    return hash;
  }

  /**
   * Önceki kelimeye (bir karakter sola kaydırılmış) dayalı olarak kelimenin hash temsilini oluşturan fonksiyon.
   *
   * Kelimenin hash temsilini yeniden hesaplar, böylece tüm kelimeyi tekrar dolaşmak gerekmez.
   *
   * Zaman karmaşıklığı: O(1).
   *
   * @varsayım: Bu fonksiyon modül operatörünü kullanmaz ve bu nedenle güvenli değildir çünkü
   * Number.MAX_SAFE_INTEGER'dan büyük sayılarla çalışabilir. Bu fonksiyon basitlik ve ÖĞRENME amaçları için burada belirtilmiştir.
   *
   * @param {number} öncekiHash
   * @param {string} öncekiKelime
   * @param {string} yeniKelime
   * @return {number}
   */
  kaydır(öncekiHash, öncekiKelime, yeniKelime) {
    let hash = öncekiHash;

    const öncekiDeğer = öncekiKelime.charCodeAt(0);
    const yeniDeğer = yeniKelime.charCodeAt(yeniKelime.length - 1);

    hash -= öncekiDeğer;
    hash /= this.taban;
    hash += yeniDeğer * (this.taban ** (yeniKelime.length - 1));

    return hash;
  }
}
