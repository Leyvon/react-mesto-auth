class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authorization = headers.authorization;
  }

  _checkResponse(res){
    if(res.ok){
      return res.json();
    }
    else {
      //return Promise.reject(res);
      return res.text().then(text => {throw new Error(text)});
    }
  }

  getInitialUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then(this._checkResponse);
  }

  editUserInfo(userName, userAbout){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    })
      .then(this._checkResponse);
  }

  addNewCard(cardName, cardLink){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._authorization}`
      },
    })
      .then(this._checkResponse);
  }

  likeCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `${this._authorization}`
      },
    })
      .then(this._checkResponse);
  }

  deleteLikeCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._authorization}`
      }
    })
      .then(this._checkResponse);
  }

  editUserAvatar(link){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-45",
  headers: {
    authorization: '541a5b47-8b22-4068-8020-177c840b7796',
    'Content-Type': 'application/json'
  }
});

export default api;