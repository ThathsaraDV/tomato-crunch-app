import React, {useEffect, useState} from "react";
import {AppRouter} from "./app/router/AppRouter";
import {AuthContext, initAuthContext} from "./app/context/AuthContext";
import AuthResponseDto from "./app/dto/AuthResponseDto";
import httpService from "./app/service/HttpService";

function App() {
    const [authDto, setAuthDto] = useState<AuthResponseDto>(initAuthContext);

    useEffect(() => {
        httpService.configure(authDto, setAuthDto, window);
    },[authDto]);

    return (
        <React.StrictMode>
            <AuthContext.Provider value={{authDto, setAuthDto}}>
                <AppRouter/>
            </AuthContext.Provider>
        </React.StrictMode>
    );
}

export default App;
