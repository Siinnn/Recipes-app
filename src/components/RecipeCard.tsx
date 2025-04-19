import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom for navigation to recipe details
import { Recipe } from '../hooks/useRecipes'; // Importing the Recipe type to define the structure of the recipe prop
import '../css/App.css'; // Importing the CSS file to style the RecipeCard component

// Defining the type for the RecipeCard component props
interface RecipeCardProps {
  recipe: Recipe; // The recipe prop is expected to be of the Recipe type
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="recipe-card"> {/* Container for the recipe card */}
      <div className="recipe-image-container">
        {/* Conditionally render the image if the recipe has a thumbnail */}
        {recipe.thumbnail_url && (
          <img 
            src={recipe.thumbnail_url} 
            alt={recipe.name || 'Image de recette'} 
            className="recipe-image"
          />
        )}
      </div>
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.name}</h3> {/* Display the recipe name */}
        <p className="recipe-description">{recipe.description}</p> {/* Display the recipe description */}
        <div className="recipe-meta">
          <div className="recipe-time">
            <span>⏱️</span>
            <span>{recipe.prep_time_minutes ? `${recipe.prep_time_minutes} min` : 'N/A'}</span>
          </div>
          <div className="recipe-servings">
            <span>🍽️</span>
            <span>{recipe.yields || 'N/A'}</span>
          </div>
        </div>
        <Link to={`/recipe/${recipe.id}`} className="recipe-link"> {/* Link to navigate to the recipe details page */}
          <button className="details-btn">Voir la recette</button> {/* Button to navigate to the recipe details page */}
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard; // Exporting the RecipeCard component to be used elsewhere in the app
