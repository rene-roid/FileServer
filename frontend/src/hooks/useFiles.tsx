import { useState } from 'react';
import axios from 'axios';
import { IFile } from '../types/file.type';

const useFiles = () => {
    const [files, setFiles] = useState<IFile[]>([]);

    const getFiles = async (uuid: string) => {
        try {
            const response = await axios.post(`http://localhost:3000/files/all`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                uuid: uuid
            });

            setFiles(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return { files, getFiles };
}

export default useFiles;