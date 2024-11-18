const clientController = require("../model/models");

const useController = {
  //Route root
  getRoot: async (req, res) => {
    res.status(200).json({ msg: "The API is running!!!" });
  },

  createNewStudent: async (req, res) => {
    const { nome, email, rm, senha, confirmSenha } = req.body;
    
    // Debug - verificar os dados recebidos
    console.log('Dados recebidos no controller:', { nome, email, rm, senha, confirmSenha });

    if (!senha) {
        return res.status(400).json({ msg: "Senha é obrigatória" });
    }

    // ... resto das validações ...

    try {
        const sql = await clientController.getByEmail(email);
        const sqlConfirmRm = await clientController.getByRm(rm);

        if (sql.length > 0) {
            return res
                .status(401)
                .json({ msg: "O email já está cadastrado no Banco de Dados" });
        }

        if (sqlConfirmRm.length > 0) {
            return res
                .status(401)
                .json({ msg: "O RM já está cadastrado no Banco de Dados" });
        }

        // Debug - verificar os dados antes de chamar registerStudent
        console.log('Dados antes de chamar registerStudent:', { nome, email, rm, senha });
        
        const result = await clientController.registerStudent(nome, email, rm, senha);
        return res.status(201).json({ msg: "Usuário cadastrado com sucesso" });

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return res.status(500).json({ msg: "Erro interno do servidor" });
    }
},

  loginStudent: async (req, res) => {
    const { email, senha } = req.body;

    try {
      const student = await clientController.validateLoginStudents(email, senha);
      if (student) {
        return res.json({ 
            message: "Login realizado com sucesso", 
            student 
        });
      } else {
        return res.status(401).json({ 
            message: "Email ou senha inválidos" 
        });
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return res.status(500).json({ 
          message: "Erro ao fazer login" 
      });
    }
},

  createNewBiblio: async (req, res) => {
    const { id, nome, email, cfb, senha, confirmSenha } = req.body;

    console.log(req.body);

    if (!email.includes("@" && ".com")) {
      return res.status(400).json({ msg: "O email Não é valido (@)" });
    }

    if (senha != confirmSenha) {
      return res.status(400).json({ msg: "As senhas não coincidem" });
    }

    try {
      const sql = await clientController.getByEmail(email);
      console.log(sql);

      const sqlConfirmCfb = await clientController.getByCfb(cfb);
      console.log(sqlConfirmCfb);

      if (sql.length > 0) {
        res
          .status(401)
          .json({ msg: "O email já esta cadastrado no Banco de Dados" });
      } else if (sqlConfirmCfb.length > 0) {
        res
          .status(401)
          .json({ msg: "O CFB já esta cadastrado no Banco de Dados" });
      } else {
        await clientController.registerBiblio(id, nome, email, cfb, senha);
        res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  loginBiblio: async (req, res) => {
    let { email, senha } = req.body;

    try {
      const sql = await clientController.validateLoginBiblio(email, senha);

      if (sql != null) {
        res.status(200).json({ msg: "Email e senha validados com sucesso!!" });
      } else {
        res.status(401).json({ msg: "Email ou senha incorretos" });
      }
    } catch (error) {
      if (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  },

  // //CONTATO NOVA MENSAGEM
  // createNewMensagem: async (req, res) => {
  //     const { id, nome, numero, email, mensagem } = req.body;

  //     try {
  //         if (!email.includes('@')) {
  //             return res.status(400).json({ msg: "O e-mail fornecido é inválido. (@)" });
  //         }

  //         await clientController.registerMensagem(id, nome, numero, email, mensagem);
  //         res.status(201).json({ msg: "Mensagem enviada com sucesso" });
  //     }

  //     catch (error) {
  //          return res.status(500).json(error);
  //     }
  // },

  // ResetSenha: async (req, res) => {
  //     let { email, senha } = req.body

  //     console.log(req.body);

  //     email = email.toLowerCase();

  //     try {
  //         await clientController.updateSenha(email, senha);
  //         res.status(200).json({ msg: "senha atualizada com sucesso" });
  //     }

  //     catch (error) {
  //         res.status(404).json({
  //             msg: 'erro ao redefinir a senha '
  //         })
  //         res.status(500).json(error)
  //     }

  // },

  // getEmailReset: async (req, res) => {
  //     let {
  //         email
  //     } = req.body

  //     email = email.toLowerCase();
  //     try {
  //         const sql = await clientController.getByEmailClients(email);
  //         if (sql.length > 0) {
  //             res.status(200).json({
  //                 msg: 'Sucess'
  //             })
  //         } else {
  //             res.status(401).json({
  //                 msg: 'email nao cadastrado no db '
  //             })
  //         }
  //     } catch (error) {
  //         if (error) {
  //             res.status(500).json(error)
  //         }
  //     }
  // },

  // createPedido: async (req, res) => {
  //     try {
  //       const pedido = req.body;
  //       await clientController.addPedido(pedido);
  //       res.status(201).json({ msg: "Pedido adicionado com sucesso" });
  //     } catch (error) {
  //       console.error('Erro ao adicionar pedido:', error);
  //       res.status(500).json({ error: "Erro ao adicionar o pedido" });
  //     }
  //   },

  //   deletePedido: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       await clientController.removePedido(id);
  //       res.status(200).json({ msg: "Pedido deletado com sucesso" });
  //     } catch (error) {
  //       console.error('Erro ao deletar pedido:', error);
  //       res.status(500).json({ error: "Erro ao deletar o pedido" });
  //     }
  //   },

  //   getAllPedidos: async (req, res) => {
  //     try {
  //       const pedidos = await clientController.fetchAllPedidos();
  //       res.status(200).json(pedidos);
  //     } catch (error) {
  //       console.error('Erro ao buscar pedidos:', error);
  //       res.status(500).json({ error: "Erro ao buscar pedidos" });
  //     }
  //   },
};

module.exports = useController;
