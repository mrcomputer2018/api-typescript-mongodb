import { IGetUsersRepository } from '../../controllers/get-users/protocols';
import { MongoClient } from '../../database/mongo';
import { User } from '../../models/user';

export class MongoGetUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        const users = await MongoClient.db.collection<User>('users').find().toArray();

        // implementation
        return [
            {
                id: 1,
                firstName: 'any_first_name',
                lastName: 'any_last_name',
                email: 'any_email',
                password: '123',
            },
        ];
    }
}
