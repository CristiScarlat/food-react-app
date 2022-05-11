import { useState, useEffect, useRef } from 'react';
import Recipe from '../../Components/Recipe/Recipe';
import Header from '../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { APP_KEY } from '../../constants';
import "./home.css";

const dummyData = { "results": [{ "id": 637876, "title": "Chicken 65", "image": "https://spoonacular.com/recipeImages/637876-312x231.jpg", "imageType": "jpg" }, { "id": 716342, "title": "Chicken Suya", "image": "https://spoonacular.com/recipeImages/716342-312x231.jpg", "imageType": "jpg" }, { "id": 638420, "title": "Chicken Wings", "image": "https://spoonacular.com/recipeImages/638420-312x231.jpg", "imageType": "jpg" }, { "id": 638308, "title": "Chicken Satay", "image": "https://spoonacular.com/recipeImages/638308-312x231.jpg", "imageType": "jpg" }, { "id": 638086, "title": "Chicken Fingers", "image": "https://spoonacular.com/recipeImages/638086-312x231.jpg", "imageType": "jpg" }, { "id": 638174, "title": "Chicken Lo Mein", "image": "https://spoonacular.com/recipeImages/638174-312x231.jpg", "imageType": "jpg" }, { "id": 638125, "title": "Chicken In A Pot", "image": "https://spoonacular.com/recipeImages/638125-312x231.jpg", "imageType": "jpg" }, { "id": 667707, "title": "chicken marbella", "image": "https://spoonacular.com/recipeImages/667707-312x231.jpg", "imageType": "jpg" }, { "id": 638257, "title": "Chicken Porridge", "image": "https://spoonacular.com/recipeImages/638257-312x231.jpg", "imageType": "jpg" }, { "id": 637999, "title": "Chicken Burritos", "image": "https://spoonacular.com/recipeImages/637999-312x231.jpg", "imageType": "jpg" }], "offset": 0, "number": 10, "totalResults": 633 }

const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("chicken");

    const selectedDiet = useRef('none');

    const navigate = useNavigate();

    useEffect(() => {
        getRecipes();
    }, [query]);

    const getRecipes = async () => {
        const diet = selectedDiet.current !== 'none' ? `&diet=${selectedDiet.current}` : ''
        const response = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APP_KEY}&query=${query}&offset=1${diet}`
        );
        const data = await response.json();

        //simulate api call
        // const data = await new Promise((resolve) => {
        //     setTimeout(resolve(dummyData), 500);
        // })
        setRecipes(data.results);
    };

    const updateSearch = (e) => {
        setSearch(e.target.value);
    };

    const getSearch = (e) => {
        e.preventDefault();
        setQuery(search);
        setSearch("");
    };

    const handleRedirect = (recipeId) => {
        navigate(`/recipe-details?id=${recipeId}`)
    }

    const handleSelectDiet = (e) => {
        selectedDiet.current = e.target.value;
    }

    console.log('render-home')

    return (
        <>
            <Header search={search} updateSearch={updateSearch} getSearch={getSearch} />
            <div className="home-search-filters-container">
                <label htmlFor="cars">Diet:</label>

                <select name="diet" id="diet" onChange={handleSelectDiet} defaultValue='none'>
                    <option value="none">Select Diet</option>
                    <option value="Gluten Free">Gluten Free</option>
                    <option value="Ketogenic">Ketogenic</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                    <option value="Gluten Free">Ovo-Vegetarian</option>
                    <option value="Ketogenic">Vegan</option>
                    <option value="Vegetarian">Pescetarian</option>
                    <option value="Lacto-Vegetarian">Paleo</option>
                    <option value="Gluten Free">Primal</option>
                    <option value="Ketogenic">Low FODMAP</option>
                    <option value="Vegetarian">Whole30</option>
                </select>
            </div>
            <div className="recipes">
                {recipes.map(recipe => (
                    recipe.image && <Recipe
                        key={recipe.title}
                        title={recipe.title}
                        image={recipe.image}
                        onClick={() => handleRedirect(recipe.id)}
                    />
                ))}
            </div>
        </>
    )
}

export default Home;