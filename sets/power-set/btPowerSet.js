/**
 * @param {*[]} orijinalKume - Güç kümesini oluşturduğumuz orijinal küme elemanları.
 * @param {*[][]} tumAltKumeler - Şu ana kadar oluşturulmuş tüm alt kümeler.
 * @param {*[]} mevcutAltKume - Şu anda oluşturduğumuz mevcut alt küme.
 * @param {number} baslangic - Mevcut alt kümeyi oluşturmaya başladığımız orijinal kümedeki pozisyon.
 * @return {*[][]} - Orijinal kümenin tüm alt kümeleri.
 */
function btKumeGucuRekursif(orijinalKume, tumAltKumeler = [[]], mevcutAltKume = [], baslangic = 0) {
  // Orijinal küme elemanlarını yineleyelim ve alt kümeye ekleyelim
  // ve yinelenen elemanları önleyelim. baslangic değeri yinelenen elemanları önler.
  for (let pozisyon = baslangic; pozisyon < orijinalKume.length; pozisyon += 1) {
    // Mevcut elemanı alt kümeye ekleyelim
    mevcutAltKume.push(orijinalKume[pozisyon]);

    // Mevcut alt küme zaten geçerli, bu yüzden onu kaydedelim.
    // Burada mevcutAltKume'nin klonunu kaydetmek için dizi yıkımını kullanıyoruz.
    // Klon kaydetmemiz gerekiyor çünkü orijinal mevcutAltKume
    // sonraki özyinelemeli çağrılarda değiştirilecek.
    tumAltKumeler.push([...mevcutAltKume]);

    // Mevcut alt küme için diğer tüm alt kümeleri oluşturmaya çalışalım.
    // Alt kümede yinelenen elemanları önlemek için pozisyonu bir artırıyoruz.
    btKumeGucuRekursif(orijinalKume, tumAltKumeler, mevcutAltKume, pozisyon + 1);

    // GERİYE DÖN. Son elemanı alt kümeden çıkar ve bir sonraki geçerli olanı dene.
    mevcutAltKume.pop();
  }

  // Bir kümenin tüm alt kümelerini döndür.
  return tumAltKumeler;
}

/**
 * Geri izleme yaklaşımını kullanarak bir kümenin güç kümesini bulun.
 *
 * @param {*[]} orijinalKume
 * @return {*[][]}
 */
export default function btKumeGucu(orijinalKume) {
  return btKumeGucuRekursif(orijinalKume);
}
