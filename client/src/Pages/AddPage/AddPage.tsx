import React from 'react'
import * as Yup from 'yup'
// import { useAuth } from '../../Context/useAuth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { api } from '../../constants'

type AddBookFormInputs = {
    title: string
    author: string
    description: string
    coverImage: string
    publisher: string
    publicationDate: Date
    category: string
    isbn: number
    pageCount: number
}

const validation = Yup.object().shape({
    title: Yup.string().required('Username is required'),
    author: Yup.string().required('Password is required'),
    description: Yup.string().required('Password is required'),
    coverImage: Yup.string().required('Cover image is required'),
    publisher: Yup.string().required('Password is required'),
    publicationDate: Yup.date().required('Password is required'),
    category: Yup.string().required('Password is required'),
    isbn: Yup.number().required('Password is required'),
    pageCount: Yup.number().required('Password is required'),
})


const AddPage = () => {

    const navigate = useNavigate()



    const { register, handleSubmit, formState: { errors } } = useForm<AddBookFormInputs>({ resolver: yupResolver(validation) })

    const AddBook = (form: AddBookFormInputs) => {
        axios.post<AddBookFormInputs>(`${api}book`, {
            title: form.title,
            author: form.author,
            description: form.description,
            coverImage: "temp",
            publisher: form.publisher,
            publicationDate: form.publicationDate,
            category: form.category,
            isbn: form.isbn,
            pageCount: form.pageCount
        }).then((response) => {
            console.log(response)
            toast.success(`Successfully added the book ${form.title}!`)
            navigate('/')
        }).catch((e) => {
            if (e.status == 403) {
                toast.warning(`You need to be a librarian to add a book!`)
            }
            else {
                toast.warning(`Other error: ${e.message}`)
            }
        })
    }

    return (
        <section>
            <div>
                <h1>Add Book</h1>
                <form onSubmit={handleSubmit(AddBook)}>
                    <div>
                        <label
                            htmlFor='title'
                        >
                            Title
                        </label>
                        <input
                            type='text'
                            id='title'
                            placeholder='Book title'
                            {...register('title')}
                        />
                        {errors.title ? <p className='text-white'>{errors.title.message}</p> : ''}
                    </div>
                    <div>
                        <label
                            htmlFor='author'
                        >
                            Author
                        </label>
                        <input
                            type='text'
                            id='author'
                            {...register('author')}
                        />
                        {errors.author ? <p className='text-white'>{errors.author.message}</p> : ''}
                    </div>
                    <div>
                        <label
                            htmlFor='description'
                        >
                            Description
                        </label>
                        <input
                            type='text'
                            id='description'
                            {...register('description')}
                        />
                        {errors.description ? <p className='text-white'>{errors.description.message}</p> : ''}
                    </div>
                    <div>
                        <label
                            htmlFor='coverImage'
                        >
                            Cover Image
                        </label>
                        <input
                            type='text'
                            id='coverImage'
                            placeholder='cover_image.png'
                            {...register('coverImage')}
                        />
                        {errors.coverImage ? <p className='text-white'>{errors.coverImage.message}</p> : ''}
                    </div>
                    <div>
                        <label
                            htmlFor='publisher'
                        >
                            Publisher
                        </label>
                        <input
                            type='text'
                            id='publisher'
                            {...register('publisher')}
                        />
                        {errors.publisher ? <p className='text-white'>{errors.publisher.message}</p> : ''}
                    </div>
                    <div>
                        <label
                            htmlFor='publicationDate'
                        >
                            Publication Date
                        </label>
                        <input
                            type='date'
                            id='publicationDate'
                            {...register('publicationDate')}
                        />
                        {errors.publicationDate ? <p className='text-white'>{errors.publicationDate.message}</p> : ''}
                    </div>
                    <div>
                        <label
                            htmlFor='category'
                        >
                            Category
                        </label>
                        <input
                            type='text'
                            id='category'
                            {...register('category')}
                        />
                        {errors.category ? <p className='text-white'>{errors.category.message}</p> : ''}
                    </div>
                    <div>
                        <label
                            htmlFor='isbn'
                        >
                            ISBN
                        </label>
                        <input
                            type='number'
                            id='isbn'
                            {...register('isbn')}
                        />
                        {errors.isbn ? <p className='text-white'>{errors.isbn.message}</p> : ''}
                    </div>
                    <div>
                        <label
                            htmlFor='pageCount'
                        >
                            Page Count
                        </label>
                        <input
                            type='number'
                            id='pageCount'
                            {...register('pageCount')}
                        />
                        {errors.pageCount ? <p className='text-white'>{errors.pageCount.message}</p> : ''}
                    </div>

                    <button type='submit'>Add book</button>
                </form>
            </div>
        </section>
    )
}

export default AddPage