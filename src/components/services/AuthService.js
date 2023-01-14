import axios from "axios";

const API_URL = "http://localhost:8080/auth";
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Allow': 'GET, POST, DELETE'
}

class AuthService{
register(registerRequest){
  return axios.post(API_URL + "/signup", registerRequest)
};

login(loginRequest){
  return axios
    .post(API_URL + "/login",loginRequest)
    .then((response) => {
      ("Hal"+response.data)
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    }).catch(console.error());
};

logout = () => {
  localStorage.removeItem("user");
};

getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

}

export default new AuthService();