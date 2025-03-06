import { useState, useEffect } from 'react'; // Importing React hooks for state and side-effects
import axios from 'axios'; // Importing axios for making API requests
import { useParams, Link } from 'react-router-dom'; // Importing hooks for route parameters and navigation
import { Recipe } from '../hooks/useRecipes'; // Importing Recipe type from custom hook
import AppBar from '../components/AppBar'; // Importing AppBar component for navigation

// API configuration variables
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://tasty.p.rapidapi.com/recipes/get-more-info';

const RecipeDetail = () => {
  // Getting the recipe id from the route parameters
  const { id } = useParams<{ id: string }>();

  // State variables to store the recipe data, loading state, and error messages
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect to fetch the recipe details when the component mounts or the id changes
  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: { id }, // Sending the recipe id as a query parameter
          headers: {
            'X-RapidAPI-Key': API_KEY, // API key for authentication
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com', // Host name for the API
          },
        });
        
        // If the API returns data, set the recipe state
        if (response.data) {
          setRecipe(response.data);
        } else {
          setError("No recipes found"); // If no data is returned
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // Handling any errors during the API request
        console.error(err);
        setError("Erreur de chargement des détails: " + err.message); // Error message
      } finally {
        setLoading(false); // Set loading to false after the request finishes
      }
    };

    if (id) {
      fetchRecipeDetail(); // Fetch the recipe details if the id is available
    }
  }, [id]); // Effect runs whenever the id changes

  // Function to add the current recipe to favorites
  const addToFavorites = () => {
    if (!recipe) return; // If there is no recipe, do nothing
    const favorites: Recipe[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    // Check if the recipe is already in the favorites
    if (!favorites.find(fav => fav.id === recipe.id)) {
      // If not, add it to favorites and update localStorage
      localStorage.setItem('favorites', JSON.stringify([...favorites, recipe]));
      alert('Add to favorites !'); // Notify the user
    }
  };

  // Conditional rendering based on loading, error, or missing recipe data
  if (loading) return <p>Loading...</p>; // Display loading message
  if (error) return <p>Error: {error}</p>; // Display error message
  if (!recipe) return <p>No recipes found</p>; // If recipe is null, display no recipe found message

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <AppBar /> {/* Render AppBar component for navigation */}

      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{recipe.name}</h1> {/* Display recipe name */}
      
      <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
        {recipe.thumbnail_url && (
          // Display the recipe thumbnail if available
          <img
            src={recipe.thumbnail_url}
            alt={recipe.name}
            style={{ width: '400px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
          />
        )}
        
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '1.1rem' }}>{recipe.description}</p> {/* Display recipe description */}
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', margin: '20px 0' }}>
            <div>
              <strong>⏱ Preparation</strong>
              <p>{recipe.prep_time_minutes} minutes</p> {/* Display preparation time */}
            </div>
            <div>
              <strong>🍳 Cooking</strong>
              <p>{recipe.cook_time_minutes} minutes</p> {/* Display cooking time */}
            </div>
            <div>
              <strong>👨👩👧👦 Portions</strong>
              <p>{recipe.yields}</p> {/* Display the number of servings */}
            </div>
          </div>
          
          <button 
            onClick={addToFavorites} // When clicked, add the recipe to favorites
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ❤ Add to favourites {/* Button to add to favorites */}
          </button>
        </div>
      </div>

      <Link 
        to="/" 
        style={{
          display: 'inline-block',
          marginTop: '30px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}
      >
        ← Back to home page {/* Link to navigate back to the home page */}
      </Link>
    </div>
  );
};

export default RecipeDetail; // Exporting the RecipeDetail component to be used in other parts of the app
