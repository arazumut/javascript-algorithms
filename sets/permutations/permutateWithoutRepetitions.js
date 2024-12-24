/**
 * @param {*[]} permutasyonSeçenekleri
 * @return {*[]}
 */
export default function tekrarEtmeyenPermutasyonlar(permutasyonSeçenekleri) {
  if (permutasyonSeçenekleri.length === 1) {
    return [permutasyonSeçenekleri];
  }

  // Permutasyonlar dizisini başlat.
  const permutasyonlar = [];

  // İlk eleman hariç permutasyonSeçenekleri için tüm permutasyonları al.
  const dahaKüçükPermutasyonlar = tekrarEtmeyenPermutasyonlar(permutasyonSeçenekleri.slice(1));

  // İlk seçeneği her daha küçük permutasyonun her olası pozisyonuna ekle.
  const ilkSeçenek = permutasyonSeçenekleri[0];

  for (let permIndex = 0; permIndex < dahaKüçükPermutasyonlar.length; permIndex += 1) {
    const dahaKüçükPermutasyon = dahaKüçükPermutasyonlar[permIndex];

    // İlk seçeneği daha küçük permutasyonun her olası pozisyonuna ekle.
    for (let pozisyonIndex = 0; pozisyonIndex <= dahaKüçükPermutasyon.length; pozisyonIndex += 1) {
      const permutasyonÖnEk = dahaKüçükPermutasyon.slice(0, pozisyonIndex);
      const permutasyonSonEk = dahaKüçükPermutasyon.slice(pozisyonIndex);
      permutasyonlar.push(permutasyonÖnEk.concat([ilkSeçenek], permutasyonSonEk));
    }
  }

  return permutasyonlar;
}
