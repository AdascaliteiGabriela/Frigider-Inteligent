import React, { useState, useEffect } from "react";
import { Howl } from 'howler';
import RecipeSuggestions from "./RecipeSuggestions";
import ExpirationNotification from "./ExpirationNotification";
import NotificationModal from "./NotificationModal";
import "./FridgePage.css";

const notificationSound = new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3'],
    volume: 0.3
});

function FridgePage() {
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("date");
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [expiringSoonItems, setExpiringSoonItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load items from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('fridgeItems');
        if (saved) {
            setItems(JSON.parse(saved));
        }
        setIsLoading(false);
    }, []);

    // Save items to localStorage and check expirations
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('fridgeItems', JSON.stringify(items));
            checkExpiringItems();
        }
    }, [items, isLoading]);

    const checkExpiringItems = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const soonItems = items.filter(item => {
            const expDate = new Date(item.expiryDate);
            expDate.setHours(0, 0, 0, 0);
            const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
            return diffDays <= 3 && diffDays >= 0;
        });

        if (soonItems.length > 0) {
            setExpiringSoonItems(soonItems);
            setShowNotifications(true);
            notificationSound.play();
        }
    };

    const normalizeDate = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    const getDaysUntilExpiration = (expirationDate) => {
        const today = normalizeDate(new Date());
        const expDate = normalizeDate(new Date(expirationDate));
        const timeDiff = expDate - today;
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    };

    const getColorForExpiration = (days) => {
        if (days < 0) return "expired";
        if (days <= 3) return "red";
        if (days <= 6) return "orange";
        return "green";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !quantity || !expiryDate) {
            alert("Completează toate câmpurile!");
            return;
        }

        const selectedDate = normalizeDate(new Date(expiryDate));
        const today = normalizeDate(new Date());

        if (selectedDate < today && editIndex === null) {
            if (!window.confirm("Data de expirare este în trecut. Sigur vrei să adaugi acest aliment?")) {
                return;
            }
        }

        const newItem = {
            name: name.trim(),
            quantity: quantity.trim(),
            expiryDate
        };

        setItems(prevItems =>
            editIndex !== null
                ? prevItems.map((item, idx) => idx === editIndex ? newItem : item)
                : [...prevItems, newItem]
        );

        resetForm();
    };

    const resetForm = () => {
        setName("");
        setQuantity("");
        setExpiryDate("");
        setEditIndex(null);
    };

    const handleDelete = (index) => {
        if (window.confirm("Ești sigur(ă) că vrei să ștergi acest aliment?")) {
            setItems(prev => prev.filter((_, i) => i !== index));
            if (editIndex === index) resetForm();
        }
    };

    const handleEdit = (index) => {
        const item = items[index];
        setName(item.name);
        setQuantity(item.quantity);
        setExpiryDate(item.expiryDate);
        setEditIndex(index);
    };

    const handleFilterChange = (e) => setFilter(e.target.value);
    const handleSortChange = (e) => setSort(e.target.value);

    const filteredItems = items.filter(item => {
        const daysLeft = getDaysUntilExpiration(item.expiryDate);
        if (filter === "expired") return daysLeft < 0;
        if (filter === "notExpired") return daysLeft >= 0;
        return true;
    }).sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        return new Date(a.expiryDate) - new Date(b.expiryDate);
    });

    if (isLoading) return <div className="loading">Se încarcă...</div>;

    return (
        <div className="fridge-container">
            {showNotifications && (
                <NotificationModal
                    items={expiringSoonItems}
                    onClose={() => setShowNotifications(false)}
                />
            )}

            <ExpirationNotification alimente={items} />

            <h2>Frigiderul tău</h2>

            <form onSubmit={handleSubmit} className="item-form">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Nume aliment"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        placeholder="Cantitate"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="primary-btn">
                        {editIndex !== null ? "Salvează" : "Adaugă"}
                    </button>
                    {editIndex !== null && (
                        <button type="button" onClick={resetForm} className="secondary-btn">
                            Anulează
                        </button>
                    )}
                </div>
            </form>

            <div className="filter-sort-container">
                <div className="filter-group">
                    <label>Filtrează:</label>
                    <select value={filter} onChange={handleFilterChange}>
                        <option value="all">Toate</option>
                        <option value="expired">Expirate</option>
                        <option value="notExpired">Neexpirate</option>
                    </select>
                </div>
                <div className="sort-group">
                    <label>Sortează după:</label>
                    <select value={sort} onChange={handleSortChange}>
                        <option value="date">Dată expirare</option>
                        <option value="name">Nume</option>
                    </select>
                </div>
            </div>

            {items.length === 0 ? (
                <p className="empty-message">Frigiderul este gol. Adaugă alimente!</p>
            ) : (
                <div className="table-container">
                    <table className="fridge-table">
                        <thead>
                        <tr>
                            <th>Nume</th>
                            <th>Cantitate</th>
                            <th>Expiră</th>
                            <th>Acțiuni</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredItems.map((item, index) => {
                            const daysLeft = getDaysUntilExpiration(item.expiryDate);
                            const color = getColorForExpiration(daysLeft);

                            return (
                                <tr key={`${item.name}-${index}`} className={`item-row ${color}`}>
                                    <td>{item.name}</td>
                                    <td className="quantity">{item.quantity}</td>
                                    <td className="expiry">
                                        {new Date(item.expiryDate).toLocaleDateString()}
                                        <span className="days-left">
                        ({daysLeft >= 0 ? `${daysLeft} zile` : "expirat"})
                      </span>
                                    </td>
                                    <td className="actions">
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="delete-btn"
                                        >
                                            Șterge
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="recipe-suggestions">
                <h3>Rețete sugerate</h3>
                <RecipeSuggestions alimente={items.map(item => item.name)} />
            </div>
        </div>
    );
}

export default FridgePage;