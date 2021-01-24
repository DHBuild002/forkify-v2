import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
      this._parentElement.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn--inline');

        if(!btn) return; 
        const gotoPage = +btn.dataset.goto;
        // console.log(gotoPage)

        handler(gotoPage);
      });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const nextPage = `
    <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
    </button> 
    `;
    const prevPage = `
    <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
        </button>
        `;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // If the initial page is 1, and there are others
    if (currentPage === 1 && numPages > 1) {
      return nextPage;
    }
    // last page
    if (currentPage === numPages && numPages > 1) {
      return prevPage;
    }
    // Other Pages in between
    if (currentPage < numPages) {
      return nextPage + prevPage;
    }
    // If there are only 10 results, return no pagination buttons
    return '';
  }
}

export default new PaginationView();
