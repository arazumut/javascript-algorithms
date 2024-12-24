// Sıralanmış, ters sıralanmış, karışık, eşit ve negatif sayılar içeren diziler
export const siraliDizi = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
export const tersSiraliDizi = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
export const karisikDizi = [15, 8, 5, 12, 10, 1, 16, 9, 11, 7, 20, 3, 2, 6, 17, 18, 4, 13, 14, 19];
export const esitDizi = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
export const negatifDizi = [-1, 0, 5, -10, 20, 13, -7, 3, 2, -3];
export const negatifDiziSirali = [-10, -7, -3, -1, 0, 2, 3, 5, 13, 20];

// Sıralama test sınıfı
export class SiralamaTest {
  // Sıralama algoritmasını test et
  static siralamayiTestEt(SiralamaSinifi) {
    const siralici = new SiralamaSinifi();

    expect(siralici.sirala([])).toEqual([]);
    expect(siralici.sirala([1])).toEqual([1]);
    expect(siralici.sirala([1, 2])).toEqual([1, 2]);
    expect(siralici.sirala([2, 1])).toEqual([1, 2]);
    expect(siralici.sirala([3, 4, 2, 1, 0, 0, 4, 3, 4, 2])).toEqual([0, 0, 1, 2, 2, 3, 3, 4, 4, 4]);
    expect(siralici.sirala(siraliDizi)).toEqual(siraliDizi);
    expect(siralici.sirala(tersSiraliDizi)).toEqual(siraliDizi);
    expect(siralici.sirala(karisikDizi)).toEqual(siraliDizi);
    expect(siralici.sirala(esitDizi)).toEqual(esitDizi);
  }

  // Negatif sayılarla sıralama algoritmasını test et
  static negatifSayilarlaSiralamayiTestEt(SiralamaSinifi) {
    const siralici = new SiralamaSinifi();
    expect(siralici.sirala(negatifDizi)).toEqual(negatifDiziSirali);
  }

  // Özelleştirilmiş karşılaştırıcı ile sıralama algoritmasını test et
  static ozellestirilmisKarsilastiriciIleSiralamayiTestEt(SiralamaSinifi) {
    const geriAramalar = {
      karsilastirmaGeriAramasi: (a, b) => {
        if (a.length === b.length) {
          return 0;
        }
        return a.length < b.length ? -1 : 1;
      },
    };

    const siralici = new SiralamaSinifi(geriAramalar);

    expect(siralici.sirala([''])).toEqual(['']);
    expect(siralici.sirala(['a'])).toEqual(['a']);
    expect(siralici.sirala(['aa', 'a'])).toEqual(['a', 'aa']);
    expect(siralici.sirala(['aa', 'q', 'bbbb', 'ccc'])).toEqual(['q', 'aa', 'ccc', 'bbbb']);
    expect(siralici.sirala(['aa', 'aa'])).toEqual(['aa', 'aa']);
  }

  // Sıralama algoritmasının kararlılığını test et
  static siralamaKararliliginiTestEt(SiralamaSinifi) {
    const geriAramalar = {
      karsilastirmaGeriAramasi: (a, b) => {
        if (a.length === b.length) {
          return 0;
        }
        return a.length < b.length ? -1 : 1;
      },
    };

    const siralici = new SiralamaSinifi(geriAramalar);

    expect(siralici.sirala(['bb', 'aa', 'c'])).toEqual(['c', 'bb', 'aa']);
    expect(siralici.sirala(['aa', 'q', 'a', 'bbbb', 'ccc'])).toEqual(['q', 'a', 'aa', 'ccc', 'bbbb']);
  }

  // Sıralama algoritmasının zaman karmaşıklığını test et
  static algoritmaZamanKarmasikliginiTestEt(SiralamaSinifi, siralanacakDizi, ziyaretSayisi) {
    const ziyaretGeriAramasi = jest.fn();
    const geriAramalar = { ziyaretGeriAramasi };
    const siralici = new SiralamaSinifi(geriAramalar);

    siralici.sirala(siralanacakDizi);

    expect(ziyaretGeriAramasi).toHaveBeenCalledTimes(ziyaretSayisi);
  }
}
