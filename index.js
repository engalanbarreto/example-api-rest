import express from "express";
import { StatusCodes } from 'http-status-codes';

const app = express();
const PORT = process.env.PORT || 3000;
let users = [
    { id: 1, name: 'Alan Barreto', age: 34 },
    { id: 2, name: 'Olivia Barreto', age: 36 },
    { id: 3, name: 'Clara Barreto', age: 5 },
];

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Aqui retorna a partir da rota principal o que foi enviado
// no metodo send() do response.
app.get('/', (request, response) => {
    return response.send('<h1>Trabalhando com servidor express</h1>');
});

// Aqui retorna a partir da rota users o que foi enviado
// no metodo send() do response, que foi uma array com usuarios.
app.get('/users', (request, response) => {
    return response.send(users);
});

// Aqui retorna a partir da rota users/userId o que foi enviado
// no metodo send() do response, com detalhes de um determinado id.
app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const user = users.find((user) => {
        return (user.id === Number(userId))
    });
    return response.send(user);
});
// O metodo find() percorre um array e procura por uma elemento indicado
// dentro de uma arrow function.

// Aqui cria um novo usuario a partir do metodo post()
app.post('/users', (request, response) => {
    const newUser = request.body;

    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
});

// Aqui atualiza um usuario a partir do metodo put()
app.put('/users/:userId', (request, response) => {
    //Aqui eu pego um parametro digitado na rota de endereço e jogo na variável
    const userId = request.params.userId;
    //Aqui eu atualizo o corpo da request e jogo na variável
    const updatedUser = request.body;

    //Aqui eu percorro a array atraves do metodo map()
    // e checo se o id é igual ao parametro indicado
    // se for eu retorno a atualização no corpo.
    users = users.map(user => {
        if (Number(userId) === user.id) {
            return updatedUser;
        }

        return user;
    });

    return response.send(updatedUser);
});

// Aqui deleta um usuario a partir do metodo delete()
app.delete('/users/:userId', (request, response) => {
    //Aqui eu pego um parametro digitado na rota de endereço e jogo na variável
    const userId = request.params.userId;

    //Aqui eu percorro a array atraves do metodo filter()
    // seleciono os id diferente do indicado e retiro da nova array;
    users = users.filter((user) => user.id !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();
});