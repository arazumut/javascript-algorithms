import weightedRandom from '../weightedRandom';

describe('weightedRandom', () => {
  it('ağırlık sayısı ile öğe sayısı eşleşmediğinde hata fırlatmalı', () => {
    const geçersizGirdilerleWeightedRandom = () => {
      weightedRandom(['a', 'b', 'c'], [10, 0]);
    };
    expect(geçersizGirdilerleWeightedRandom).toThrow('Öğeler ve ağırlıklar aynı boyutta olmalı');
  });

  it('ağırlık veya öğe sayısı boş olduğunda hata fırlatmalı', () => {
    const geçersizGirdilerleWeightedRandom = () => {
      weightedRandom([], []);
    };
    expect(geçersizGirdilerleWeightedRandom).toThrow('Öğeler boş olmamalı');
  });

  it('basit durumlarda ağırlıklara göre doğru rastgele seçim yapmalı', () => {
    expect(weightedRandom(['a', 'b', 'c'], [1, 0, 0])).toEqual({ index: 0, item: 'a' });
    expect(weightedRandom(['a', 'b', 'c'], [0, 1, 0])).toEqual({ index: 1, item: 'b' });
    expect(weightedRandom(['a', 'b', 'c'], [0, 0, 1])).toEqual({ index: 2, item: 'c' });
    expect(weightedRandom(['a', 'b', 'c'], [0, 1, 1])).not.toEqual({ index: 0, item: 'a' });
    expect(weightedRandom(['a', 'b', 'c'], [1, 0, 1])).not.toEqual({ index: 1, item: 'b' });
    expect(weightedRandom(['a', 'b', 'c'], [1, 1, 0])).not.toEqual({ index: 2, item: 'c' });
  });

  it('ağırlıklara göre doğru rastgele seçim yapmalı', () => {
    // Rastgele öğeleri ağırlıklarına göre seçeceğimiz deneme sayısı.
    const DENEME_SAYISI = 1000;
    // Her öğenin seçilme sayısındaki +/- delta.
    // Örneğin, 'a' öğesinin 1000 durumda 300 kez seçilmesini istiyorsak (yüzde 30)
    // 267 kez kabul edilebilir çünkü 250'den (300 - 50) büyük ve 350'den (300 + 50) küçüktür.
    const EŞİK = 50;

    const öğeler = ['a', 'b', 'c']; // Gerçek öğe değerleri önemli değil.
    const ağırlıklar = [0.1, 0.3, 0.6];

    const sayaç = [];
    for (let i = 0; i < DENEME_SAYISI; i += 1) {
      const rastgeleÖğe = weightedRandom(öğeler, ağırlıklar);
      if (!sayaç[rastgeleÖğe.index]) {
        sayaç[rastgeleÖğe.index] = 1;
      } else {
        sayaç[rastgeleÖğe.index] += 1;
      }
    }

    for (let öğeIndex = 0; öğeIndex < öğeler.length; öğeIndex += 1) {
      /*
        Örneğin, 0 indeksli öğe ideal olarak 100 kez seçilmeli
        veya [100 - 50, 100 + 50] aralığında olmalı.

        Örneğin, 1 indeksli öğe ideal olarak 300 kez seçilmeli
        veya [300 - 50, 300 + 50] aralığında olmalı.

        Örneğin, 2 indeksli öğe ideal olarak 600 kez seçilmeli
        veya [600 - 50, 600 + 50] aralığında olmalı.
       */
      expect(sayaç[öğeIndex]).toBeGreaterThan(DENEME_SAYISI * ağırlıklar[öğeIndex] - EŞİK);
      expect(sayaç[öğeIndex]).toBeLessThan(DENEME_SAYISI * ağırlıklar[öğeIndex] + EŞİK);
    }
  });
});
