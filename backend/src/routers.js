const express = require("express");
const clientController = require("../controller/controller");
const router = express.Router();

router.post("/api/createStudent", clientController.createNewStudent); //Cadastrar novo usuario
router.post("/api/validade", clientController.login);//Validar o login

// router.post("/api/contato", clientController.createNewMensagem)

// router.post('/api/reset', clientController.getEmailReset)
// router.post('/api/resetpassword', clientController.ResetSenha)

// router.post('/api/pedidos', clientController.createPedido);
// router.delete('/api/pedidos/:id', clientController.deletePedido);
// router.get('/api/pedidos', clientController.getAllPedidos);

module.exports = router;



