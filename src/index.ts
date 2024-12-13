import { GetUsersController } from './controllers/get-users/get-users';
import dotenv from 'dotenv';
import express from 'express';
import { MongoGetUsersRepository } from './repositories/get-users/mongo-get-users';
import { MongoClient } from './database/mongo';
import { MongoCreateUserRepository } from './repositories/create-user/mongo-create-user';
import { CreateUserController } from './controllers/create-user/create-user';

const main = async () => {
    dotenv.config();

    const app = express();

    await MongoClient.connect();

    app.use(express.json());

    const port = process.env.PORT || 3000;

    app.get('/users', async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository();

        const getUsersController = new GetUsersController(
            mongoGetUsersRepository,
        );

        const response = await getUsersController.handle();

        res.status(response.statusCode).json(response.body);
    });

    app.post('/users', async (req, res) => {
        const mongoCreateUserRepository = new MongoCreateUserRepository();

        const createUserController = new CreateUserController(
            mongoCreateUserRepository,
        );

        const response = await createUserController.handle({
            body: req.body,
        });

        res.status(response.statusCode).json(response.body);
    });

    app.listen(port, () => {
        console.log(`\nServidor rodando na porta ${port}`);
    });
};

main();
