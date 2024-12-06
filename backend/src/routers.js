const express = require("express");
const clientController = require("../controller/controller");
const { getMessageByRM } = require("../model/models");
const router = express.Router();

//Rota raiz do projeto
router.get("/", clientController.getRoot);

// USUÁRIO --------------------------------------------------------------------------------

//Cadastrar novo estudante
router.post("/api/createStudent", clientController.createNewStudent);
//Validar o Login do Estudante
router.post("/api/loginStudent", clientController.loginStudent);
//Atualizar Cadastro do estudante
router.put("/api/updateStudent/:rm", clientController.updateStudent);
// Deletar estudante
router.delete("/api/deleteStudent/:rm", clientController.deleteStudent);
//Listar todos os Estudantes
router.get("/api/listAllStudents", clientController.listarStudents);
//Listar estudantes por ID
router.get("/api/listStudents/:id", clientController.ListarStudentsByID);
//Listar estudantes por RM
router.get("/api/listStudentsByRm/:rm", clientController.ListarStudentsByRm);
//Listar estudantes por Email
router.get("/api/listStudentsByEmail/:email", clientController.ListarStudentsByEmail);

// BIBLIOTECÁRIO -------------------------------------------------------------------------

//Cadastrar novo Bibliotecario
router.post("/api/createLibrarian", clientController.createNewLibrarian);
//Validar o Login do Bibliotecario
router.post("/api/loginLibrarian", clientController.loginLibrarian);
// Atualizar cadastro dos Bibliotecarios
router.put("/api/librarian/:cfb", clientController.updateLibrarian);
// Deletar cadastro dos Bibliotecarios
router.delete("/api/deleteLibrarian/:cfb", clientController.deleteLibrarian);
// Listar Todos os Bibliotecarios
router.get("/api/listAllLibrarian", clientController.listarAllLibrarians);
//Listar Bibliotecarios por ID
router.get("/api/listLibrarianById/:id", clientController.listarLibrarianById);
//Listar Bibliotecarios por CFB
router.get("/api/ListLibrarianByCfb/:cfb", clientController.listarLibrarianByCfb);
// Listar Bibliotecarios por Email
router.get("/api/listLibrarianByEmail/:email", clientController.listarLibrarianByEmail);

// LIVRO ---------------------------------------------------------------------------------

//Rota para Criar Livro
router.post("/api/registerBook", clientController.registerBook);
// Rota para atualizar um livro
router.put("/api/updateBook/:id", clientController.updateBook);
//Rota para deletar um livro
router.delete("/api/deleteBook/:id", clientController.deleteBook)
//Listar todos os Livros
router.get("/api/listBooks", clientController.listarLivros);
//Listar Livros por ID
router.get("/api/listBooks/:id", clientController.ListarLivrosByID);
//Listar os Livros por Termo
router.get('/api/searchLivros/:searchTerm', clientController.searchLivros);

// GÊNERO -------------------------------------------------------------------------------

// Criar um Genero
router.post("/api/registerGender", clientController.registerGender);
// Atualizar um Genero
router.put("/api/updateGender/:id_genero", clientController.updateGender)
// Deletar um Genero
router.delete("/api/deleteGender/:id_genero", clientController.deleteGender);
//Listar todos os generos
router.get('/api/generos', clientController.ListarGeneros);
//Listar Livros por genero nome
router.get('/api/ListBooksByGender/:nome_genero', clientController.listarLivrosPorNomeGenero);

// AUTOR --------------------------------------------------------------------------------

// Criar um Autor
router.post("/api/registerAutor", clientController.registerAutor);
// Atualizar um Autor
router.put("/api/updateAutor/:id_autor", clientController.updateAutor)
// Deletar um Autor
router.delete("/api/deleteAutor/:id_autor", clientController.deleteAutor);
//Listar todos os autores
router.get('/api/autores', clientController.ListarAutores);
// Listar Livros por Autor ID 
router.get('/api/ListBooks/autor/:id_autor', clientController.listarLivrosPorAutor);
// Listar Livros por Nome Autor
router.get('/api/ListBooks/autor/name/:nome_autor', clientController.listarLivrosPorNomeAutor);

// EMPRÉSTIMO ---------------------------------------------------------------------------
// // Criar um novo empréstimo
router.post("/api/emprestimo", clientController.createEmprestimo);
// // Atualizar o estado de um empréstimo (apenas bibliotecário)
router.put("/api/emprestimo/:id/atualizarEstado", clientController.atualizarEstadoEmprestimo);
// // Rota para listar todos os empréstimos
router.get('/api/emprestimo/listEmprestimo', clientController.getAllEmprestimos);
// // Rota para listar todos os ativos
router.get('/api/emprestimo/listEmprestimosAtivos', clientController.getEmprestimosAtivos);
// // Rota para listar todos os atrasados
router.get('/api/emprestimo/listEmprestimoAtrasados', clientController.getEmprestimosAtrasados);
// // Rota para listar os empréstimos de um usuário específico
router.get('/api/emprestimo/listEmprestimo/:user_rm', clientController.getEmprestimosByUserRm);
// // Endpoint para verificar e atualizar empréstimos atrasados manualmente
router.post("/api/emprestimos/verificar-atrasos", clientController.atualizarAtrasos);
// // Rota para encontrar empréstimo ativo de usuário
router.get('/api/emprestimo/listEmprestimosAtivos/:user_rm', clientController.getEmprestimosAtivosByUserRm);

// SUPORTE ------------------------------------------------------------------------------
// Criar uma nova mensagem
router.post("/api/createMessage", clientController.criarMensagem);
// Listar Mensagem por RM
router.get("/api/listMessage/:student_rm", clientController.ListMessageByRM);
//Listar todas as mensagens
router.get("/api/listMessage", clientController.ListAllMessages);
//Atualizar estado da Mensagem
router.put("/api/statusMessage/:id", clientController.updateMessage );  
//Criar resposta
router.put('/suporte/:id/responder', clientController.responderChamado);

// Livros Mais emprestados
router.get("/api/mostViewed", clientController.getLivrosMaisEmprestados)


//teste
// router.post("/api/validade", clientController.loginBiblio);

// router.post("/api/contato", clientController.createNewMensagem)

// router.post('/api/reset', clientController.getEmailReset)
// router.post('/api/resetpassword', clientController.ResetSenha)

// router.post('/api/pedidos', clientController.createPedido);
// router.delete('/api/pedidos/:id', clientController.deletePedido);
// router.get('/api/pedidos', clientController.getAllPedidos);

module.exports = router;