import React, { useEffect, useState, useRef } from "react";

function ExpirationNotification({ alimente }) {
    const [alimenteExpira, setAlimenteExpira] = useState([]);
    const alertShown = useRef(false);

    useEffect(() => {
        const azi = new Date();

        const expiraCurand = alimente.filter(({ dataExpirare }) => {
            const data = new Date(dataExpirare);
            const diffTime = data - azi;
            const diffDays = diffTime / (1000 * 60 * 60 * 24);

            return diffDays >= 0 && diffDays <= 3;
        });

        setAlimenteExpira(expiraCurand);

        // Alertă pop-up și sunet doar o dată când găsește alimente expirate curând
        if (expiraCurand.length > 0 && !alertShown.current) {
            alertShown.current = true;  // blochează alertele repetate
            alert(`⚠️ Atenție! Ai ${expiraCurand.length} aliment(e) care expiră în următoarele 3 zile!`);

            // Creăm un sunet simplu (beep) folosind Web Audio API
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = context.createOscillator();
            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(440, context.currentTime); // 440Hz = nota A
            oscillator.connect(context.destination);
            oscillator.start();
            oscillator.stop(context.currentTime + 0.3); // sunet scurt 0.3 secunde
        }
    }, [alimente]);

    if (alimenteExpira.length === 0) return null;

    return (
        <div style={{
            backgroundColor: "#ffdddd",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            color: "#900",
            fontWeight: "bold"
        }}>
            <h3>⚠️ Atenție! Următoarele alimente expiră în 3 zile:</h3>
            <ul>
                {alimenteExpira.map(({ id, nume, dataExpirare }) => (
                    <li key={id}>{nume} — expiră pe {new Date(dataExpirare).toLocaleDateString()}</li>
                ))}
            </ul>
        </div>
    );
}

export default ExpirationNotification;
