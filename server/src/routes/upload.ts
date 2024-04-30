import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { uploadFile } from '../connection/files';
import { verifyUser } from '../connection/user';
import dotenv from 'dotenv';

dotenv.config();
let dir = process.env.STORAGE || null;

const router = express.Router();

// Set storage for multer
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        if (!dir)
            throw new Error('Storage directory is not set');
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Initialize multer upload
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), (req: Request, res: Response) => {
    const { uuid } = req.body;
    const file = req.file;

    const user = verifyUser(uuid);
    if (!user)
        return res.status(401).json({ message: 'Unauthorized' });

    if (!dir)
        return res.status(500).json({ message: 'Storage directory is not set' });

    if (!file)
        return res.status(400).json({ message: 'File is required' });
    if (!uuid)
        return res.status(400).json({ message: 'UUID is required' });

    console.log(file.originalname);
    console.log(file.path);


    // Save the file to a directory
    const uploadDirectory = path.join(dir, uuid);
    const filename = file.filename;
    const filePath = path.join(uploadDirectory, filename);

    try {
        fs.mkdirSync(uploadDirectory, { recursive: true }); // Create the directory if it doesn't exist
        fs.renameSync(file.path, filePath);
        
        const u = uploadFile(uuid, file, filename);

        res.status(200).json({ message: 'File uploaded successfully', filename: filename, data: u });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to upload file' });
    }
});

export default router;