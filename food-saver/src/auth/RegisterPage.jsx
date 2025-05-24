import React, { useState } from "react";
import './auth.css';

function RegisterPage({ onSwitch, onRegister }) {
    const [nume, setNume] = useState("");
    const [prenume, setPrenume] = useState("");
    const [email, setEmail] = useState("");
    const [parola, setParola] = useState("");
    const [confirmParola, setConfirmParola] = useState("");
    const [eroare, setEroare] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (parola !== confirmParola) {
            setEroare("Parolele nu coincid.");
            return;
        }
        if (!nume || !prenume || !email || !parola) {
            setEroare("Completează toate câmpurile.");
            return;
        }
        setEroare("");
        onRegister({ nume, prenume, email });
    };

    return (
        <div className="auth-container">
            <h2>Înregistrează-te în Food Saver</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    placeholder="Nume"
                    value={nume}
                    onChange={e => setNume(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Prenume"
                    value={prenume}
                    onChange={e => setPrenume(e.target.value)}
                    required
                />
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
                    value={parola}
                    onChange={e => setParola(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirmă parola"
                    value={confirmParola}
                    onChange={e => setConfirmParola(e.target.value)}
                    required
                />
                {eroare && <p className="error">{eroare}</p>}
                <button type="submit">Creează cont</button>
            </form>
            <p>
                Ai deja cont?{" "}
                <button className="link-button" onClick={onSwitch}>
                    Loghează-te aici
                </button>
            </p>
        </div>
    );
}

export default RegisterPage;
