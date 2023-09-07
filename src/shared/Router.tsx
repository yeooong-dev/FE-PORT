import { BrowserRouter, Route, Routes } from "react-router-dom";
import Info from "../pages/main/Info";
import Main from "../pages/main/Main";
import Register from "../components/register/RegisterBox";
import Login from "../pages/login/Login";
import Todo from "../pages/todo/Todo";
import Mypage from "../pages/mypage/Mypage";
import FamilyEvent from "../pages/familyEvent/FamilyEvent";
import Vacation from "../pages/vacation/Vacation";
import Dm from "../pages/dm/Dm";
import Chat from "../pages/chat/Chat";
import Calendar from "../pages/calendar/Calendar";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Info />} />
                <Route path='/main' element={<Main />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/mypage' element={<Mypage />} />
                <Route path='/todo' element={<Todo />} />
                <Route path='/calendar' element={<Calendar />} />
                <Route path='/event' element={<FamilyEvent />} />
                <Route path='/vac' element={<Vacation />} />
                <Route path='/chat' element={<Chat />} />
                <Route path='/dm' element={<Dm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
