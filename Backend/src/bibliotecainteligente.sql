-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2024 at 12:55 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bibliotecainteligente`
--

-- --------------------------------------------------------

--
-- Table structure for table `emprestimos`
--

CREATE TABLE `emprestimos` (
  `emprestimo_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `livro_id` int(11) DEFAULT NULL,
  `data_emprestimo` date NOT NULL,
  `data_devolucao` date DEFAULT NULL,
  `status` enum('ativo','concluído','atrasado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `livros`
--

CREATE TABLE `livros` (
  `livro_id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `autor` varchar(100) NOT NULL,
  `editora` varchar(100) NOT NULL,
  `ano_publicacao` year(4) NOT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `quantidade_disponivel` int(11) NOT NULL,
  `codigoBarras` char(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `reservas`
--

CREATE TABLE `reservas` (
  `reserva_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `livro_id` int(11) DEFAULT NULL,
  `data_reserva` date NOT NULL,
  `data_expiracao` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `rm` char(4) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL,
  `confirmSenha` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `nome`, `email`, `rm`, `senha`, `confirmSenha`) VALUES
(27, 'fausto', 'faus@gmail.com', '1499', '$2b$10$h8ROu4wkxEnD0omX4ASso.gdctJ.w7VxeyRVgQxoaDqZwLND.NuIy', ''),
(28, 'fausto', 'faustao@gmail.com', '1499', '$2b$10$mHQgnw.n2B7m.UQWhi9xyeo770SkllR4aFLzFzswAIcasOXqDElDG', '12345'),
(29, 'fausto', 'fausto@gmail.com', '1499', '$2b$10$u99ehHK6VBGKtpheu9V1su1KXwJRwDqY5j8Gn5bEiGhIZnPvVvBVq', '12345'),
(30, 'fausto', 'f@gmail.com', '1499', '$2b$10$Z2qsqlJQxMFM2n1CS9wo0eX3tHUat92VJgPMEl13Plsw6XfLg5632', '12345'),
(31, 'fausto', 'a@gmail.com', '11', '$2b$10$H2hgmI5iC1eNo8udXvNdD.TrLhurqWdnQnlNQhCf4NuMY3Ep7Bk9.', '12345'),
(32, 'fausto', 'b@gmail.com', '1', '$2b$10$1kLrhdDVeQxmhgLXa1vpaeYxU3x9GRK89kdocsAt7E2ufk6zYi55e', '$2b$10$/zCSOi5/ZTkHDumIbTJUauHnoJ4.vE6uMN/KtEaaue61IkOOnuizW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `emprestimos`
--
ALTER TABLE `emprestimos`
  ADD PRIMARY KEY (`emprestimo_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `livro_id` (`livro_id`);

--
-- Indexes for table `livros`
--
ALTER TABLE `livros`
  ADD PRIMARY KEY (`livro_id`);

--
-- Indexes for table `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`reserva_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `livro_id` (`livro_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `emprestimos`
--
ALTER TABLE `emprestimos`
  MODIFY `emprestimo_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `livros`
--
ALTER TABLE `livros`
  MODIFY `livro_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reservas`
--
ALTER TABLE `reservas`
  MODIFY `reserva_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `emprestimos`
--
ALTER TABLE `emprestimos`
  ADD CONSTRAINT `emprestimos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `emprestimos_ibfk_2` FOREIGN KEY (`livro_id`) REFERENCES `livros` (`livro_id`);

--
-- Constraints for table `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`livro_id`) REFERENCES `livros` (`livro_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;