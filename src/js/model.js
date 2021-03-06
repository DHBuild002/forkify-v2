import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, API_KEY } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    page: 1,
    resultsPerPage: RES_PER_PAGE,
    results: [],
  },
  bookmarks: [],
};

export const createRecipeObject = data => {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceURL: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

// This Function will change the State Object above:
export const loadRecipe = async id => {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(`${err} 🔥`);
    throw err;
  }
};
export const loadSearchResults = async query => {
  try {
    // This is the intake of the search result from the state object created above
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    console.log(data)
    // console.log(query)
    // This is the application of the search query data into the results object
    // we created above in the state object
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key })
      };
    });
    // Reset page of search results to Page 1
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 🔥`);
    throw err;
  }
};
export const getSearchResultsPerPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;

  return state.search.results.slice(start, end);
};
export const updateServings = newServings => {
  // this function will:
  // Take the number of servings > Reach into the state (in partic. Recipe Ingredients)
  // > Change the quantity of each ingredient
  // Cycle through each ingredient in the ingredients array above in the state object:
  state.recipe.ingredients.forEach(ing => {
    // For Each Ing quantity > Set it equal to ing current quantity *
    // newServings(inputted param from this method - const newServings)
  
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQuantity = oldQt * newServingsValue / oldServingsValue
    // Quantity is a child to the servings value. Therefore if that changes, we should also update the
    // individual quantities of each ingredient per person. 4 Meals will serve 4 People.
    // It will not serve 8 with the same portion size.
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = recipe => {
  // Add Bookmark
  state.bookmarks.push(recipe);
  // console.log(state.recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};
export const deleteBookmark = id => {
  // debugger;
  // Delete the bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as not Bookmarked anymore
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};
const init = () => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        const ingArr = ing[1].split(',').map(el => el.trim());
        const [quantity, unit, description] = ingArr;
        if (ingArr.length !== 3)
          throw new Error('Please check the formatting of data inputted.');

        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);

    // console.log(data);
  } catch (err) {
    throw err;
  }
};
