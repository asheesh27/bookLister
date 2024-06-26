import Book from '../models/Book.js'

export const addBook = async (req, res) => {
  try {
    const { name, description, publishDate, price } = req.body;
    const newBook = new Book({ name, description, publishDate, price });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getBooks = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const query = search ? { $or: [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }] } : {};
    const books = await Book.find(query).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));
    const total = await Book.countDocuments(query);
    res.json({ books, total });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};