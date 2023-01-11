import axios from "axios";

const ADDITIONAL_API_BASE_URL = "http://localhost:8080/additional";

class AdditionalService{
    getAdditionals(){
        return axios.get(ADDITIONAL_API_BASE_URL);
    }

    addAdditional(additional){
        return axios.post(ADDITIONAL_API_BASE_URL+'/newAdditional', additional)
    }

    deleteAdditional(id){
        return axios.delete(ADDITIONAL_API_BASE_URL+'/deleteAdditional/'+ id)
    }

    editAdditional(id,additional){
        return axios.put(ADDITIONAL_API_BASE_URL+"/editAdditional/" + id, additional)
    }
}


export default new AdditionalService();