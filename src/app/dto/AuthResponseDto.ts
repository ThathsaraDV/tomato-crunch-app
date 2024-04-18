export interface AuthResponseDto {
    access_token: string | null;
    refresh_token: string | null;
    username: string,
}

export default AuthResponseDto;