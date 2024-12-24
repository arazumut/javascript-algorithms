/**
 * CASCADING yaklaşımı kullanarak bir kümenin alt kümelerini bulur.
 *
 * @param {*[]} orijinalKume
 * @return {*[][]}
 */
export default function caPowerSet(orijinalKume) {
  // Boş bir küme ile başlayalım.
  const kumeler = [[]];

  /*
    Şimdi diyelim ki:
    orijinalKume = [1, 2, 3].

    İlk elemanı mevcut tüm kümelere ekleyelim:
    [[]] ← 1 = [[], [1]]

    İkinci elemanı mevcut tüm kümelere ekleyelim:
    [[], [1]] ← 2 = [[], [1], [2], [1, 2]]

    Üçüncü elemanı mevcut tüm kümelere ekleyelim:
    [[], [1], [2], [1, 2]] ← 3 = [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]

    Ve bu şekilde orijinalKume'deki diğer elemanlar için devam ederiz.
    Her iterasyonda kümelerin sayısı iki katına çıkar, bu yüzden 2^n küme elde ederiz.
  */
  for (let numIdx = 0; numIdx < orijinalKume.length; numIdx += 1) {
    const mevcutKumeSayisi = kumeler.length;

    for (let kumeIdx = 0; kumeIdx < mevcutKumeSayisi; kumeIdx += 1) {
      const kume = [...kumeler[kumeIdx], orijinalKume[numIdx]];
      kumeler.push(kume);
    }
  }

  return kumeler;
}
