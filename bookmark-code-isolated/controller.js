const controlAddBookmark = function() {
    if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
    else (model.state.recipe.bookmarked) model.deleteBookmark(model.state.recipe.id);
    console.log(model.state.recipe);
}
const init = () => {
    RecipeView.addHandlerAddBookmark(controlAddBookmark)
}