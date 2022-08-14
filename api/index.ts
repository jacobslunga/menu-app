import axios from "axios";

const ROOT_URL = "https://menu-python-server.herokuapp.com/api/v1/";
const API = axios.create({ baseURL: ROOT_URL });

export default API;
