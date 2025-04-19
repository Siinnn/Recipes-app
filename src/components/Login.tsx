import { useState, FormEvent } from 'react'; // Importing hooks from React to manage component state and handle form submission
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom to handle navigation after successful login
import '../css/Login.css'; // Importing the login styles for the component
import { authService } from '../services/authService';

const Login = () => {
  // Declaring state variables for username, password, and error message
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: ''
  });
  
  // Initializing useNavigate hook for navigation
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {
      username: '',
      password: ''
    };
    let isValid = true;

    if (!username.trim()) {
      errors.username = 'Le nom d\'utilisateur est requis';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Le mot de passe est requis';
      isValid = false;
    } else if (password.length < 3) {
      errors.password = 'Le mot de passe doit contenir au moins 3 caractères';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // handleSubmit function is called when the form is submitted
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Preventing default form submission behavior
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.login({ username, password });
      navigate('/'); // Redirecting user to the home page
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Une erreur inattendue est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container"> {/* Login container */}
      <h2>Connexion</h2> {/* Login form header */}
      <form onSubmit={handleSubmit}> {/* Form submission handler */}
        <div className="form-group">
          <label>Nom d'utilisateur:</label>
          <input 
            type="text" // Input field for username
            value={username} // Binding state to the input value
            onChange={(e) => setUsername(e.target.value)} // Updating state when input changes
            className={formErrors.username ? 'error' : ''}
            disabled={isLoading}
          />
          {formErrors.username && <span className="error-message">{formErrors.username}</span>}
        </div>
        <div className="form-group">
          <label>Mot de passe:</label>
          <input 
            type="password" // Input field for password
            value={password} // Binding state to the input value
            onChange={(e) => setPassword(e.target.value)} // Updating state when input changes
            className={formErrors.password ? 'error' : ''}
            disabled={isLoading}
          />
          {formErrors.password && <span className="error-message">{formErrors.password}</span>}
        </div>
        {error && <div className="error-message">{error}</div>} {/* Display error message if there is an invalid credential */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </button> {/* Submit button to login */}
      </form>
    </div>
  );
};

export default Login; // Exporting the Login component to be used in other parts of the app
