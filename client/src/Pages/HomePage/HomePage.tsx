import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Book } from '../../Models/Book'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'
import { useAuth } from '../../Context/useAuth'

const api = 'http://localhost:5035/api/book'

const HomePage = () => {

  const [books, setBooks] = useState<Book[]>([])

  const { user } = useAuth()

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
        {user?.userType === 'Librarian' &&
          <div>
            <button onClick={() => navigate('/add')}>
              Add Book
            </button>
          </div>
        }
        <div className='bookSection'>
          {books.map((book) => {
            return (
              <div className='bookContainer'>
                <div onClick={() => {navigate(`/book/${book.id}`)}}>
                  <img className='bookImage' src={`images/${book.coverImage}`} alt='Image not configured properly!' />
                </div>
                <div>{book.title}</div>
                <div>{book.author}</div>
                <div>{book.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default HomePage