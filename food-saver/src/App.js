import React, { useState, useEffect } from "react";
import AuthPage from './auth/AuthPage';
import RegisterPage from './auth/RegisterPage';
import HomePage from "./HomePage";

function App() {
    const [page, setPage] = useState("login");
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
        setPage("home");
    };

    const handleLogout = () => {
        setUser(null);
        setPage("login");
    };

    return (
        <div>
            {page === "login" && <AuthPage onSwitch={() => setPage("register")} onLogin={handleLogin} />}
            {page === "register" && <RegisterPage onSwitch={() => setPage("login")} onRegister={handleLogin} />}
            {page === "home" && <HomePage user={user} onLogout={handleLogout} />}
        </div>
    );
}

export default App;
