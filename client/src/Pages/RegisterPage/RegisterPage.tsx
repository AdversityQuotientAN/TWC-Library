import React from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../../Context/useAuth'
import './RegisterPage.css'


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
        <section className="formPage">
                <div className="formContainer">
                    <form className="" onSubmit={handleSubmit(handleRegister)}>
                    <h1 className="">
                    Register
                    </h1>
                    <div className='inputContainer'>
                        <label
                        htmlFor="email"
                        className=""
                        >
                        Email:
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
                    <div className='inputContainer'>
                        <label
                        htmlFor="username"
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
                    <div className='userTypeContainer'>
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
                            className="userTypeInput"
                            {...register('usertype')}
                        />
                        <label
                        htmlFor="usertype"
                        className=""
                        >
                        Librarian:
                        </label>
                        <input
                            type="radio"
                            id="usertype"
                            value='Librarian'
                            className="userTypeInput"
                            {...register('usertype')}
                        />
                        {errors.usertype ? <p className='text-white'>{errors.usertype.message}</p> : ''}
                    </div>
                    <button
                        type="submit"
                        className=""
                    >
                        Sign up
                    </button>
                    </form>
                </div>
        </section>
    )
}

export default RegisterPage