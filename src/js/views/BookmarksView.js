import View from './View.js';
import icons from '../../img/icons.svg';
import PreviewView from './PreviewView.js';

class BookmarksView extends View {
  // You tell the view where it exists using the parent element
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage =
    'No Bookmarks found. Please find a nice recipe and add it using the icon to the right of the servings button.';
  _message = ``;
  addHandlerRender(handler) {
    window.addEventListener('load', handler)
  }
  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
