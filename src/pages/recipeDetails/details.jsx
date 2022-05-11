import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './details.css';

const RecipeDetails = () => {
    const [recipeData, setRecipeData] = useState();
    const navigate = useNavigate();
    const params = useLocation();
    const recipeId = params.search.split("id=")[1];

    useEffect(() => {
        console.log("use-effect-details")
        async function getDetails() {
            if(recipeId){
                const res = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=87acd22f89974bd9b0e0b4c5bac55e0b`)
                const data = await res.json();
                setRecipeData(data);
            }
        }
        getDetails()
    }, [])

    const handleGoHome = () => {
        navigate("/");
    }

    return (
        <>
            <button onClick={handleGoHome}>Home</button>
            <div className="recipe-details-container">
                <h1>{recipeData?.title || ""}</h1>
                {recipeData?.image && <div className="image-container"><img src={recipeData.image} alt="recipe-image" /></div>}
                {recipeData?.summary && <iframe srcDoc={recipeData.summary} />}
                {recipeData?.instructions && <iframe srcDoc={recipeData.instructions} />}
                {recipeData?.sourceUrl && <a href={recipeData.sourceUrl} target="_blank">recipe original url</a>}
            </div>
        </>
    )
}

export default RecipeDetails;