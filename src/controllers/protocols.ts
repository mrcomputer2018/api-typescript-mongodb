export interface HttpResponse<T> {
    statusCode: number;
    body: T | string;
}

// B - body
export interface HttpRequest<B> {
    params?: B;
    headers?: B;
    body?: B;
}

//params
// /users/1223 - o 123 é um parametro