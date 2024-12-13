import { ObjectId } from 'mongodb';
import { IUpdateUserParams, IUpdateUserRepository } from '../../controllers/updated-users/protocols'
import { MongoClient } from '../../database/mongo';
import { User } from '../../models/user';

export class MongoUpdateUserRepository implements IUpdateUserRepository {
    async updateUser(id: string, params: IUpdateUserParams): Promise<User> {
        await MongoClient.db.collection('users').updateOne(
            {_id: new ObjectId(id)}, { $set: {...params,} }
        );

        const user = await MongoClient.db.collection<Omit<User, "id">>('users').findOne({_id: new ObjectId(id)});

        if (!user) {
            throw new Error('Usuário não encontrado!!!');
        }

        const { _id, ...rest } = user;

        return { id: _id.toHexString(), ...rest };

    }
    
} 