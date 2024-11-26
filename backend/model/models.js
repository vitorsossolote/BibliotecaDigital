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
      .catch((erro)=> console.log(erro))
    return result;
  },
  getGenderByName: async (nome_genero) => {
    const [result] = await connection
      .query("SELECT * FROM gender WHERE nome_genero=?", [nome_genero])
      .catch((erro)=> console.log(erro))
    return result;
  },
  getAutorByName: async (nome_autor) => {
    const [result] = await connection
      .query("SELECT * FROM autores WHERE nome_autor=?", [nome_autor])
      .catch((erro)=> console.log(erro))
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

  registerLibrarian: async ( nome, email, cfb, senha) => {

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
          "INSERT INTO livros (image, titulo, descricao, autor_id, genero_id, editora, quantidade, codigo, avaliacao, estado, nome_autor, nome_genero) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", 
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

  registerAutor: async (nome_autor, data_nascimento, image, avaliacao,sobre) => {  

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

  registerAutor: async (nome_autor, data_nascimento, image, avaliacao,sobre) => {  

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

  // Add these methods to your existing useModel object

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