import { User } from "../../models/user";
import { HttpResponse } from "../protocols";

//tera as interfcaes do controller get user
export interface IGetUsersController {
    //metodos
    handle(): Promise<HttpResponse<User[]>>;
}

export interface IGetUsersRepository {
    //metodos
    // Promise por que sera um codigo assincrono que se comunicara com o BD
    getUsers(): Promise<User[]>;
}
