import * as mtrx from '../../math/matrix/Matrix';

// 'A' karakterinin kodu (65'e eşittir).
const alfabeKodKaymasi = 'A'.codePointAt(0);
const ingilizAlfabesiBoyutu = 26;

/**
 * Verilen anahtar dizisinden anahtar matrisi oluşturur.
 *
 * @param {string} anahtarDizisi - anahtar matrisi oluşturmak için bir dizi (matrisBoyutu^2 uzunluğunda olmalıdır).
 * @return {number[][]} anahtarMatrisi
 */
const anahtarMatrisiOlustur = (anahtarDizisi) => {
  const matrisBoyutu = Math.sqrt(anahtarDizisi.length);
  if (!Number.isInteger(matrisBoyutu)) {
    throw new Error(
      'Geçersiz anahtar dizi uzunluğu. Anahtar dizisinin karekökü bir tam sayı olmalıdır',
    );
  }
  let anahtarDizisiIndeksi = 0;
  return mtrx.generate(
    [matrisBoyutu, matrisBoyutu],
    // Her matris hücresinin değerini almak için geri çağırma.
    // Matrisin doldurulma sırası soldan sağa, yukarıdan aşağıya doğrudur.
    () => {
      // A → 0, B → 1, ..., a → 32, b → 33, ...
      const karakterKoduKaydirilmis = (anahtarDizisi.codePointAt(anahtarDizisiIndeksi)) % alfabeKodKaymasi;
      anahtarDizisiIndeksi += 1;
      return karakterKoduKaydirilmis;
    },
  );
};

/**
 * Verilen mesajdan bir mesaj vektörü oluşturur.
 *
 * @param {string} mesaj - şifrelenecek mesaj.
 * @return {number[][]} mesajVektörü
 */
const mesajVektoruOlustur = (mesaj) => {
  return mtrx.generate(
    [mesaj.length, 1],
    // Her matris hücresinin değerini almak için geri çağırma.
    // Matrisin doldurulma sırası soldan sağa, yukarıdan aşağıya doğrudur.
    (hücreIndeksleri) => {
      const satirIndeksi = hücreIndeksleri[0];
      return mesaj.codePointAt(satirIndeksi) % alfabeKodKaymasi;
    },
  );
};

/**
 * Verilen mesajı Hill Şifresi kullanarak şifreler.
 *
 * @param {string} mesaj - düz metin
 * @param {string} anahtarDizisi
 * @return {string} şifreliDizi
 */
export function hillSifrele(mesaj, anahtarDizisi) {
  // Anahtar dizisi ve mesaj sadece harf içerebilir.
  const sadeceHarflerRegExp = /^[a-zA-Z]+$/;
  if (!sadeceHarflerRegExp.test(mesaj) || !sadeceHarflerRegExp.test(anahtarDizisi)) {
    throw new Error('Mesaj ve anahtar dizisi sadece harf içerebilir');
  }

  const anahtarMatrisi = anahtarMatrisiOlustur(anahtarDizisi);
  const mesajVektoru = mesajVektoruOlustur(mesaj);

  // anahtarDizisi.length, mesaj.length'in karesi olmalıdır
  if (anahtarMatrisi.length !== mesaj.length) {
    throw new Error('Geçersiz anahtar dizi uzunluğu. Anahtar uzunluğu mesaj uzunluğunun karesi olmalıdır');
  }

  const sifreliVektor = mtrx.dot(anahtarMatrisi, mesajVektoru);
  let sifreliDizi = '';
  for (let satir = 0; satir < sifreliVektor.length; satir += 1) {
    const eleman = sifreliVektor[satir];
    sifreliDizi += String.fromCharCode((eleman % ingilizAlfabesiBoyutu) + alfabeKodKaymasi);
  }

  return sifreliDizi;
}

// @TODO: Bu metodu implemente et.
export const hillSifreCoz = () => {
  throw new Error('Bu metod henüz implemente edilmedi');
};
