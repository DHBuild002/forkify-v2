import * as model from './model.js';
import RecipeView from './views/RecipeView.js';
import SearchView from './views/SearchView.js';
import ResultsView from './views/ResultsView.js';
import PaginationView from './views/PaginationView.js';
import icons from '../img/icons.svg';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if(module.hot) {
  module.hot.accept()
}

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    RecipeView.renderSpinner();

    // Load Recipe
    await model.loadRecipe(id);

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
    const query = SearchView.getQuery();
    if (!query) return;
    
    //Load in the search results from the query
    await model.loadSearchResults(query)

    // Render Results
    ResultsView.render(model.getSearchResultsPerPage());

    // Render initial Search Pagination buttons
    PaginationView.render(model.state.search);

  } catch(err){
     console.log(err)
  }
}
controlSearchResults();
// window.addEventListener('hashchange', showRecipe)
// window.addEventListener('load', showRecipe)

// Button click on Pagination event
const controlPagination = (gotoPage) => {
  console.log(gotoPage);
  // Render New Results
  ResultsView.render(model.getSearchResultsPerPage(gotoPage));

  // Render New Pagination buttons
  PaginationView.render(model.state.search);
}
const controlServings = () => {
  // Update the number of servings
  model.updateServings(9);
  
  // Render that new value and collection of quantities to the UI
  RecipeView.render(model.state.recipe);
}

const init = () => {
  RecipeView.addHandlerRender(controlRecipes)
  RecipeView.addHandlerClick(controlServings);

  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  
}
init();