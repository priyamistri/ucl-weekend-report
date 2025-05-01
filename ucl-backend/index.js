import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use your userRoutes
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  // console.log(`✅ Server running on http://localhost:${PORT}`);
});
