//Incluir biblioteca de conexão
const mysql = require("mysql2/promise");

//Criar conexão com banco de dados
const client = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bibliotecainteligente",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
});

module.exports = client;