import './LoginForm.css'

import React, {useState} from 'react';
import type {LoginRequest, ApiError} from '../../types/login';
import {type DataResponse, SERVER_NAME} from "../../data.ts";
import {useNavigate} from "react-router-dom";
import {ADMIN, ROOT} from "../../config/configRouter.ts";


export default function LoginForm() {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate()

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);
        setIsSuccess(null);
        setMessage('');

        const loginData: LoginRequest = {login, password};

        const response = await fetch(`${SERVER_NAME}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            const errorData: ApiError = await response.json();
            const err = new Error(errorData.message || 'Ошибка авторизации')
            setMessage(err.message)
            console.error('Произошла ошибка:', err);
            throw err;
        } else {
            const data: DataResponse = await response.json();

            console.log('Данные ответа:', data);

            setIsSuccess(data.success)

            if (data.success) {
                navigate(`${ROOT}${ADMIN}`)
            } else {
                if (data.error) {
                    setMessage(data.error)
                }
            }
        }
        setLoading(false);
    };

    return (
        <section className="card card_admin card_auth">
            <h3 className="title card__header">
                Авторизация
            </h3>
            <form className="card__body" onSubmit={handleLogin}>
                <div className="card__text-field">
                    <label className="field__title" htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="example@domain.xyz"
                        disabled={loading}
                        className="field__input"
                    />
                </div>
                <div className="card__text-field">
                    <label className="field__title" htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        className="field__input"
                    />
                </div>
                <button className="button button_submit" type="submit" disabled={loading}>
                    {loading ? 'Вход...' : 'Авторизоватьcя'}
                </button>
                {isSuccess === false && <p style={{color: 'red'}}>{message}</p>}
            </form>
        </section>
    );
}