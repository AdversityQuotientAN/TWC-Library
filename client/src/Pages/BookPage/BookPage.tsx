import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../constants'
import { Book } from '../../Models/Book'
import { useAuth } from '../../Context/useAuth'
import { toast } from 'react-toastify'

const BookPage = () => {

    const { id } = useParams()

    const { user } = useAuth()

    const navigate = useNavigate()

    const [bookInfo, setBookInfo] = useState<Book>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${api}book/${id}`).then((response) => {
            setBookInfo(response.data)
            setLoading(false)
            // console.log(user)
            console.log(response.data)
        })
    }, [])

    const checkOut = () => {
        axios.put(`${api}book/checkout/${id}`).then(() => {
            toast.success(`Successfully checked out ${bookInfo?.title}!`)
            navigate('/')
        }).catch((e) => {
            console.log(e)
            if (e.status == 404) {
                toast.warning('Book is unavailable!')
            }
            else {
                toast.warning("Other error!")
            }
        })
    }

    const returnBook = () => {
        axios.put(`${api}book/return/${id}`).then(() => {
            toast.success(`Successfully returned ${bookInfo?.title}!`)
            navigate('/')
        }).catch((e) => {
            console.log(e)
            if (e.status == 404) {
                toast.warning('Book is not being borrowed!')
            }
            else {
                toast.warning("Other error!")
            }
        })
    }

    return (
        <>
            {loading ? 'Loading...' : 
                <>
                    <div>
                        <img className='bookImage' src={`/images/${bookInfo?.coverImage}`} alt='Image not configured properly!' />
                        <div>Cover Image: {bookInfo?.coverImage}</div>
                        <div>Title: {bookInfo?.title}</div>
                        <div>Author: {bookInfo?.author}</div>
                        <div>Description: {bookInfo?.description}</div>
                        <div>Publisher: {bookInfo?.publisher}</div>
                        <div>Publication Date: {bookInfo?.publicationDate.toString()}</div>
                        <div>Category: {bookInfo?.category}</div>
                        <div>ISBN: {bookInfo?.isbn}</div>
                        <div>Page Count: {bookInfo?.pageCount}</div>
                        {new Date(bookInfo?.availableUntil).getTime() > Date.now() ? 'Unavailable' : 'Available'}
                    </div>
                    <div>
                        {(user?.userType === 'Customer') &&
                            <div>
                                <button onClick={checkOut} disabled={new Date(bookInfo?.availableUntil).getTime() > Date.now()}>
                                    Checkout
                                </button>
                            </div>
                        }
                        {(user?.userType === "Librarian") &&
                            <div>
                                <button onClick={returnBook} disabled={new Date(bookInfo?.availableUntil).getTime() > Date.now()}>
                                    Return
                                </button>
                                Edit
                                Delete
                            </div>
                        }
                    </div>
                </>
            }
        </>
    )
}

export default BookPage