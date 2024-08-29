import { createContext, useEffect, useState } from "react"
import { UserProfile } from "../Models/User"
import { useNavigate } from "react-router-dom"
import { loginApi, registerApi } from "../Services/AuthService"
import { toast } from "react-toastify"
import React from "react"
import axios from "axios"

type UserContextType = {
    user: UserProfile | null
    token: string | null    // Null if not logged in
    registerUser: (email: string, username: string, password: string, userType: string) => void
    loginUser: (username: string, password: string) => void
    logout: () => void
    isLoggedIn: () => boolean
}

type Props = { children: React.ReactNode }

const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate()
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<UserProfile | null>(null)
    const [isReady, setIsReady] = useState(false)   // Ensures the component loads correctly since the loading is async

    useEffect(() => {
        const user = localStorage.getItem('user')
        const token = localStorage.getItem('token')
        if (user && token) {
            setUser(JSON.parse(user))
            setToken(token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        }
        setIsReady(true)
    }, [])

    const registerUser = async (email: string, username: string, password: string, userType: string) => {

        await registerApi(email, username, password, userType).then((response) => {
            if (response) {
                localStorage.setItem('token', response?.data.token)
                const userObj = {
                    userName: response?.data.userName,
                    email: response?.data.email,
                    userType: response?.data.userType
                }
                localStorage.setItem('user', JSON.stringify(userObj))
                setToken(response?.data.token!)
                setUser(userObj!)
                toast.success('Registration success!')
                navigate('/')
            }
        }).catch((e) => toast.warning('Server error occurred'))
    }

    const loginUser = async (username: string, password: string) => {

        await loginApi(username, password).then((response) => {
            if (response) {
                localStorage.setItem('token', response?.data.token)
                const userObj = {
                    userName: response?.data.userName,
                    email: response?.data.email,
                    userType: response?.data.userType
                }
                localStorage.setItem('user', JSON.stringify(userObj))
                setToken(response?.data.token!)
                setUser(userObj!)
                toast.success('Login success!')
                navigate('/')
            }
        }).catch((e) => toast.warning('Server error occurred'))
    }

    const isLoggedIn = () => {
        return !!user
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        setToken('')
        navigate('/')
    }

    return (
        <UserContext.Provider value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}>
            {isReady ? children : null}
        </UserContext.Provider>
    )
}

export const useAuth = () => React.useContext(UserContext)