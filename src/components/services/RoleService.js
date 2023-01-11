import axios from "axios";

const ROLE_API_BASE_URL = "http://localhost:8080/roles";

class RoleService{
    saveRole(role){
        return axios.post(ROLE_API_BASE_URL, role);
    }

    getRoles(){
        return axios.get(ROLE_API_BASE_URL);
    }

    deleteRole(id){
        return axios.delete(ROLE_API_BASE_URL + "/" + id);
    }

    getRoleById(id){
        return axios.get(ROLE_API_BASE_URL + "/" +id);
    }

    updateRole(role,id){
        return axios.put(ROLE_API_BASE_URL + "/" + id,role);
    }
}

export default new RoleService();