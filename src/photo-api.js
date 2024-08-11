import axios from 'axios'
const BASE_URL = 'https://api.unsplash.com/search/photos'
const ACCES_KEY = 'OXoN-kRkRN-ngRR9nP_v43NlCq_El38bqfZ8u6MzX_M'
const per_page = 12;


export default function getImages (query, page) {
   return axios.get(`${BASE_URL}?page=${page}&per_page=${per_page}&query=${query}&client_id=${ACCES_KEY}`)
}
