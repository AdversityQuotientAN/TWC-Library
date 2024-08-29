import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../constants'
import { Book } from '../../Models/Book'

const BookPage = () => {

    const { id } = useParams()

    const [bookInfo, setBookInfo] = useState<Book>()

    useEffect(() => {
        axios.get(`${api}book/${id}`).then((response) => {
            console.log(response.data)
            setBookInfo(response.data)
        })
    }, [])

    return (
        <>
            <div>
                <div>Title: {bookInfo?.title}</div>
                <div>Author: {bookInfo?.author}</div>
                <div>Description: {bookInfo?.description}</div>
                <div>{bookInfo?.coverImage}</div>
                <div>Publisher: {bookInfo?.publisher}</div>
                <div>Publication Date: {bookInfo?.publicationDate.toString()}</div>
                <div>Category: {bookInfo?.category}</div>
                <div>ISBN: {bookInfo?.isbn}</div>
                <div>Page Count: {bookInfo?.pageCount}</div>
            </div>
        </>
    )
}

export default BookPage