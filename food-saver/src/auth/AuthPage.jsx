import React, { useState } from "react";
import './auth.css';

function AuthPage({ onSwitch = () => {}, onLogin = () => {} }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        setError("");

        if (!email || !email.includes("@")) {
            setError("Te rugăm să introduci un email valid");
            return;
        }

        if (!password || password.length < 6) {
            setError("Parola trebuie să aibă minim 6 caractere");
            return;
        }

        onLogin({ email, password });
    };

    return (
        <div className="auth-page-container">
            <div className="auth-card">
                <h2 className="auth-title">Loghează-te în Food Saver</h2>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Introdu adresa de email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="auth-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Parolă</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Introdu parola"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="auth-input"
                            required
                            minLength="6"
                        />
                    </div>

                    <button type="submit" className="auth-button">
                        Conectare
                    </button>
                </form>

                <div className="auth-footer">
                    Nu ai cont?{" "}
                    <button
                        className="auth-link-button"
                        onClick={onSwitch}
                        aria-label="Înregistrare"
                    >
                        Înregistrează-te aici
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;