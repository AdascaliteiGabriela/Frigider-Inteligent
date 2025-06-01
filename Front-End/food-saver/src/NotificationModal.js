import React from 'react';
import './NotificationModal.css';

function NotificationModal({ items, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>⚠️ Alimente apropiate de expirare!</h2>

                <ul className="notification-list">
                    {items.map((item, index) => (
                        <li key={index}>
                            <span className="item-name">{item.name}</span> -
                            <span className="expiry-date">
                Expiră pe {new Date(item.expiryDate).toLocaleDateString()}
                                ({Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))} zile)
              </span>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={onClose}
                    className="close-button"
                >
                    Am înțeles
                </button>
            </div>
        </div>
    );
}

export default NotificationModal;