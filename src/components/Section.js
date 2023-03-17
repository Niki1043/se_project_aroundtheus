//Section class renders list of elements on page
class Section {
  //add constructor
  constructor({ renderer }, classSelector) {
    //this._itemsArray = items; //data array
    this._renderer = renderer; //function to create/render data on page
    this._container = document.querySelector(classSelector); //CSS selector for where to embed item
  }

  //method to render all elements on page
  renderItems() {
    cards.forEach((item) => {
      this._renderer(item); //renderer fumction renders each element on page
    });
  }

  //method to take DOM element and add to container
  addItem(item) {
    this._container.prepend(item); //append element to page
  }
}

export default Section;
