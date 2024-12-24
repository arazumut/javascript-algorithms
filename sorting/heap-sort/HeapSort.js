import Sort from '../Sort';
import MinHeap from '../../../data-structures/heap/MinHeap';

export default class HeapSort extends Sort {
  sort(orijinalDizi) {
    const siraliDizi = [];
    const minHeap = new MinHeap(this.callbacks.compareCallback);

    // Tüm dizi elemanlarını heap'e ekle.
    orijinalDizi.forEach((eleman) => {
      // Ziyaret callback'ini çağır.
      this.callbacks.visitingCallback(eleman);

      minHeap.add(eleman);
    });

    // Şimdi en küçük eleman her zaman üstte olacak şekilde bir min heap'imiz var.
    // Bu en küçük elemanı birer birer çekelim ve böylece sıralı diziyi oluşturalım.
    while (!minHeap.isEmpty()) {
      const sonrakiMinEleman = minHeap.poll();

      // Ziyaret callback'ini çağır.
      this.callbacks.visitingCallback(sonrakiMinEleman);

      siraliDizi.push(sonrakiMinEleman);
    }

    return siraliDizi;
  }
}
