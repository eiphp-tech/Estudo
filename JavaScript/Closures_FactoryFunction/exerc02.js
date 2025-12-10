// Exercício 2: Factory de Funções

// Crie uma função multiplier que retorna uma função
// que multiplica um número por um valor fixo

function multiplier(factor) {
  return function (num) {
    return num * factor
  }
}


// Teste:
const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15