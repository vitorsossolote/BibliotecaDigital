const express = require("express");
const client = require("../config/db");
const cors = require("cors");
const router = require("./routers");

const app = express();

// Aumente o limite de payload para base64
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(cors());
app.use(router);

client.query("select 1").then(()=>{
    console.log("connection success")
    app.listen(8085, function(){
        console.log("Servidor rodando na url:http://localhost:8085")
    });
})
.catch(erro => console.log("connection failed \n" + erro))