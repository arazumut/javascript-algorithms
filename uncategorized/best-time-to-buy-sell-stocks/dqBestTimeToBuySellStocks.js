/**
 * Hisse senetlerini alıp satmaktan elde edilebilecek maksimum karı bulur.
 * BÖL VE FETHET YAKLAŞIMI.
 *
 * @param {number[]} fiyatlar - Hisse senedi fiyatlarının dizisi, örneğin [7, 6, 4, 3, 1]
 * @param {function(): void} ziyaret - İterasyon sayısını hesaplamak için kullanılan ziyaret geri çağrımı.
 * @return {number} - Maksimum kar
 */
const dqEnIyiAlSatZamani = (fiyatlar, ziyaret = () => {}) => {
  /**
   * Ana fonksiyonun özyinelemeli (recursive) uygulaması. Kullanıcılardan gizlenmiştir.
   *
   * @param {boolean} al - Şu anda alım mı yoksa satım mı yapabileceğimizi belirler
   * @param {number} gun - Ticaretin mevcut günü (fiyatlar dizisinin mevcut indeksi)
   * @returns {number} - Alım/satım işleminden elde edilen maksimum kar
   */
  const ozyinelemeliAlSat = (al, gun) => {
    // Özyinelemeli çağrı ziyaretini kaydederek karmaşıklığı hesaplıyoruz.
    ziyaret();

    // Eğer bu ticaretin son günü ise (fiyatlar dizisi bitti) özyinelemeyi sonlandırıyoruz.
    if (gun === fiyatlar.length) {
      return 0;
    }

    // Eğer alıyorsak - para kaybediyoruz (-1), eğer satıyorsak - para kazanıyoruz (+1).
    const islemIsareti = al ? -1 : +1;
    return Math.max(
      // Seçenek 1: Hiçbir şey yapma.
      ozyinelemeliAlSat(al, gun + 1),
      // Seçenek 2: Mevcut fiyattan al veya sat.
      islemIsareti * fiyatlar[gun] + ozyinelemeliAlSat(!al, gun + 1),
    );
  };

  const al = true;
  const gun = 0;

  return ozyinelemeliAlSat(al, gun);
};

export default dqEnIyiAlSatZamani;
