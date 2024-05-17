import { useState } from 'react';
import axios from 'axios';

const useDelete = () => {
    const  [data, setData] = useState<any>();

    const removeFile = async (id: string, uuid: string) => {
        try {
            const response = await axios.post(`http://localhost:3000/remove/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                uuid: uuid
            });

            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return { data, removeFile };
}

export default useDelete;