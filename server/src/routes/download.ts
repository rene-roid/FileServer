import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { getFile, getFiles, uploadFile } from '../connection/files';
import dotenv from 'dotenv';

dotenv.config();
let dir = process.env.STORAGE || null;

const router = express.Router();

router.post('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { uuid } = req.body;

    if (!dir)
        return res.status(500).json({ message: 'Storage directory is not set' });
    
    const file = getFile(uuid, id);
    const filePath = path.join(dir, uuid, id);

    if (file) {
        res.download(filePath, file.data.name);
    } else {
        res.json({ message: 'File not found' });
    }
});

export default router;