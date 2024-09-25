import axios from 'axios'

export const axiosBaseUrl = axios.create({
  baseURL: "https://destinize-api-04aae1968d23.herokuapp.com/api/v1/"
})