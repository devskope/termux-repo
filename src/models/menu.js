import menu from '../datastores/menuData';

class MenuItem {
  constructor({ category, name, price, ...extras }) {
    this.category = category;
    this.name = name;
    this.price = price;
    switch (this.category) {
      case `pizza`:
        this.toppings = { ...extras }.toppings || '';
        break;
      default:
        break;
    }
  }

  save() {
    menu.add(this);
  }
}

const cramCrust = new MenuItem({
  category: 'pizza',
  name: 'creamCrust pizza',
  price: 3000
});

cramCrust.save();

export default MenuItem;
