import React from "react";
import FridgePage from "./FridgePage.jsx";

function HomePage({ user, onLogout  }) {
    return (
        <div>
            <h1>Bun venit în Food Saver, {user.email}!</h1>
            <p>Aici va fi afișată aplicația ta inteligentă pentru gestionarea alimentelor.</p>
            <button onClick={onLogout}>Deconectare</button>
            {/* Afișăm componenta FridgePage */}
            <FridgePage />
        </div>
    );
}

export default HomePage;
