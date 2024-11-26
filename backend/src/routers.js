const express = require("express");
const clientController = require("../controller/controller");
const router = express.Router();

// const cron = require("node-cron");

// // Verifica a cada 1 minuto
// cron.schedule('* * * * *', async () => {
//     try {
//       console.log('Iniciando verificação automática de empréstimos atrasados...');
//       const resultado = await atualizarAtrasos();
      
//       console.log(
//         resultado.atualizados > 0 
//           ? `Verificação concluída: ${resultado.mensagem}` 
//           : 'Nenhum empréstimo atrasado encontrado'
//       );
//     } catch (error) {
//       console.error('Erro na tarefa automática de verificação:', error);
//     }
//   });
  
//Rota raiz do projeto
router.get("/", clientController.getRoot);

// USUÁRIO --------------------------------------------------------------------------------

//Cadastrar novo usuario
router.post("/api/createStudent", clientController.createNewStudent); 
//Validar o Login do Estudante
router.post("/api/loginStudent", clientController.loginStudent);

// BIBLIOTECÁRIO -------------------------------------------------------------------------

//Cadastrar novo Bibliotecario
router.post("/api/createLibrarian", clientController.createNewLibrarian); 
//Validar o Login do Bibliotecario
router.post("/api/loginLibrarian", clientController.loginLibrarian);

// LIVRO ---------------------------------------------------------------------------------

//Rota para Criar Livro
router.post("/api/registerBook", clientController.registerBook);
// Rota para atualizar um livro
router.put("/api/updateBook/:id", clientController.updateBook);
//Rota para deletar um livro
router.delete("/api/deleteBook/:id", clientController.deleteBook);
//Listar todos os Livros
router.get("/api/listBooks", clientController.listarLivros); 
//Listar Livros por ID
router.get("/api/listBooks/:id", clientController.ListarLivrosByID);
//Listar os Livros por Termo
router.get('/api/searchLivros/:searchTerm', clientController.searchLivros); 

// GÊNERO -------------------------------------------------------------------------------

// Criar um Genero
router.post("/api/registerGender", clientController.registerGender); 

// AUTOR --------------------------------------------------------------------------------

// Criar um Autor
router.post("/api/registerAutor", clientController.registerAutor); 

// EMPRÉSTIMO ---------------------------------------------------------------------------

// Criar um novo empréstimo
router.post("/api/emprestimo", clientController.createEmprestimo);
// Atualizar o estado de um empréstimo (apenas bibliotecário)
router.put("/api/emprestimo/:id/atualizarEstado", clientController.atualizarEstadoEmprestimo);
// Rota para listar todos os empréstimos
router.get('/api/emprestimo/listEmprestimo', clientController.getAllEmprestimos);
// Rota para listar os empréstimos de um usuário específico
router.get('/api/emprestimo/listEmprestimo/:user_rm', clientController.getEmprestimosByUserRm);
// Rota para listar os empréstimos de um usuário específico
router.put('/api/emprestimo/atualizarEstadoEmprestimo/:id', clientController.atualizarEstadoEmprestimo);
// Endpoint para verificar e atualizar empréstimos atrasados manualmente
router.post("/api/emprestimos/verificar-atrasos", clientController.atualizarAtrasos);





//teste
// router.post("/api/validade", clientController.loginBiblio);

// router.post("/api/contato", clientController.createNewMensagem)

// router.post('/api/reset', clientController.getEmailReset)
// router.post('/api/resetpassword', clientController.ResetSenha)

// router.post('/api/pedidos', clientController.createPedido);
// router.delete('/api/pedidos/:id', clientController.deletePedido);
// router.get('/api/pedidos', clientController.getAllPedidos);

module.exports = router;