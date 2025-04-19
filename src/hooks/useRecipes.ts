import { useState, useEffect, useRef } from 'react'; // Importing hooks from React for state, side effects, and refs
import axios from 'axios'; // Importing axios for making HTTP requests

// Defining the structure of the Recipe object using TypeScript interface
export interface Recipe {
  approved_at?: number; 
  aspect_ratio?: string;
  beauty_url?: string | null;
  brand?: string | null;
  brand_id?: string | null;
  buzz_id?: string | null;
  canonical_id?: string;
  compilations?: unknown;
  cook_time_minutes?: number;
  country?: string;
  created_at?: number;
  credits?: unknown;
  description?: string;
  draft_status?: string;
  facebook_posts?: unknown;
  id: number; // Recipe's unique identifier
  inspired_by_url?: string | null;
  instructions?: unknown;
  is_app_only?: boolean;
  is_one_top?: boolean;
  is_shoppable?: boolean;
  is_subscriber_content?: boolean;
  keywords?: string;
  language?: string;
  name?: string; // Recipe name
  num_servings?: number;
  nutrition?: unknown;
  nutrition_visibility?: string;
  original_video_url?: string;
  prep_time_minutes?: number; // Time required to prepare the recipe
  price?: unknown;
  promotion?: string;
  renditions?: unknown;
  sections?: unknown;
  seo_path?: string;
  seo_title?: string;
  servings_noun_plural?: string;
  servings_noun_singular?: string;
  show?: unknown;
  show_id?: number;
  slug?: string;
  tags?: unknown;
  thumbnail_alt_text?: string;
  thumbnail_url?: string; // URL of the recipe's thumbnail image
  tips_and_ratings_enabled?: boolean;
  topics?: unknown;
  total_time_minutes?: number; // Total time for the recipe, including preparation and cooking
  total_time_tier?: unknown;
  updated_at?: number;
  user_ratings?: unknown;
  video_ad_content?: string;
  video_id?: number;
  video_url?: string;
  yields?: string; // The yield (number of servings or amount) the recipe makes
}

// Defining the structure of the API response
interface ApiResponse {
  results: Recipe[]; // The API returns a list of recipes
}

// Getting the API key and base URL from environment variables
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const useRecipes = (query: string = '') => {
  const [recipes, setRecipes] = useState<Recipe[]>([]); // State to store the fetched recipes
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading state
  const [error, setError] = useState<Error | null>(null); // State to handle errors
  const callCountRef = useRef<number>(0); // Ref to track the number of API calls made
  const lastRandomOffsetRef = useRef<number>(-1);

  const getRandomOffset = () => {
    let offset;
    do {
      offset = Math.floor(Math.random() * 100);
    } while (offset === lastRandomOffsetRef.current);
    lastRandomOffsetRef.current = offset;
    return offset;
  };

  const fetchRandomRecipes = async () => {
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>(BASE_URL, {
        params: { 
          q: '',
          from: getRandomOffset(),
          size: 5,
          tags: 'under_30_minutes'
        },
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
      });
      
      setRecipes(response.data.results);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("Une erreur inattendue est survenue."));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query) {
      fetchRandomRecipes();
      return;
    }

    const fetchRecipes = async () => {
      if (callCountRef.current >= 10) {
        setError(new Error("Limite d'appels API atteinte"));
        return;
      }
      setLoading(true);
      callCountRef.current += 1;
      try {
        const response = await axios.get<ApiResponse>(BASE_URL, {
          params: { q: query },
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
          }
        });
        setRecipes(response.data.results);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Une erreur inattendue est survenue."));
        }
      }
      setLoading(false);
    };

    fetchRecipes();
  }, [query]);
  
  // Return the recipes, loading state, and error state so they can be used by the component
  return { recipes, loading, error, fetchRandomRecipes };
};

export default useRecipes; // Exporting the custom hook
