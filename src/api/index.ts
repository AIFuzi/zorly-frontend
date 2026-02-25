import axios from 'axios'

const api_url = process.env.NEXT_PUBLIC_API_URl

export const api = axios.create({
  withCredentials: true,
  baseURL: api_url,
})
