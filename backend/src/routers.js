const express = require("express");
const clientController = require("../controller/controller");
const router = express.Router();

router.get("/", clientController.getRoot);
router.post("/api/createStudent", clientController.createNewStudent); //Cadastrar novo usuario
router.post("/api/createBiblio", clientController.createNewBiblio); //Cadastrar novo Bibliotecario
router.post("/api/validadeStudent", clientController.loginStudent);//Validar o login
router.post("/api/validadeBiblio", clientController.loginBiblio);//Validar o login

//teste
router.post("/api/validade", clientController.loginBiblio);

// router.post("/api/contato", clientController.createNewMensagem)

// router.post('/api/reset', clientController.getEmailReset)
// router.post('/api/resetpassword', clientController.ResetSenha)

// router.post('/api/pedidos', clientController.createPedido);
// router.delete('/api/pedidos/:id', clientController.deletePedido);
// router.get('/api/pedidos', clientController.getAllPedidos);

module.exports = router;