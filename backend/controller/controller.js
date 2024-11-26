const clientController = require("../model/models");
const jwt = require('jsonwebtoken');

// Chave secreta para assinar os tokens - em produção, use variáveis de ambiente
const JWT_SECRET = "sua_chave_secreta_aqui"; // Idealmente em process.env.JWT_SECRET

const useController = {
  getRoot: async (req, res) => {
    res.status(200).json({ msg: "The API is running!!!" });
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

    //Debug - verificar os dados recebidos
    console.log("Dados recebidos no controller", {
      nome,
      email,
      cfb,
      senha,
      confirmSenha,
    });

    if (!senha) {
      return res.status(400).json({ msg: "Senha é obrigatória" });
    }

    if (!email.includes("@" && ".com")) {
      return res.status(400).json({ msg: "O email Não é valido (@)" });
    }

    if (senha != confirmSenha) {
      return res.status(400).json({ msg: "As senhas não coincidem" });
    }

    try {
      const sql = await clientController.getByEmail(email);
      const sqlConfirmCfb = await clientController.getByCfb(cfb);

      if (sql.length > 0) {
        return res
          .status(401)
          .json({ msg: "O email já esta cadastrado no Banco de Dados" });
      }

      if (sqlConfirmCfb.length > 0) {
        return res
          .status(401)
          .json({ msg: "O CFB já esta cadastrado no Banco de Dados" });
      }

      const result = await clientController.registerLibrarian(
        nome,
        email,
        cfb,
        senha
      );
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
      image, titulo, descricao, nome_autor, editora, nome_genero, quantidade, codigo
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
          .json({ msg: "O código deste livro já está cadastrado no Banco de Dados" });
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
          .json({ msg: "O código deste livro já está cadastrado no Banco de Dados" });
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
      avaliacao,
      sobre
    } = req.body;

    console.log("Dados recebidos no controller:", {
      nome_autor, data_nascimento, image, avaliacao,sobre
    });

    if (!nome_autor) {
      return res.status(400).json({ msg: "O nome é obrigatório" });
    }

    try {
      const sqlAutorName = await clientController.getAutorByName(nome_autor);

      if (sqlAutorName.length > 0) {
        return res
          .status(401)
          .json({ msg: "O nome deste autor já está cadastrado no Banco de Dados" });
      }


      const result = await clientController.registerAutor(
        nome_autor, 
        data_nascimento, 
        image, 
        avaliacao,
        sobre
      );
      return res.status(201).json({ msg: "Autor cadastrado com sucesso" });
    } catch (error) {
      console.error("Erro ao cadastrar Autor:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
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
      const estadoAtual = livro[0].estado; // Assume que o estado está na primeira posição do resultado
      if (estadoAtual !== "D") {
        return res.status(403).json({ msg: "O livro não pode ser deletado, pois não está disponível." });
      }

      // Deleta o livro
      const result = await clientController.deleteBook(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Livro não encontrado" });
      }

      return res.status(200).json({ msg: "Livro deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
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

  createEmprestimo: async (req, res) => {
    const { user_rm, livro_id, prazo_dias } = req.body;

    if (!user_rm || !livro_id || !prazo_dias) {
      return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
    }

    if (![7, 14].includes(prazo_dias)) {
      return res.status(400).json({ msg: "O prazo deve ser de 7 ou 14 dias" });
    }

    try {
      // Verificar se o livro está disponível
      const livro = await clientController.getLivroForEmprestimoById(livro_id);
      console.log("Livro retornado:", livro); // Log para depuração

      if (!livro || livro.length === 0) {
        return res.status(404).json({ msg: `Livro não encontrado: ID ${livro_id}` });
      }

      if (livro[0].estado !== "D") {
        return res.status(400).json({ msg: "Livro não está disponível para empréstimo" });
      }

      // Criar data de empréstimo e devolução
      const data_emprestimo = new Date().toISOString().split("T")[0];
      const data_devolucao = new Date();
      data_devolucao.setDate(data_devolucao.getDate() + prazo_dias);
      const dataDevolucaoFormatada = data_devolucao.toISOString().split("T")[0];

      // Criar o empréstimo, passando apenas os valores
      await clientController.criarEmprestimo(
        user_rm, // user_rm
        livro_id, // livro_id
        data_emprestimo, // data_emprestimo
        dataDevolucaoFormatada // data_devolucao
      );

      // Alterar o estado do livro para "E" (Emprestado)
      await clientController.updateLivroEstado(livro_id, 'E');

      return res.status(201).json({ msg: "Empréstimo criado com sucesso" });
    } catch (error) {
      console.error("Erro ao criar empréstimo:", error);
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

    try {
      const emprestimos = await clientController.getEmprestimosByUserRm(user_rm);
      return res.status(200).json(emprestimos);
    } catch (error) {
      console.error(`Erro ao obter empréstimos do usuário RM ${user_rm}:`, error);
      return res.status(500).json({ msg: 'Erro interno do servidor' });
    }
  },

  atualizarEstadoEmprestimo: async (req, res) => {
    const { id } = req.params;
    const { novo_estado, bibliotecario_autenticado } = req.body;

    if (!id || !novo_estado || !bibliotecario_autenticado) {
      return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
    }

    if (!["ativo", "concluído", "atrasado"].includes(novo_estado)) {
      return res.status(400).json({ msg: "Estado inválido" });
    }

    try {
      // Verificar se o empréstimo existe
      const [emprestimo] = await clientController.getEmprestimoById(id);
      if (!emprestimo) {
        return res.status(404).json({ msg: "Empréstimo não encontrado" });
      }

      // Atualizar o estado do empréstimo
      await clientController.atualizarEstadoEmprestimo(id, novo_estado);

      // Se o estado for "concluído", alterar o livro para "D" (Disponível)
      if (novo_estado === "concluído") {
        await clientController.updateLivroEstado(emprestimo.livro_id, 'D');
      }

      return res.status(200).json({ msg: "Estado do empréstimo atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar estado do empréstimo:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },

  atualizarAtrasos: async (req, res) => {
  try {
    // Obter empréstimos cuja data_devolucao expirou
    const emprestimosAtrasados = await clientController.getEmprestimosAtrasados();

    if (emprestimosAtrasados.length === 0) {
      return res.status(200).json({ msg: "Nenhum empréstimo atrasado encontrado.", atualizados: 0 });
    }

    // Atualizar o estado de cada empréstimo para "atrasado"
    const atualizacoes = [];
    for (const emprestimo of emprestimosAtrasados) {
      atualizacoes.push(
        clientController.updateEmprestimoEstado(emprestimo.emprestimo_id, "atrasado")
      );
    }

    // Aguardar todas as atualizações
    await Promise.all(atualizacoes);

    return res.status(200).json({
      msg: `${emprestimosAtrasados.length} empréstimo(s) atualizado(s) para 'atrasado'.`,
      atualizados: emprestimosAtrasados.length
    });
  } catch (error) {
    console.error("Erro ao atualizar empréstimos atrasados:", error);
    return res.status(500).json({ msg: "Erro interno ao verificar atrasos.", atualizados: 0 });
  }
},
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
  const { nome_genero } = req.params;

  try {
    const livros = await clientController.getLivrosByGeneroNome(nome_genero);
    
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
