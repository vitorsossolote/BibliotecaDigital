const express = require("express");
const client = require("../config/db");
const cors = require("cors");
const router = require("./routers")

const app = express();

app.use(express.json());
<<<<<<< HEAD
app.use(router);
=======

>>>>>>> desenvolvimento

app.use((req,res,next) => {
    //Qualquer endereço pode realizar requisição
    res.header("Access-Control-Allow-Origin", "*");

    //Tipos de metodos que a API aceita
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

    //Permitir o envio de dados para a API
    res.header("Access-Control-Allow-Headers", "Content-Type");

<<<<<<< HEAD
    //Exercutar o Cors
    app.use(cors());

    //Quando não houver erro deve continuar o processamento
    next();
});

=======
    next();
});

  app.use(cors());
  app.use(router);

>>>>>>> desenvolvimento
client.query("select 1").then(()=>{
    console.log("connection success")
    app.listen(8085, function(){
        console.log("Servidor rodando na url:http://localhost:8085")
    });
})
.catch(erro => console.log("connection failed \n" + erro))