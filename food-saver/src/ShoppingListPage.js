import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShoppingListPage.css';

function ShoppingListPage({ user }) {
    const navigate = useNavigate();
    const [items, setItems] = useState(() => {
        try {
            const saved = localStorage.getItem('shoppingList');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return [];
        }
    });
    const [newItem, setNewItem] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [unit, setUnit] = useState('buc');
    const [isStorageAvailable, setIsStorageAvailable] = useState(true);

    // Verify localStorage availability
    useEffect(() => {
        try {
            const testKey = '__test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
        } catch (e) {
            setIsStorageAvailable(false);
            console.error('localStorage is not available:', e);
        }
    }, []);

    // Save items to localStorage whenever they change
    useEffect(() => {
        if (isStorageAvailable) {
            try {
                localStorage.setItem('shoppingList', JSON.stringify(items));
            } catch (error) {
                console.error('Error saving to localStorage:', error);
            }
        }
    }, [items, isStorageAvailable]);

    const addItem = () => {
        if (newItem.trim()) {
            const newItems = [...items, {
                id: Date.now(),
                name: newItem.trim(),
                quantity: quantity || '1',
                unit: user?.subscriptionType === 'premium' ? unit : 'buc',
                completed: false
            }];
            setItems(newItems);
            setNewItem('');
            setQuantity('1');
        }
    };

    const toggleComplete = (id) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        setItems(updatedItems);
    };

    const deleteItem = (id) => {
        if (window.confirm("Ești sigur că vrei să ștergi acest articol?")) {
            const updatedItems = items.filter(item => item.id !== id);
            setItems(updatedItems);
        }
    };

    const clearCompleted = () => {
        const updatedItems = items.filter(item => !item.completed);
        setItems(updatedItems);
    };

    if (!user) {
        return (
            <div className="auth-required">
                <h2>Autentificare necesară</h2>
                <p>Trebuie să fii autentificat pentru a accesa lista de cumpărături.</p>
                <button onClick={() => navigate('/login')}>Autentifică-te</button>
            </div>
        );
    }

    if (!isStorageAvailable) {
        return (
            <div className="storage-error">
                <h2>Eroare de stocare</h2>
                <p>Browser-ul tău nu suportă stocarea locală sau este dezactivată.</p>
                <p>Lista ta de cumpărături nu va fi salvată după refresh.</p>
            </div>
        );
    }

    return (
        <div className="shopping-list-container">
            <h1>Lista de cumpărături</h1>

            {user.subscriptionType === 'premium' && (
                <div className="premium-banner">
                    <span>Mod Premium activ</span>
                </div>
            )}

            <div className="add-item-form">
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Adaugă produs"
                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                />
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    placeholder="Cantitate"
                />
                {user.subscriptionType === 'premium' && (
                    <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                        <option value="buc">buc</option>
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="l">l</option>
                        <option value="ml">ml</option>
                    </select>
                )}
                <button onClick={addItem}>Adaugă</button>
            </div>

            {items.length > 0 && (
                <div className="list-controls">
                    <button onClick={clearCompleted} className="clear-btn">
                        Șterge completate
                    </button>
                    <span className="count">
                        {items.filter(i => !i.completed).length} rămase
                    </span>
                </div>
            )}

            <ul className="shopping-list">
                {items.map(item => (
                    <li
                        key={item.id}
                        className={`list-item ${item.completed ? 'completed' : ''}`}
                    >
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleComplete(item.id)}
                            className="item-checkbox"
                        />
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">
                            {item.quantity} {item.unit}
                        </span>
                        <button
                            onClick={() => deleteItem(item.id)}
                            className="delete-btn"
                        >
                            Șterge
                        </button>
                    </li>
                ))}
            </ul>

            {items.length === 0 && (
                <p className="empty-message">Lista ta este goală. Adaugă produse!</p>
            )}
        </div>
    );
}

export default ShoppingListPage;