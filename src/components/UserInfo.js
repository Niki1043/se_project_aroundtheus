// Render User info on the page

class UserInfo {
  //add constructor - take in obj - selectors of two elements
  constructor({ userName, userJob, userAvatar }) {
    this._userName = userName; //profile title
    this._userDescription = userJob; //profile description
    this._userAvatar = userAvatar;
  }

  //return object with info about user -> need to return values from there already
  //in index.js, value gets returned to variable
  getUserInfo() {
    return {
      name: this._userName.textContent, //was title
      about: this._userDescription.textContent, //was description
      avatar: this._userAvatar,
    };
  }

  setUserInfo(value) {
    this._userName.textContent = value.name; //was title
    this._userDescription.textContent = value.about; //was description
    this._userAvatar.src = value.avatar; //this needs to render an image for the link
    this._userAvatar.alt = value.name;
  }
}

export default UserInfo;
