import axios from "axios";


export const axiosClient = axios.create({
  baseURL:'https://be-ex-rikai.onrender.com/api'
})