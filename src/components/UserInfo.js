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
      title: this._userName.textContent,
      description: this._userDescription.textContent,
      //avatar: this._userAvatar.src,
    };
  }

  setUserInfo(value) {
    this._userName.textContent = value.title;
    this._userDescription.textContent = value.description;
    this._userAvatar.src = value.avatar;
    this._userAvatar.alt = value.title;
  }

  //need to get avatar info from return statement - how to do this
  /*setUserImage(value) {
    this._userAvatar.src = value.avatar;
    this._userAvatar.alt = this._userName.textContent;
  } //No avatar data called*/
}

export default UserInfo;
