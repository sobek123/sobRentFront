import axios from "axios";

const CONTACT_API_BASE_URL = "http://localhost:8080/contact";

class ContactService{
    

    getContacts(){
        return axios.get(CONTACT_API_BASE_URL+"/");
    }

    addContact(contact){
        return axios.post(CONTACT_API_BASE_URL+"/addContact",contact)
    }

    respond(contact){
        return axios.put(CONTACT_API_BASE_URL+"/respond",contact)
    }

    setOpened(contact){
        console.log(contact)
        return axios.put(CONTACT_API_BASE_URL+"/setOpened",contact)
    }

    getByOpened(){
        return axios.get(CONTACT_API_BASE_URL+"/getByOpened");
    }

}

export default new ContactService();