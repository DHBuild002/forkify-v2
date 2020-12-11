import * as model from './model.js';
import recipeView from './views/recipeView.js';
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}; 

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

const showRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // Load Recipe
    await model.loadRecipe(id);
    // Below line temporarily render the recipe for testing purposes
    const { recipe } = model.state;

    // Render Recipe - This line of code uses a seperate class to render the active recipe on the page. Check class RecipeView for the render method()
    recipeView.render(model.state.recipe);
          
  } catch (err) {
    alert(err);
  }
};
// window.addEventListener('hashchange', showRecipe)
// window.addEventListener('load', showRecipe)
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
showRecipe();