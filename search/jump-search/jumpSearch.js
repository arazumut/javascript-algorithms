import Comparator from '../../../utils/comparator/Comparator';

/**
 * Atlamalı (blok) arama uygulaması.
 *
 * @param {*[]} sıralıDizi
 * @param {*} arananEleman
 * @param {function(a, b)} [karşılaştırmaFonksiyonu]
 * @return {number}
 */
export default function atlamaliArama(sıralıDizi, arananEleman, karşılaştırmaFonksiyonu) {
  const karşılaştırıcı = new Comparator(karşılaştırmaFonksiyonu);
  const diziBoyutu = sıralıDizi.length;

  if (!diziBoyutu) {
    // Boş dizide bir şey bulamayız.
    return -1;
  }

  // Optimal atlama boyutunu hesapla.
  // En kötü durumda toplam karşılaştırma sayısı ((diziBoyutu/atlamaBoyutu) + atlamaBoyutu - 1) olacaktır.
  // ((diziBoyutu/atlamaBoyutu) + atlamaBoyutu - 1) fonksiyonunun değeri minimum olacaktır
  // atlamaBoyutu = √diziBoyutu olduğunda.
  const atlamaBoyutu = Math.floor(Math.sqrt(diziBoyutu));

  // arananEleman'ın ait olduğu bloğu bul.
  let blokBaşlangıcı = 0;
  let blokSonu = atlamaBoyutu;
  while (karşılaştırıcı.büyüktür(arananEleman, sıralıDizi[Math.min(blokSonu, diziBoyutu) - 1])) {
    // Bir sonraki bloğa atla.
    blokBaşlangıcı = blokSonu;
    blokSonu += atlamaBoyutu;

    // Eğer bir sonraki bloğumuz dizinin dışına çıkarsa elemanı bulamamışız demektir.
    if (blokBaşlangıcı > diziBoyutu) {
      return -1;
    }
  }

  // arananEleman için blokBaşlangıcı'ndan başlayarak alt dizide doğrusal arama yap.
  let mevcutIndeks = blokBaşlangıcı;
  while (mevcutIndeks < Math.min(blokSonu, diziBoyutu)) {
    if (karşılaştırıcı.eşittir(sıralıDizi[mevcutIndeks], arananEleman)) {
      return mevcutIndeks;
    }

    mevcutIndeks += 1;
  }

  return -1;
}
