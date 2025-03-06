import { Recipe } from '../hooks/useRecipes';

export type RecipeSummary = Pick<Recipe, 'id' | 'name' | 'thumbnail_url' | 'description'>;
