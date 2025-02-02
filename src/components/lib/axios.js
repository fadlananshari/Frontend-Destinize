import axios from 'axios'

export const axiosBaseUrl = axios.create({
  baseURL: "https://destinize-api.vercel.app/api/v1/"
})
