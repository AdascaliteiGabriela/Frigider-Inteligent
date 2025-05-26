import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

function RegisterPage({ onSwitch = () => {}, onRegister = () => {} }) {
    const [formData, setFormData] = useState({
        nume: '',
        prenume: '',
        email: '',
        telefon: '',
        parola: '',
        confirmareParola: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.parola !== formData.confirmareParola) {
            setError('Parolele nu coincid');
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Email invalid');
            return;
        }

        onRegister(formData);
        onSwitch(); // Revenim la pagina de login după înregistrare
    };

    return (
        <div className="auth-page-container">
            <div className="auth-card">
                <h2 className="auth-title">Înregistrează-te</h2>
                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nume</label>
                            <input
                                type="text"
                                name="nume"
                                value={formData.nume}
                                onChange={handleChange}
                                className="auth-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Prenume</label>
                            <input
                                type="text"
                                name="prenume"
                                value={formData.prenume}
                                onChange={handleChange}
                                className="auth-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="auth-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Telefon</label>
                        <input
                            type="tel"
                            name="telefon"
                            value={formData.telefon}
                            onChange={handleChange}
                            className="auth-input"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Parolă</label>
                            <input
                                type="password"
                                name="parola"
                                value={formData.parola}
                                onChange={handleChange}
                                className="auth-input"
                                required
                                minLength="6"
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirmă parola</label>
                            <input
                                type="password"
                                name="confirmareParola"
                                value={formData.confirmareParola}
                                onChange={handleChange}
                                className="auth-input"
                                required
                                minLength="6"
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-button">
                        Înregistrează-te
                    </button>
                </form>

                <div className="auth-footer">
                    Ai deja cont? <button className="auth-link-button" onClick={onSwitch}>Autentifică-te aici</button>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;