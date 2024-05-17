import { useState } from "react";
import axios from 'axios';

const useAuth = () => {
    const [uuid, setUuid] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login',
                {
                    name: username,
                    password: password
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            const data = response.data;

            setUuid(data.uuid);

            if (data.uuid) {
                console.log('User authenticated');
                localStorage.setItem('uuid', data.uuid);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return { uuid, login };
}

export default useAuth;