import axios from 'axios'

export const httpRequest = axios.create({
  baseURL: 'http://192.168.0.100:3001',
})
