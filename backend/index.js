import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import messageRoutes from "./routes/messageRoute.js"

dotenv.config({})
const app = express();
const PORT = process.env.PORT || 8000;
connectDB();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/message", messageRoutes)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})