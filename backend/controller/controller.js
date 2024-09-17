const clientController = require("../model/models");
const bcrypt = require('bcrypt');
const salt = 0;

const useController = {
    //Route root
    getRoot: async (req, res) => {
        res.status(200).json({ msg: "The API is running!!!" })
    },
    
<<<<<<< HEAD
    createNewUser: async(req,res)=>{
        const {id,nome,email,telefone,senha} = req.body;
=======
    createNewStudent: async(req,res)=>{
        const {id,nome,email,rm,senha,confirmSenha} = req.body;
>>>>>>> desenvolvimento

        console.log(req.body);

        if (!email.includes('@' && '.com')) {
        return res.status(400).json({msg:'O email Não é valido (@)'})
        }

<<<<<<< HEAD
        try{
            const sql = await clientController.getByEmail(email);

            console.log(sql);

            if(sql.length > 0){
                res.status(401).json({msg: "O email já esta cadastrado no Banco de Dados"})
            }
            else{
                await clientController.registerCliente(id,nome,email,telefone,senha);
=======
        if (senha != confirmSenha){
        return res.status(400).json({msg:'As senhas não coincidem'})
        }

        try{
            const sql = await clientController.getByEmail(email);
            console.log(sql);

            const sqlConfirmRm = await clientController.getByRm(rm);
            console.log(sqlConfirmRm);


            if(sql.length > 0){
                res.status(401).json({msg: "O email já esta cadastrado no Banco de Dados"})
            }
            else if(sqlConfirmRm.length > 0){
                res.status(401).json({msg: "O RM já esta cadastrado no Banco de Dados"})
            }
            else{
                await clientController.registerStudent(id,nome,email,rm,senha);
>>>>>>> desenvolvimento
                res.status(201).json({msg:"Usuário cadastrado com sucesso"});
            }
        }
        catch(error){
            console.log(error)
            return error
        }
    },

<<<<<<< HEAD
    login: async(req,res) => {

        let {email,senha} = req.body;

       
        try{
            
            const sql = await clientController.validateLogin(email,senha);
=======
    loginStudent: async(req,res) => {

        let {email,senha} = req.body;

        try{
            
            const sql = await clientController.validateLoginStudents(email,senha);

            if(sql != null) {
                res.status(200).json({msg: "Email e senha validados com sucesso!!"})
            }

            else{
                res.status(401).json({msg:"Email ou senha incorretos"});
            }
        }
        catch(error) {
            if(error) {
                console.log(error)
                res.status(500).json(error);
            }
        }
    },

    createNewBiblio: async(req,res)=>{
        const {id,nome,email,cfb,senha,confirmSenha} = req.body;

        console.log(req.body);

        if (!email.includes('@' && '.com')) {
        return res.status(400).json({msg:'O email Não é valido (@)'})
        }

        if (senha != confirmSenha){
        return res.status(400).json({msg:'As senhas não coincidem'})
        }

        try{
            const sql = await clientController.getByEmail(email);
            console.log(sql);

            const sqlConfirmCfb = await clientController.getByCfb(cfb);
            console.log(sqlConfirmCfb);


            if(sql.length > 0){
                res.status(401).json({msg: "O email já esta cadastrado no Banco de Dados"})
            }
            else if(sqlConfirmCfb.length > 0){
                res.status(401).json({msg: "O CFB já esta cadastrado no Banco de Dados"})
            }
            else{
                await clientController.registerBiblio(id,nome,email,cfb,senha);
                res.status(201).json({msg:"Usuário cadastrado com sucesso"});
            }
        }
        catch(error){
            console.log(error)
            return error
        }
    },

    loginBiblio: async(req,res) => {

        let {email,senha} = req.body;

        try{
            
            const sql = await clientController.validateLoginBiblio(email,senha);
>>>>>>> desenvolvimento

            if(sql != null) {
                res.status(200).json({msg: "Email e senha validados com sucesso!!"})
            }

            else{
                res.status(401).json({msg:"Email ou senha incorretos"});
            }
        }
        catch(error) {
            if(error) {
                console.log(error)
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

    


