/**
 * Dolaşım geri çağırma fonksiyonu.
 * @callback dolaşımGeriÇağırma
 * @param {*} düğümDeğeri
 */

/**
 * @param {LinkedListNode} düğüm
 * @param {dolaşımGeriÇağırma} geriÇağırma
 */
function tersDolaşımÖzyinelemeli(düğüm, geriÇağırma) {
  if (düğüm) {
    tersDolaşımÖzyinelemeli(düğüm.next, geriÇağırma);
    geriÇağırma(düğüm.value);
  }
}

/**
 * @param {LinkedList} bağlıListe
 * @param {dolaşımGeriÇağırma} geriÇağırma
 */
export default function tersDolaşım(bağlıListe, geriÇağırma) {
  tersDolaşımÖzyinelemeli(bağlıListe.head, geriÇağırma);
}
