import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import AuthPage from './auth/AuthPage';
import RegisterPage from './auth/RegisterPage';
import HomePage from "./HomePage";
import FridgePage from "./FridgePage";
import ShoppingListPage from "./ShoppingListPage";
import SubscriptionPage from "./SubscriptionPage"; // Componenta nouă
import PremiumFeaturesPage from "./PremiumFeaturesPage"; // Componenta nouă

function App() {
    const [user, setUser] = useState(null);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

    const handleLogin = (userData) => {
        setUser(userData);
        // Dacă utilizatorul nu are abonament setat, afișăm modalul
        if (!userData.subscriptionType) {
            setShowSubscriptionModal(true);
        }
    };

    const handleLogout = () => {
        setUser(null);
    };

    const handleSubscriptionSelect = (subscriptionType) => {
        setUser(prev => ({
            ...prev,
            subscriptionType,
            subscriptionDate: new Date().toISOString()
        }));
        setShowSubscriptionModal(false);
    };

    return (
        <Router>
            <div>
                {user && (
                    <nav style={{ backgroundColor: '#f8f9fa', padding: '10px', marginBottom: '20px' }}>
                        <Link to="/" style={{ marginRight: '15px' }}>Acasă</Link>
                        <Link to="/fridge" style={{ marginRight: '15px' }}>Frigider</Link>
                        <Link to="/shopping-list" style={{ marginRight: '15px' }}>Listă cumpărături</Link>
                        {user.subscriptionType === 'premium' && (
                            <Link to="/premium-features" style={{ marginRight: '15px' }}>Funcții Premium</Link>
                        )}
                        <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
                    </nav>
                )}

                <Routes>
                    <Route path="/" element={
                        user ? <HomePage user={user} /> : <AuthPage onLogin={handleLogin} />
                    } />
                    <Route path="/fridge" element={
                        user ? <FridgePage user={user} /> : <Navigate to="/" />
                    } />
                    <Route path="/shopping-list" element={
                        user ? <ShoppingListPage user={user} /> : <Navigate to="/" />
                    } />
                    <Route path="/premium-features" element={
                        user?.subscriptionType === 'premium' ? <PremiumFeaturesPage /> : <Navigate to="/" />
                    } />
                    <Route path="/register" element={<RegisterPage onRegister={handleLogin} />} />
                </Routes>

                {showSubscriptionModal && (
                    <SubscriptionPage
                        onSelect={handleSubscriptionSelect}
                        onClose={() => setShowSubscriptionModal(false)}
                    />
                )}
            </div>
        </Router>
    );
}

export default App;