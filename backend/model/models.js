const connection = require("../config/db");
const bcrypt = require("bcrypt");

const useModel = {
  getByID: async (id) => {
    const [result] = await connection
      .query("SELECT * FROM students WHERE id =?", [id])
      .catch((erro) => console.log(erro));
    return result;
  },

  //Buscar Librarians
  getAllLibrarian: async () => {
    const [result] = await connection
      .query("SELECT * FROM librarian")
      .catch((erro) => console.log(erro));
    return result;
  },

  //Buscar Estudantes
  getAllStudents: async () => {
    const [result] = await connection
      .query("SELECT * FROM students")
      .catch((erro) => console.log(erro));
    return result;
  },

  getByEmail: async (email) => {
    const [result] = await connection
      .query("SELECT * FROM students WHERE email=?", [email])
      .catch((erro) => console.log(erro));
    return result;
  },

  getLibrarianById: async (id) => {
    const [result] = await connection
      .query("SELECT * FROM librarian WHERE id =?", [id])
      .catch((erro) => console.log(erro));
    return result;
  },

  getLibrarianByEmail: async (email) => {
    const [result] = await connection
      .query("SELECT * FROM librarian WHERE email=?", [email])
      .catch((erro) => console.log(erro));
    return result;
  },

  getByRm: async (rm) => {
    const [result] = await connection
      .query("SELECT * FROM students WHERE rm=?", [rm])
      .catch((erro) => console.log(erro));
    return result;
  },

  getByBookCode: async (codigo) => {
    const [result] = await connection
      .query("SELECT * FROM livros WHERE codigo=?", [codigo])
      .catch((erro) => console.log(erro))
    return result;
  },
  getGenderByName: async (nome_genero) => {
    const [result] = await connection
      .query("SELECT * FROM gender WHERE nome_genero=?", [nome_genero])
      .catch((erro) => console.log(erro))
    return result;
  },
  getAutorByName: async (nome_autor) => {
    const [result] = await connection
      .query("SELECT * FROM autores WHERE nome_autor=?", [nome_autor])
      .catch((erro) => console.log(erro))
    return result;
  },

  getByCfb: async (cfb) => {
    const [result] = await connection
      .query("SELECT * FROM librarian WHERE cfb=?", [cfb])
      .catch((erro) => console.log(erro));
    return result;
  },

  registerStudent: async (nome, email, rm, senha) => {

    if (!senha) {
      throw new Error('Senha é obrigatória');
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(senha, salt);

      const [result] = await connection
        .query("INSERT INTO students (nome, email, rm, senha) VALUES (?,?,?,?)", [
          nome,
          email,
          rm,
          hashPassword
        ]);

      return result;
    } catch (error) {
      console.error('Erro ao criar hash da senha:', error);
      throw error;
    }
  },

  validateLoginStudents: async (email, senha) => {
    try {
      const [student] = await connection.query(
        "SELECT * FROM students WHERE email = ?",
        [email]
      );

      if (student.length === 0) {
        return null;
      }

      const isValid = await bcrypt.compare(senha, student[0].senha);
      if (isValid) {
        return student[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  },

  registerLibrarian: async (nome, email, cfb, senha) => {

    if (!senha) {
      throw new Error('Senha é obrigatória');
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(senha, salt);

      const [result] = await connection
        .query("INSERT INTO librarian (nome, email, cfb, senha) VALUES (?,?,?,?)", [
          nome,
          email,
          cfb,
          hashPassword
        ]);

      return result;
    } catch (error) {
      console.error('Erro ao criar hash da senha:', error);
      throw error;
    }
  },

  // Listar Bibliotecário por CFB
  ListarLibrarianByCfb: async (req, res) => {
    const { cfb } = req.params;

    try {
      const Librarian = await LibrarianModel.getByCfb(cfb);

      // Verifica se o array está vazio
      if (!Librarian || Librarian.length === 0) {
        return res.status(404).json({
          msg: `Não existe nenhum bibliotecário com o CFB ${cfb}`
        });
      }

      res.status(200).json(Librarian);
    } catch (error) {
      console.error("Erro ao buscar bibliotecário:", error);
      res.status(500).json({
        msg: "Erro ao buscar bibliotecário",
        error: error.message
      });
    }
  },

  // Listar Bibliotecário por Email
  ListarLibrarianByEmail: async (req, res) => {
    const { email } = req.params;

    try {
      const Librarian = await LibrarianModel.getLibrarianByEmail(email);

      // Verifica se o array está vazio
      if (!Librarian || Librarian.length === 0) {
        return res.status(404).json({
          msg: `Não existe nenhum bibliotecário com o email ${email}`
        });
      }

      res.status(200).json(Librarian);
    } catch (error) {
      console.error("Erro ao buscar bibliotecário:", error);
      res.status(500).json({
        msg: "Erro ao buscar bibliotecário",
        error: error.message
      });
    }
  },

  //Atualizar os Estudantes
  updateLibrarianInDB: async (cfb, updateData) => {
    if (!cfb) {
      throw new Error('O CFB é obrigatório');
    }

    try {
      // Gera hash da senha se for fornecida
      let senhaHash;
      if (updateData.senha) {
        const salt = await bcrypt.genSalt(10);
        senhaHash = await bcrypt.hash(updateData.senha, salt);
      }

      // Atualiza o estudante com os novos dados
      const [result] = await connection.query(
        "UPDATE librarian SET " +
        "nome=?, " +
        "email=?, " +
        "senha=? " +
        "WHERE cfb=?",
        [
          updateData.nome,
          updateData.email,
          senhaHash || updateData.senha, // Usa o hash ou o valor original
          cfb
        ]
      );

      return result;
    } catch (error) {
      throw error;
    }
  },

  //Deletar os Estudantes
  deleteLibrarianFromDB: async (cfb) => {
    if (!cfb) {
      throw new Error('O CFB é obrigatório');
    }

    try {
      const [result] = await connection
        .query("DELETE FROM librarian WHERE cfb = ?", [cfb]);

      return result;
    } catch (error) {
      throw error;
    }
  },

  validateLoginLibrarian: async (email, senha) => {
    const [result] = await connection.query(
      "SELECT * FROM librarian WHERE email=?",
      [email]
    );

    try {
      if (result.length > 0) {
        const librarian = result[0];

        const match = await bcrypt.compare(senha, librarian.senha);

        if (match) {
          return result[0]
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (erro) {
      console.log(erro);
    }
  },

  //Buscar livros
  getAllLivros: async () => {
    const [result] = await connection
      .query("SELECT * FROM livros")
      .catch((erro) => console.log(erro));
    return result;
  },

  //Buscar livros por ID
  getLivroById: async (id) => {
    const [result] = await connection
      .query("SELECT * FROM livros WHERE id =?", [id])
      .catch((erro) => console.log(erro));
    return result;
  },

  searchLivros: async (searchTerm) => {
    const [result] = await connection
      .query("SELECT * FROM livros WHERE titulo LIKE ? OR nome_autor LIKE ?", [`%${searchTerm}%`, `%${searchTerm}%`])
      .catch((erro) => console.log(erro));
    return result;
  },



  registerBooks: async (image, titulo, descricao, nome_autor, editora, nome_genero, quantidade, codigo, avaliacao, estado) => {  
    if (!codigo) {
      throw new Error('O código é obrigatório');
    }
  
    try {
      // Primeiro, verifica se o autor existe e obtém seu ID
      let autorId;
      const [autores] = await connection.query(
        "SELECT id_autor FROM autores WHERE nome_autor = ?", 
        [nome_autor]
      );
  
      // Se o autor existir, use o ID existente
      if (autores.length > 0) {
        autorId = autores[0].id_autor;
      } else {
        // Se o autor não existir, crie um novo
        const [novoAutor] = await connection.query(
          "INSERT INTO autores (nome_autor) VALUES (?)", 
          [nome_autor]
        );
        autorId = novoAutor.insertId;
      }
  
      // Verifica se o gênero existe e obtém seu ID
      let generoId;
      const [generos] = await connection.query(
        "SELECT id_genero FROM gender WHERE nome_genero = ?", 
        [nome_genero]
      );
  
      // Se o gênero existir, use o ID existente
      if (generos.length > 0) {
        generoId = generos[0].id_genero;
      } else {
        // Se o gênero não existir, crie um novo
        const [novoGenero] = await connection.query(
          "INSERT INTO gender (nome_genero) VALUES (?)", 
          [nome_genero]
        );
        generoId = novoGenero.insertId;
      }
  
      // Insere o livro com os IDs de autor e gênero
      const [result] = await connection.query(
        "INSERT INTO livros (image, titulo, descricao, id_autor, id_genero, editora, quantidade, codigo, avaliacao, estado, nome_autor, nome_genero) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", 
        [
          image, 
          titulo, 
          descricao, 
          autorId,  // Usando o ID do autor 
          generoId, // Usando o ID do gênero
          editora, 
          quantidade, 
          codigo, 
          avaliacao, 
          estado,
          nome_autor,
          nome_genero
        ]
      );
  
      return result;
    } catch (error) {
      throw error;
    } 
  },

  deleteBook: async (id) => {
    if (!id) {
      throw new Error('O ID é obrigatório');
    }

    try {
      const [result] = await connection
        .query("DELETE FROM livros WHERE id = ?", [id]);

      return result;
    } catch (error) {
      throw error;
    }
  },

  updateBookQuantity: async (id, quantidade) => {
    if (!id || quantidade < 0) {
      throw new Error('ID e quantidade válida são obrigatórios');
    }

    try {
      const [result] = await connection.query(
        "UPDATE livros SET quantidade = ? WHERE id = ?",
        [quantidade, id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },


  registerGender: async (nome_genero) => {

    if (!nome_genero) {
      throw new Error('O nome do genero é obrigatório');
    }

    try {
      const [result] = await connection
        .query("INSERT INTO gender (nome_genero) VALUES (?)", [
          nome_genero
        ]);

      return result;
    } catch (error) {
      throw error;
    }
  },

  registerAutor: async (nome_autor, data_nascimento, image, avaliacao, sobre) => {

    if (!nome_autor) {
      throw new Error('O nome é obrigatório');
    }

    try {
      const [result] = await connection
        .query("INSERT INTO autores (nome_autor, data_nascimento, image, avaliacao,sobre) VALUES (?,?,?,?,?)", [
          nome_autor,
          data_nascimento,
          image,
          avaliacao,
          sobre
        ]);

      return result;
    } catch (error) {
      throw error;
    }
  },

  // Listar todos os livros de um autor específico por ID
  getLivrosByAutorId: async (id_autor) => {
    const [result] = await connection
      .query(`
        SELECT l.*, a.nome_autor, a.data_nascimento, a.image as autor_image, a.sobre as autor_sobre
        FROM livros l
        JOIN autores a ON l.id_autor = a.id_autor
        WHERE l.id_autor = ?
      `, [id_autor])
      .catch((erro) => console.log(erro));
    return result;
  },

  getLivrosByAutorName: async (nome_autor) => {
    const [result] = await connection
      .query(`
        SELECT l.*, a.nome_autor, a.data_nascimento, a.image as autor_image, a.sobre as autor_sobre
        FROM livros l
        JOIN autores a ON l.nome_autor = a.nome_autor
        WHERE l.nome_autor = ?
      `, [nome_autor])
      .catch((erro) => console.log(erro));
    return result;
  },

  // Listar todos os livros de um gênero específico por ID
  getLivrosByGeneroId: async (id_genero) => {
    const [result] = await connection
      .query(`
        SELECT l.*, g.nome_genero
        FROM livros l
        JOIN gender g ON l.id_genero = g.id_genero
        WHERE l.id_genero = ?
      `, [id_genero])
      .catch((erro) => console.log(erro));
    return result;
  },
  getLivrosByGeneroNome: async (nome_genero) => {
    const [result] = await connection
      .query(`
        SELECT l.*, g.nome_genero
        FROM livros l
        JOIN gender g ON l.nome_genero = g.nome_genero
        WHERE l.nome_genero = ?
      `, [nome_genero])
      .catch((erro) => console.log(erro));
    return result;
  },
  getAllAutores: async () => {
    const [result] = await connection
      .query("SELECT * FROM autores")
      .catch((erro) => console.log(erro));
    return result;
  },

  getAllGeneros: async () => {
    const [result] = await connection
      .query("SELECT * FROM gender")
      .catch((erro) => console.log(erro));
    return result;
  },

  updateBook: async (id, updateData) => {
    if (!id) {
      throw new Error('O ID é obrigatório');
    }

    try {
      // Verifica e atualiza o autor se necessário
      let autorId;
      const [autoresExistentes] = await connection.query(
        "SELECT id_autor FROM autores WHERE nome_autor = ?",
        [updateData.nome_autor]
      );

      if (autoresExistentes.length === 0) {
        // Se o autor não existe, busca o autor original
        const [autorOriginal] = await connection.query(
          "SELECT nome_autor FROM autores WHERE nome_autor = (SELECT nome_autor FROM livros WHERE id = ?)",
          [id]
        );

        // Atualiza o nome do autor existente
        await connection.query(
          "UPDATE autores SET nome_autor = ? WHERE nome_autor = ?",
          [updateData.nome_autor, autorOriginal[0].nome_autor]
        );
      }

      // Verifica e atualiza o gênero se necessário
      let genderId;
      const [generosExistentes] = await connection.query(
        "SELECT id_genero FROM gender WHERE nome_genero = ?",
        [updateData.nome_genero]
      );

      if (generosExistentes.length === 0) {
        // Se o gênero não existe, busca o gênero original
        const [generoOriginal] = await connection.query(
          "SELECT nome_genero FROM gender WHERE nome_genero = (SELECT nome_genero FROM livros WHERE id = ?)",
          [id]
        );

        // Atualiza o nome do gênero existente
        await connection.query(
          "UPDATE gender SET nome_genero = ? WHERE nome_genero = ?",
          [updateData.nome_genero, generoOriginal[0].nome_genero]
        );
      }

      // Atualiza o livro com os novos dados
      const [result] = await connection.query(
        "UPDATE livros SET " +
        "image=?, " +
        "titulo=?, " +
        "descricao=?, " +
        "nome_autor=?, " +
        "editora=?, " +
        "nome_genero=?, " +
        "quantidade=?, " +
        "avaliacao=?, " +
        "estado=? " +
        "WHERE id=?",
        [
          updateData.image,
          updateData.titulo,
          updateData.descricao,
          updateData.nome_autor,
          updateData.editora,
          updateData.nome_genero,
          updateData.quantidade,
          updateData.avaliacao,
          updateData.estado = "D",
          id
        ]
      );

      return result;
    } catch (error) {
      throw error;
    }
  },

  // Obter livro pelo ID (ID e quantidade)
  getQntLivrosById: async (id) => {
    const [result] = await connection.query(
      "SELECT id, quantidade FROM livros WHERE id = ?",
      [id]
    );
    return result[0];
  },

  // Atualizar a quantidade de livros (subtrair 1)
  subtrairQuantidadeLivro: async (id) => {
    await connection.query(
      "UPDATE livros SET quantidade = quantidade - 1 WHERE id = ?",
      [id]
    );
  },

  // Atualizar o estado de um livro (D ou E) e incrementar sua avalição (1~5)
  updateLivroEstado: async (livroId, novoEstado) => {
    try {
      if (novoEstado === 'D') {
        // Se o estado for "D", incrementa a quantidade
        const [result] = await connection.query(
          "UPDATE livros SET estado = ?, quantidade = quantidade + 1 WHERE id = ?",
          [novoEstado, livroId]
        );
        return result;
      } else {
        // Caso contrário, mantém a lógica original
        const [result] = await connection.query(
          "UPDATE livros SET estado = ? WHERE id = ?",
          [novoEstado, livroId]
        );
        return result;
      }
    } catch (error) {
      console.error(`Erro ao atualizar estado do livro ${livroId}:`, error);
      throw error;
    }
  },

  // Criar um novo empréstimo
  criarEmprestimo: async (user_rm, livro_id, data_emprestimo, data_devolucao) => {
    const [result] = await connection.query(
      "INSERT INTO emprestimos (user_rm, livro_id, data_emprestimo, data_devolucao, estado) VALUES (?, ?, ?, ?, 'ativo')",
      [user_rm, livro_id, data_emprestimo, data_devolucao]
    );
    return result;
  },

  countEmprestimosAtivos: async (user_rm) => {
    const [result] = await connection.query(
      "SELECT COUNT(*) as emprestimosAtivos FROM emprestimos WHERE user_rm = ? AND estado = 'ativo'",
      [user_rm]
    );
    return result[0].emprestimosAtivos;
  },

  // Atualizar o estado de um empréstimo
  atualizarEstadoEmprestimo: async (emprestimo_id, novo_estado) => {
    try {
      const [result] = await connection.query(
        "UPDATE emprestimos SET estado = ? WHERE emprestimo_id = ?",
        [novo_estado, emprestimo_id]
      );
      return result;
    } catch (error) {
      console.error(`Erro ao atualizar estado do empréstimo ${emprestimo_id}:`, error);
      throw error;
    }
  },

  getEmprestimoById: async (id) => {
    try {
      const [rows] = await connection.query('SELECT * FROM emprestimos WHERE emprestimo_id = ?', [id]);
      return rows;
    } catch (error) {
      console.error(`Erro ao obter empréstimo com ID ${id}:`, error);
      throw error;
    }
  },

  atualizarAvaliacaoEmprestimo: async (emprestimoId, avaliacao) => {
    try {
      const [result] = await connection.query(
        "UPDATE emprestimos SET avaliacao = ? WHERE emprestimo_id = ?",
        [avaliacao, emprestimoId]
      );
      return result;
    } catch (error) {
      console.error(`Erro ao atualizar avaliação do empréstimo ${emprestimoId}:`, error);
      throw error;
    }
  },

  atualizarAvaliacaoLivro: async (livroId, novaAvaliacao) => {
    try {
      // Primeiro, buscar todas as avaliações do livro
      const [avaliacoes] = await connection.query(
        "SELECT avaliacao FROM emprestimos WHERE livro_id = ? AND avaliacao IS NOT NULL",
        [livroId]
      );

      // Calcular a nova média
      const todasAvaliacoes = [...avaliacoes.map(a => a.avaliacao), novaAvaliacao];
      const mediaAvaliacoes = todasAvaliacoes.reduce((a, b) => a + b, 0) / todasAvaliacoes.length;

      // Atualizar a avaliação do livro
      const [result] = await connection.query(
        "UPDATE livros SET avaliacao = ? WHERE id = ?",
        [mediaAvaliacoes, livroId]
      );

      return result;
    } catch (error) {
      console.error(`Erro ao atualizar avaliação do livro ${livroId}:`, error);
      throw error;
    }
  },

  getAllEmprestimos: async () => {
    try {
      const [rows] = await connection.query('SELECT * FROM emprestimos');
      return rows;
    } catch (error) {
      console.error('Erro ao obter todos os empréstimos:', error);
      throw error;
    }
  },

  getEmprestimosByUserRm: async (user_rm) => {
    try {
      const [rows] = await connection.query('SELECT * FROM emprestimos WHERE user_rm = ?', [user_rm]);
      return rows;
    } catch (error) {
      console.error(`Erro ao obter empréstimos do usuário RM ${user_rm}:`, error);
      throw error;
    }
  },

  getEmprestimosAtrasados: async () => {
    try {
      const [result] = await connection.query(
        `SELECT DISTINCT
                e.emprestimo_id, 
                e.data_emprestimo, 
                e.data_devolucao, 
                e.livro_id,
                e.user_rm AS aluno_rm,
                s.nome AS aluno_nome,
                l.titulo AS livro_titulo
            FROM emprestimos e
            JOIN students s ON e.user_rm = s.rm
            JOIN livros l ON e.livro_id = l.id
            WHERE e.data_devolucao < CURDATE() 
            AND e.estado = 'ativo'`
      );
      return result;
    } catch (error) {
      console.error("Erro ao obter empréstimos atrasados:", error);
      throw error;
    }
  },

  //Deletar os Estudantes
  deleteStudentFromDB: async (rm) => {
    if (!rm) {
      throw new Error('O RM é obrigatório');
    }

    try {
      const [result] = await connection
        .query("DELETE FROM students WHERE rm = ?", [rm]);

      return result;
    } catch (error) {
      throw error;
    }
  },

  //Atualizar os Estudantes
  updateStudentInDB: async (rm, updateData) => {
    if (!rm) {
      throw new Error('O RM é obrigatório');
    }

    try {
      // Gera hash da senha se for fornecida
      let senhaHash;
      if (updateData.senha) {
        const salt = await bcrypt.genSalt(10);
        senhaHash = await bcrypt.hash(updateData.senha, salt);
      }

      // Atualiza o estudante com os novos dados
      const [result] = await connection.query(
        "UPDATE students SET " +
        "nome=?, " +
        "email=?, " +
        "senha=? " +
        "WHERE rm=?",
        [
          updateData.nome,
          updateData.email,
          senhaHash || updateData.senha, // Usa o hash ou o valor original
          rm
        ]
      );

      return result;
    } catch (error) {
      throw error;
    }
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