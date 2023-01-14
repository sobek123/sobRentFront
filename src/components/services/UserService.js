import axios from "axios";
import AuthService from "./AuthService";

const USER_API_BASE_URL = "http://localhost:8080/users";

class UserService{
    saveUser(user){
        return axios.post(USER_API_BASE_URL+"/register", user);
    }

    saveWorker(user){
        return axios.post(USER_API_BASE_URL+"/registerWorker", user);
    }

    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }

    getWorkers(){
        return axios.get(USER_API_BASE_URL+"/workers");
    }

    deleteUser(id){
        return axios.delete(USER_API_BASE_URL + "/deleteUser/" + id);
    }

    getByKeyword(){
        return axios.get(USER_API_BASE_URL + "/keyword")
    }

    getUserById(id){
        return axios.get(USER_API_BASE_URL + "/" +id);
    }

    updateUser(user,id){
        return axios.put(USER_API_BASE_URL + "/editUser/" + id,user);
    }

    addContact(contact){
        return axios.put(USER_API_BASE_URL + "/contact",contact);
    }

    changePassword(user){
        return axios.put(USER_API_BASE_URL + "/changePassword",user);
    }

    findByPassword(password){
        const user = AuthService.getCurrentUser();   
      
        (user.email)
        return axios.get(USER_API_BASE_URL+"/checkPassword", {params: {password: password, email:user.email}})
    }

    sortByPrizeAsc(){
        return axios.get(USER_API_BASE_URL)
    }

    getByKeyword(keyword,role){
        return axios.get(USER_API_BASE_URL + "/keyword", {params: {keyword: keyword, role: role}})
    }

    makeCard(user){
        return axios.put(USER_API_BASE_URL + "/makeCard", user)
    }

    sortDown(role){

        return axios.get(USER_API_BASE_URL + "/sortDown", {params: {role: role}})
      }
      
      sortUp(role){
      
         return axios.get(USER_API_BASE_URL+ "/sortUp", {params: {role: role}})
      
      }

      findByPesel(pesel){
        return axios.get(USER_API_BASE_URL+"/findByPesel", {params: {pesel: pesel}})
      }

      findByEmail(email){
        // ("in"+email)
        return axios.get(USER_API_BASE_URL+"/findByEmail", {params: {email: email}})
      }

      findByPhoneNumber(phoneNumber){
        return axios.get(USER_API_BASE_URL+"/findByPhoneNumber", {params: {phoneNumber: phoneNumber}})
      }

    //   respond(msg){
    //     return axios.post(USER_API_BASE_URL+"/respond",msg)

    //   }

      respond(from, content, title, email){
        return axios.get(USER_API_BASE_URL+"/respondTo",{params: {from: from, content: content, title: title, email: email}})
    }

    verify(email){
        return axios.post(USER_API_BASE_URL+"/verify", email)
    }

    processEmail(email){
        return axios.get(USER_API_BASE_URL+"/processEmail",{params: {email: email}})
    }

    forgotPassword(password, token){
        return axios.put(USER_API_BASE_URL+"/updatePassword", {params: {password: password, token: token}})
    }

    minusPoints(user,points){
        return axios.put(USER_API_BASE_URL + "/minusPoints", user,{params: {points: points}})
    }

}

export default new UserService();