//um controller sempre retorna uma resposta http com
//status code e body, por isso o response
import { User } from "../../models/user";
import { HttpResponse } from "../protocols";
import { IGetUsersController, IGetUsersRepository } from "./protocols";

export class GetUsersController implements IGetUsersController {
    //atributos
    private readonly getUsersRepository: IGetUsersRepository;
    
    //constructor
    constructor(getUsersRepository: IGetUsersRepository) {
        this.getUsersRepository = getUsersRepository;
    }

    //metodos
    async handle(): Promise<HttpResponse<User[]>> {
        try {
             //validar requiição
            //redireionar chamada para repository
            const users = await this.getUsersRepository.getUsers();

            return {
                statusCode: 200,
                body: users
            }
        } catch (error) {
            console.log(error);

            return {
                statusCode: 500,
                body: "Alguma coisa deu errado. Tente novamente mais tarde."
            }
        }
    }

}