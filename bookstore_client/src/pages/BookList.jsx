import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../services/bookService';
import BookListItem from '../components/BookListItem';
import './BookList.css'; 

function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    loadBooks();
  }, [page, search]);

  const loadBooks = async () => {
    try {
      const { books, total } = await getBooks(search, page, limit);
      setBooks(books);
      setTotal(total);
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container">
      <h2>Book List</h2>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name or description"
          className="input-search"
        />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Publish Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <BookListItem key={book._id} book={book} />
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} of {Math.ceil(total / limit)}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === Math.ceil(total / limit)}>
          Next
        </button>
      </div>
      <div>
        <Link className="add-book-link" to="/add">Add Book</Link>
      </div>
    </div>
  );
}

export default BookList;
