import { Link, useNavigate } from 'react-router-dom'; // Importing necessary hooks and components from react-router-dom
import '../css/AppBar.css'; 

const AppBar = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate to different routes

    // Function to handle user logout
    const handleLogout = () => {
      localStorage.removeItem('isAuthenticated'); // Remove the 'isAuthenticated' item from localStorage
      navigate('/login'); // Redirect the user to the login page
    };

    return (
      <header className="appbar"> {/* AppBar header container */}
        <div className="appbar-container"> {/* Wrapper for the logo and navigation */}
          <div className="appbar-logo"> 
            <Link to="/">Home</Link> {/* Link to navigate back to the home page */}
          </div>
          <nav className="appbar-nav"> {/* Navigation container */}
            <Link to="/favorites">Favorites</Link> {/* Link to the favorites page */}
            <button onClick={handleLogout}>Log out</button> {/* Button to trigger logout */}
          </nav>
        </div>
      </header>
    );
};

export default AppBar; // Exporting the AppBar component to be used in other parts of the app
