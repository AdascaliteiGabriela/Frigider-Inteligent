import React from 'react';
import { Link } from 'react-router-dom';

function HomePage({ user, onLogout }) {
    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '40px 20px',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{ marginBottom: '30px' }}>Bun venit, {user?.name || 'utilizator'}!</h1>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                marginBottom: '30px'
            }}>
                <Link
                    to="/fridge"
                    style={{ textDecoration: 'none' }}
                >
                    <button style={{
                        padding: '12px 24px',
                        width: '100%',
                        maxWidth: '300px',
                        margin: '0 auto',
                        backgroundColor: '#4285F4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}>
                        Vezi frigiderul
                    </button>
                </Link>

                <Link
                    to="/shopping-list"
                    style={{ textDecoration: 'none' }}
                >
                    <button style={{
                        padding: '12px 24px',
                        width: '100%',
                        maxWidth: '300px',
                        margin: '0 auto',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}>
                        Listă de cumpărături
                    </button>
                </Link>
            </div>

            <button
                onClick={onLogout}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}
            >
                Deconectare
            </button>
        </div>
    );
}

export default HomePage;