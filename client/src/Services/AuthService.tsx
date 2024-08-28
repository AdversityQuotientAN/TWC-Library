import axios from "axios"
import { handleError } from "../Handlers/ErrorHandler"
import { UserProfileToken } from "../Models/User"

const api = "http://localhost:5035/api"

export const loginApi = async (username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "account/login", {
            username: username,
            password: password
        })
        return data
    }
    catch (error) {
        handleError(error)
    }
}

export const registerApi = async (email: string, username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "account/register", {
            email: email,
            username: username,
            password: password
        })
        return data
    }
    catch (error) {
        handleError(error)
    }
}