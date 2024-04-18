import httpService from "../HttpService";

export function Login (username: string, password: string) {

    return httpService
        .post("auth/authenticate", {
            username,
            password
        });
}

export function Register (username: string, password: string) {

    return httpService
        .post("auth/register", {
            username,
            password
        });
}