import validadtor from "validator"
import { HttpRequest } from './../protocols';
import { User } from '../../models/user';
import { HttpResponse } from '../protocols';
import { CreateUserParams, ICreateUserController, ICreateUserRepository } from './protocols';
export class CreateUserController implements ICreateUserController{   

    constructor(private readonly createUserRepository: ICreateUserRepository){}

    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try {
            //verificar se todos os campos obrigatorios foram preenchidos
            const requiredFields = ['firstName', 'lastName', 'email', 'password'];

            for (const field of requiredFields) {
                if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
                    return {
                        statusCode: 400,
                        body: `O campo ${field} é obrigatorio`,
                    };
                }
            }

            //verificar se maile valido
            const emailIsValid = validadtor.isEmail(httpRequest.body!.email);

            if (!emailIsValid) {
                return {
                    statusCode: 400,
                    body: 'E-mail inválido',
                };
            }

            const user = await this.createUserRepository.createUser(httpRequest.body!);

            console.log(user);

            return {
                statusCode: 201,
                body: user,
            };

        } catch (error) {
            console.log(error);

            return {
                statusCode: 500,
                body: 'Alguma coisa deu errado. Tente novamente mais tarde.',
            };
        }
    }

    async createUser(params: CreateUserParams): Promise<User> {

        return this.createUserRepository.createUser(params);

    }
}