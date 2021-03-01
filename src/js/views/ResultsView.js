import View from './View.js';
import PreviewView from './PreviewView.js';
import icons from '../../img/icons.svg';

class ResultsView extends View {
  // You tell the view where it exists using the parent element
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No Results found. Please try again with a different keyword or recipe name.';
  _message = ``;
  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(result => PreviewView.render(result, false)).join('');
  }
}

export default new ResultsView();
