// 🏆 Desafio 1: Sistema de Carrinho

// Crie um carrinho de compras usando closures
// Deve ter métodos: addItem, removeItem, getTotal, getItems

function createShoppingCart() {
  let cart = {}
  return {
    addItem(item) {
      return cart.push(item)
    },
    removeItem(item) {
      return cart.pop(item)
    },
    getTotal() {
      return {
        c
      }
    },
    getItems() {
      return console.log(cart)
    }
  }
}

// Teste:
const cart = createShoppingCart();
cart.addItem({ name: 'Laptop', price: 3000 });
cart.addItem({ name: 'Mouse', price: 50 });
console.log(cart.getTotal()); // 3050
console.log(cart.getItems()); // [{...}, {...}]
cart.removeItem('Mouse');
console.log(cart.getTotal());