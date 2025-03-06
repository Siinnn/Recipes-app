import { useState, FormEvent } from 'react'; // Importing hooks from React to manage component state and handle form submission
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom to handle navigation after successful login
import '../css/Login.css'; // Importing the login styles for the component

const Login = () => {
  // Declaring state variables for username, password, and error message
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Initializing useNavigate hook for navigation
  const navigate = useNavigate();

  // handleSubmit function is called when the form is submitted
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Preventing default form submission behavior
    // Checking if the entered username and password match predefined values
    if (username === 'yanis' && password === 'ali') {
      localStorage.setItem('isAuthenticated', 'true'); // Storing authentication status in localStorage
      navigate('/'); // Redirecting user to the home page
    } else {
      setError('Invalid credentials'); // Displaying an error message if login fails
    }
  };

  return (
    <div className="login-container"> {/* Login container */}
      <h2>Login</h2> {/* Login form header */}
      <form onSubmit={handleSubmit}> {/* Form submission handler */}
        <div>
          <label>Username:</label>
          <input 
            type="text" // Input field for username
            value={username} // Binding state to the input value
            onChange={(e) => setUsername(e.target.value)} // Updating state when input changes
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" // Input field for password
            value={password} // Binding state to the input value
            onChange={(e) => setPassword(e.target.value)} // Updating state when input changes
          />
        </div>
        {error && <p>{error}</p>} {/* Display error message if there is an invalid credential */}
        <button type="submit">Login</button> {/* Submit button to login */}
      </form>
    </div>
  );
};

export default Login; // Exporting the Login component to be used in other parts of the app
