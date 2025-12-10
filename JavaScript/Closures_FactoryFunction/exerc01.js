// Crie uma função createCounter que retorna um objeto com métodos
// increment, decrement e getValue. O contador deve ser privado.

// // Teste:
// const counter = createCounter(10);
// counter.increment(); // 11
// counter.increment(); // 12
// counter.decrement(); // 11
// console.log(counter.getValue()); // 11
// // counter.count NÃO deve ser acessível

function createCounter(initialValue = 0) {
  let count = initialValue
  return {
    increment() {
      count++
      return count
    },
    decrement() {
      count--
      return count
    },
    getValue() {
      return count
    }
  }
}

const counter = createCounter(10)
counter.increment() // 11
counter.increment() // 12
counter.decrement() // 11
console.log(counter.getValue());