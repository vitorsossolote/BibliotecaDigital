const connection = require("../config/db");
const bcrypt = require("bcrypt");
// const salt = 10;

const useModel = {
  getByID: async (id) => {
    const [result] = await connection
      .query("SELECT * FROM students WHERE id =?", [id])
      .catch((erro) => console.log(erro));
    return result;
  },

  getByEmail: async (email) => {
    const [result] = await connection
      .query("SELECT * FROM students WHERE email=?", [email])
      .catch((erro) => console.log(erro));
    return result;
  },

  getByRm: async (rm) => {
    const [result] = await connection
      .query("SELECT * FROM students WHERE rm=?", [rm])
      .catch((erro) => console.log(erro));
    return result;
  },

  getByCfb: async (rm) => {
    const [result] = await connection
      .query("SELECT * FROM bibliotecario WHERE cfb=?", [rm])
      .catch((erro) => console.log(erro));
    return result;
  },

  registerStudent: async (nome, email, rm, senha) => {  // Removido o parâmetro id que não estava sendo usado
    // Debug - verificar os dados recebidos no model
    console.log('Dados recebidos no model:', { nome, email, rm, senha });

    if (!senha) {
        throw new Error('Senha é obrigatória');
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(senha, salt);

        const [result] = await connection
            .query("INSERT INTO students (nome, email, rm, senha) VALUES (?,?,?,?)", [
                nome,
                email,
                rm,
                hashPassword
            ]);
            
        return result;
    } catch (error) {
        console.error('Erro ao criar hash da senha:', error);
        throw error;
    }
},

  validateLoginStudents: async (email, senha) => {
    try {
      const [student] = await connection.query(
        "SELECT * FROM students WHERE email = ?",
        [email]
      );

      if (student.length === 0) {
        return null; 
      }

      const isValid = await bcrypt.compare(senha, student[0].senha);
      if (isValid) {
        return student[0];
      } else {
        return null; 
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  },

  registerBiblio: async (id, nome, email, cfb, senha) => {
    const hashPassword = await bcrypt.hash(senha, salt);

    const [result] = await connection
      .query("INSERT INTO bibliotecario values(?,?,?,?,?)", [
        id,
        nome,
        email,
        cfb,
        hashPassword,
      ])
      .catch((erro) => console.log(erro));
    return result;
  },

  validateLoginBiblio: async (email, senha) => {
    const [result] = await connection.query(
      "SELECT * FROM bibliotecario WHERE email=?",
      [email]
    );

    try {
      if (result.length > 0) {
        const cliente = result[0];

        const match = await bcrypt.compare(senha, cliente.senha);

        if (match) {
          return result;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (erro) {
      console.log(erro);
    }
  },

  // registerMensagem: async (id, nome, numero, email, mensagem) =>{
  //     const [result] = await connection.query("INSERT INTO contato values(?,?,?,?,?)", [id, nome, numero, email, mensagem])
  //     .catch(erro => console.log(erro));
  //     return result
  // },

  // //RESET SENHA
  // getByEmailClients : async(email)=>{
  //     const [result] = await connection.query("SELECT * FROM cliente WHERE email=?",[email])
  //     .catch(erro => console.log(erro));
  //     return result;
  // },
  // updateSenha: async(email,senha)=>{
  //     const [result] = await connection.query("UPDATE cliente SET senha=? WHERE email=? ", [senha,email])
  //     .catch(erro => console.log(erro));
  //     return result;
  // },

  // addPedido: async (pedido) => {
  //     const [result] = await connection.query(
  //         "INSERT INTO pedido (id, nome, descricao, preco, quantidade) VALUES (?, ?, ?, ?, ?)",
  //         [pedido.produto_id, pedido.nome, pedido.descricao, pedido.preco, pedido.quantidade]
  //     ).catch(err => console.log(err));
  //     return result;
  // },
  // fetchAllPedidos: async () => {
  //     const [result] = await connection.query("SELECT * FROM pedido")
  //         .catch(err => console.log(err));
  //     return result;
  // },
  // removePedido: async (id) => {
  //     const [result] = await connection.query(
  //         "DELETE FROM pedido WHERE id = ?",
  //         [id]
  //     ).catch(err => console.log(err));
  //     return result;
  // },
};

module.exports = useModel;
