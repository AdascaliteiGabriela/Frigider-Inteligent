import React, { useState, useEffect } from "react";
import RecipeSuggestions from "./RecipeSuggestions";
import "./FridgePage.css";

function FridgePage() {
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("date");
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem("fridgeItems");
        return saved ? JSON.parse(saved) : [];
    });
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem("fridgeItems", JSON.stringify(items));
    }, [items]);

    const resetForm = () => {
        setName("");
        setQuantity("");
        setExpiryDate("");
        setEditIndex(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !quantity || !expiryDate) {
            alert("Completează toate câmpurile!");
            return;
        }

        const newItem = { name, quantity, expiryDate };

        if (editIndex !== null) {
            const updatedItems = [...items];
            updatedItems[editIndex] = newItem;
            setItems(updatedItems);
        } else {
            setItems([...items, newItem]);
        }

        resetForm();
    };

    const isExpired = (expiryDate) => {
        const today = new Date();
        const expDate = new Date(expiryDate);
        return expDate < today;
    };

    const isExpiringSoon = (expiryDate) => {
        const today = new Date();
        const expDate = new Date(expiryDate);
        const diffTime = expDate - today;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 3;
    };

    const handleDelete = (index) => {
        if (window.confirm("Ești sigur(ă) că vrei să ștergi acest aliment?")) {
            const updatedItems = items.filter((_, i) => i !== index);
            setItems(updatedItems);
        }
    };

    const handleEdit = (index) => {
        const item = items[index];
        setName(item.name);
        setQuantity(item.quantity);
        setExpiryDate(item.expiryDate);
        setEditIndex(index);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    // Filtrare și sortare
    let filteredItems = items.filter((item) => {
        if (filter === "expired") return isExpired(item.expiryDate);
        if (filter === "notExpired") return !isExpired(item.expiryDate);
        return true;
    });

    filteredItems.sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "date") return new Date(a.expiryDate) - new Date(b.expiryDate);
        return 0;
    });

    return (
        <div style={{ maxWidth: "700px", margin: "auto", padding: "1rem" }}>
            <h2>Frigiderul tău</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Nume aliment"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginRight: "0.5rem" }}
                />
                <input
                    type="number"
                    placeholder="Cantitate"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={{ marginRight: "0.5rem", width: "80px" }}
                />
                <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    style={{ marginRight: "0.5rem" }}
                />
                <button type="submit">{editIndex !== null ? "Salvează" : "Adaugă"}</button>
                {editIndex !== null && (
                    <button type="button" onClick={resetForm} style={{ marginLeft: "0.5rem" }}>
                        Anulează
                    </button>
                )}
            </form>

            <div style={{ marginBottom: "15px" }}>
                <label>
                    Filtrează:{" "}
                    <select value={filter} onChange={handleFilterChange}>
                        <option value="all">Toate</option>
                        <option value="expired">Expirate</option>
                        <option value="notExpired">Neexpirate</option>
                    </select>
                </label>

                <label style={{ marginLeft: "20px" }}>
                    Sortează după:{" "}
                    <select value={sort} onChange={handleSortChange}>
                        <option value="date">Dată expirare</option>
                        <option value="name">Nume</option>
                    </select>
                </label>
            </div>

            {items.length === 0 ? (
                <p>Nu ai alimente în frigider.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Nume</th>
                        <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Cantitate</th>
                        <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Expiră</th>
                        <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Acțiuni</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredItems.map((item, index) => {
                        const expiringSoon = isExpiringSoon(item.expiryDate);
                        return (
                            <tr
                                key={index}
                                style={{
                                    backgroundColor: expiringSoon ? "#ffe5e5" : "transparent",
                                }}
                                title={expiringSoon ? "Expiră în curând!" : ""}
                            >
                                <td style={{ padding: "0.5rem" }}>{item.name}</td>
                                <td style={{ padding: "0.5rem", textAlign: "center" }}>{item.quantity}</td>
                                <td style={{ padding: "0.5rem", textAlign: "center" }}>{item.expiryDate}</td>
                                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                                    <button
                                        onClick={() => handleEdit(index)}
                                        style={{
                                            marginRight: "0.5rem",
                                            backgroundColor: "#add8e6", // bleo (light blue)
                                            border: "none",
                                            padding: "5px 10px",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        style={{
                                            backgroundColor: "#ff4d4d", // roșu
                                            border: "none",
                                            padding: "5px 10px",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            color: "white",
                                        }}
                                    >
                                        Șterge
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            )}

            <div style={{ marginTop: "2rem" }}>
                <h3>Rețete sugerate</h3>
                <RecipeSuggestions alimente={items.map((item) => item.name)} />
            </div>
        </div>
    );
}

export default FridgePage;
