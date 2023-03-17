//Section class renders list of elements on page
class Section {
  //add constructor
  constructor({ items, renderer }, classSelector) {
    this._items = items; //data array
    this._renderer = renderer; //function to create/render data on page
    this._container = document.querySelector(classSelector); //CSS selector for where to embed item
  }

  //method to render all elements on page - changed itemsArray to cards in section for getAPIinfo
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); //renderer fumction renders each element on page
    });
  }

  //method to take DOM element and add to container
  addItem(item) {
    this._container.prepend(item); //append element to page
  }
}

export default Section;
