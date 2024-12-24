import { caesarCipherEncrypt, caesarCipherDecrypt } from '../caesarCipher';

describe('Sezar Şifreleme', () => {
  it('sıfır kaydırma ile bir dizeyi değiştirmemeli', () => {
    expect(caesarCipherEncrypt('abcd', 0)).toBe('abcd');
    expect(caesarCipherDecrypt('abcd', 0)).toBe('abcd');
  });

  it('farklı kaydırmalarla bir dizeyi şifrelemeli', () => {
    expect(caesarCipherEncrypt('abcde', 3)).toBe('defgh');
    expect(caesarCipherDecrypt('defgh', 3)).toBe('abcde');

    expect(caesarCipherEncrypt('abcde', 1)).toBe('bcdef');
    expect(caesarCipherDecrypt('bcdef', 1)).toBe('abcde');

    expect(caesarCipherEncrypt('xyz', 1)).toBe('yza');
    expect(caesarCipherDecrypt('yza', 1)).toBe('xyz');
  });

  it('büyük/küçük harf duyarsız olmalı', () => {
    expect(caesarCipherEncrypt('ABCDE', 3)).toBe('defgh');
  });

  it('boş dizeleri doğru şekilde ele almalı', () => {
    expect(caesarCipherEncrypt('', 3)).toBe('');
  });

  it('bilinmeyen karakterleri şifrelememeli', () => {
    expect(caesarCipherEncrypt('ab2cde', 3)).toBe('de2fgh');
    expect(caesarCipherDecrypt('de2fgh', 3)).toBe('ab2cde');
  });

  it('tam cümleleri şifrelemeli ve çözmeli', () => {
    expect(caesarCipherEncrypt('THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG', 23))
      .toBe('qeb nrfzh yoltk clu grjmp lsbo qeb ixwv ald');

    expect(caesarCipherDecrypt('qeb nrfzh yoltk clu grjmp lsbo qeb ixwv ald', 23))
      .toBe('the quick brown fox jumps over the lazy dog');
  });
});
