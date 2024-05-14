import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { deleteFile, getFile, getFiles, uploadFile } from '../connection/files';
import dotenv from 'dotenv';

dotenv.config();
let dir = process.env.STORAGE || null;

const router = express.Router();

router.post('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { uuid } = req.body;

    try {
        if (!dir)
            return res.status(500).json({ message: 'Storage directory is not set' });

        const file = deleteFile(uuid, id);

        res.json({ message: 'File deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;