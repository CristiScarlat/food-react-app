import React from "react";
import './recipe.css';

const Recipe = ({title,calories,image,ingredients, url, onClick}) =>{
    return(
        <div className="recipe">
            <h1>{title}</h1>
            <a href={url}>
            <img className="recipe-image" src={image} alt="" onClick={onClick} style={{cursor: 'pointer'}}/>
            </a>
        </div>
    );

}
export default Recipe;
