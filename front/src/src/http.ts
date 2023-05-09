import axios from 'axios';
import { API_BASE } from './constants/endpoints';

export function get(url: string, params?: any) {
  return axios.get(`${API_BASE}${url}`, params ? {params}: {});
}

