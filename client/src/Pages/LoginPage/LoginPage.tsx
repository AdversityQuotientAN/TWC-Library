import React from 'react'
import * as Yup from 'yup'
import { useAuth } from '../../Context/useAuth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import './LoginPages.css'

type LoginFormInputs = {
    userName: string
    password: string
}

const validation = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
})


const LoginPage = () => {

    const { loginUser } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({ resolver: yupResolver(validation) })

    const handleLogin = (form: LoginFormInputs) => {
        loginUser(form.userName, form.password)
    }

    return (
        <section className="formPage">
                <div className="formContainer">
                    <form className="form" onSubmit={handleSubmit(handleLogin)}>
                    <h1 className="">
                        Login
                    </h1>
                    <div className='inputContainer'>
                        <label
                        htmlFor="email"
                        className=""
                        >
                        Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            className=""
                            placeholder="Username"
                            {...register('userName')}
                        />
                        {errors.userName ? <p className='text-white'>{errors.userName.message}</p> : ''}
                    </div>
                    <div className='inputContainer'>
                        <label
                        htmlFor="password"
                        className=""
                        >
                        Password:
                        </label>
                        <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        className=""
                        {...register('password')}
                        />
                        {errors.password ? <p className='text-white'>{errors.password.message}</p> : ''}
                    </div>
                    <button
                        type="submit"
                        className=""
                    >
                        Sign in
                    </button>
                    <p className="">
                        Don’t have an account yet?{" "}
                        <a
                        href="/register"
                        className=""
                        >
                        Sign up
                        </a>
                    </p>
                    </form>
                </div>
        </section>
    )
}

export default LoginPage