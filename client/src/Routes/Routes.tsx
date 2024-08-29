import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../Pages/LoginPage/LoginPage";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import RegisterPage from "../Pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import BookPage from "../Pages/BookPage/BookPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'edit', element: <ProtectedRoute><RegisterPage /></ProtectedRoute> },
            { path: 'delete', element: <ProtectedRoute><RegisterPage /></ProtectedRoute> },
            { path: 'book/:id', element: <BookPage /> },
        ]
    }
])