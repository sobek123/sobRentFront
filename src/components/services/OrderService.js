import axios from "axios";

const ORDER_API_BASE_URL = "http://localhost:8080/orders";

class OrderService{
    saveOrder(order){
        return axios.post(ORDER_API_BASE_URL +'/newOrder' ,order);
    }

    getOrders(){
        return axios.get(ORDER_API_BASE_URL);
    }

    deleteOrder(id){
        (id)
        return axios.delete(ORDER_API_BASE_URL + "/deleteOrder/" + id);
    }

    getOrderById(id){
        return axios.get(ORDER_API_BASE_URL + "/" +id);
    }

    updateOrder(order,id){
        return axios.put(ORDER_API_BASE_URL + "/" + id,order);
    }

    getPlaces(){
        return axios.get(ORDER_API_BASE_URL+"/places")
    }

    sortByStartDateAscending(){
        return axios.get(ORDER_API_BASE_URL+"/sortByStartDateAsc")
    }

    sortByStartDateDescending(){
        return axios.get(ORDER_API_BASE_URL+"/sortByStartDateDesc")
    }

    sortByEndDateAscending(){
        return axios.get(ORDER_API_BASE_URL+"/sortByEndDateAsc")
    }

    sortByEndDateDescending(){
        return axios.get(ORDER_API_BASE_URL+"/sortByEndDateDesc")
    }

    sortByPrizeAscending(){
        return axios.get(ORDER_API_BASE_URL+"/sortByPrizeAsc")
    }

    sortByPrizeDescending(){
        return axios.get(ORDER_API_BASE_URL+"/sortByPrizeDesc")
    }

    gainFromBrands(){
        return axios.get(ORDER_API_BASE_URL+"/gainFromBrands")
    }

    gainFromBrands2(){
        return axios.get(ORDER_API_BASE_URL+"/gainFromBrandsBr")
    }

   
    getByKeyword(keyword){
        return axios.get(ORDER_API_BASE_URL+"/keyword",{params: {keyword: keyword}})
    }

    gainFromDaysOrders(days){
        return axios.get(ORDER_API_BASE_URL+"/gainFromDaysOrders", {params: {days: days}})
    }
    
}

export default new OrderService();