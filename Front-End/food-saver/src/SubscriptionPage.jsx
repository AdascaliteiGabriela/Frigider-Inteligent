import React from 'react';
import './SubscriptionPage.css';

function SubscriptionPage({ onSelect, onClose }) {
    return (
        <div className="subscription-modal-overlay">
            <div className="subscription-modal">
                <h2>Alegeți abonamentul potrivit</h2>

                <div className="subscription-cards">
                    <div className="subscription-card free">
                        <h3>Gratuit</h3>
                        <div className="price">0€ <span>/ lună</span></div>
                        <ul>
                            <li>✓ Adăugare alimente</li>
                            <li>✓ Notificări de expirare</li>
                            <li>✓ Listă de cumpărături</li>
                            <li>✗ Rețete personalizate</li>
                            <li>✗ Sincronizare familie</li>
                            <li>✗ Scanare bonuri</li>
                        </ul>
                        <button
                            onClick={() => onSelect('free')}
                            className="select-btn free-btn"
                        >
                            Continuă gratuit
                        </button>
                    </div>

                    <div className="subscription-card premium">
                        <div className="recommended-badge">Recomandat</div>
                        <h3>Premium</h3>
                        <div className="price">3€ <span>/ lună</span></div>
                        <ul>
                            <li>✓ Toate funcțiile gratuite</li>
                            <li>✓ Rețete personalizate</li>
                            <li>✓ Sincronizare familie</li>
                            <li>✓ Liste inteligente</li>
                            <li>✓ Scanare bonuri</li>
                            <li>✓ Asistență prioritară</li>
                        </ul>
                        <button
                            onClick={() => onSelect('premium')}
                            className="select-btn premium-btn"
                        >
                            Alege Premium
                        </button>
                    </div>
                </div>

                <button onClick={onClose} className="close-btn">
                    Închide
                </button>
            </div>
        </div>
    );
}

export default SubscriptionPage;