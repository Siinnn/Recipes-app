Recipe App
This is a recipe application that allows users to search for recipes, view recipe details, add recipes to their favorites, and access personalized content. It uses the Tasty API to fetch recipes and supports user authentication to access protected features such as favorites.

Features
  User Authentication: Users must log in to access the main features of the app.
  Recipe Search: Search for recipes by name or ingredient.
  Recipe Details: View detailed information about a selected recipe, including ingredients, cooking time, and instructions.
  Favorites: Users can add recipes to their favorites list and remove them as desired.
  Responsive Design: The app is responsive and works well on both desktop and mobile devices.


Technologies Used
  React: Frontend framework used to build the app.
  TypeScript: For type safety and better development experience.
  React Router: For routing and navigation.
  Axios: For making HTTP requests to the Tasty API.
  CSS: For styling the application.
  Tasty API: Provides the recipe data.
  LocalStorage: For storing authentication status and favorite recipes.

Getting Started
  Prerequisites
Node.js and npm installed on your machine. You can download them from nodejs.org.

  Installation
Clone the repository to your local machine:
  git clone https://github.com/yourusername/recipe-app.git
  cd recipe-app

Install the dependencies:
  npm install

Create a .env file in the root of the project and add your API key and base URL for the Tasty API:

VITE_API_KEY=your_tasty_api_key
VITE_BASE_URL=https://tasty.p.rapidapi.com/recipes/list

Run the development server:
npm start
Your app should now be running at http://localhost:3000.

Usage
  Login: To access the features of the app, the user must log in. For now, the app uses hardcoded credentials (username: yanis, password: ali).
  Home Page: After logging in, users are redirected to the home page where they can search for recipes.
  Recipe Detail Page: Click on a recipe card to view detailed information about the recipe.
  Favorites Page: Users can view their saved recipes in the favorites section and remove them if desired.


File Structure
.
├── src/
│   ├── components/        # Reusable components like AppBar, RecipeCard, SearchBar
│   ├── hooks/             # Custom hooks (e.g., useRecipes)
│   ├── pages/             # Pages like Home, RecipeDetail, Favorites
│   ├── css/               # Stylesheets for the app
│   ├── App.tsx            # Main component that handles routing
│   └── index.tsx          # Entry point of the application
├── .env                   # Environment variables (API keys)
├── package.json           # Project dependencies and scripts
└── README.md              # This file
License
This project is licensed under the MIT License - see the LICENSE file for details.

