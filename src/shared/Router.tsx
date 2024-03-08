import React, { ReactElement, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Info from "../pages/main/Info";
import Main from "../pages/main/Main";
import Register from "../components/register/RegisterBox";
import Login from "../pages/login/Login";
import Todo from "../pages/todo/Todo";
import Mypage from "../pages/mypage/Mypage";
import FamilyEvent from "../pages/familyEvent/FamilyEvent";
import Vacation from "../pages/vacation/Vacation";
import Calendar from "../pages/calendar/CalendarView";
import UseIsLogin from "../hook/UseIsLogin";
import Wrapper from "../components/wrapper/Wrapper";
import SearchResultsPage from "../components/search/SearchResultsPage";
import CompanyPage from "../pages/company/CompanyPage";
import Chart from "../pages/chart/Chart";

interface ProtectedRouteProps {
    element: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const [isLogin, loading] = UseIsLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!isLogin) {
                navigate("/login");
            }
        }
    }, [isLogin, loading, navigate]);

    return loading ? null : isLogin ? element : null;
};

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Info />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />

                <Route path='/' element={<Wrapper />}>
                    <Route path='/search-results' element={<SearchResultsPage />} />
                    <Route path='main' element={<Main />} />
                    <Route path='mypage' element={<ProtectedRoute element={<Mypage />} />} />
                    <Route path='todo' element={<ProtectedRoute element={<Todo />} />} />
                    <Route path='calendar' element={<ProtectedRoute element={<Calendar />} />} />
                    <Route path='event' element={<ProtectedRoute element={<FamilyEvent />} />} />
                    <Route path='chart' element={<ProtectedRoute element={<Chart />} />} />
                    <Route path='vac' element={<ProtectedRoute element={<Vacation />} />} />
                    <Route path='company' element={<ProtectedRoute element={<CompanyPage />} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
