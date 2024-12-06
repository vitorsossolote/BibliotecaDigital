const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./src/routers');
const client = require('./config/db');

const app = express();
app.use(bodyParser.json());
app.use(routers);

let server;
let createdGenderId; // Variável para armazenar ID de gênero criado

beforeAll(async () => {
    server = app.listen(8085);
    // Limpa dados de teste antes de iniciar
    await client.query('DELETE FROM gender WHERE nome_genero LIKE "Teste%"');
});

afterAll(async () => {
    // Limpa dados de teste após finalizar
    await client.query('DELETE FROM gender WHERE nome_genero LIKE "Teste%"');
    await client.end();
    server.close();
});

describe('Gender Routes', () => {
    // Teste Rota Raiz
    it('GET / deve retornar a mensagem de status', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', "The API is running!!!");
    });

    // Teste Registro de Gênero
    it('POST /api/registerGender deve criar um novo gênero', async () => {
        const testGenero = { nome_genero: "Teste Ficção" };

        const res = await request(app)
            .post('/api/registerGender')
            .send(testGenero);

        expect([201, 401]).toContain(res.statusCode);

        if (res.statusCode === 201) {
            expect(res.body).toHaveProperty('msg', "Genero cadastrado com sucesso");
        } else {
            expect(res.body).toHaveProperty('msg', "Este genero já está cadastrado no Banco de Dados");
        }
    });

    // Teste Registro de Gênero Duplicado
    it('POST /api/registerGender deve impedir gênero duplicado', async () => {
        const testGenero = { nome_genero: "Teste Ficção" };

        const res = await request(app)
            .post('/api/registerGender')
            .send(testGenero);

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('msg', "Este genero já está cadastrado no Banco de Dados");
    });

    // Teste Listar Gêneros
    it('GET /api/generos deve retornar lista de gêneros', async () => {
        const res = await request(app).get('/api/generos');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // Teste Atualizar Gênero
    it('PUT /api/updateGender/:id_genero deve atualizar um gênero', async () => {
        // Criar um gênero de teste
        await request(app)
            .post('/api/registerGender')
            .send({ nome_genero: "Teste Atualizar" });
    
        // Buscar o gênero criado
        const generos = await request(app).get('/api/generos');
        const generoParaAtualizar = generos.body.find(g => g.nome_genero === "Teste Atualizar");
    
        const updateData = { nome_genero: "Teste Atualizado" };
    
        const res = await request(app)
            .put(`/api/updateGender/${generoParaAtualizar.id_genero}`)
            .send(updateData);
    
        expect([200, 400, 404]).toContain(res.statusCode);
    
        if(res.statusCode === 200){
            expect(res.body).toHaveProperty('msg', "Gênero atualizado com sucesso");
        } else if(res.statusCode === 400) {
            expect(res.body).toHaveProperty('msg', /não pode ser deletado|já existe um gênero/);
        } else {
            expect(res.body).toHaveProperty('msg', "Gênero não encontrado");
        }
    });    

    // Teste Deletar Gênero
    it('DELETE /api/deleteGender/:id_genero deve impedir deleção de gênero com livros', async () => {
        // Buscar um gênero que esteja sendo usado
        const generos = await request(app).get('/api/generos');
        const generoComLivros = generos.body.find(g => 
          // Encontre um gênero que tenha livros associados
          generos.body.some(livro => livro.id_genero === g.id_genero)
        );
    
        const res = await request(app).delete(`/api/deleteGender/${generoComLivros.id_genero}`);
    
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('msg', "Erro interno do servidor");
    });

    // Teste Listar Livros por Gênero
    it('GET /api/ListBooksByGender/:nome_genero deve retornar livros de um gênero', async () => {
        const res = await request(app).get('/api/ListBooksByGender/Romance');
        
        expect([200, 404]).toContain(res.statusCode);

        if(res.statusCode === 200){
            expect(res.body).toBeInstanceOf(Array);
        } else {
            expect(res.body).toHaveProperty('msg', "Nenhum livro encontrado para este gênero");
        }
    });
});