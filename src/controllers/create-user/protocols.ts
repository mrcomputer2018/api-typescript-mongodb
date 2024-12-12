import { User } from "../../models/user";

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