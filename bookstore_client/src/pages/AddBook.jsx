import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addBook } from '../services/bookService';
import Book from '../types/Book';
import './AddBook.css'; 

function AddBook() {
  const [book, setBook] = useState(Book);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const validateInputs = () => {
    if (!book.name) {
      alert('Name is required');
      return false;
    }
    if (/\d/.test(book.name)) {
      alert('Name should not contain numbers');
      return false;
    }
    if (!book.description) {
      alert('Description is required');
      return false;
    }
    if (book.description.length < 15) {
      alert('Description should be at least 15 characters long');
      return false;
    }
    if (!book.publishDate) {
      alert('Publish Date is required');
      return false;
    }
    if (!book.price || isNaN(book.price)) {
      alert('Valid Price is required');
      return false;
    }
    if (book.price.startsWith('0')) {
      alert('Price should not start with 0');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true); // Start loading indicator
    try {
      await addBook(book);
      setSubmitted(true);
    } catch (error) {
      console.error('Error adding book:', error);
      // Handle error if needed
    } finally {
      setLoading(false); // Stop loading indicator
    }
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
              <input type="text" name="name" value={book.name} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={book.description} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label>Publish Date</label>
              <input type="date" name="publishDate" value={book.publishDate} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="text" name="price" value={book.price} onChange={handleChange} inputMode="numeric" pattern="[1-9][0-9]*" required disabled={loading} />
            </div>
            <div className="form-actions">
              <button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Book'}
              </button>
              <Link to="/" className="back-link">Go Back</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddBook;
