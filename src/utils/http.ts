import { NEXT_PUBLIC_APP_URL } from "@/constants/constants"

const BASE_URL = NEXT_PUBLIC_APP_URL
const http = {
  get:async (url:string) => {
    return await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
    }).then((response) => response.json())
  },
  post:async <T>(url:string, payload:any):Promise<T> => {
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