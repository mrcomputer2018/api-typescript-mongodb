import { HttpRequest } from './../protocols';
import { User } from "../../models/user";
import { HttpResponse } from "../protocols";

export interface IUpdateUserParams {
    firstName?: string;
    lastName?: string;
    password?: string;
}

export interface IUpdateUserController {
    handle(HttpRequest: HttpRequest<IUpdateUserParams>): Promise<HttpResponse<User>>;
}

export interface IUpdateUserRepository {
    updateUser(id:string, params: IUpdateUserParams): Promise<User>;
}