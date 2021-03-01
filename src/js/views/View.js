import icons from '../../img/icons.svg';

export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if(!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    //Alternative Clunkier way of writing lines 7 and 8
    // recipeContainer.innerHTML = '';
    //recipeContainer.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();
    // The below line takes the current Markup and creates a copy, making it the copyOfMarkup
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // The below line will target all of the existing parentElements contents.
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // This line will target the newDOM's copy of the existing markup. Allowing us to then manipulate
    // the data and update the current state of the UI, later on.
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates UI Text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // Commenting out as I now understand this, I had got to the point where we had updated UI. 
        // but not Data Attr - console.log('🔥', newEl.firstChild?.nodeValue.trim())
        curEl.textContent = newEl.textContent;
      }

      // Updates Changed Attribute in the HTML element
      if (!newEl.isEqualNode(curEl)){

        // console.log('🍑' , Array.from(newEl.attributes))
        Array.from(newEl.attributes).forEach(
          attr => curEl.setAttribute(attr.name, attr.value)
          // The above code will take the newElements values and apply 
          // them to the data attibure of the corresponding button, 
          // this will then update all the values of each ingredient
        )
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markup = `
  <div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
  </div>  
  `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderSuccess(message = this._message) {
    const markup = `
    <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
