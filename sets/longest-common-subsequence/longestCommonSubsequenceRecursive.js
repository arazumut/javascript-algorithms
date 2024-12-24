/* eslint-disable no-param-reassign */
/**
 * En Uzun Ortak Alt Dizi (LCS) (Özyinelemeli Yaklaşım).
 *
 * @param {string} string1
 * @param {string} string2
 * @return {string} - En Uzun Ortak Alt Dizi'yi döner
 */
export default function enUzunOrtakAltDiziOzyinelemeli(string1, string2) {
  /**
   *
   * @param {string} s1
   * @param {string} s2
   * @param {Object} memo - Hesaplanan sonuçları saklamak için kullanılan nesne
   * @return {string} - En Uzun Ortak Alt Dizi'yi döner
   */
  const lcs = (s1, s2, memo = {}) => {
    if (!s1 || !s2) return '';

    if (memo[`${s1}:${s2}`]) return memo[`${s1}:${s2}`];

    if (s1[0] === s2[0]) {
      return s1[0] + lcs(s1.substring(1), s2.substring(1), memo);
    }

    const sonrakiLcs1 = lcs(s1.substring(1), s2, memo);
    const sonrakiLcs2 = lcs(s1, s2.substring(1), memo);

    const sonrakiEnUzun = sonrakiLcs1.length >= sonrakiLcs2.length ? sonrakiLcs1 : sonrakiLcs2;

    memo[`${s1}:${s2}`] = sonrakiEnUzun;

    return sonrakiEnUzun;
  };

  return lcs(string1, string2);
}
