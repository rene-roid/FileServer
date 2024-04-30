import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
let dir = process.env.STORAGE || null;

if (!dir)
    throw new Error('Storage directory is not set');

const users = path.join(dir, 'users.json');

const createUser = (name: string, password: string) => {
    const usersJson = JSON.parse(fs.readFileSync(users, "utf-8") || "[]");
    const existingUserIndex = usersJson.findIndex((u: { name: string }) => u.name === name);

    if (existingUserIndex === -1) {
        const uuid = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const userData = { name: name, password: password, uuid: uuid };
        usersJson.push(userData);
        fs.writeFileSync(users, JSON.stringify(usersJson, null, 2));

        return { message: 'User created successfully', uuid: uuid };
    } else {
        return { message: 'User already exists' };
    }
}

const loginUser = (name: string, password: string) => {
    const usersJson = JSON.parse(fs.readFileSync(users, "utf-8") || "[]");
    const user = usersJson.find((u: { name: string, password: string }) => u.name === name && u.password === password);

    if (user)
        return { message: 'Login successful', uuid: user.uuid };
    else
        return { message: 'Invalid credentials' };
}

const verifyUser = (uuid: string) => {
    const usersJson = JSON.parse(fs.readFileSync(users, "utf-8") || "[]");
    const user = usersJson.find((u: { uuid: string }) => u.uuid === uuid);

    if (user)
        return true;
    else
        return false;
}

export { createUser, loginUser, verifyUser };