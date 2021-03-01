class RecipeView extends View {
    _parentElement = document.querySelector('.recipe');
    _errorMessage = 'We could not find your recipe. 404.'
  addHandlerAddBookmark(handler) {
      // Event Delegation as the clicked element, does not yet exist on page load. It only exists until a recipe is loaded.
    this._parentElement.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn--bookmark');
        if(!btn) returnhandler();
    })
  };
}
