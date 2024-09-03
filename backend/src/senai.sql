--CRIAR A TABELA CADSTRO NO BANCO DE DADOS SENAI
CREATE TABLE IF NOT EXISTS cadastro_senai (
    id int,
    nome varchar(50),
    sobrenome varchar(50),
    idade int
);

CREATE DATABASE IF NOT EXISTS your_database;

USE your_database;

CREATE TABLE IF NOT EXISTS contato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    numero VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mensagem TEXT NOT NULL
);
