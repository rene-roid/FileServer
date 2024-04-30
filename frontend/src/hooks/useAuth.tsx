import { useState } from "react";

const useAuth = () => {
    const [uuid, setUuid] = useState<string | null>(null);

    const login = (username: string, password: string) => {
        // Here you should add the logic to authenticate the user
        // For now, we'll just set the uuid to '1234'
        setUuid('1234');
    }

    return { uuid, login };
}

export default useAuth;