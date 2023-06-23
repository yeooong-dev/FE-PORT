import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/main/Main";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
