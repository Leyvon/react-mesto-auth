 
class Auth {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res){
    if (res.ok){
      return res.json();
    } else {
      return res.text().then(text => {throw new Error(text)});
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  register = (email, password) => {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    });
  };

  login = (email, password) => {
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    });
  };

  checkToken = (token) => {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    });
  };
}

const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
});

export default auth;