import React from 'react';
import './SubscriptionPage.css';

function SubscriptionPage({ onSelect, onClose }) {
    const handleSubscriptionSelect = (type) => {
        onSelect(type);
        // Adaugă tracking aici dacă e necesar (ex: Google Analytics)
    };

    return (
        <div className="subscription-fullscreen-overlay">
            <div className="subscription-fullscreen-container">
                <button
                    onClick={onClose}
                    className="subscription-close-btn"
                    aria-label="Închide fereastra de abonament"
                >
                    &times;
                </button>

                <div className="subscription-header">
                    <h1 className="subscription-title">Alege planul perfect pentru tine</h1>
                    <p className="subscription-subtitle">Descoperă toate beneficiile</p>
                </div>

                <div className="subscription-cards-grid">
                    {/* Card Free */}
                    <div className="subscription-card free-tier">
                        <div className="card-header">
                            <h3 className="card-title">Free</h3>
                            <div className="card-price">
                                <span className="price-amount">0€</span>
                                <span className="price-period">/lună</span>
                            </div>
                        </div>

                        <ul className="card-features">
                            <li className="feature-item">

                            </li>
                            <li className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Notificări expirare</span>
                            </li>
                            <li className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Listă cumpărături basic</span>
                            </li>
                            <li className="feature-item disabled">
                                <span className="feature-icon">✗</span>
                                <span>Rețete personalizate</span>
                            </li>
                        </ul>

                        <button
                            onClick={() => handleSubscriptionSelect('free')}
                            className="subscription-select-btn free-btn"
                        >
                            Continuă gratuit
                        </button>
                    </div>

                    {/* Card Premium */}
                    <div className="subscription-card premium-tier">
                        <div className="recommended-badge">Recomandat</div>
                        <div className="card-header">
                            <h3 className="card-title">Premium</h3>
                            <div className="card-price">
                                <span className="price-amount">3€</span>
                                <span className="price-period">/lună</span>
                            </div>
                            <p className="price-savings">Economisește 20% cu planul anual</p>
                        </div>

                        <ul className="card-features">
                            <li className="feature-item">

                            </li>
                            <li className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Notificări avansate</span>
                            </li>
                            <li className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Liste inteligente</span>
                            </li>
                            <li className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Rețete bazate pe conținut</span>
                            </li>
                            <li className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Scanare coduri de bare</span>
                            </li>
                        </ul>

                        <button
                            onClick={() => handleSubscriptionSelect('premium')}
                            className="subscription-select-btn premium-btn"
                        >
                            Devino Premium
                        </button>
                    </div>

                    {/* Card Family */}
                    <div className="subscription-card family-tier">
                        <div className="card-header">
                            <h3 className="card-title">Family</h3>
                            <div className="card-price">
                                <span className="price-amount">5€</span>
                                <span className="price-period">/lună</span>
                            </div>
                            <p className="price-savings">Pentru până la 5 utilizatori</p>
                        </div>

                        <ul className="card-features">
                            <li className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Toate funcțiile Premium</span>
                            </li>
                            <li className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Management familie</span>
                            </li>
                            <li className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Sincronizare liste</span>
                            </li>
                            <li className="feature-item">
                            </li>
                            <li className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Asistență prioritara</span>
                            </li>
                        </ul>

                        <button
                            onClick={() => handleSubscriptionSelect('family')}
                            className="subscription-select-btn family-btn"
                        >
                            Alege Family
                        </button>
                    </div>
                </div>

                <div className="subscription-footer">
                    <p className="guarantee-text">
                        <span className="highlight">Garantie 30 de zile</span> - Poți anula oricând
                    </p>
                    <p className="payment-info">
                        Plăți securizate prin <span className="payment-methods">Stripe</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionPage;