import axios from "axios";

const FULL_ORDER_API_BASE_URL = "http://localhost:8080/fullOrder";

class FullOrderService{
    saveFullOrder(order){
        return axios.post(FULL_ORDER_API_BASE_URL +'/newFullOrder' ,order);
    }

    getFullOrders(){
        return axios.get(FULL_ORDER_API_BASE_URL);
    }

    getFullOrdersRentToday(){
        return axios.get(FULL_ORDER_API_BASE_URL+"/rentToday");
    }

    getFullOrdersBackToday(){
        return axios.get(FULL_ORDER_API_BASE_URL+"/backToday");
    }

    deleteFullOrder(id){
        return axios.delete(FULL_ORDER_API_BASE_URL + "/deleteFullOrder/" + id);
    }

    getFullOrderById(id){
        return axios.get(FULL_ORDER_API_BASE_URL + "/" +id);
    }

    getByKeyword(){
        return axios.get(FULL_ORDER_API_BASE_URL + "/keyword")
    }

    updateFullOrder(order,id){
        return axios.put(FULL_ORDER_API_BASE_URL + "/" + id,order);
    }

    getPlaces(){
        return axios.get(FULL_ORDER_API_BASE_URL+"/places")
    }

    sortByPrizeAscending(){
        return axios.get(FULL_ORDER_API_BASE_URL+"/sortByPrizeAsc")
    }

    sortByPrizeDescending(){
        return axios.get(FULL_ORDER_API_BASE_URL+"/sortByPrizeDesc")
    }

    sortByLaunchDateAscending(){
        return axios.get(FULL_ORDER_API_BASE_URL+"/sortByLaunchDateAsc")
    }

    sortByLaunchDateDescending(){
        return axios.get(FULL_ORDER_API_BASE_URL+"/sortByLaunchDateDesc")
    }

    getByKeyword(keyword){
        return axios.get(FULL_ORDER_API_BASE_URL + "/keyword", {params: {keyword: keyword}})
    }

    getActiveOrdersUser(id){
        return axios.get(FULL_ORDER_API_BASE_URL + "/getActiveOrdersUser", {params: {id: id}})
    }
    
    getHistoricOrdersUser(id){
        return axios.get(FULL_ORDER_API_BASE_URL + "/getHistoricOrdersUser", {params: {id: id}})
    }

    getActiveOrders(){
        return axios.get(FULL_ORDER_API_BASE_URL + "/getActiveOrders")
    }
    
    getHistoricOrders(){
        return axios.get(FULL_ORDER_API_BASE_URL + "/getHistoricOrders")
    }

    daysFromMonth(month){
        return axios.get(FULL_ORDER_API_BASE_URL+"/daysFromMonth", {params: {month: month}})
    }

    daysFromWeek(week){
        return axios.get(FULL_ORDER_API_BASE_URL+"/daysFromWeek", {params: {week: week}})
    }

    monthlyParallel(){
        return axios.get(FULL_ORDER_API_BASE_URL+"/monthlyParallel")
    }

    gainFromDays(days){
        return axios.get(FULL_ORDER_API_BASE_URL+"/sumPrize", {params: {days: days}})
    }

    
}

export default new FullOrderService();