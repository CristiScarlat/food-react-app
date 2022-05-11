import React from "react";
import Home from './pages/home/home';
import RecipeDetails from './pages/recipeDetails/details';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  console.log('render-app')
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/recipe-details" element={<RecipeDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
