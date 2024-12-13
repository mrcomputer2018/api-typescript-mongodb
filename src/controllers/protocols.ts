export interface HttpResponse<T> {
    statusCode: number;
    body: T | string;
}

// B - body
export interface HttpRequest<B> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headers?: any;
    body?: B;
}

//params
// /users/1223 - o 123 é um parametro
