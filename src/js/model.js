import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
};

// This Function will change the State Object above:
export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    
  } catch (err) {
    console.error(`${err} 🔥`);
    throw err;
  }
};
export const loadSearchResults = async (query) => {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`)
    console.log(data)

  }catch(err){
    console.error(`${err} 🔥`);
    throw err;
  }
}
loadSearchResults('pizza');
