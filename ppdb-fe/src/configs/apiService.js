import { checkError, headers, BASE_API, BASE_API_IMAGE } from "./config"
import axios from "axios"

export const get = (URL) => {
  return new Promise((resolve, reject) => axios.get(`${BASE_API}${URL}`, headers)
    .then((res) => {
      resolve(res)
    }).catch((error) => {
      checkError(error)
      reject(error)
    })
  )
}

export const post = (URL, formData) => {
  return new Promise((resolve, reject) => axios.post(BASE_API + URL, formData, headers)
    .then((res) => {
      resolve(res)
    })
    .catch((error) => {
      checkError(error)
      reject(error)
    })
  )
}

export const put = (URL, formData) => {
  return new Promise((resolve, reject) => axios.put(BASE_API + URL, formData, headers)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        checkError(error)
        reject(error)
      })
  )
}

export const patch = (URL, formData) => {
  return new Promise((resolve, reject) => axios.patch(BASE_API + URL, formData, headers)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        checkError(error)
        reject(error)
      })
  )
}

export const download = (URL) => {
  return new Promise((resolve, reject) => axios.get(`${BASE_API_IMAGE}${URL}`, headers)
    .then((res) => {
      resolve(res)
    }).catch((error) => {
      checkError(error)
      reject(error)
    })
  )
}
