import { CreateUserParams, ICreateUserRepository } from "../../controllers/create-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoCreateUserRepository implements ICreateUserRepository {
    async createUser(params: CreateUserParams): Promise<User> {
        // implementation
        //criando user na database
        const { insertedId } = await MongoClient.db.collection('users').insertOne(params);
        
        const user = await MongoClient.db.collection<Omit<User, 'id'>>('users').findOne({ _id: insertedId });

        if (!user) {
            throw new Error('Usuário não foi criado!!!')
        }

        const { _id, ...rest } = user;

        return { id: _id.toHexString(), ...rest };
    }
}