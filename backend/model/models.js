const connection= require("../config/db");
const bcrypt = require('bcrypt');
const salt = 10;

const useModel = {
    getByID: async (id) => {
        const [result] = await connection.query("SELECT * FROM cliente WHERE id =?", [id])
        .catch(err => console.log(err));
        return result
    },

    getByEmail: async(email)=>{
        const [result] = await connection.query("SELECT * FROM cliente WHERE email=?", [email])
        .catch(erro => console.log(erro));
        return result;
    },

    registerCliente: async (id,nome,email,telefone,senha) =>{
        const hashPassword = await bcrypt.hash(senha,salt);

        const [result] = await connection.query("INSERT INTO cliente values(?,?,?,?,?)",[id,nome,email,telefone,hashPassword])
        .catch(erro => console.log(erro));
        return result;
    },

    validateLogin: async(email, senha)=> {
        const [result] = await connection.query("SELECT * FROM cliente WHERE email=?",[email])

        try{
            if (result.length > 0) {
              const cliente = result[0]  
             
              const match = await bcrypt.compare(senha, cliente.senha)

                if (match) {
                    return result;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        }
        catch(erro) {
            console.log(erro)
        };
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
