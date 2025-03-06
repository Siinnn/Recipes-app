import { useState, useEffect } from 'react'; // Importing hooks from React
import SearchBar from '../components/SearchBar'; // Importing SearchBar component for searching recipes
import RecipeCard from '../components/RecipeCard'; // Importing RecipeCard component to display recipes
import useRecipes, { Recipe } from '../hooks/useRecipes'; // Importing custom hook useRecipes and Recipe type
import AppBar from '../components/AppBar'; // Importing AppBar component for consistent navigation

const Home = () => {
  // State to store the search query entered by the user
  const [query, setQuery] = useState<string>(''); 

  // If the query is empty, use 'popular' as the default query; otherwise, use the user's query
  const effectiveQuery = query === '' ? 'popular' : query;

  // Using the custom hook to fetch recipes based on the query
  const { recipes, loading, error } = useRecipes(effectiveQuery);

  // State to store the featured recipes (randomly selected from the fetched recipes)
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);

  // useEffect hook to shuffle and select the first 5 recipes when the fetched recipes change
  useEffect(() => {
    if (recipes.length > 0) {
      // Shuffling the recipes array and selecting the first 5
      const shuffled = [...recipes].sort(() => Math.random() - 0.5);
      setFeaturedRecipes(shuffled.slice(0, 5)); // Setting the selected recipes to state
    }
  }, [recipes]); // Effect runs when the 'recipes' array changes

  // Function to handle search queries from the SearchBar component
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery); // Updating the search query in state
  };

  return (
    <div style={{ padding: '50px' }}>
      <AppBar /> {/* Rendering the AppBar component */}

      <h1>Featured Recipes</h1> {/* Title for the featured recipes section */}

      <SearchBar onSearch={handleSearch} /> {/* SearchBar component that allows users to search for recipes */}

      {/* Display loading message while fetching recipes */}
      {loading && <p>Loading recipes...</p>}

      {/* Display error message if there is an error fetching recipes */}
      {error && <p>Error loading recipes: {error.message}</p>}

      {/* If recipes are not loading and there are no featured recipes, show a no recipes available message */}
      {(!loading && featuredRecipes.length === 0) && (
        <p>No recipes available.</p>
      )}

      {/* Display featured recipes in a flex container, wrapping them if necessary */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {featuredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} /> 
        ))}
      </div>
    </div>
  );
};

export default Home; // Exporting the Home component to be used in other parts of the app
