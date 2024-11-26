const connection = require("../config/db");
const bcrypt = require("bcrypt");

const useModel = {
  getByID: async (id) => {
    const [result] = await connection
      .query("SELECT * FROM students WHERE id =?", [id])
      .catch((erro) => console.log(erro));
    return result;
  },

  getByEmail: async (email) => {
    const [result] = await connection
      .query("SELECT * FROM students WHERE email=?", [email])
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

  getByCfb: async (rm) => {
    const [result] = await connection
      .query("SELECT * FROM librarian WHERE cfb=?", [rm])
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
      .query("SELECT * FROM livros WHERE titulo LIKE ? OR autor LIKE ?", [`%${searchTerm}%`, `%${searchTerm}%`])
      .catch((erro) => console.log(erro));
    return result;
  },

  // Outros métodos para manipulação de livros podem ser adicionados aqui

  registerBooks: async (image, titulo, descricao, nome_autor, editora, nome_genero, quantidade, codigo, avaliacao, estado) => {
    if (!codigo) {
      throw new Error('O código é obrigatório');
    }


    try {

      // Primeiro, verifica se o autor existe
      const [autores] = await connection.query(
        "SELECT id_autor FROM autores WHERE nome_autor = ?",
        [nome_autor]
      );

      // Se o autor não existir, cria o autor
      if (autores.length === 0) {
        const [novoAutor] = await connection.query(
          "INSERT INTO autores (nome_autor) VALUES (?)",
          [nome_autor]
        );
        autorId = novoAutor.insertId;
      } else {
        autorId = autores[0].id_autor;
      }

      // Verifica se o gênero existe
      const [generos] = await connection.query(
        "SELECT nome_genero FROM gender WHERE nome_genero = ?",
        [nome_genero]
      );

      // Se o gênero não existir, cadastra o genero
      if (generos.length === 0) {
        const [novoGender] = await connection.query(
          "INSERT INTO gender (nome_genero) VALUES (?)",
          [nome_genero]
        );
        genderId = novoGender.insertId;
      } else {
        genderId = gender[0].id_genero;
      }

      // Insere o livro
      const [result] = await connection.query(
        "INSERT INTO livros (image, titulo, descricao, nome_autor, editora, nome_genero, quantidade, codigo, avaliacao, estado) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [
          image,
          titulo,
          descricao,
          nome_autor,
          editora,
          nome_genero,
          quantidade,
          codigo,
          avaliacao,
          estado = "D"
        ]
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

  // Exemplo de getLivroById
  getLivroForEmprestimoById: async (livro_id) => {
    const [result] = await connection.query("SELECT estado FROM livros WHERE id = ?", [livro_id]);
    return result;
  },

  criarEmprestimo: async (user_rm, livro_id, data_emprestimo, data_devolucao) => {
    const [result] = await connection.query(
      "INSERT INTO emprestimos (user_rm, livro_id, data_emprestimo, data_devolucao, estado) VALUES (?, ?, ?, ?, 'ativo')",
      [user_rm, livro_id, data_emprestimo, data_devolucao]
    );
    return result;
  },

  updateLivroEstado: async (livroId, novoEstado) => {
    try {
      const [result] = await connection.query(
        "UPDATE livros SET estado = ? WHERE id = ?",
        [novoEstado, livroId]
      );
      return result;
    } catch (error) {
      console.error("Erro ao atualizar estado do livro ${livro_id}:", error);
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

  getEmprestimoById: async (id) => {
    try {
      const [rows] = await connection.query('SELECT * FROM emprestimos WHERE emprestimo_id = ?', [id]);
      return rows;
    } catch (error) {
      console.error(`Erro ao obter empréstimo com ID ${id}:`, error);
      throw error;
    }
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

  updateLivroEstado: async (livroId, novoEstado) => {
    try {
      const [result] = await connection.query(
        "UPDATE livros SET estado = ? WHERE id = ?",
        [novoEstado, livroId]
      );
      return result;
    } catch (error) {
      console.error("Erro ao atualizar estado do livro ${livro_id}:", error);
      throw error;
    }
  },

  getEmprestimosAtrasados: async () => {
    try {
      const [result] = await connection.query(
        `SELECT emprestimo_id FROM emprestimos 
                                                WHERE data_devolucao < CURDATE() 
                                                AND estado = 'ativo'`
      );
      return result;
    } catch (error) {
      console.error("Erro ao obter empréstimos atrasados:", error);
      throw error; // Importante manter o throw
    }
  },

  updateEmprestimoEstado: async (emprestimoId, novoEstado) => {
    try {
      const [result] = await connection.query(
        "UPDATE emprestimos SET estado = ? WHERE emprestimo_id = ?",
        [novoEstado, emprestimoId]
      );
      return result;
    } catch (error) {
      console.error(`Erro ao atualizar estado do empréstimo ${emprestimoId}:`, error);
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
