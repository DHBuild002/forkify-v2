import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    page: 1,
    resultsPerPage: RES_PER_PAGE,
    results: [],
    }
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
    // This is the intake of the search result from the state object created above
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`)
    console.log(data);

    // This is the application of the search query data into the results object 
    // we created above in the state object
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      }
    })
  }catch(err){
    console.error(`${err} 🔥`);
    throw err;
  }
}
export const getSearchResultsPerPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * RES_PER_PAGE; 
  const end = page * RES_PER_PAGE;

  return state.search.results.slice(start, end)
}
export const updateServings = (newServings) => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newServings / state.recipe.servings;

    // newQuantity = oldQt * newSeringsValue / oldServingsValue
    // Quantity is a child to the servings value. Therefore if that changes, we should also update the 
    // individual quantities of each ingredient per person. 4 Meals will serve 4 People. 
    // It will not serve 8 with the same portion size.
  });
  state.recipe.servings = newServings;
}