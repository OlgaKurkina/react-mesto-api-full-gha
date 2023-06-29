class Api {
  constructor({ basePath, headers }) {
    this._basePath = basePath;
    this._headers = headers;
  }

  _getRequest(url, options) {
    return fetch(url, options).then(this._getJson);
  }

  //получение ответа от сервера
  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // setToken(token) {
 //   this._headers.Authorization = `Bearer ${token}`;
 // }

 _setHeaders() {
  const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`
  }
  return headers;
}

  getCards() {
      return this._getRequest(`${this._basePath}/cards`, {
      headers: this._setHeaders(),
    });
  }

  addNewCard(data) {
    return this._getRequest(`${this._basePath}/cards`, {
      method: "POST",
      headers: this._setHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  getUserData() {
    return this._getRequest(`${this._basePath}/users/me`, {
      method: "GET",
      headers: this._setHeaders(),
    });
  }

  updateUserData(data) {
    return this._getRequest(`${this._basePath}/users/me`, {
      method: "PATCH",
      headers: this._setHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  //обновление аватара
  updateUserAvatar(avatar) {
    return this._getRequest(`${this._basePath}/users/me/avatar`, {
      method: "PATCH",
      headers: this._setHeaders(),
      body: JSON.stringify(avatar),
    });
  }

  //удаление карточки
  deleteMyCard(_id) {
    return this._getRequest(`${this._basePath}/cards/${_id}`, {
      method: "DELETE",
      headers: this._setHeaders(),
    });
  }

  changeLikeStatus(_id, isLiked) {
    return this._getRequest(`${this._basePath}/cards/${_id}/likes`, {
      method: `${!isLiked ? "DELETE" : "PUT"}`,
      headers: this._setHeaders(),
    });
  }
}

export const api = new Api({ 
  basePath: 'http://localhost:3000',
  headers: {
  'Content-Type': 'application/json',
  Authorization: '',
}
});