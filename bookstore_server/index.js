import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bookRouter from './routes/bookRoutes.js';
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.json());

app.use('/api/books', bookRouter);

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});