import Stack from '../../../data-structures/stack/Stack';

/**
 * @param {number} diskSayisi
 * @param {Stack} baslangicCubugu
 * @param {Stack} yardimciCubuk
 * @param {Stack} hedefCubuk
 * @param {function(disk: number, baslangicCubugu: number[], hedefCubugu: number[])} hareketCallback
 */
function hanoiKulesiRecursive({
  diskSayisi,
  baslangicCubugu,
  yardimciCubuk,
  hedefCubuk,
  hareketCallback,
}) {
  if (diskSayisi === 1) {
    // Sadece bir disk olduğunda temel durum.
    hareketCallback(baslangicCubugu.peek(), baslangicCubugu.toArray(), hedefCubuk.toArray());
    const disk = baslangicCubugu.pop();
    hedefCubuk.push(disk);
  } else {
    // Daha fazla disk varsa, onları özyinelemeli olarak taşı.

    // baslangicCubugu yığınının alt diskini açığa çıkar.
    hanoiKulesiRecursive({
      diskSayisi: diskSayisi - 1,
      baslangicCubugu,
      yardimciCubuk: hedefCubuk,
      hedefCubuk: yardimciCubuk,
      hareketCallback,
    });

    // Açığa çıkan diski nihai hedefine taşı.
    hanoiKulesiRecursive({
      diskSayisi: 1,
      baslangicCubugu,
      yardimciCubuk,
      hedefCubuk,
      hareketCallback,
    });

    // Geçici kuleyi yardımcı çubuktan nihai hedefine taşı.
    hanoiKulesiRecursive({
      diskSayisi: diskSayisi - 1,
      baslangicCubugu: yardimciCubuk,
      yardimciCubuk: baslangicCubugu,
      hedefCubuk,
      hareketCallback,
    });
  }
}

/**
 * @param {number} diskSayisi
 * @param {function(disk: number, baslangicCubugu: number[], hedefCubugu: number[])} hareketCallback
 * @param {Stack} [baslangicCubugu]
 * @param {Stack} [yardimciCubuk]
 * @param {Stack} [hedefCubuk]
 */
export default function hanoiKulesi({
  diskSayisi,
  hareketCallback,
  baslangicCubugu = new Stack(),
  yardimciCubuk = new Stack(),
  hedefCubuk = new Stack(),
}) {
  // Hanoi Kulesi bulmacasının üç çubuğunun her biri, elemanlar (diskler) içerebilecek bir yığın olarak temsil edilir.
  // Her disk bir sayı olarak temsil edilir. Daha büyük diskler daha büyük sayı eşdeğerine sahiptir.

  // Diskleri oluşturalım ve onları baslangicCubugu'na koyalım.
  for (let diskBoyutu = diskSayisi; diskBoyutu > 0; diskBoyutu -= 1) {
    baslangicCubugu.push(diskBoyutu);
  }

  hanoiKulesiRecursive({
    diskSayisi,
    baslangicCubugu,
    yardimciCubuk,
    hedefCubuk,
    hareketCallback,
  });
}
