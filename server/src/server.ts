import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

// Body parser middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

// Upload
import uploadRouter from './routes/upload';
app.use('/upload', uploadRouter);

// Auth
import authRouter from './routes/auth/user';
app.use('/auth', authRouter);

// Files
import filesRouter from './routes/files';
app.use('/files', filesRouter);

// Download
import downloadRouter from './routes/download';
app.use('/download', downloadRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
