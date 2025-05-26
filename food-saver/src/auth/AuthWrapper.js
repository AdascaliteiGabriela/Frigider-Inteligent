import React, { useState } from 'react';
import AuthPage from './AuthPage';
import RegisterPage from '../RegisterPage';
import './auth.css';

function AuthWrapper() {
    const [isLoginView, setIsLoginView] = useState(true);
    const [authError, setAuthError] = useState('');
    const [authSuccess, setAuthSuccess] = useState('');

    // Funcție pentru comutare între view-uri
    const switchAuthView = () => {
        setIsLoginView(!isLoginView);
        setAuthError('');
        setAuthSuccess('');
    };

    // Funcție pentru gestionarea login-ului
    const handleLogin = async (credentials) => {
        try {
            // Aici adaugi logica de autentificare reală
            console.log('Încercare autentificare cu:', credentials);
            // Simulăm o autentificare reușită
            setAuthSuccess('Autentificare reușită!');
            setAuthError('');
        } catch (error) {
            setAuthError('Autentificare eșuată: ' + error.message);
            setAuthSuccess('');
        }
    };

    // Funcție pentru gestionarea înregistrării
    const handleRegister = async (userData) => {
        try {
            // Aici adaugi logica de înregistrare reală
            console.log('Încercare înregistrare cu:', userData);
            // Simulăm o înregistrare reușită
            setAuthSuccess('Înregistrare reușită! Te poți autentifica acum.');
            setAuthError('');
            // Comută automat la ecranul de login după înregistrare
            setTimeout(() => setIsLoginView(true), 2000);
        } catch (error) {
            setAuthError('Înregistrare eșuată: ' + error.message);
            setAuthSuccess('');
        }
    };

    return (
        <div className="auth-wrapper-container">
            {/* Afișează mesaje de succes/eroare */}
            {authError && <div className="auth-message error">{authError}</div>}
            {authSuccess && <div className="auth-message success">{authSuccess}</div>}

            {/* Comută între componentele de autentificare/înregistrare */}
            {isLoginView ? (
                <AuthPage
                    onSwitch={switchAuthView}
                    onLogin={handleLogin}
                />
            ) : (
                <RegisterPage
                    onSwitch={switchAuthView}
                    onRegister={handleRegister}
                />
            )}
        </div>
    );
}

export default AuthWrapper;