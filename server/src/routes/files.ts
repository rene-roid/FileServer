import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { getFile, getFiles, uploadFile } from '../connection/files';

const router = express.Router();

router.post('/all', (req: Request, res: Response) => {
    const { uuid } = req.body;

    const files = getFiles(uuid);
    res.json(files);
});

router.post('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { uuid } = req.body;

    const file = getFile(uuid, id);
    if (file)
        res.json(file);
    else
        res.json({ message: 'File not found' });
});

export default router;