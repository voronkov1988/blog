const baseUrl = "https://blog.kata.academy/api/";

class ApiServise {
  async getArticle(offset) {
    return await fetch(`${baseUrl}articles?limit=10&offset=${offset}`)
      .then((item) => item.json())
      .then((res) => {
        return res;
      });
  }
  async getOneArticle(slug) {
    return await fetch(`${baseUrl}/articles/${slug}`)
      .then((item) => item.json())
      .then((res) => res);
  }
  async login(body) {
    return await fetch(`${baseUrl}users/login`, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((user) => {
        if (user.status !== 200) {
          throw new Error("чтото пошло не так");
        }
        return user.json();
      })
      .then((res) => {
        console.log(res);
        return res;
      });
  }

  async getCurrentUser(token) {
    return await fetch(`${baseUrl}profiles/123456782`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
    })
      .then((user) => user.json())
      .then((res) => {
        return res;
      });
  }
  async register(body) {
    return fetch(`${baseUrl}users/`, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((user) => user.json())
      .then((res) => {
        console.log(res);
        return res;
      });
  }
  async updateUser(body, token) {
    return await fetch(`${baseUrl}user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res)
      .then((result) => result.json());
  }
  async createArticle(body, token) {
    return await fetch(`https://blog.kata.academy/api/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (!res.status === 200) {
        throw new Error("нужно получить токен");
      }
      return res.json();
    });
  }
  async deleteArticle(slug, token) {
    return await fetch(`${baseUrl}articles/${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
    }).then((res) => res);
  }
  async editArticle(slug, token, body) {
    return await fetch(`${baseUrl}articles/${slug}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res)
      .then((result) => result.json());
  }

  async getLike(slug, token) {
    return await fetch(`${baseUrl}articles/${slug}/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res)
      .then((result) => result.json());
  }
  async unlike(slug, token) {
    return await fetch(`${baseUrl}articles/${slug}/favorite`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res)
      .then((result) => result.json());
  }
}

export const api = new ApiServise();
