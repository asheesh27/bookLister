import api from './api';

export const addBook = async (book) => {
  const response = await api.post('/books', book);
  return response.data;
};

export const getBooks = async (search = '', page = 1, limit = 10) => {
  const response = await api.get('/books', { params: { search, page, limit } });
  return response.data;
};
