import express from "express";
import path from 'path'
import dotenv from "dotenv";
dotenv.config();
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddlerware.js";
import connectDb from "./config/db.js";

connectDb();

const port = process.env.PORT || 5000;

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
    const _dirname = path.resolve();
    app.use(express.static(path.join(_dirname, 'frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
    })
} else {
    app.get('/', (req, res) => {
        res.send("server is redy");
    })
}

app.get('/');

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server Started on port  ${port}`))