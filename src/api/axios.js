import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

const storedToken = localStorage.getItem("token");
if (storedToken) {
  setAuthToken(storedToken);
}
export default api;
