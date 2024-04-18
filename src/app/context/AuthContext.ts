import {createContext} from "react";
import AuthResponseDto from "../dto/AuthResponseDto";

export type AuthContextType = {
    authDto: AuthResponseDto,
    setAuthDto: (authDto: AuthResponseDto) => void,
}

export const initAuthContext: AuthResponseDto = {
    access_token: null,
    refresh_token: null,
    username: ""
}

export const AuthContext = createContext<AuthContextType>({
    authDto: initAuthContext,
    setAuthDto: (authDto: AuthResponseDto) => {},
});