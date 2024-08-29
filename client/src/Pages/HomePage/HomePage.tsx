import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Book } from '../../Models/Book'
import { useNavigate } from 'react-router-dom'

const api = 'http://localhost:5035/api/book'

const HomePage = () => {

  const [books, setBooks] = useState<Book[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(api).then((response) => {
      setBooks(response.data)
    })
  }, [])

  return (
    <>
      <div>
        Home Page
        <div>
          {books.map((book) => {
            return (
              <>
                <div>{book.title}</div>
                <div>{book.author}</div>
                <div>{book.description}</div>
                <div onClick={() => {navigate(`/book/${book.id}`)}}>
                  {book.coverImage}
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default HomePage