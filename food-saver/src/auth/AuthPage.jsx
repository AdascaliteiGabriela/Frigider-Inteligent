import React, { useState } from "react";
import './auth.css';

function AuthPage({ onSwitch, onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        // validare simplă (poți extinde)
        if (email && password) {
            onLogin({ email });
        }
    };

    return (
        <div className="auth-container">
            <h2>Loghează-te în Food Saver</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Parolă"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Conectare</button>
            </form>
            <p>
                Nu ai cont?{" "}
                <button className="link-button" onClick={onSwitch}>
                    Înregistrează-te aici
                </button>
            </p>
        </div>
    );
}

export default AuthPage;
