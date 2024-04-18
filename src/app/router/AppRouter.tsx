import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SignIn} from "../pages/signIn/SignIn";
import {SignUp} from "../pages/signUp/SignUp";
import Play from "../pages/play/Play";
import Main from "../components/main/Main";
import Profile from "../pages/profile/Profile";
import Leaderboard from "../pages/Leaderboard/Leaderboard";

export const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<SignIn/>}/>
                <Route path="sign-up" element={<SignUp/>}/>
                <Route path="main/*" element={<Main/>}>
                    <Route index element={<Play/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="leaderboard" element={<Leaderboard/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};