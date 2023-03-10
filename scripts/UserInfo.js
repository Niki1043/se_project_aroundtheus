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

  //take in new user data and add to page -> need to add argiments into set user info
  //value is on object so call from the object for name and job
  /*setUserInfo({ name, description }) {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
  }*/

  setUserInfo(value) {
    this._userName.textContent = value.title;
    this._userDescription.textContent = value.description;
  }
}

export default UserInfo;

//index.js
/* const userName = doc.qs.profile title
const userJob = doc.qs.profile description
const userinfo = new user info(username,userdescription) this is the info
set the uesr info from last with new
in function 

cosnt newuseringo = {
    name: ''
    job:''
}//get valies from here so get value into set user info
userinfo.setuseringo(newuseringo)

const useringo2 = userInfo.getuserinf0()
*/
