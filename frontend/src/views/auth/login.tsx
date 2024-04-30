import React, { useEffect } from "react";
import './login.css'

import useAuth from '../../hooks/useAuth';

const Login: React.FC = () => {
    const { uuid, login } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted');

        const form = e.currentTarget;
        const username = (form.elements[0] as HTMLInputElement).value;
        const password = (form.elements[1] as HTMLInputElement).value;

        await login(username, password);
    }

    useEffect(() => {
        if (uuid) {
            console.log('User authenticated');
        }

        localStorage.setItem('uuid', uuid || '');
    }, [uuid]);

    return (
        <>
            <div className="login">
                <div className="modal">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;