export default class KnapsackItem {
  /**
   * @param {Object} itemSettings - sırt çantası öğesi ayarları,
   * @param {number} itemSettings.value - öğenin değeri.
   * @param {number} itemSettings.weight - öğenin ağırlığı.
   * @param {number} itemSettings.itemsInStock - eklenebilecek öğe sayısı.
   */
  constructor({ value, weight, itemsInStock = 1 }) {
    this.value = value;
    this.weight = weight;
    this.itemsInStock = itemsInStock;
    // Sırt çantasına eklenecek gerçek öğe sayısı.
    this.quantity = 1;
  }

  get totalValue() {
    return this.value * this.quantity;
  }

  get totalWeight() {
    return this.weight * this.quantity;
  }

  // Bu katsayı, mevcut öğe için 1 birim ağırlığın ne kadar değerli olduğunu gösterir.
  get valuePerWeightRatio() {
    return this.value / this.weight;
  }

  toString() {
    return `değer: ${this.value}, ağırlık: ${this.weight}, miktar: ${this.quantity}`;
  }
}
