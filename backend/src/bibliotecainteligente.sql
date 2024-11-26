-- Criação do banco de dados
CREATE DATABASE bibliotecainteligente;
USE 

bibliotecainteligente

;

-- Tabela de Autores
CREATE TABLE `autores` (
  `id_autor` int(11) NOT NULL AUTO_INCREMENT,
  `nome_autor` varchar(100) NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `image` text DEFAULT NULL,
  `avaliacao` int(1) DEFAULT NULL,
  `sobre` text DEFAULT NULL,
  PRIMARY KEY (`id_autor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabela de Gêneros
CREATE TABLE `gender` (
  `id_genero` int(11) NOT NULL AUTO_INCREMENT,
  `nome_genero` varchar(50) NOT NULL,
  PRIMARY KEY (`id_genero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabela de Bibliotecários
CREATE TABLE `librarian` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `cfb` char(8) NOT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cfb` (`cfb`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabela de Livros
CREATE TABLE `livros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `editora` varchar(100) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `codigo` char(12) DEFAULT NULL,
  `image` text NOT NULL,
  `descricao` text NOT NULL,
  `avaliacao` int(1) NOT NULL,
  `estado` char(1) NOT NULL,
  `id_autor` int(11) DEFAULT NULL,
  `id_genero` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_livro_autor` (`id_autor`),
  KEY `fk_livro_genero` (`id_genero`),
  CONSTRAINT `fk_livro_autor` FOREIGN KEY (`nome_autor`) REFERENCES `autores` (`nome_autor`) ON DELETE SET NULL,
  CONSTRAINT `fk_livro_genero` FOREIGN KEY (`nome_genero`) REFERENCES `gender` (`nome_genero`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabela de Estudantes
CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `rm` int(11) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `rm` (`rm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabela de Empréstimos
CREATE TABLE `emprestimos` (
  `emprestimo_id` int(11) NOT NULL AUTO_INCREMENT,
  `livro_id` int(11) DEFAULT NULL,
  `user_rm` int(11) DEFAULT NULL,
  `data_emprestimo` date NOT NULL,
  `data_devolucao` date NOT NULL,
  `estado` enum('ativo','concluído','atrasado') NOT NULL,
  `avaliacao` int(1
...