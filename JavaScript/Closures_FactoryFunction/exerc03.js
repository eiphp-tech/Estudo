//Crie uma factory function chamada createUser que gere objetos de usuário seguindo
// um mindset escalável e plug-and-play.
//Requisitos obrigatórios
// A função deve receber: name email role (ex: "admin", "editor", "viewer")
// Ela deve retornar um objeto com: As propriedades acima Um método describe() que retorna uma string como: "Usuário Pedro possui o papel de admin."
// O objeto retornado deve possuir um método isAdmin() que retorna true se o papel for "admin" — um microbenchmark de lógica de negócio.
// Crie pelo menos três usuários diferentes usando a factory function.
// Liste todos os usuários em um array e itere exibindo: describe() isAdmin()

const createUser = (nome, email, role) => {
  let userEmail = email
  const userRole = role

  return {
    describe() {
      console.log(`Usuário ${nome} possui o papel de ${userRole}.`)
    },
    isAdmin() {
      if (userRole === 'admin') {
        return true
      } else {
        return console.log(`Usuário ${nome} não é admin`)
      }
    },
    updateEmail(newEmail) {
      userEmail = newEmail
      console.log(`Email atualizado para: ${userEmail}`);
      return userEmail
    }
  }
}

const pessoa01 = createUser('Pedro', "pedrindelas@gmail.com", 'admin')
const pessoa02 = createUser('Claudio', "claudete@gmail.com", 'client')
const pessoa03 = createUser('Douglas', "douglao@gmail.com", 'client')

// Executando métodos
pessoa01.describe();
console.log("É admin?", pessoa01.isAdmin());
pessoa01.updateEmail("novoemailpedro@gmail.com");

pessoa02.describe();
console.log("É admin?", pessoa02.isAdmin());

pessoa03.describe();
console.log("É admin?", pessoa03.isAdmin());