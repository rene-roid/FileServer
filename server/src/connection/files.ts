import fs from 'fs';
import path from 'path';

const userFiles = "C:\\Users\\ferna\\Projects\\node\\FileServer\\storage";

const uploadFile = (uuid: string, file: Express.Multer.File, id: string) => {
    const fileJsonDir = path.join(userFiles, uuid, 'files.json');
    if (!fs.existsSync(fileJsonDir))
        fs.writeFileSync(fileJsonDir, JSON.stringify([]));
    const fileJson = JSON.parse(fs.readFileSync(fileJsonDir, "utf-8"));

    let fileObject = {
        id: id,
        data: {
            name: file.originalname,
            size: file.size,
            date: new Date()
        }
    };

    fileJson.push(fileObject);
    fs.writeFileSync(fileJsonDir, JSON.stringify(fileJson, null, 2));

    return fileObject;
}

const getFiles = (uuid: string) => {
    const fileJsonDir = path.join(userFiles, uuid, 'files.json');
    if (!fs.existsSync(fileJsonDir))
        fs.writeFileSync(fileJsonDir, JSON.stringify([]));
    return JSON.parse(fs.readFileSync(fileJsonDir, "utf-8"));
}

const getFile = (uuid: string, id: string) => {
    const fileJsonDir = path.join(userFiles, uuid, 'files.json');
    if (!fs.existsSync(fileJsonDir))
        fs.writeFileSync(fileJsonDir, JSON.stringify([]));
    const fileJson = JSON.parse(fs.readFileSync(fileJsonDir, "utf-8"));
    return fileJson.find((f: { id: string }) => f.id === id);
}

export { uploadFile, getFiles, getFile };