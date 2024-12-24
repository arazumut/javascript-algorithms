/**
 * Gezinme geri çağırma fonksiyonu.
 * @callback gezinmeCallback
 * @param {*} dugumDegeri
 */

/**
 * @param {LinkedList} bagliListe
 * @param {gezinmeCallback} callback
 */
export default function gezinme(bagliListe, callback) {
  let mevcutDugum = bagliListe.bas;

  while (mevcutDugum) {
    callback(mevcutDugum.deger);
    mevcutDugum = mevcutDugum.sonraki;
  }
}
