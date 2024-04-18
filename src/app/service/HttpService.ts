import axios, {AxiosRequestConfig} from "axios";
import AuthResponseDto from "../dto/AuthResponseDto";

/**
 * I have used this HttpService before in my projects at my diploma
 * */

const HttpMethods = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
};

const _axios = axios.create();
const baseUrl: string | undefined = "http://localhost:8080/api/v1/";
const restVersionPath: string | undefined = "";

function configure (authDto: AuthResponseDto, setAuthDto: (authDto: AuthResponseDto) => void, window: any) {
    _axios.interceptors.request.use(function (config) {
        if (null != authDto.access_token && 'true' === config.headers.get('require-token')) {
            config.headers.set("Authorization", `Bearer ${authDto.access_token}`);
        }
        return config;
    });

    /**
     * I referred below article when implementing the refresh token function
     * https://blog.theashishmaurya.me/handling-jwt-access-and-refresh-token-using-axios-in-react-app
     * */
    _axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const response = await post('auth/refresh-token', {}, {
                        headers: {
                            'Authorization': `Bearer ${authDto.refresh_token}`
                        },
                    });
                    if (response.status === 200) {
                        if (response.data.access_token) {
                            setAuthDto({
                                access_token: response.data.access_token,
                                refresh_token: response.data.refresh_token,
                                username: authDto.username
                            });
                        }
                    }
                    originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
                    return axios(originalRequest);
                } catch (error) {
                    window.location.href = '/';
                }
            }

            return Promise.reject(error);
        }
    );

}

const get = (path = "", config?: AxiosRequestConfig) => {
    let url = baseUrl + restVersionPath + path;
    return _axios.get(url, config);
}

const put = (path = "", payload: any, config?: AxiosRequestConfig) => {
    let url = baseUrl + restVersionPath + path;
    return _axios.put(url, payload, config);
}

const post = (path = "", payload: any, config?: AxiosRequestConfig) => {
    let url = baseUrl + restVersionPath + path;
    return _axios.post(url, payload, config);
}


const deleteOne = (path = "", config?: AxiosRequestConfig) => {
    let url = baseUrl + restVersionPath + path;
    return _axios.delete(url, config);
}

const getAxios = () => {
    return axios;
}

const getAxiosClient = () => _axios;

const HttpService = {
    HttpMethods,
    configure,
    getAxiosClient,
    get,
    put,
    post,
    deleteOne,
    getAxios
};


export default HttpService;
