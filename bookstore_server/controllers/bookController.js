import Book from '../models/Book.js'

export const addBook = async (req, res) => {
  try {
    const { name, description, publishDate, price } = req.body;
    // Validation
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }
      if (/\d/.test(name)) {
        return res.status(400).json({ message: 'Name should not contain numbers' });
      }
      if (!description) {
        return res.status(400).json({ message: 'Description is required' });
      }
      if (description.length < 15) {
        return res.status(400).json({ message: 'Description should be at least 15 characters long' });
      }
      if (!publishDate) {
        return res.status(400).json({ message: 'Publish Date is required' });
      }
      if (!price || isNaN(price)) {
        return res.status(400).json({ message: 'Valid Price is required' });
      }
      if (price.startsWith('0')) {
        return res.status(400).json({ message: 'Price should not start with 0' });
      }
  
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