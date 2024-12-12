import { HttpRequest } from './../protocols';
import { User } from '../../models/user';
import { HttpResponse } from '../protocols';
import { CreateUserParams, ICreateUserController, ICreateUserRepository } from './protocols';
export class CreateUserController implements ICreateUserController{   

    constructor(private readonly createUserRepository: ICreateUserRepository){}

    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try {
            //validar se body existe
            if (!httpRequest.body) {
                return {
                    statusCode: 400,
                    body: 'Faltando o parâmetro: body',
                };
            }

            console.log(httpRequest.body);

            const user = await this.createUserRepository.createUser(httpRequest.body);

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