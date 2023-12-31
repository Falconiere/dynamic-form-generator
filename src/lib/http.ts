const BASE_URL = 'http://localhost:3000'
const http = {
  get:async (url:string) => {
    return await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
    }).then((response) => response.json())
  },
  post:async (url:string, payload:any) => {
    return await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then((response) => response.json())
  },
  patch:async (url:string, payload:any) => {
    return await fetch(`${BASE_URL}${url}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }).then((response) => response.json())
  },
  delete:async (url:string) => {
    return await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
    }).then((response) => response.json())
  },
}

export { http }