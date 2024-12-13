import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { IUpdateUserController, IUpdateUserParams, IUpdateUserRepository } from "./protocols";

export class UpdateUserController implements IUpdateUserController {
    constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

    async handle(HttpRequest: HttpRequest<IUpdateUserParams>): Promise<HttpResponse<User>> {
       try {
           const id  = HttpRequest?.params?.id;
           const body = HttpRequest?.body;

            // verificando se o id foi informado
            if (!id) {
                return {
                        statusCode: 400,
                        body: 'Id não informado',
                };
            }

            const allowedFieldsToUpdate: (keyof IUpdateUserParams)[] = ['firstName', 'lastName', 'password'];

            const someFieldIsNotAllowedToUpdate = body && Object.keys(body).some(key => !allowedFieldsToUpdate.includes(key as keyof IUpdateUserParams));
            
            // verificando se algum campo não é permitido para atualização
            if (someFieldIsNotAllowedToUpdate) {
                return {
                    statusCode: 400,
                    body: 'Campo não permitido para atualização',
                };
            }

            // verificando se o body foi informado
            if (!body) {
                return {
                    statusCode: 400,
                    body: 'Body não informado',
                };
            }

            const user = await this.updateUserRepository.updateUser(id, body);

            return {
                statusCode: 200,
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