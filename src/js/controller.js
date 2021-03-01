import * as model from './model.js';
import RecipeView from './views/RecipeView.js';
import SearchView from './views/SearchView.js';
import ResultsView from './views/ResultsView.js';
import BookmarksView from './views/BookmarksView.js';
import PaginationView from './views/PaginationView.js';
import AddRecipeView from './views/AddRecipeView.js';
import icons from '../img/icons.svg';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async () => {
  try {
    // Ask localStorage if there are any bookmarks
    BookmarksView.update(model.state.bookmarks);


    const id = window.location.hash.slice(1);

    // If no recipe ID is found, return function call at this point
    if (!id) return;


    RecipeView.renderSpinner();

    // Update Results View to mark select result as active
    ResultsView.update(model.getSearchResultsPerPage());

    // Load Recipe
    await model.loadRecipe(id);

    // Render Recipe - This line of code uses a seperate class to render the active recipe on the page. Check class RecipeView for the render method()
    RecipeView.render(model.state.recipe);
    // console.log(model.state.recipe);

  } catch (err) {
    RecipeView.renderError();
    console.error(err);
  }
};
const controlSearchResults = async () => {
  try {
    // Render Spinner from ResultsView file
    ResultsView.renderSpinner();

    // Get Search query
    const query = SearchView.getQuery();

    if (!query) return;

    //Load in the search results from the query
    await model.loadSearchResults(query);

    // Render Results
    ResultsView.render(model.getSearchResultsPerPage());

    // Render initial Search Pagination buttons
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
// controlSearchResults();
// window.addEventListener('hashchange', showRecipe)
// window.addEventListener('load', showRecipe)

// Button click on Pagination event
const controlPagination = gotoPage => {
  // console.log(gotoPage);
  // Render New Results
  ResultsView.render(model.getSearchResultsPerPage(gotoPage));

  // Render New Pagination buttons
  PaginationView.render(model.state.search);
};
const controlServings = newServings => {
  // Update the number of servings in the current state of the app
  model.updateServings(newServings);
  // we delegate the handling of this data to the model, as that is all about handling data.
  // The controller is about calling a certain method inside of either the model or view
  // classes we created elsewhere

  // Render that new value and collection of quantities to the ReceipeUI
  RecipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  // Add/Remove Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update Recipe View
  RecipeView.update(model.state.recipe);

  // RecipeView Render
  BookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = () => {
  BookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async (newRecipe) => {
  try{
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

  } catch(err) {
    console.error('Problem: ', err);
    AddRecipeView.renderError(err.message);
  }
}

const init = () => {
  BookmarksView.addHandlerRender(controlBookmarks);
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerClick(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);

  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);

  AddRecipeView.addHandlerUpload(controlAddRecipe)
};

init();