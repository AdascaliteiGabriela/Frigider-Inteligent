import React, { useState, useEffect } from "react";

function RecipeSuggestions({ alimente }) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (alimente.length === 0) {
            setRecipes([]);
            return;
        }

        const fetchRecipes = async () => {
            try {
                const ingrediente = alimente.map(a => a.toLowerCase()).join(",");
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`
                );
                const data = await response.json();
                if (data.meals) {
                    setRecipes(data.meals);
                } else {
                    setRecipes([]);
                }
            } catch (error) {
                console.error("Eroare la încărcarea rețetelor:", error);
            }
        };

        fetchRecipes();
    }, [alimente]);

    return (
        <div>
            {recipes.length === 0 ? (
                <p>Nu am găsit rețete pe baza alimentelor disponibile.</p>
            ) : (
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe.idMeal}>
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} width="100" />
                            <p>{recipe.strMeal}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RecipeSuggestions;
