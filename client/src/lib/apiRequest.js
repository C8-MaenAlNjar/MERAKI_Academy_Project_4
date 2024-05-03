import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://meraki-academy-project-4-83f6.onrender.com",
  withCredentials: true,
});

export default apiRequest;
