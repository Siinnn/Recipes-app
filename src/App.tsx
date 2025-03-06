import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Importing routing components
import Login from './components/Login'; // Importing Login component
import Home from './pages/Home'; // Importing Home page component
import RecipeDetail from './pages/RecipeDetail'; // Importing RecipeDetail page component
import Favorites from './pages/Favorites'; // Importing Favorites page component

const App = () => {
  // Checking if the user is authenticated by reading the 'isAuthenticated' flag from localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router> 
      <Routes> {/* Define routes and their corresponding components */}
        <Route path="/login" element={<Login />} /> {/* Route for Login page */}
        
        <Route 
          path="/" 
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
          // If authenticated, show Home page, else redirect to Login page
        />
        
        <Route 
          path="/recipe/:id" 
          element={isAuthenticated ? <RecipeDetail /> : <Navigate to="/login" />} 
          // If authenticated, show RecipeDetail page, else redirect to Login page
        />
        
        <Route 
          path="/favorites" 
          element={isAuthenticated ? <Favorites /> : <Navigate to="/login" />} 
          // If authenticated, show Favorites page, else redirect to Login page
        />
      </Routes>
    </Router>
  );
};

export default App; // Exporting App component
