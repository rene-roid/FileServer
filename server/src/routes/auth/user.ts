import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { createUser, loginUser } from '../../connection/user';

const router = express.Router();

router.post('/register', (req: Request, res: Response) => {
    const { name, password } = req.body;

    if (!name || !password)
        return res.status(400).json({ message: 'Name and password are required' });

    let user = createUser(name, password);
    if (user.uuid)
        return res.status(200).json({ message: user.message, uuid: user.uuid });
    else
        return res.status(400).json({ message: user.message });
});

router.post('/login', (req: Request, res: Response) => {
    const { name, password } = req.body;

    if (!name || !password)
        return res.status(400).json({ message: 'Name and password are required' });

    const user = loginUser(name, password);
    if (user.uuid)
        return res.status(200).json({ message: user.message, uuid: user.uuid });
    else
        return res.status(400).json({ message: user.message });
});

export default router;