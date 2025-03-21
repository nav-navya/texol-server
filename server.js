import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './cofig/db.js' // Import the database connection
import authRoute from './routes/authRoute.js'
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Backend is running...');
});


//Routes
app.use("/api/auth",authRoute)






const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
