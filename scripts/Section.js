//Section class renders list of elements on page
class Section {
  //add constructor
  constructor({ items, renderer }, classSelector) {
    this._itemsArray = items; //data array
    this._renderer = renderer; //function to create/render data on page
    this._classSelector = document.querySelector(classSelector); //CSS selector for where to embed item
  }

  //method to render all elements on page
  renderItems() {
    this._itemsArray.forEach((item) => {
      this._renderer(item); //renderer fumction renders each element on page
    });
  }

  //method to take DOM element and add to container
  addItem(item) {
    const newElement = this._renderer(item); //run function to render element
    this._classSelector.prepend(newElement); //append element to page
  }
}

export default Section;
