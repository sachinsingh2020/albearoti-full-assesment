import express from "express";
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ErrorMiddleware from './middlewares/Error.js';

config({
    path: "./config/config.env",
});
const app = express();

// middleware 
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cookieParser());

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:3000"];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (e.g., mobile apps, curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


// importing and using routes 
import user from "./routes/userRoutes.js";
import blog from "./routes/blogRoutes.js";

app.use('/api/v1', user);
app.use('/api/v1', blog);

app.get('/', (req, res) => {
    res.send('<h1>Server Is Working</h1>');
})

export default app;

app.use(ErrorMiddleware);