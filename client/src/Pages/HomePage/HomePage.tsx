import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Book } from '../../Models/Book'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './HomePage.css'
import { useAuth } from '../../Context/useAuth'
import { api } from '../../constants'

const HomePage = () => {

  const [books, setBooks] = useState<Book[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, isLoading] = useState(true)

  const { isLoggedIn, user } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    isLoading(true)
    axios.get(`${api}book?${searchParams.toString()}`).then((response) => {
      setBooks(response.data)
      isLoading(false)
    })
  }, [searchParams])

  const updateSearchParams = (e) => {
    e.preventDefault()
    const form = e.target
    const field = form.elements[0].name
    const value = form.elements[0].value
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      newParams.set(field, value)
      return newParams
    })
    console.log(searchParams.toString())
  }

  const clearFilters = () => {
    setSearchParams(new URLSearchParams())
  }

  return (
    <>
      {isLoggedIn() ? <div>
        <div className='filterContainer'>
          <form onSubmit={updateSearchParams}>
            <input className='input' type='text' name='Title' id='Title'></input>
            <button type='submit'>Search Title</button>
          </form>
          <form onSubmit={updateSearchParams}>
            <input className='input' type='text' name='Author' id='Author'></input>
            <button type='submit'>Search Author</button>
          </form>
          <form onSubmit={updateSearchParams}>
            <input className='input' type='date' name='Availability' id='Availability'></input>
            <button type='submit'>Search Available By</button>
          </form>
          <form onSubmit={updateSearchParams}>
            <select className='input' name='SortBy'>
              <option value=''></option>
              <option value='Title'>Title</option>
              <option value='Author'>Author</option>
              <option value='Availability'>Availability</option>
            </select>
            <button type='submit'>Sort By Field</button>
          </form>
          <form onSubmit={updateSearchParams}>
            <select className='input' name='IsDescending' id='IsDescending'>
              <option value='false'>Ascending</option>
              <option value='true'>Descending</option>
            </select>
            <button type='submit'>Order</button>
          </form>
          <button onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
        {user?.userType === 'Librarian' &&
          <div>
            <button onClick={() => navigate('/add')} className='addButton'>
              Add Book
            </button>
          </div>
        }
        <div className='bookSection'>
          {loading? 'Loading...' : books.map((book) => {
            return (
              <div className='bookContainer' onClick={() => {navigate(`/book/${book.id}`)}}>
                <div>
                  <img className='bookImage' src={`images/${book.coverImage}`} alt={book.coverImage} />
                </div>
                <div>{book.title}</div>
                <div>{book.author}</div>
                <div>{book.description}</div>
              </div>
            )
          })}
        </div>
      </div> : 'The library. Log in to view books!'}
      <br />
      <br />
    </>
  )
}

export default HomePage