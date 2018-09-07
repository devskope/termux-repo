import menu from '../datastores/menuData';

class Order {
  constructor({ item, qty = 1, category, ...extras }) {
    this.item = item;
    this.qty = qty;
    this.category = category;

    if (this.category === 'pizza') {
      this.topping = { ...extras }.topping || `pepperoni`;
    }
  }

 
  }

}

const newOrder = new Order({
  item: `bornoir`,
  qty: 2,
  category: `pizza`,
});

console.log(newOrder);
