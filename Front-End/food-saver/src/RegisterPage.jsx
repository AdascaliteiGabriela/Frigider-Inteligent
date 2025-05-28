import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';

function RegisterPage() {
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
        if (formData.parola !== formData.confirmareParola) {
            setError('Parolele nu coincid');
            return;
        }
        if (!formData.email.includes('@')) {
            setError('Email invalid');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(user => user.email === formData.email)) {
            setError('Emailul este deja înregistrat');
            return;
        }

        const newUser = {
            id: Date.now(),
            ...formData
        };

        localStorage.setItem('users', JSON.stringify([...users, newUser]));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        navigate('/');
    };

    return (
        <div className="register-container">
            <div className="register-form-wrapper">
                <h2 className="register-title">Înregistrează-te</h2>
                {error && <div className="register-error">{error}</div>}

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-group">
                        <label>Nume</label>
                        <input
                            type="text"
                            name="nume"
                            value={formData.nume}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Prenume</label>
                        <input
                            type="text"
                            name="prenume"
                            value={formData.prenume}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Telefon</label>
                        <input
                            type="tel"
                            name="telefon"
                            value={formData.telefon}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Parolă</label>
                        <input
                            type="password"
                            name="parola"
                            value={formData.parola}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                    </div>

                    <div className="input-group">
                        <label>Confirmă parola</label>
                        <input
                            type="password"
                            name="confirmareParola"
                            value={formData.confirmareParola}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                    </div>

                    <button type="submit" className="register-button">
                        Înregistrează-te
                    </button>
                </form>

                <div className="login-redirect">
                    Ai deja cont? <Link to="/login">Autentifică-te aici</Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;