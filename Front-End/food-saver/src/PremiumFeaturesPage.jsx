import React from 'react';

function PremiumFeaturesPage() {
    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{
                color: '#4CAF50',
                textAlign: 'center',
                marginBottom: '30px'
            }}>Funcții Premium</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px'
            }}>
                <div style={{
                    backgroundColor: '#f9f9f9',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{color: '#4CAF50'}}>🍳 Rețete personalizate</h3>
                    <p>Primește sugestii de rețete bazate pe alimentele din frigider</p>
                </div>

                {/* Add other feature cards with similar styling */}
            </div>
        </div>
    );
}

export default PremiumFeaturesPage;