import Kıyaslayıcı from '../../utils/comparator/Comparator';

/**
 * @typedef {Object} SıralayıcıGeriÇağırmalar
 * @property {function(a: *, b: *)} kıyaslamaGeriÇağırması - Eğer sağlanırsa, tüm eleman kıyaslamaları
 *  bu geri çağırma fonksiyonu ile yapılacaktır.
 * @property {function(a: *)} ziyaretGeriÇağırması - Eğer sağlanırsa, sıralama fonksiyonu
 *  her bir sonraki elemanı ziyaret ettiğinde bu fonksiyon çağrılacaktır.
 */

export default class Sıralayıcı {
  constructor(orijinalGeriÇağırmalar) {
    this.geriÇağırmalar = Sıralayıcı.sıralamaGeriÇağırmalarınıBaşlat(orijinalGeriÇağırmalar);
    this.kıyaslayıcı = new Kıyaslayıcı(this.geriÇağırmalar.kıyaslamaGeriÇağırması);
  }

  /**
   * @param {SıralayıcıGeriÇağırmalar} orijinalGeriÇağırmalar
   * @returns {SıralayıcıGeriÇağırmalar}
   */
  static sıralamaGeriÇağırmalarınıBaşlat(orijinalGeriÇağırmalar) {
    const geriÇağırmalar = orijinalGeriÇağırmalar || {};
    const yedekGeriÇağırma = () => {};

    geriÇağırmalar.kıyaslamaGeriÇağırması = geriÇağırmalar.kıyaslamaGeriÇağırması || undefined;
    geriÇağırmalar.ziyaretGeriÇağırması = geriÇağırmalar.ziyaretGeriÇağırması || yedekGeriÇağırma;

    return geriÇağırmalar;
  }

  sırala() {
    throw new Error('sırala metodu uygulanmalı');
  }
}
