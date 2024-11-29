const clientController = require("../model/models");
const jwt = require('jsonwebtoken');

// Chave secreta para assinar os tokens - em produção, use variáveis de ambiente
const JWT_SECRET = "sua_chave_secreta_aqui"; // Idealmente em process.env.JWT_SECRET

const { parse, isValid, format } = require("date-fns");

const useController = {
  getRoot: async (req, res) => {
    res.status(200).json({
        message: "The API is running!!!" 
    });
},

  //Criar novo estudante
  createNewStudent: async (req, res) => {
    const { nome, email, rm, senha, confirmSenha } = req.body;

    console.log("Dados recebidos no controller:", {
      nome,
      email,
      rm,
      senha,
      confirmSenha,
    });

    if (!senha) {
      return res.status(400).json({ msg: "Senha é obrigatória" });
    }

    // Verificação de email (usando regex)
    // ^[^\s@]+ : Garante que o email não comece com espaços ou caracteres inválidos antes do @.
    // @[^\s@]+ : Garante que o domínio após o @ seja válido e não contenha espaços ou caracteres inválidos.
    // \.[^\s@]+$ : Garante que após o ponto exista um domínio válido, que não contenha espaços ou caracteres inválidos.
    //Dessa forma ele pode abrangir emails de diversos provedores como: nome@dominio.org mas nao deixara que sejam aceitos emails invalidos como: exemplo@com, email@dominio, email.com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Email inválido" });
    }
    try {
      const sqlConfirmEmailLibrarian = await clientController.getLibrarianByEmail(email);
      const sqlConfirmEmailStudent = await clientController.getStudentByEmail(email);
      const sqlConfirmRm = await clientController.getStudentByRm(rm);

      if (sqlConfirmEmailLibrarian.length > 0) {
        return res
          .status(401)
          .json({ msg: "O email já está cadastrado como Bibliotecário no Banco de Dados" });
      }

      if (sqlConfirmEmailStudent.length > 0) {
        return res
          .status(401)
          .json({ msg: "O email já está cadastrado no Banco de Dados" });
      }

      if (sqlConfirmRm.length > 0) {
        return res
          .status(401)
          .json({ msg: "O RM já está cadastrado no Banco de Dados" });
      }

      console.log("Dados antes de chamar registerStudent:", {
        nome,
        email,
        rm,
        senha,
      });

      const result = await clientController.registerStudent(
        nome,
        email,
        rm,
        senha
      );
      return res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },

  //Login Novo estudante

  loginStudent: async (req, res) => {
    const { email, senha } = req.body;

    try {
      const student = await clientController.validateLoginStudents(email, senha);

      if (student) {
        // Criar o token JWT
        const token = jwt.sign(
          {
            id: student.id,
            email: student.email,
            rm: student.rm
          },
          JWT_SECRET,
          { expiresIn: '24h' } // Token expira em 24 horas
        );

        // Remover dados sensíveis antes de enviar
        const { senha: _, confirmSenha: __, ...studentData } = student;

        return res.json({
          message: "Login realizado com sucesso",
          token: token,
          student: studentData
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

  //Listar todos os Estudantes
  listarStudents: async (req, res) => {
    try {
      const estudantes = await clientController.getAllStudents();
      res.status(200).json(estudantes);
    } catch (error) {
      console.error("Erro ao buscar os estudantes:", error);
      res.status(500).json({
        msg: "Erro ao buscar os estudantes",
        error: error.message
      });
    }
  },

  //Listar os Estudantes por ID
  ListarStudentsByID: async (req, res) => {
    const { id } = req.params;

    try {
      const Students = await clientController.getStudentByID(id);

      // Verifica se o array está vazio
      if (!Students || Students.length === 0) {
        return res.status(404).json({
          msg: `Não existe nenhum aluno com o ID ${id}`
        });
      }

      res.status(200).json(Students);
    } catch (error) {
      console.error("Erro ao buscar estudante:", error);
      res.status(500).json({
        msg: "Erro ao buscar estudante",
        error: error.message
      });
    }
  },

  ListarStudentsByRm: async (req, res) => {
    const { rm } = req.params;

    try {
      const Students = await clientController.getStudentByRm(rm);

      // Verifica se o array está vazio
      if (!Students || Students.length === 0) {
        return res.status(404).json({
          msg: `Não existe nenhum aluno com o RM ${rm}`
        });
      }

      res.status(200).json(Students);
    } catch (error) {
      console.error("Erro ao buscar estudante:", error);
      res.status(500).json({
        msg: "Erro ao buscar estudante",
        error: error.message
      });
    }
  },

  ListarStudentsByEmail: async (req, res) => {
    const { email } = req.params;

    try {
      const Students = await clientController.getByStudentEmail(email);

      // Verifica se o array está vazio
      if (!Students || Students.length === 0) {
        return res.status(404).json({
          msg: `Não existe nenhum aluno com o email ${email}`
        });
      }

      res.status(200).json(Students);
    } catch (error) {
      console.error("Erro ao buscar estudante:", error);
      res.status(500).json({
        msg: "Erro ao buscar estudante",
        error: error.message
      });
    }
  },

  // Atualizar os Estudantes
  // Atualizar os Estudantes
  updateStudent: async (req, res) => {
    const { rm } = req.params;
    const updateData = req.body;
    const { email } = updateData;  // Extrair o email do corpo da requisição

    if (!rm) {
      return res.status(400).json({ msg: "O RM é obrigatório" });
    }

    try {
      // Verifica se o estudante existe
      const student = await clientController.getStudentByRm(rm);
      if (student.length === 0) {
        return res.status(404).json({ msg: "Estudante não encontrado" });
      }

      // Verifica se o email foi alterado e se já existe como email de bibliotecário
      if (email) {
        const sqlConfirmEmailLibrarian = await clientController.getLibrarianByEmail(email);
        if (sqlConfirmEmailLibrarian.length > 0) {
          return res.status(401).json({ msg: "O email já está cadastrado como Bibliotecário no Banco de Dados" });
        }
      }

      // Atualiza o estudante
      const result = await clientController.updateStudentInDB(rm, updateData);
      return res.status(200).json({ msg: "Estudante atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar estudante:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },


  //Deletar os Estudantes
  deleteStudent: async (req, res) => {
    const { rm } = req.params;

    if (!rm) {
      return res.status(400).json({ msg: "O RM é obrigatório" });
    }

    try {
      // Verifica se o estudante existe
      const student = await clientController.getStudentByRm(rm);
      if (student.length === 0) {
        return res.status(404).json({ msg: "Estudante não encontrado" });
      }

      // Deleta o estudante
      const result = await clientController.deleteStudentFromDB(rm);
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Estudante não encontrado" });
      }
      return res.status(200).json({ msg: "Estudante deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar estudante:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },

  //Verificar Token do estudante

  // Middleware para verificar token
  verifyToken: async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  },

  //Criar novo Bibliotecário

  createNewLibrarian: async (req, res) => {
    const { nome, email, cfb, senha, confirmSenha } = req.body;

    // Debug - verificar os dados recebidos
    console.log("Dados recebidos no controller", {
      nome,
      email,
      cfb,
      senha,
      confirmSenha,
    });

    // Verificação de senha
    if (!senha) {
      return res.status(400).json({ msg: "Senha é obrigatória" });
    }

    // Verificação de email (usando regex)
    // ^[^\s@]+ : Garante que o email não comece com espaços ou caracteres inválidos antes do @.
    // @[^\s@]+ : Garante que o domínio após o @ seja válido e não contenha espaços ou caracteres inválidos.
    // \.[^\s@]+$ : Garante que após o ponto exista um domínio válido, que não contenha espaços ou caracteres inválidos.
    //Dessa forma ele pode abrangir emails de diversos provedores como: nome@dominio.org mas nao deixara que sejam aceitos emails invalidos como: exemplo@com, email@dominio, email.com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Email inválido" });
    }

    // Verificação se as senhas coincidem
    if (senha !== confirmSenha) {
      return res.status(400).json({ msg: "As senhas não coincidem" });
    }

    try {
      // Verificando se o email ou o CFB já estão cadastrados
      const sql = await clientController.getLibrarianByEmail(email);
      const sqlConfirmEmailStudent = await clientController.getStudentByEmail(email);
      const sqlConfirmCfb = await clientController.getByCfb(cfb);

      if (sqlConfirmEmailStudent.length > 0) {
        return res
          .status(401)
          .json({ msg: "O email já está cadastrado no Banco de Dados" });
      }

      if (sql.length > 0) {
        return res.status(401).json({ msg: "O email já está cadastrado no Banco de Dados" });
      }

      if (sqlConfirmCfb.length > 0) {
        return res.status(401).json({ msg: "O CFB já está cadastrado no Banco de Dados" });
      }

      // Registrando o novo bibliotecário
      const result = await clientController.registerLibrarian(nome, email, cfb, senha);
      return res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
    } catch (error) {
      console.log("Erro ao cadastrar usuário", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },

  //Login Bibliotecário

  loginLibrarian: async (req, res) => {
    let { email, senha } = req.body;
    try {
      const librarian = await clientController.validateLoginLibrarian(email, senha);

      if (librarian) {
        const librarianToken = jwt.sign(
          {
            id: librarian.id,
            email: librarian.email,
            cfb: librarian.cfb
          },
          JWT_SECRET,
          { expiresIn: '24h' }
        );

        return res.json({
          message: "Login realizado com sucesso",
          librarianToken: librarianToken,
          librarian: { ...librarian, senha: undefined } // Importante remover a senha
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

  updateLibrarian: async (req, res) => {
    const { cfb } = req.params;
    const updateData = req.body;
    const { email } = updateData;

    // Validações básicas
    if (!cfb) {
      return res.status(400).json({ msg: "CFB é obrigatório" });
    }

    try {
      // Primeiro, verificar se o bibliotecário existe
      const librarian = await clientController.getByCfb(cfb);
      if (librarian.length === 0) {
        return res.status(404).json({ msg: "Bibliotecário não encontrado" });
      }

      // Verifica se o email foi alterado e se já existe como email de bibliotecário
      if (email) {
        const sqlConfirmEmailStudent = await clientController.getStudentByEmail(email);
        if (sqlConfirmEmailStudent.length > 0) {
          return res.status(401).json({ msg: "O email já está cadastrado como Aluno no Banco de Dados" });
        }
      }

      // Atualiza o estudante
      const result = await clientController.updateLibrarianInDB(cfb, updateData);
      return res.status(200).json({ msg: "Bibliotecario atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar o Bibliotecario:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }

  },

  // Deletar o cadastro do bibliotecário
  deleteLibrarian: async (req, res) => {
    const { cfb } = req.params;

    if (!cfb) {
      return res.status(400).json({ msg: "CFB é obrigatório" });
    }

    try {
      // Primeiro, verificar se o bibliotecário existe
      const librarian = await clientController.getByCfb(cfb);
      if (librarian.length === 0) {
        return res.status(404).json({ msg: "Bibliotecário não encontrado" });
      }

      // Deleta o biblitoecario
      const result = await clientController.deleteLibrarianFromDB(cfb);
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Bibliotecário não encontrado" });
      }
      return res.status(200).json({ msg: "Bibliotecário deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar o Bibliotecário:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },

  //Listar os Bibliotecarios por ID
  listarLibrarianById: async (req, res) => {
    const { id } = req.params;

    try {
      const Librarian = await clientController.getLibrarianById(id);

      // Verifica se o array está vazio
      if (!Librarian || Librarian.length === 0) {
        return res.status(404).json({
          msg: `Não existe nenhum bibliotecario com o ID ${id}`
        });
      }

      res.status(200).json(Librarian);
    } catch (error) {
      console.error("Erro ao buscar bibliotecario:", error);
      res.status(500).json({
        msg: "Erro ao buscar bibliotecario",
        error: error.message
      });
    }
  },

  //Listar Bibliotecarios por Email
  listarLibrarianByEmail: async (req, res) => {
    const { email } = req.params;

    try {
      const Librarian = await clientController.getLibrarianByEmail(email);

      // Verifica se o array está vazio
      if (!Librarian || Librarian.length === 0) {
        return res.status(404).json({
          msg: `Não existe nenhum bibliotecario com o email ${email}`
        });
      }

      res.status(200).json(Librarian);
    } catch (error) {
      console.error("Erro ao buscar bibliotecario:", error);
      res.status(500).json({
        msg: "Erro ao buscar bibliotecario",
        error: error.message
      });
    }
  },

  //Listar Bibliotecarios por CFB
  listarLibrarianByCfb: async (req, res) => {
    const { cfb } = req.params;

    try {
      const Librarian = await clientController.getByCfb(cfb);

      // Verifica se o array está vazio
      if (!Librarian || Librarian.length === 0) {
        return res.status(404).json({
          msg: `Não existe nenhum bibliotecario com o CFB ${cfb}`
        });
      }

      res.status(200).json(Librarian);
    } catch (error) {
      console.error("Erro ao buscar bibliotecario:", error);
      res.status(500).json({
        msg: "Erro ao buscar bibliotecario",
        error: error.message
      });
    }
  },

  listarAllLibrarians: async (req, res) => {
    try {
      const Librarian = await clientController.getAllLibrarian();
      res.status(200).json(Librarian);
    } catch (error) {
      console.error("Erro ao buscar os bibliotecarios:", error);
      res.status(500).json({
        msg: "Erro ao buscar os bibliotecarios",
        error: error.message
      });
    }
  },

  //Verificar Token do Bibliotecário

  verifyLibrarianToken: async (req, res, next) => {
    const librarianToken = req.headers["authorization"]?.split(" ")[1];

    if (!librarianToken) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    try {
      const decoded = jwt.verify(librarianToken, JWT_SECRET);
      req.librarian = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token inválido" });
    }
  },

  //Listar todos os livros
  listarLivros: async (req, res) => {
    try {
      const livros = await clientController.getAllLivros();
      res.status(200).json(livros);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      res.status(500).json({
        msg: "Erro ao buscar livros",
        error: error.message
      });
    }
  },

  //Listar livros por ID

  ListarLivrosByID: async (req, res) => {
    const { id } = req.params;
    
    try {
      const livro = await clientController.getLivroById(id);

      if (!livro) {
        return res.status(404).json({
          msg: "Livro não encontrado"
        });
      }

      res.status(200).json(livro);
    } catch (error) {
      console.error("Erro ao buscar livro:", error);
      res.status(500).json({
        msg: "Erro ao buscar livro",
        error: error.message
      });
    }
  },

  //Pesquisar Livros
  searchLivros: async (req, res) => {
    const searchTerm = req.params.searchTerm; // Certifique-se de pegar corretamente o parâmetro

    if (!searchTerm || searchTerm.trim() === '') {
      return res.status(400).json({ msg: "Termo de busca é obrigatório" });
    }

    try {
      const livros = await clientController.searchLivros(searchTerm);

      if (livros.length === 0) {
        return res.status(404).json({ msg: "Nenhum livro encontrado" });
      }

      res.status(200).json(livros);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      res.status(500).json({
        msg: "Erro ao buscar livros",
        error: error.message
      });
    }
  },

  // //CONTATO NOVA MENSAGEM
  // createNewMensagem: async (req, res) => {
  //     const { id, nome, numero, email, mensagem } = req.body;
  //Criar novo livro

  registerBook: async (req, res) => {
    const {
      image,
      titulo,
      descricao,
      nome_autor,
      editora,
      nome_genero,
      quantidade,
      codigo,
      avaliacao = 0,
      estado = "D"
    } = req.body;

    console.log("Dados recebidos no controller:", {
      image, titulo, descricao, nome_autor, editora, nome_genero, quantidade, codigo, estado, avaliacao
    });

    if (!codigo) {
      return res.status(400).json({ msg: "O código é obrigatório" });
    }

    if (!nome_autor) {
      return res.status(400).json({ msg: "O nome do autor é obrigatório" });
    }

    try {
      const sqlBookCode = await clientController.getByBookCode(codigo);

      if (sqlBookCode.length > 0) {
        return res
          .status(401)
          .json({ msg: "O código deste livro já está cadastrado no Banco de Dados" });
      }

      console.log("Dados antes de chamar registerBooks:", {
        image, titulo, descricao, nome_autor, editora, nome_genero, quantidade, codigo, avaliacao, estado
      });

      const result = await clientController.registerBooks(
        image,
        titulo,
        descricao,
        nome_autor,
        editora,
        nome_genero,
        quantidade,
        codigo,
        avaliacao,
        estado
      );

      return res.status(201).json({
        msg: "Livro cadastrado com sucesso",
        result: result
      });
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
      return res.status(500).json({
        msg: "Erro interno do servidor",
        error: error.message
      });
    }
  },

  deleteBook: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "O ID é obrigatório" });
    }

    try {
      // Verifica se o livro existe
      const livro = await clientController.getLivroById(id);
      if (livro.length === 0) {
        return res.status(404).json({ msg: "Livro não encontrado" });
      }

      // Verifica o estado do livro
      const estadoAtual = livro[0].estado; // Ve se está disponível para alguma modificação
      const quantidadeAtual = livro[0].quantidade; // Quantidade de livros presentes 

      if (estadoAtual !== "D") {
        return res.status(403).json({ msg: "O livro não pode ser deletado, pois não está disponível." });
      }

      if (quantidadeAtual > 1) {
        // Reduz a quantidade do livro em vez de deletar
        const result = await clientController.updateBookQuantity(id, quantidadeAtual - 1);
        return res.status(200).json({ msg: "Quantidade do livro atualizada com sucesso", quantidadeAtualizada: quantidadeAtual - 1 });
      } else {
        // Deleta o livro porque a quantidade é 1
        const result = await clientController.deleteBook(id);
        if (result.affectedRows === 0) {
          return res.status(404).json({ msg: "Livro não encontrado" });
        }
        return res.status(200).json({ msg: "Livro deletado com sucesso" });
      }
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },


  registerGender: async (req, res) => {
    const {
      nome_genero
    } = req.body;

    console.log("Dados recebidos no controller:", {
      nome_genero
    });

    if (!nome_genero) {
      return res.status(400).json({ msg: "O nome do genero é obrigatório" });
    }

    try {
      const sqlGenderName = await clientController.getGenderByName(nome_genero);

      if (sqlGenderName.length > 0) {
        return res
          .status(401)
          .json({ msg: "Este genero já está cadastrado no Banco de Dados" });
      }

      const result = await clientController.registerGender(
        nome_genero
      );
      return res.status(201).json({ msg: "Genero cadastrado com sucesso" });
    } catch (error) {
      console.error("Erro ao cadastrar genero:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },



  registerAutor: async (req, res) => {
    const {
      nome_autor,
      data_nascimento,
      image,
      sobre
    } = req.body;

    console.log("Dados recebidos no controller:", {
      nome_autor, data_nascimento, image, sobre
    });

    if (!nome_autor) {
      return res.status(400).json({ msg: "O nome é obrigatório" });
    }

    // Validação e formatação da data de nascimento
    if (!data_nascimento) {
      return res.status(400).json({ msg: "A data de nascimento é obrigatória" });
    }

    const parsedDate = parse(data_nascimento, "yyyy-MM-dd", new Date());

    if (!isValid(parsedDate)) {
      return res.status(400).json({ msg: "A data de nascimento está em um formato inválido" });
    }

    // Formatando a data para o padrão do banco (yyyy-MM-dd)
    const formattedDate = format(parsedDate, "yyyy-MM-dd");

    try {
      const sqlAutorName = await clientController.getAutorByName(nome_autor);

      if (sqlAutorName.length > 0) {
        return res
          .status(401)
          .json({ msg: "O nome deste autor já está cadastrado no Banco de Dados" });
      }

      const result = await clientController.registerAutor(
        nome_autor,
        formattedDate, // Use a data formatada aqui
        image,
        sobre
      );
      return res.status(201).json({ msg: "Autor cadastrado com sucesso" });
    } catch (error) {
      console.error("Erro ao cadastrar Autor:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },

  // Listar livros de um autor por ID
  listarLivrosPorAutor: async (req, res) => {
    const { id_autor } = req.params;

    try {
      const livros = await clientController.getLivrosByAutorId(id_autor);

      if (!livros || livros.length === 0) {
        return res.status(404).json({
          msg: "Nenhum livro encontrado para este autor"
        });
      }

      res.status(200).json(livros);
    } catch (error) {
      console.error("Erro ao buscar livros do autor:", error);
      res.status(500).json({
        msg: "Erro ao buscar livros do autor",
        error: error.message
      });
    }
  },
  listarLivrosPorNomeAutor: async (req, res) => {
    const { nome_autor } = req.params;

    try {
      const livros = await clientController.getLivrosByAutorName(nome_autor);

      if (!livros || livros.length === 0) {
        return res.status(404).json({
          msg: "Nenhum livro encontrado para este autor"
        });
      }

      res.status(200).json(livros);
    } catch (error) {
      console.error("Erro ao buscar livros do autor:", error);
      res.status(500).json({
        msg: "Erro ao buscar livros do autor",
        error: error.message
      });
    }
  },

  // Listar livros de um gênero por ID
  listarLivrosPorGenero: async (req, res) => {
    const { id_genero } = req.params;

    try {
      const livros = await clientController.getLivrosByGeneroId(id_genero);

      if (!livros || livros.length === 0) {
        return res.status(404).json({
          msg: "Nenhum livro encontrado para este gênero"
        });
      }

      res.status(200).json(livros);
    } catch (error) {
      console.error("Erro ao buscar livros do gênero:", error);
      res.status(500).json({
        msg: "Erro ao buscar livros do gênero",
        error: error.message
      });
    }
  },

  listarLivrosPorNomeGenero: async (req, res) => {
    const { nome_genero } = req.params; // Obtém o parâmetro 'nome_genero' da rota

    try {
      console.log(`Buscando livros para o gênero: ${nome_genero}`); // Log para debug

      // Chama o método que busca os livros por gênero no banco
      const livros = await clientController.getLivrosByGeneroNome(nome_genero);

      // Caso não encontre livros, retorna 404
      if (!livros || livros.length === 0) {
        return res.status(404).json({
          msg: "Nenhum livro encontrado para este gênero"
        });
      }

      // Log dos livros encontrados (para depuração)
      console.log(`Livros encontrados: ${JSON.stringify(livros)}`);

      // Retorna os livros encontrados
      res.status(200).json(livros);
    } catch (error) {
      // Captura e registra o erro
      console.error("Erro ao buscar livros por gênero:", error);

      // Retorna erro 500 ao cliente com uma mensagem detalhada
      res.status(500).json({
        msg: "Erro ao buscar livros por gênero",
        error: error.message
      });
    }
  },



  ListarAutores: async (req, res) => {
    try {
      const autores = await clientController.getAllAutores();
      res.status(200).json(autores);
    } catch (error) {
      console.error("Erro ao buscar Autores:", error);
      res.status(500).json({
        msg: "Erro ao buscar Autores",
        error: error.message
      });
    }
  },

  //Listar generos
  ListarGeneros: async (req, res) => {
    try {
      const generos = await clientController.getAllGeneros();
      res.status(200).json(generos);
    } catch (error) {
      console.error("Erro ao buscar Generos:", error);
      res.status(500).json({
        msg: "Erro ao buscar Generos",
        error: error.message
      });
    }
  },

  updateBook: async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ msg: "O ID é obrigatório" });
    }

    try {
      // Verifica se o livro existe
      const livro = await clientController.getLivroById(id);
      if (livro.length === 0) {
        return res.status(404).json({ msg: "Livro não encontrado" });
      }

      // Verifica o estado do livro
      const estadoAtual = livro[0].estado; // Assume que o estado está na primeira posição do resultado
      if (estadoAtual !== "D") {
        return res.status(403).json({ msg: "O livro não pode ser alterado, pois não está disponível." });
      }

      // Atualiza o livro
      const result = await clientController.updateBook(id, updateData);
      return res.status(200).json({ msg: "Livro atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },

  // Método createEmprestimo
  createEmprestimo: async (req, res) => {
    const { user_rm, livro_id, prazo_dias } = req.body;

    if (!user_rm || !livro_id || !prazo_dias) {
      return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
    }

    if (![7, 14].includes(prazo_dias)) {
      return res.status(400).json({ msg: "O prazo deve ser de 7 ou 14 dias" });
    }

    if (!user_rm) {
      return res.status(400).json({ msg: "O RM é obrigatório" });
    }

    try {
      const student = await clientController.getStudentByRm(user_rm);
      if (student.length === 0) {
        return res.status(404).json({ msg: "Estudante não encontrado" });
      }
      // Verificar quantidade de empréstimos ativos
      const emprestimosAtivos = await clientController.countEmprestimosAtivos(user_rm);

      if (emprestimosAtivos >= 2) {
        return res.status(400).json({
          msg: "Você já possui 2 empréstimos ativos. Por favor, devolva um dos livros antes de fazer um novo empréstimo."
        });
      }

      // Obter livro pelo ID e verificar quantidade
      const livro = await clientController.getQntLivrosById(livro_id);
      if (!livro) {
        return res.status(404).json({ msg: `Livro não encontrado: ID ${livro_id}` });
      }

      if (livro.quantidade <= 0) {
        return res.status(400).json({ msg: "Nenhum exemplar disponível para empréstimo" });
      }

      // Criar data de empréstimo e devolução no formato ISO (YYYY-MM-DD)
      const dataAtual = new Date();
      const dataDevolucao = new Date();
      dataDevolucao.setDate(dataDevolucao.getDate() + prazo_dias);

      const dataEmprestimoFormatada = dataAtual.toISOString().split('T')[0];
      const dataDevolucaoFormatada = dataDevolucao.toISOString().split('T')[0];

      // Criar o empréstimo
      await clientController.criarEmprestimo(
        user_rm,
        livro_id,
        dataEmprestimoFormatada,
        dataDevolucaoFormatada
      );

      // Subtrair a quantidade de livros disponíveis
      await clientController.subtrairQuantidadeLivro(livro_id);

      // Verificar se a quantidade restante é 0 e alterar o estado para "E" se necessário
      if (livro.quantidade - 1 === 0) {
        await clientController.updateLivroEstado(livro_id, 'E');
      }

      return res.status(201).json({ msg: "Empréstimo criado com sucesso" });
    } catch (error) {
      console.error("Erro ao criar empréstimo:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },

  atualizarEstadoEmprestimo: async (req, res) => {
    const { id } = req.params;
    const { novo_estado, avaliacao } = req.body;

    // Validações
    if (!id || !novo_estado) {
      return res.status(400).json({ msg: "ID e novo estado são obrigatórios" });
    }

    if (!["ativo", "concluído", "atrasado"].includes(novo_estado)) {
      return res.status(400).json({ msg: "Estado inválido" });
    }

    // Validação da avaliação
    if (novo_estado === "concluído" && (!avaliacao === 1 || avaliacao === 2 || avaliacao === 3 || avaliacao === 4 || avaliacao === 5)) {
      return res.status(400).json({ msg: "Avaliação inválida. Deve ser um número entre 1 e 5" });
    }

    try {
      // Verificar se o empréstimo existe
      const [emprestimo] = await clientController.getEmprestimoById(id);
      if (!emprestimo) {
        return res.status(404).json({ msg: "Empréstimo não encontrado" });
      }

      // Se for uma devolução (concluído), verificar a quantidade de empréstimos
      if (novo_estado === "concluído") {
        // Atualizar estado do livro para "Disponível"
        await clientController.updateLivroEstado(emprestimo.livro_id, 'D');

        // Atualizar avaliação do empréstimo
        await clientController.atualizarAvaliacaoEmprestimo(id, avaliacao);

        // Atualizar avaliação média do livro
        await clientController.atualizarAvaliacaoLivro(emprestimo.livro_id, avaliacao);
      }
      // Se for uma nova solicitação de empréstimo (ativo), verificar limite
      else if (novo_estado === "ativo") {
        // Contar empréstimos ativos do usuário
        const emprestimosAtivos = await clientController.countEmprestimosAtivos(emprestimo.user_rm);

        if (emprestimosAtivos >= 2) {
          return res.status(400).json({
            msg: "Limite de empréstimos excedido. Devolva um livro antes de solicitar outro."
          });
        }
      }

      // Atualizar o estado do empréstimo
      await clientController.atualizarEstadoEmprestimo(id, novo_estado);

      return res.status(200).json({ msg: "Estado do empréstimo atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar estado do empréstimo:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },

  // Atualizar o estado de um empréstimo (bibliotecário)
  getAllEmprestimos: async (req, res) => {
    try {
      const emprestimos = await clientController.getAllEmprestimos();
      return res.status(200).json(emprestimos);
    } catch (error) {
      console.error('Erro ao obter todos os empréstimos:', error);
      return res.status(500).json({ msg: 'Erro interno do servidor' });
    }
  },

  getEmprestimosByUserRm: async (req, res) => {
    const { user_rm } = req.params;
  
    console.log('Received RM:', user_rm);
    console.log('RM Type:', typeof user_rm);
  
    try {
      const emprestimos = await clientController.getEmprestimosByUserRm(user_rm);
      
      // Se nenhum empréstimo for encontrado, retorne um array vazio
      if (emprestimos.length === 0) {
        return res.status(404).json({ 
          message: 'Nenhum empréstimo encontrado para este usuário',
          user_rm: user_rm 
        });
      }
  
      return res.status(200).json(emprestimos);
    } catch (error) {
      console.error(`Erro ao obter empréstimos do usuário RM ${user_rm}:`, error);
      return res.status(500).json({ 
        msg: 'Erro interno do servidor',
        error: error.message 
      });
    }
  },
  

  atualizarAtrasos: async (req, res) => {
    try {
      // Obter empréstimos cuja data_devolucao expirou
      const emprestimosAtrasados = await clientController.getEmprestimosAtrasados();
  
      if (emprestimosAtrasados.length === 0) {
        return res.status(200).json({ msg: "Nenhum empréstimo atrasado encontrado." });
      }
  
      // Atualizar o estado de cada empréstimo para "atrasado"
      for (const emprestimo of emprestimosAtrasados) {
        await clientController.updateEmprestimoEstado(emprestimo.emprestimo_id, "atrasado");
      }
  
      return res.status(200).json({
        msg: `${emprestimosAtrasados.length} empréstimo(s) atualizado(s) para 'atrasado'.`,
      });
    } catch (error) {
      console.error("Erro ao atualizar empréstimos atrasados:", error);
      return res.status(500).json({ msg: "Erro interno ao verificar atrasos." });
    }
  },


  getEmprestimosAtivos: async (req, res) => {
    try {
      const emprestimos = await clientController.getEmprestimosByEstado('ativo');
      return res.status(200).json(emprestimos);
    } catch (error) {
      console.error('Erro ao obter empréstimos ativos:', error);
      return res.status(500).json({ msg: 'Erro interno do servidor' });
    }
  },

  getEmprestimosAtrasados: async (req, res) => {
    try {
      const emprestimos = await clientController.getEmprestimosByEstado('atrasado');
      return res.status(200).json(emprestimos);
    } catch (error) {
      console.error('Erro ao obter empréstimos atrasados:', error);
      return res.status(500).json({ msg: 'Erro interno do servidor' });
    }
  },

  //Atualizar oo autor
  updateAutor: async (req, res) => {
    const { id_autor } = req.params;
    const { nome_autor, data_nascimento, image, sobre } = req.body;

    if (!id_autor) {
      return res.status(400).json({ msg: "O ID é obrigatório" });
    }

    try {
      // Verifica se o autor existe
      const [existingAutor] = await clientController.getAutorById(id_autor);
      if (!existingAutor) {
        return res.status(404).json({ msg: "Autor não encontrado" });
      }

      // Validação da data de nascimento (se fornecida)
      let formattedDate = existingAutor.data_nascimento;
      if (data_nascimento) {
        const parsedDate = parse(data_nascimento, "yyyy-MM-dd", new Date());
        if (!isValid(parsedDate)) {
          return res.status(400).json({ msg: "A data de nascimento está em um formato inválido" });
        }
        formattedDate = format(parsedDate, "yyyy-MM-dd");
      }

      // Preparar dados para atualização
      const updateData = {
        nome_autor: nome_autor || existingAutor.nome_autor,
        data_nascimento: formattedDate,
        image: image || existingAutor.image,
        sobre: sobre || existingAutor.sobre
      };

      // Verificar se o novo nome já existe (se diferente do atual)
      if (nome_autor && nome_autor !== existingAutor.nome_autor) {
        const [existingName] = await clientController.getAutorByName(nome_autor);
        if (existingName) {
          return res.status(401).json({ msg: "O nome deste autor já está cadastrado no Banco de Dados" });
        }
      }

      // Atualizar o autor
      const result = await clientController.updateAutorInDB(id_autor, updateData);
      return res.status(200).json({ msg: "Autor atualizado com sucesso" });

    } catch (error) {
      console.error("Erro ao atualizar o Autor:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },

  //Atualizar os generos
  updateGender: async (req, res) => {
    const { id_genero } = req.params;
    const updateData = req.body;

    if (!id_genero) {
      return res.status(400).json({ msg: "O ID é obrigatório" });
    }

    try {
      // Verifica se o genero existe
      const gender = await clientController.getGenderById(id_genero);
      if (gender.length === 0) {
        return res.status(404).json({ msg: "Gênero não encontrado" });
      }

      // Extrai o nome do gênero
      const nome_genero = gender[0].nome_genero;

      // Atualiza o genero
      const result = await clientController.updateGenderInDB(id_genero, updateData);
      return res.status(200).json({ msg: "Gênero atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar o Gênero:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },

  deleteGender: async (req, res) => {
    const { id_genero } = req.params;

    if (!id_genero) {
      return res.status(400).json({ msg: "O ID do gênero é obrigatório" });
    }

    try {
      // Verifica se o gênero existe
      const gender = await clientController.getGenderById(id_genero);
      if (gender.length === 0) {
        return res.status(404).json({ msg: "Gênero não encontrado" });
      }

      // Deleta o gênero
      const result = await clientController.deleteGenderFromDB(id_genero);
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Gênero não encontrado" });
      }
      return res.status(200).json({ msg: "Gênero deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar gênero:", error);

      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },

  deleteAutor: async (req, res) => {
    const { id_autor } = req.params;

    if (!id_autor) {
      return res.status(400).json({ msg: "O ID do Autor é obrigatório" });
    }

    try {
      // Verifica se o Autor existe
      const autor = await clientController.getAutorById(id_autor);
      if (autor.length === 0) {
        return res.status(404).json({ msg: "Autor não encontrado" });
      }

      // Deleta o Autor
      const result = await clientController.deleteAutorFromDB(id_autor);
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Autor não encontrado" });
      }
      return res.status(200).json({ msg: "Autor deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar Autor:", error);

      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },
}
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


module.exports = useController;