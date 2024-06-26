import React from 'react';

const BookListItem = ({ book }) => {
  return (
    <tr>
      <td>{book.name}</td>
      <td>{book.description}</td>
      <td>{new Date(book.publishDate).toLocaleDateString()}</td>
      <td>{book.price}</td>
    </tr>
  );
};

export default BookListItem;