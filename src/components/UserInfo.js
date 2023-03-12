// Render User info on the page

class UserInfo {
  //add constructor - take in obj - selectors of two elements
  constructor({ userNameSelector, userJobSelector }) {
    this._userName = userNameSelector; //profile title
    this._userDescription = userJobSelector; //profile description
  }

  //return object with info about user -> need to return values from there already
  //in index.js, value gets returned to variable
  getUserInfo() {
    return {
      title: this._userName.textContent,
      description: this._userDescription.textContent,
    };
  }

  setUserInfo(value) {
    this._userName.textContent = value.title;
    this._userDescription.textContent = value.description;
  }
}

export default UserInfo;
