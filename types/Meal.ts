export interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strArea: string;
  strCategory: string;
  // Malzemeler için
  strIngredient1?: string;
  strMeasure1?: string;
  // ... diğer malzemeler
}

export interface MealData {
  meals: Array<{
    idMeal: string;
    strMealThumb: string;
    strArea: string;
    strMeal: string;
  }>;
}

export interface CardProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions?: string;
}

export const baseUrl = "https://www.themealdb.com/api/json/v1/1";
