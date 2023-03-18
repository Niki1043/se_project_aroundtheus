//authorization token: 871cfd79-24b1-469e-9aa3-4e4a6ff58fdc
//groupID: group-12

//Create a class for Api
//Contains methods for all the requests to be made
//All requests made from this class
//All requests should be methods of this class
//Constructors for the api const called in index.js
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl; //baseurl https://around.nomoreparties.co/v1/groupId
    this._headers = headers;
  }
  //checkResponse() -> Check responses and for errors - general checkto be added to all methods to handle errors/continue with then statements
  //Check response from each fetch request for response and parse from JSON obj for promise or for server error to decide next step with promise
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }
  //getUserInfo() -> returns name, about, avatar,_id, cohort
  //set url to fetch from url of requested resouce, and options object w/method and headers, then check server response to request w/error promise
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  //getInitialCards() -> returns name,link, _id,likes
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  //getAPIInfo -> cards rendered after user info received from server w/Promise.all()
  getAPIInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
  //updateProfileInfo(name,about) -> body:name,about (specifically for name and about in string format)
  updateProfileInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }
  //addNewCard(name,link) -> body:name,link(specifically for name and link in string format)
  addNewCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    }).then(this._checkResponse);
  }
  //deleteUserCard(cardId) ->  _id added to URL in request
  deleteUserCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  //addCardLikes(cardId)->_id added to URL in request
  addCardLikes(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  //removeCardLikes(cardId)->_id added to URL in request
  removeCardLikes(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  //updateProfileAvatar(avatar) -> body:avatar (specifically for avatar in string format)
  updateProfileAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/${avatar}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }
}

export default Api;

////HTML_CSS/index.js
///add get app info method into index.js to get userId and assign for use in JS code and to render cards on opening
////Get likes data from Cardsdataarray to show on pages
////Add likes count format under like button - data changes linked to server
////UX saving button while loading - set timer/with API request too

//////DONE SO FAR
///Add Popup form after delete button click - html modal + index.js calls
///BEFORE API
//////Code so bin is only on user's card - prevent other users to delete other user's card
////Profile pic hover edit button
////Profile pic popupform
