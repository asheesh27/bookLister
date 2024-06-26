import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addBook } from '../services/bookService';
import Book from '../types/Book';
import './AddBook.css'; // Import the CSS file for styling

function AddBook() {
  const [book, setBook] = useState(Book);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook(book);
    setSubmitted(true);
  };

  return (
    <div className="container">
      <div className="back-arrow">
        <Link to="/" className="back-link">
          Go back
        </Link>
      </div>
      {submitted ? (
        <div className="message-container">
          <p>Book added successfully!</p>
          <Link to="/" className="add-book-link">Go back to Home</Link>
        </div>
      ) : (
        <div className="form-container">
          <h2>Add Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={book.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={book.description} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Publish Date</label>
              <input type="date" name="publishDate" value={book.publishDate} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="number" name="price" value={book.price} onChange={handleChange} required />
            </div>
            <div className="form-actions">
              <button type="submit">Add Book</button>
              <Link to="/" className="back-link">Go Back</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddBook;
