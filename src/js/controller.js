import * as model from './model.js';
import RecipeView from './views/RecipeView.js';
import searchView from './views/searchView.js';
import ResultsView from './views/ResultsView.js';
import icons from '../img/icons.svg';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    RecipeView.renderSpinner();

    // Load Recipe
    await model.loadRecipe(id);
    // Below line temporarily render the recipe for testing purposes
    const { recipe } = model.state;

    // Render Recipe - This line of code uses a seperate class to render the active recipe on the page. Check class RecipeView for the render method()
    RecipeView.render(model.state.recipe);
          
  } catch (err) {
    RecipeView.renderError();
  }
};
const controlSearchResults = async () => {
  try{
    // Render Spinner from ResultsView file
    ResultsView.renderSpinner();
    console.log(ResultsView);

    // Get Search query
    const query = searchView.getQuery();
    if (!query) return;
    
    //Load in the search results from the query
    await model.loadSearchResults(query)

    // Render Results
    console.log(model.state.search.results);
    ResultsView.render(model.state.search.results);
  }
   catch(err){
     console.log(err)
  }
}
controlSearchResults();
// window.addEventListener('hashchange', showRecipe)
// window.addEventListener('load', showRecipe)

const init = () => {
  RecipeView.addHandlerRender(controlRecipes)
  // This is us calling the addHandler function on the loading of the app.
  searchView.addHandlerSearch(controlSearchResults);
}
init();