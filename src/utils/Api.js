class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authorization = headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    else {
      return res.text().then(text => { throw new Error(text) });
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getInitialUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `${this._authorization}`
      }
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `${this._authorization}`
      }
    });
  }

  editUserInfo(userName, userAbout) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    });
  }

  addNewCard(cardName, cardLink) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._authorization}`
      },
    });
  }

  likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `${this._authorization}`
      },
    });
  }

  deleteLikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._authorization}`
      }
    });
  }

  editUserAvatar(link) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    });
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