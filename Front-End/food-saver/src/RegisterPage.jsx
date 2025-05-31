import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';

function RegisterPage() {
    const [formData, setFormData] = useState({
        nume: '',
        prenume: '',
        email: '',
        telefon: '',
        parola: '',
        confirmareParola: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
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

        const newUser = { id: Date.now(), ...formData };
        localStorage.setItem('users', JSON.stringify([...users, newUser]));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        navigate('/');
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Înregistrează-te
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Nume"
                    name="nume"
                    value={formData.nume}
                    onChange={handleChange}
                    margin="normal"
                    required
                />

                <TextField
                    fullWidth
                    label="Prenume"
                    name="prenume"
                    value={formData.prenume}
                    onChange={handleChange}
                    margin="normal"
                    required
                />

                <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    required
                />

                <TextField
                    fullWidth
                    type="tel"
                    label="Telefon"
                    name="telefon"
                    value={formData.telefon}
                    onChange={handleChange}
                    margin="normal"
                    required
                />

                <TextField
                    fullWidth
                    type="password"
                    label="Parolă"
                    name="parola"
                    value={formData.parola}
                    onChange={handleChange}
                    margin="normal"
                    required
                    inputProps={{ minLength: 6 }}
                />

                <TextField
                    fullWidth
                    type="password"
                    label="Confirmă parola"
                    name="confirmareParola"
                    value={formData.confirmareParola}
                    onChange={handleChange}
                    margin="normal"
                    required
                    inputProps={{ minLength: 6 }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Înregistrează-te
                </Button>
            </form>
        </Box>
    );
}

export default RegisterPage;
