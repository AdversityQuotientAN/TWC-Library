import React from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../Context/useAuth'


type RegisterFormInputs = {
    email: string
    userName: string
    password: string
    usertype: string
}

const validation = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    email: Yup.string().required('Email is required'),
    usertype: Yup.string().required().oneOf(['Librarian', 'Customer']),
})

const RegisterPage = () => {

    const { registerUser } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({ resolver: yupResolver(validation) })

    const handleRegister = (form: RegisterFormInputs) => {
        registerUser(form.email, form.userName, form.password, form.usertype)
    }

    return (
        <section className="">
            <div className="">
                <div className="">
                <div className="">
                    <h1 className="">
                    Register
                    </h1>
                    <form className="" onSubmit={handleSubmit(handleRegister)}>
                    <div>
                        <label
                        htmlFor="email"
                        className=""
                        >
                        Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className=""
                            placeholder="Email"
                            defaultValue="user@example.com"
                            {...register('email')}
                        />
                        {errors.email ? <p className='text-white'>{errors.email.message}</p> : ''}
                    </div>
                    <div>
                        <label
                        htmlFor="username"
                        className=""
                        >
                        Username
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
                    <div>
                        <label
                        htmlFor="password"
                        className=""
                        >
                        Password
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
                    <div>
                        <label
                        htmlFor="usertype"
                        className=""
                        >
                        Customer:
                        </label>
                        <input
                            type="radio"
                            id="usertype"
                            value='Customer'
                            className=""
                            {...register('usertype')}
                        />
                        Librarian:
                        <input
                            type="radio"
                            id="usertype"
                            value='Librarian'
                            className=""
                            {...register('usertype')}
                        />
                        {errors.usertype ? <p className='text-white'>{errors.usertype.message}</p> : ''}
                    </div>
                    <div className="flex items-center justify-between">
                        <a
                        href="#"
                        className=""
                        >
                        Forgot password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className=""
                    >
                        Sign up
                    </button>
                    </form>
                </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterPage