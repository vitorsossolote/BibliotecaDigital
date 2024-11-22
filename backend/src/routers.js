const express = require("express");
const clientController = require("../controller/controller");
const router = express.Router();

router.get("/", clientController.getRoot);

router.post("/api/createStudent", clientController.createNewStudent); //Cadastrar novo usuario
router.post("/api/createLibrarian", clientController.createNewLibrarian); //Cadastrar novo Bibliotecario

router.post("/api/loginStudent", clientController.loginStudent);//Validar o Login do Estudante
router.post("/api/loginLibrarian", clientController.loginLibrarian);//Validar o Login do Bibliotecario

router.post("/api/registerBook", clientController.registerBook);

//teste
// router.post("/api/validade", clientController.loginBiblio);

// router.post("/api/contato", clientController.createNewMensagem)

// router.post('/api/reset', clientController.getEmailReset)
// router.post('/api/resetpassword', clientController.ResetSenha)

// router.post('/api/pedidos', clientController.createPedido);
// router.delete('/api/pedidos/:id', clientController.deletePedido);
// router.get('/api/pedidos', clientController.getAllPedidos);

module.exports = router;