import React, { useState, useEffect } from "react";

function RecipeSuggestions({ alimente }) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (!alimente || alimente.length === 0) {
            setRecipes([]);
            return;
        }

        const fetchRecipes = async () => {
            try {
                const allFetched = [];

                for (const aliment of alimente) {
                    const response = await fetch(
                        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${aliment.toLowerCase()}`
                    );
                    const data = await response.json();
                    if (data.meals) {
                        allFetched.push(...data.meals);
                    }
                }

                // Elimină duplicate (unele rețete pot apărea la mai multe ingrediente)
                const uniqueRecipes = Array.from(
                    new Map(allFetched.map(meal => [meal.idMeal, meal])).values()
                );

                setRecipes(uniqueRecipes);
            } catch (error) {
                console.error("Eroare la încărcarea rețetelor:", error);
                setRecipes([]);
            }
        };

        fetchRecipes();
    }, [alimente]);

    return (
        <div>
            {recipes.length === 0 ? (
                <p>Nu am găsit rețete pe baza alimentelor disponibile.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {recipes.map((recipe) => (
                        <li key={recipe.idMeal} style={{ marginBottom: "1rem" }}>
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
