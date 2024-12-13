import { User } from '../../models/user';
import { HttpRequest, HttpResponse } from '../protocols';

//Passando tudo que o usuario precisa passar para criar um usuario
export interface CreateUserParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ICreateUserRepository {
    createUser(params: CreateUserParams): Promise<User>;
}

export interface ICreateUserController {
    handle(
        httpResquest: HttpRequest<CreateUserParams>,
    ): Promise<HttpResponse<User>>;

    createUser(params: CreateUserParams): Promise<User>;
}
