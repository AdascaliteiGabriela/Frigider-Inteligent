import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { Howl } from 'howler';

// Notification sound configuration
const notificationSound = new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3'],
    volume: 0.5
});

const ExpirationNotification = ({ alimente }) => {
    // Normalize dates to midnight for accurate comparison
    const normalizeDate = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    const today = normalizeDate(new Date());

    const getDaysUntilExpiry = (expiryDate) => {
        const expiry = normalizeDate(expiryDate);
        const diffTime = expiry - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    // Play sound when expired items are found
    useEffect(() => {
        const expiredItems = alimente.filter(aliment => getDaysUntilExpiry(aliment.expiryDate) < 0);
        if (expiredItems.length > 0) {
            notificationSound.play();
        }
    }, [alimente]);

    // Categorize items by expiration status
    const expired = alimente.filter(aliment => getDaysUntilExpiry(aliment.expiryDate) < 0);
    const rosu = alimente.filter(aliment => {
        const days = getDaysUntilExpiry(aliment.expiryDate);
        return days >= 0 && days <= 3;
    });
    const portocaliu = alimente.filter(aliment => {
        const days = getDaysUntilExpiry(aliment.expiryDate);
        return days >= 4 && days <= 6;
    });
    const verde = alimente.filter(aliment => getDaysUntilExpiry(aliment.expiryDate) > 6);

    const renderList = (lista, culoare, titlu) => {
        if (lista.length === 0) return null;

        const colorStyles = {
            rosu: { backgroundColor: "#ffdddd", color: "#900" },
            portocaliu: { backgroundColor: "#fff4cc", color: "#b36b00" },
            verde: { backgroundColor: "#ddffdd", color: "#006600" },
            expired: { backgroundColor: "#f0f0f0", color: "#666", textDecoration: "line-through" }
        };

        return (
            <div style={{
                ...colorStyles[culoare],
                padding: "10px",
                margin: "10px 0",
                borderRadius: "8px",
                fontWeight: "bold"
            }}>
                <h3 style={{ marginTop: 0 }}>{titlu}</h3>
                <ul style={{ marginBottom: 0 }}>
                    {lista.map((aliment, index) => (
                        <li key={`${aliment.name}-${index}`}>
                            {aliment.name} — expiră pe {new Date(aliment.expiryDate).toLocaleDateString("ro-RO")}
                            {culoare === "expired" && " (expirat)"}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    if (alimente.length === 0) {
        return <p>Nu există alimente înregistrate.</p>;
    }

    return (
        <div>
            {renderList(expired, "expired", "⚫ Alimente expirate:")}
            {renderList(rosu, "rosu", "🔴 Atenție! Expiră în 3 zile sau mai puțin:")}
            {renderList(portocaliu, "portocaliu", "🟠 Expiră în 4-6 zile:")}
            {renderList(verde, "verde", "✅ Expiră în mai mult de 6 zile:")}
        </div>
    );
};

ExpirationNotification.propTypes = {
    alimente: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            expiryDate: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.instanceOf(Date)
            ]).isRequired
        })
    ).isRequired
};

export default ExpirationNotification;