export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE, // (This will be set up in a seperate CONFIG file)
  },
  bookmarks: [],
};

// Load a Recipe from the API to the DOM
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;
    state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
    }
    
    if(state.bookmarks.some(bookmark => bookmark.id === id))
    state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log(state.recipe);
  } catch (err) {
      console.error(`${err} Explosion!`);
      throw err;
  }
};

export const addBookmark = recipe => {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};
export const deleteBookmark = id => {
    // Run through each bookmark in current state and if any recipe id matches the one that is passed in, remove it.
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1)

    if(id === state.recipe.id) state.recipe.bookmarked = false;
}