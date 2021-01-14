class searchView {
    _parentEl = document.querySelector('.search');
    getQuery() {
        const query = this._parentEl.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }
    _clearInput() {

        this._parentEl.querySelector('.search__field').placeholder = "Search over 1,000,000 recipes...";
        this._parentEl.querySelector('.search__field').value = '';
        
    }
    // This is how to handle the addHandlerSearch function when a 
    // param is passed through and when it is called.
    addHandlerSearch(handler) {
        this._parentEl.addEventListener('submit', (e) => {
            e.preventDefault();
            handler();
        })
    }
}
export default new searchView();