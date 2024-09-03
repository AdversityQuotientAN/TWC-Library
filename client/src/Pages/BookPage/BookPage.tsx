import axios from 'axios'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../constants'
import { Book } from '../../Models/Book'
import { useAuth } from '../../Context/useAuth'
import { toast } from 'react-toastify'
import './BookPage.css'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

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
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    description: Yup.string().required('Description is required'),
    coverImage: Yup.string().required('Cover image is required'),
    publisher: Yup.string().required('Publisher is required'),
    publicationDate: Yup.date().required('Publication date is required'),
    category: Yup.string().required('Category is required'),
    isbn: Yup.number().required('ISBN is required'),
    pageCount: Yup.number().required('Page count is required'),
})

const BookPage = () => {

    const { id } = useParams()

    const { isLoggedIn, user } = useAuth()

    const navigate = useNavigate()

    const [bookInfo, setBookInfo] = useState<Book>()
    const [loading, setLoading] = useState(true)
    const [editMode, setEditMode] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<AddBookFormInputs>({ resolver: yupResolver(validation) })

    useEffect(() => {
        axios.get(`${api}book/${id}`).then((response) => {
            setBookInfo(response.data)
            setLoading(false)
        })
    }, [])

    const checkOut = () => {
        axios.put(`${api}book/checkout/${id}`).then(() => {
            toast.success(`Successfully checked out '${bookInfo?.title}'!`)
            navigate('/')
        }).catch((e) => {
            console.log(e)
            if (e.status == 404) {
                toast.warning('Book is unavailable!')
            }
            else {
                toast.warning(`Other error: ${e.message}`)
            }
        })
    }

    const returnBook = () => {
        axios.put(`${api}book/return/${id}`).then(() => {
            toast.success(`Successfully returned '${bookInfo?.title}'!`)
            navigate('/')
        }).catch((e) => {
            if (e.status == 404) {
                toast.warning('Book is currently not being borrowed!')
            }
            else {
                toast.warning(`Other error: ${e.message}`)
            }
        })
    }

    const deleteBook = () => {
        axios.delete(`${api}book/${id}`).then(() => {
            toast.success(`Successfully deleted book!`)
            navigate('/')
        }).catch((e) => {
            toast.warning(`Other error: ${e.message}`)
        })
    }

    const EditBook = (form: AddBookFormInputs) => {
        axios.put<AddBookFormInputs>(`${api}book/${id}`, {
            title: form.title,
            author: form.author,
            description: form.description,
            coverImage: form.coverImage,
            publisher: form.publisher,
            publicationDate: form.publicationDate,
            category: form.category,
            isbn: form.isbn,
            pageCount: form.pageCount
        }).then((response) => {
            console.log(response)
            toast.success(`Successfully updated the book ${form.title}!`)
            navigate('/')
        }).catch((e) => {
            if (e.status == 403) {
                toast.warning(`You need to be a librarian to update a book!`)
            }
            else {
                toast.warning(`Other error: ${e.message}`)
            }
        })
    }

    // Kept saying functions like getFullYear() are not functions for some reason
    // const dateToString = (date: Date): string => {

    //     if (!date) {
    //         return '1000-01-01'
    //     }

    //     const year = date.getFullYear()
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0')
    //     const day = date.getDate().toString().padStart(2, '0')

    //     const formattedDate = `${year}-${month}-${day}`;

    //     return formattedDate
    // }

    return (
        <div className='bookPage'>
            {!isLoggedIn() ? 'Log in to view this book!' : loading ? 'Loading...' : 
                <>
                    <div className='leftContainer'>
                        <div className='imageContainer'>
                            <img className='bookImage' src={`/images/${bookInfo?.coverImage}`} alt={bookInfo?.coverImage} />
                        </div>
                        <div className='attribute'>
                                Available: {new Date(bookInfo?.availableUntil).getTime() > Date.now() ? new Date(bookInfo?.availableUntil).toDateString() : 'Now'}
                        </div>
                        <div className='actionsContainer'>
                            {(user?.userType === 'Customer') &&
                                <div>
                                    <button onClick={checkOut} disabled={new Date(bookInfo?.availableUntil).getTime() > Date.now()}>
                                        Checkout
                                    </button>
                                </div>
                            }
                            {(user?.userType === "Librarian") &&
                                <div>
                                    <button onClick={returnBook} disabled={new Date(bookInfo?.availableUntil).getTime() < Date.now()}>
                                        Return
                                    </button>
                                    <button onClick={deleteBook}>
                                        Delete
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='infoContainer'>
                        <div className='formContainer'>
                            <form onSubmit={handleSubmit(EditBook)}>
                                <div>
                                    <label
                                        htmlFor='title'
                                    >
                                        Title:
                                    </label>
                                    <input
                                        type='text'
                                        id='title'
                                        defaultValue={bookInfo?.title}
                                        disabled={user?.userType !== 'Librarian'}
                                        {...register('title')}
                                    />
                                    {errors.title ? <p className='text-white'>{errors.title.message}</p> : ''}
                                </div>
                                <div>
                                    <label
                                        htmlFor='author'
                                    >
                                        Author:
                                    </label>
                                    <input
                                        type='text'
                                        id='author'
                                        defaultValue={bookInfo?.author}
                                        disabled={user?.userType !== 'Librarian'}
                                        {...register('author')}
                                    />
                                    {errors.author ? <p className='text-white'>{errors.author.message}</p> : ''}
                                </div>
                                <div>
                                    <label
                                        htmlFor='description'
                                    >
                                        Description:
                                    </label>
                                    <input
                                        type='text'
                                        id='description'
                                        defaultValue={bookInfo?.description}
                                        disabled={user?.userType !== 'Librarian'}
                                        {...register('description')}
                                    />
                                    {errors.description ? <p className='text-white'>{errors.description.message}</p> : ''}
                                </div>
                                <div>
                                    <label
                                        htmlFor='coverImage'
                                    >
                                        Cover Image:
                                    </label>
                                    <input
                                        type='text'
                                        id='coverImage'
                                        defaultValue={bookInfo?.coverImage}
                                        disabled={user?.userType !== 'Librarian'}
                                        {...register('coverImage')}
                                    />
                                    {errors.coverImage ? <p className='text-white'>{errors.coverImage.message}</p> : ''}
                                </div>
                                <div>
                                    <label
                                        htmlFor='publisher'
                                    >
                                        Publisher:
                                    </label>
                                    <input
                                        type='text'
                                        id='publisher'
                                        defaultValue={bookInfo?.publisher}
                                        disabled={user?.userType !== 'Librarian'}
                                        {...register('publisher')}
                                    />
                                    {errors.publisher ? <p className='text-white'>{errors.publisher.message}</p> : ''}
                                </div>
                                <div>
                                    <label
                                        htmlFor='publicationDate'
                                    >
                                        Publication Date: {bookInfo?.publicationDate.toString()}
                                    </label>
                                    <input
                                        type='date'
                                        id='publicationDate'
                                        // defaultValue={bookInfo?.publicationDate}
                                        disabled={user?.userType !== 'Librarian'}
                                        {...register('publicationDate')}
                                    />
                                    {errors.publicationDate ? <p className='text-white'>{errors.publicationDate.message}</p> : ''}
                                </div>
                                <div>
                                    <label
                                        htmlFor='category'
                                    >
                                        Category:
                                    </label>
                                    <input
                                        type='text'
                                        id='category'
                                        defaultValue={bookInfo?.category}
                                        disabled={user?.userType !== 'Librarian'}
                                        {...register('category')}
                                    />
                                    {errors.category ? <p className='text-white'>{errors.category.message}</p> : ''}
                                </div>
                                <div>
                                    <label
                                        htmlFor='isbn'
                                    >
                                        ISBN:
                                    </label>
                                    <input
                                        type='number'
                                        id='isbn'
                                        defaultValue={bookInfo?.isbn}
                                        disabled={user?.userType !== 'Librarian'}
                                        {...register('isbn')}
                                    />
                                    {errors.isbn ? <p className='text-white'>{errors.isbn.message}</p> : ''}
                                </div>
                                <div>
                                    <label
                                        htmlFor='pageCount'
                                    >
                                        Page Count:
                                    </label>
                                    <input
                                        type='number'
                                        id='pageCount'
                                        defaultValue={bookInfo?.pageCount}
                                        disabled={user?.userType !== 'Librarian'}
                                        {...register('pageCount')}
                                    />
                                    {errors.pageCount ? <p className='text-white'>{errors.pageCount.message}</p> : ''}
                                </div>

                                {user?.userType === 'Librarian' && <button type='submit'>Update book</button>}
                            </form>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default BookPage