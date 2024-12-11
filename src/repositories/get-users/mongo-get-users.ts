import { IGetUsersRepository } from '../../controllers/get-users/protocols';
import { User } from '../../models/user';

export class MongoGetUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
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
