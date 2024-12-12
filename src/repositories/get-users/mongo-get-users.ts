import { IGetUsersRepository } from '../../controllers/get-users/protocols';
import { MongoClient } from '../../database/mongo';
import { User } from '../../models/user';

export class MongoGetUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        //Omit remove uma propriedade de uma interface
        const users = await MongoClient.db.collection<Omit<User, 'id'>>('users').find().toArray();

        // implementation
        return users.map(({_id, ...rest}) => ({ ...rest, id: _id.toHexString() }));
    }
}
