import { useState, useEffect } from 'react'; // Importing necessary hooks from React
import RecipeCard from '../components/RecipeCard'; // Importing the RecipeCard component to display recipes
import { RecipeSummary } from '../types/RecipeSummary'; // Importing RecipeSummary type to ensure correct structure for favorite recipes
import '../css/Favorites.css'; // Importing CSS for styling the Favorites page
import AppBar from '../components/AppBar'; // Importing AppBar component for consistent navigation

const Favorites = () => {
  // State to hold the list of favorite recipes
  const [favorites, setFavorites] = useState<RecipeSummary[]>([]);

  // useEffect hook to load favorites from local storage when the component is mounted
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites'); // Retrieve favorites from local storage
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites)); // If favorites exist, parse and set them to state
    }
  }, []); // Empty dependency array means this runs only once when the component is mounted

  // Function to handle removing a recipe from the favorites list
  const handleRemoveFavorite = (id: number | string) => {
    // Filter out the recipe to be removed from the favorites list
    const updatedFavorites = favorites.filter(recipe => recipe.id !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update the local storage with the new favorites list
    setFavorites(updatedFavorites); // Update the state with the new list of favorites
  };

  return (
    <div className="favorites-container" style={{ padding: '50px' }}>
      <AppBar /> {/* Render the AppBar component */}

      <h2 className="favorites-title">Favorites</h2> {/* Title for the favorites page */}
      
      {/* If there are no favorites, show a message */}
      {favorites.length === 0 ? (
        <p className="empty-message">No favorites found.</p>
      ) : (
        // Otherwise, map over the favorites list and display each recipe
        <div className="favorites-list">
          {favorites.map(recipe => (
            <div key={recipe.id} className="favorite-item">
              <RecipeCard recipe={recipe} /> {/* Render each recipe using RecipeCard */}
              <button onClick={() => handleRemoveFavorite(recipe.id)}>
                Remove {/* Button to remove the recipe from the favorites list */}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites; // Export the Favorites component
