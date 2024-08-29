import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../Pages/LoginPage/LoginPage";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import RegisterPage from "../Pages/RegisterPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
        ]
    }
])