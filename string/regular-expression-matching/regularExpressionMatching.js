const SIFIR_VEYA_DAHA_FAZLA_KARAKTER = '*';
const HERHANGI_BIR_KARAKTER = '.';

/**
 * Dinamik programlama yaklaşımı.
 *
 * @param {string} string
 * @param {string} pattern
 * @return {boolean}
 */
export default function regularExpressionMatching(string, pattern) {
  /*
    * Bu string ve pattern için dinamik programlama matrisi başlatalım.
    * Pattern karakterleri üstte (sütunlar olarak) ve string karakterleri
    * tablonun soluna (satırlar olarak) yerleştirilecek.
    *
    * Örnek:
    *
    *     a * b . b
    *   - - - - - -
    * a - - - - - -
    * a - - - - - -
    * b - - - - - -
    * y - - - - - -
    * b - - - - - -
   */
  const eslesmeMatrisi = Array(string.length + 1).fill(null).map(() => {
    return Array(pattern.length + 1).fill(null);
  });

  // Sol üst hücreyi true ile dolduralım. Bu, boş string '' ile boş pattern '' eşleşir anlamına gelir.
  eslesmeMatrisi[0][0] = true;

  // Matrisin ilk satırını false ile dolduralım. Bu, boş string'in herhangi bir boş olmayan pattern ile eşleşemeyeceği anlamına gelir.
  //
  // Örnek:
  // string: ''
  // pattern: 'a.z'
  //
  // Buradaki tek istisna, boş string ile eşleşen a*b* gibi patternlerdir.
  for (let sutunIndeksi = 1; sutunIndeksi <= pattern.length; sutunIndeksi += 1) {
    const patternIndeksi = sutunIndeksi - 1;

    if (pattern[patternIndeksi] === SIFIR_VEYA_DAHA_FAZLA_KARAKTER) {
      eslesmeMatrisi[0][sutunIndeksi] = eslesmeMatrisi[0][sutunIndeksi - 2];
    } else {
      eslesmeMatrisi[0][sutunIndeksi] = false;
    }
  }

  // İlk sütunu false ile dolduralım. Bu, boş pattern'in herhangi bir boş olmayan string ile eşleşemeyeceği anlamına gelir.
  //
  // Örnek:
  // string: 'ab'
  // pattern: ''
  for (let satirIndeksi = 1; satirIndeksi <= string.length; satirIndeksi += 1) {
    eslesmeMatrisi[satirIndeksi][0] = false;
  }

  // Şimdi pattern'in her harfi ve string'in her harfi üzerinden geçelim ve bunları tek tek karşılaştıralım.
  for (let satirIndeksi = 1; satirIndeksi <= string.length; satirIndeksi += 1) {
    for (let sutunIndeksi = 1; sutunIndeksi <= pattern.length; sutunIndeksi += 1) {
      // Matrisin bir ekstra sütun ve satır içerdiğini dikkate alalım.
      const stringIndeksi = satirIndeksi - 1;
      const patternIndeksi = sutunIndeksi - 1;

      if (pattern[patternIndeksi] === SIFIR_VEYA_DAHA_FAZLA_KARAKTER) {
        /*
         * Eğer mevcut pattern karakteri özel '*' karakteri ise iki seçeneğimiz var:
         *
         * 1. * karakteri önceki karakterin string'de bulunmamasına izin verdiği için,
         * string'in * karakteri ve ondan önceki karakter olmadan pattern ile eşleşip eşleşmediğini kontrol etmemiz gerekir.
         * Bu, aynı satırda iki pozisyon sola gitmek anlamına gelir.
         *
         * 2. * karakteri önceki karakterin string'de birçok kez bulunmasına izin verdiği için,
         * * karakterinden önceki karakterin mevcut string karakteri ile aynı olup olmadığını kontrol etmemiz gerekir.
         * Eğer aynı ise, bu, mevcut string'in mevcut pattern ile eşleştiği anlamına gelir.
         * Bu, aynı satırda bir pozisyon yukarı gitmek anlamına gelir.
         */
        if (eslesmeMatrisi[satirIndeksi][sutunIndeksi - 2] === true) {
          eslesmeMatrisi[satirIndeksi][sutunIndeksi] = true;
        } else if (
          (
            pattern[patternIndeksi - 1] === string[stringIndeksi]
            || pattern[patternIndeksi - 1] === HERHANGI_BIR_KARAKTER
          )
          && eslesmeMatrisi[satirIndeksi - 1][sutunIndeksi] === true
        ) {
          eslesmeMatrisi[satirIndeksi][sutunIndeksi] = true;
        } else {
          eslesmeMatrisi[satirIndeksi][sutunIndeksi] = false;
        }
      } else if (
        pattern[patternIndeksi] === string[stringIndeksi]
        || pattern[patternIndeksi] === HERHANGI_BIR_KARAKTER
      ) {
        /*
         * Eğer mevcut pattern karakteri mevcut string karakteri ile aynı ise
         * veya pattern '.' karakterini içeriyorsa, bu durumda
         * mevcut karakter olmadan pattern ve string için bir eşleşme olup olmadığını kontrol etmemiz gerekir.
         * Bu, sol üst çapraz değeri kopyalayabileceğimiz anlamına gelir.
         *
         * Örnek:
         *
         *   a b
         * a 1 -
         * b - 1
         */
        eslesmeMatrisi[satirIndeksi][sutunIndeksi] = eslesmeMatrisi[satirIndeksi - 1][sutunIndeksi - 1];
      } else {
        /*
         * Eğer pattern karakteri ve string karakteri farklı ise, bu durumu "eşleşme yok" olarak değerlendirebiliriz.
         *
         * Örnek:
         *
         *   a b
         * a - -
         * c - 0
         */
        eslesmeMatrisi[satirIndeksi][sutunIndeksi] = false;
      }
    }
  }

  return eslesmeMatrisi[string.length][pattern.length];
}
