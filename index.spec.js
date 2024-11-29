const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./src/routers');
const client = require('./config/db');

const app = express();
app.use(bodyParser.json());
app.use(routers);

let server;

beforeAll(() => {
    server = app.listen(8085);
});

afterAll(async() => {
    await client.end();
    server.close();
});

describe('Gender Routes', () => {
    // Teste Rota Raiz
    it('GET / deve retornar a mensagem', async() => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', "The API is running!!!");
    });

    // Teste Registro de Gênero
    it('POST /api/registerGender deve criar um novo gênero', async() => {
        const data = { nome_genero: "Ficção Científica" };

        const res = await request(app).post('/api/registerGender').send(data);
        if(res.statusCode === 201){
            expect(res.body).toHaveProperty('msg', "Genero cadastrado com sucesso");
        } else {
            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('msg', "Este genero já está cadastrado no Banco de Dados");
        }
    });

    // Teste Listar Gêneros
    it('GET /api/generos deve retornar lista de gêneros', async() => {
        const res = await request(app).get('/api/generos');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    // Teste Atualizar Gênero
    it('PUT /api/updateGender/:id_genero deve atualizar um gênero', async() => {
        // Primeiro, busque um ID de gênero existente para atualizar
        const generos = await request(app).get('/api/generos');
        const id_genero = generos.body[0].id_genero;

        const updateData = { nome_genero: "Ficção Atualizado" };

        const res = await request(app)
            .put(`/api/updateGender/${id_genero}`)
            .send(updateData);

        if(res.statusCode === 200){
            expect(res.body).toHaveProperty('msg', "Gênero atualizado com sucesso");
        } else {
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('msg', "Gênero não encontrado");
        }
    });

    // Teste Deletar Gênero
    it('DELETE /api/deleteGender/:id_genero deve deletar um gênero', async() => {
        // Primeiro, busque um ID de gênero existente para deletar
        const generos = await request(app).get('/api/generos');
        const id_genero = generos.body[0].id_genero;

        const res = await request(app).delete(`/api/deleteGender/${id_genero}`);

        if(res.statusCode === 200){
            expect(res.body).toHaveProperty('msg', "Gênero deletado com sucesso");
        } else {
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('msg', "Gênero não encontrado");
        }
    });

    // Teste Listar Livros por Gênero
    it('GET /api/ListBooksByGender/:nome_genero deve retornar livros de um gênero', async() => {
        const res = await request(app).get('/api/ListBooksByGender/Romance');
        
        if(res.statusCode === 200){
            expect(res.body).toBeInstanceOf(Array);
        } else {
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('msg', "Nenhum livro encontrado para este gênero");
        }
    });
});