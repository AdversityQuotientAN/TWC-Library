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
        <section className="">
            <div className="">
                <div className="">
                <div className="">
                    <h1 className="">
                    Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleLogin)}>
                    <div>
                        <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Username: {' '}
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Username"
                            {...register('userName')}
                        />
                        {errors.userName ? <p className='text-white'>{errors.userName.message}</p> : ''}
                    </div>
                    <br />
                    <div>
                        <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Password: {' '}
                        </label>
                        <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register('password')}
                        />
                        {errors.password ? <p className='text-white'>{errors.password.message}</p> : ''}
                    </div>
                    <br />
                    {/* <div className="flex items-center justify-between">
                        <a
                        href="#"
                        className="text-sm text-white font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                        Forgot password?
                        </a>
                    </div> */}
                    <br />
                    <button
                        type="submit"
                        className="w-full text-white bg-lightGreen hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Sign in
                    </button>
                    <br />
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet?{" "}
                        <a
                        href="/register"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                        Sign up
                        </a>
                    </p>
                    <br />
                    <br />
                    </form>
                </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage