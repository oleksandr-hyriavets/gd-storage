import axios from 'axios'

import { axiosConfig } from './axiosConfig'

const axiosInstance = axios.create(axiosConfig)

export { axiosInstance }
