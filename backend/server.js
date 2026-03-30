import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/routes.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/evaluate', async (req, res) => {
  const { startUpInput } = req.body;

  res.status(200).json({
    message: 'Evaluation endpoint working',
    received: startUpInput
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});