import { HttpRequest } from './../protocols';
import { User } from '../../models/user';
import { HttpResponse } from '../protocols';
import { CreateUserParams, ICreateUserController } from './protocols';
export class CreateUserController implements ICreateUserController{
    private readonly createUserRepository: ICreateUserController;

    constructor(createUserRepository: ICreateUserController){
        this.createUserRepository = createUserRepository;
    }

    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try {
            //validar se body existe
            if (!httpRequest.body) {
                return {
                    statusCode: 400,
                    body: 'Faltando o parâmetro: body',
                };
            }

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
}