import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./product/route.js"

dotenv.config();
const app = express();
const PORT=process.env.PORT;
const MONGO_URI= process.env.MONGO_URI;
app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(()=>{
    console.log("Connected to MongoDB");
    
  })
  .catch((err)=>{
    console.log("MongoDB connection error:",err);
    
  });


app.use("/product",productRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login',(req,res)=>{
  res.send('hi')
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/`)
})
