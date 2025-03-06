import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom for navigation to recipe details
import { Recipe } from '../hooks/useRecipes'; // Importing the Recipe type to define the structure of the recipe prop
import '../css/RecipeCard.css'; // Importing the CSS file to style the RecipeCard component

// Defining the type for the RecipeCard component props
interface RecipeCardProps {
  recipe: Recipe; // The recipe prop is expected to be of the Recipe type
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="recipe-card"> {/* Container for the recipe card */}
      {/* Conditionally render the image if the recipe has a thumbnail */}
      {recipe.thumbnail_url && (
        <img src={recipe.thumbnail_url} alt={recipe.name} />
      )}
      <h3>{recipe.name}</h3> {/* Display the recipe name */}
      <p>{recipe.description}</p> {/* Display the recipe description */}
      <p>
        <strong>Prep Time:</strong> {recipe.prep_time_minutes ? `${recipe.prep_time_minutes} minutes` : 'N/A'} {/* Display prep time, or 'N/A' if not available */}
      </p>
      <p>
        <strong>Yields:</strong> {recipe.yields || 'N/A'} {/* Display yield (number of servings), or 'N/A' if not available */}
      </p>
      <Link to={`/recipe/${recipe.id}`}> {/* Link to navigate to the recipe details page */}
        <button className="details-btn">Details</button> {/* Button to navigate to the recipe details page */}
      </Link>
    </div>
  );
};

export default RecipeCard; // Exporting the RecipeCard component to be used elsewhere in the app
