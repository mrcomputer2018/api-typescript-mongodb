import { GetUsersController } from './controllers/get-users/get-users';
import dotenv from 'dotenv';
import express from 'express';
import { MongoGetUsersRepository } from './repositories/get-users/mongo-get-users';

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/users', async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

   const response = await getUsersController.handle();

    res.send(response.body).status(response.statusCode);
});

app.listen(port, () => {
  console.log(`\nServidor rodando na porta ${port}`);
});
