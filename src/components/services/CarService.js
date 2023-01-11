import axios from "axios"

const CAR_API_BASE_URL = "http://localhost:8080/cars"

class CarService{
    saveCar(car){
        return axios.post(CAR_API_BASE_URL +'/newCar',  car)
    }

    saveCarForm(file,car){
        return axios.post(CAR_API_BASE_URL +'/newCarForm', file, car)
    }

    getCars(){
        return axios.get(CAR_API_BASE_URL+'/all')
    }

    getCarsCargo(){
        return axios.get(CAR_API_BASE_URL+'/cargo')
    }

    getCarsEconomy(){
        return axios.get(CAR_API_BASE_URL+"/economy")
    }

    getCarsSport(){
        return axios.get(CAR_API_BASE_URL+"/sport")
    }

    getCarsExclusive(){
        return axios.get(CAR_API_BASE_URL+"/exclusive")
    }

    getCarsSUV(){
        return axios.get(CAR_API_BASE_URL+"/SUV")
    }

    getCarsComfort(){
        return axios.get(CAR_API_BASE_URL+"/comfort")
    }

    deleteCar(id){
        return axios.delete(CAR_API_BASE_URL + "/deleteCar/" + id)
    }

    getCarById(id){
        return axios.get(CAR_API_BASE_URL + "/" +id)
    }

    updateCar(id,car){
        return axios.put(CAR_API_BASE_URL + "/editCar/" + id,car)
    }

    getCategories(){
        return axios.get(CAR_API_BASE_URL+"/categories")

    }

    getPetrols(){
        return axios.get(CAR_API_BASE_URL+"/petrols")
    }

    setTaken(car){
        return axios.put(CAR_API_BASE_URL+"/setOpened", car)
    }

   
    getTransmissions(){
        return axios.get(CAR_API_BASE_URL+"/transmissions")
    }

    getBrands(){
        return axios.get(CAR_API_BASE_URL+"/brands")
    }

    getByBrand(brand){
        return axios.get(CAR_API_BASE_URL+"/brand",{ params: { brand: brand } })
    }

    getByYear(year){
        return axios.get(CAR_API_BASE_URL+"/year",{ params: { year: year } })
    }

    getByTransmission(transmission){
        return axios.get(CAR_API_BASE_URL+"/transmission",{ params: { transmission: transmission } })
    }

    getByPrize(prize){
        return axios.get(CAR_API_BASE_URL+"/prize",{ params: { prize: prize } })
    }

    getByPetrol(petrol){
        return axios.get(CAR_API_BASE_URL+"/petrol",{ params: { petrol: petrol } })
    }

    getByCategory(category){
        return axios.get(CAR_API_BASE_URL+"/category",{ params: { category: category } })
    }

    getByNumberOfSeats(numberOfSeats){
        return axios.get(CAR_API_BASE_URL+"/numberOfSeats",{ params: { numberOfSeats: numberOfSeats } })
    }

    getModels(){
        return axios.get(CAR_API_BASE_URL+"/models")
    }

    getModelsByBrand(brand,category){
        return axios.get(CAR_API_BASE_URL+"/modelByBrand",{ params: { brand: brand, category: category } })
    }

    getYearsByBrand(brand){
        return axios.get(CAR_API_BASE_URL+"/yearByBrand",{ params: { brand: brand } })
    }

    getNumberOfSeatsByBrand(brand){
        return axios.get(CAR_API_BASE_URL+"/numberOfSeatsByBrand",{ params: { brand: brand } })
    }

    sortByPrizeAscending(category){
        return axios.get(CAR_API_BASE_URL+"/")
    }

    sortByPrizeDescending(category){
        return axios.get(CAR_API_BASE_URL+"/")
    }

    sortByNumberOfSeatsAscending(){
        return axios.get(CAR_API_BASE_URL+"/sortByNumberOfSeatsAsc")
    }

    sortByNumberOfSeatsDescending(){
        return axios.get(CAR_API_BASE_URL+"/sortByNumberOfSeatsDesc")
    }

    sortByYearAscending(){
        return axios.get(CAR_API_BASE_URL+"/sortByYearAsc")
    }

    sortByYearDescending(){
        return axios.get(CAR_API_BASE_URL+"/sortByYearDesc")
    }

    sortByKmAscending(){
        return axios.get(CAR_API_BASE_URL+"/sortByKmAsc")
    }

    sortByKmDescending(){
        return axios.get(CAR_API_BASE_URL+"/sortByKmDesc")
    }

    sortByNmAscending(){
        return axios.get(CAR_API_BASE_URL+"/sortByNmAsc")
    }

    sortByNmDescending(){
        return axios.get(CAR_API_BASE_URL+"/sortByNmDesc")
    }

    sortByCombustionAscending(){
        return axios.get(CAR_API_BASE_URL+"/sortByCombustionAsc")
    }

    sortByCombustionDescending(){
        return axios.get(CAR_API_BASE_URL+"/sortByCombustionDesc")
    }

    sortByEngineAscending(){
        return axios.get(CAR_API_BASE_URL+"/sortByEngineAsc")
    }

    sortByEngineDescending(){
        return axios.get(CAR_API_BASE_URL+"/sortByEngineDesc")
    }

    getCarsByStartDateAndEndDateAndRentPlaceAndEndDate(startDate, endDate){
        return axios.get(CAR_API_BASE_URL+"/getByStartDateAndEndDate",{ params: { startDate: startDate, endDate: endDate } })
    }

    getMostRentedCar(days){
        return axios.get(CAR_API_BASE_URL+"/mostRentedCar", { params: { days: days } })
    }

    getRentedCars(days){
        return axios.get(CAR_API_BASE_URL+"/getByLastDays", { params: { days: days } })
    }

    getMostRentedCarBrand(days){
        return axios.get(CAR_API_BASE_URL+"/mostRentedCarBrand", { params: { days: days } })
    }

    getRentedCarsBrand(days){
        return axios.get(CAR_API_BASE_URL+"/getByLastDaysBrand", { params: { days: days } })
    }

    getByBrandAndPetrol(brand,petrol){
        return axios.get(CAR_API_BASE_URL+"/getByBrandAndPetrol",{ params: { brand: brand, petrol: petrol } })
    }
    getByBrandAndNumberOfSeats(brand,numberOfSeats){
        return axios.get(CAR_API_BASE_URL+"/getByBrandAndNumberOfSeats",{ params: { brand: brand, numberOfSeats: numberOfSeats } })
    }

    getByOpened(){
        return axios.get(CAR_API_BASE_URL+"/getByOpened")
    }

getByBrandAndTransmission(brand, transmission){
    return axios.get(CAR_API_BASE_URL+"/getByBrandAndTransmission",{ params: { brand: brand, transmission: transmission } })
}

getByBrandAndCategory( brand, category){
    return axios.get(CAR_API_BASE_URL+"/getByBrandAndCategory",{ params: { brand: brand, category: category } })
}

getByBrandAndYear( brand, year){
    return axios.get(CAR_API_BASE_URL+"/getByBrandAndYear",{ params: { brand: brand, year: year } })
}

 getByPetrolAndNumberOfSeats(petrol, numberOfSeats){
    return axios.get(CAR_API_BASE_URL+"/getByPetrolAndNumberOfSeats",{ params: { petrol: petrol, numberOfSeats: numberOfSeats } })
 }

 getByPetrolAndTransmission(petrol, transmission){
    return axios.get(CAR_API_BASE_URL+"/getByPetrolAndTransmission",{ params: { petrol: petrol, transmission: transmission } })
 }

getByPetrolAndCategory(petrol, category){
    return axios.get(CAR_API_BASE_URL+"/getByPetrolAndCategory",{ params: { petrol: petrol, category: category } })
}

 getByPetrolAndYear(petrol, year){
    return axios.get(CAR_API_BASE_URL+"/getByPetrolAndYear",{ params: { petrol: petrol, year: year } })
 }

 getByNumberOfSeatsAndTransmission(numberOfSeats, transmission){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndTransmission",{ params: { numberOfSeats: numberOfSeats, transmission } })
 }

 getByNumberOfSeatsAndCategory(numberOfSeats, category){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndCategory",{ params: { numberOfSeats: numberOfSeats, category: category } })
 }

 getByNumberOfSeatsAndYear(numberOfSeats,year){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndYear",{ params: { numberOfSeats: numberOfSeats, year: year } })
 }

 getByTransmissionAndCategory(transmission, category){
    return axios.get(CAR_API_BASE_URL+"/getByTransmissionAndCategory",{ params: { transmission: transmission, category: category } })
 }

 getByTransmissionAndYear(transmission, year){
    return axios.get(CAR_API_BASE_URL+"/getByTransmissionAndYear",{ params: { transmission: transmission, year: year } })
 }

getByCategoryAndYear(category, year){
    return axios.get(CAR_API_BASE_URL+"/getByCategoryAndYear",{ params: { category: category, year: year } })
}

//6
 getByNumberOfSeatsAndBrandAndPetrolAndTransmissionAndCategoryAndYear(numberOfSeats,  brand, petrol, transmission, category, year){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndBrandAndPetrolAndTransmissionAndCategoryAndYear",{ params: { numberOfSeats: numberOfSeats, brand: brand, petrol: petrol, transmission: transmission, category: category, year:year } })
 }

//5
 getByNumberOfSeatsAndBrandAndPetrolAndTransmissionAndCategory(numberOfSeats,  brand, petrol, transmission, category){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndBrandAndPetrolAndTransmissionAndCategory",{ params: { numberOfSeats: numberOfSeats, brand: brand, petrol: petrol, transmission: transmission, category: category } })
 }

 getByNumberOfSeatsAndBrandAndPetrolAndTransmissionAndYear(numberOfSeats,  brand, petrol, transmission, year){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndBrandAndPetrolAndTransmissionAndYear",{ params: { numberOfSeats: numberOfSeats, brand: brand, petrol: petrol, transmission: transmission,  year:year } })
 }

 getByNumberOfSeatsAndBrandAndPetrolAndCategoryAndYear(numberOfSeats,  brand, petrol, category, year){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndBrandAndPetrolAndCategoryAndYear",{ params: { numberOfSeats: numberOfSeats, brand: brand, petrol: petrol, category: category, year:year } })
 }

 getByNumberOfSeatsAndBrandAndTransmissionAndCategoryAndYear(numberOfSeats,  brand, transmission, category, year){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndBrandAndTransmissionAndCategoryAndYear",{ params: { numberOfSeats: numberOfSeats, brand: brand,  transmission: transmission, category: category, year:year } })
 }

getByNumberOfSeatsAndTransmissionAndPetrolAndCategoryAndYear(numberOfSeats, petrol, transmission, category, year){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndTransmissionAndPetrolAndCategoryAndYear",{ params: { numberOfSeats: numberOfSeats,  petrol: petrol, transmission: transmission, category: category, year:year } })
}

 getByTransmissionAndBrandAndPetrolAndCategoryAndYear( brand, petrol, transmission, category, year){
    return axios.get(CAR_API_BASE_URL+"/getByTransmissionAndBrandAndPetrolAndCategoryAndYear",{ params: { brand: brand, petrol: petrol, transmission: transmission, category: category, year:year } })
 }

//3
 getByNumberOfSeatsAndBrandAndPetrol(numberOfSeats,  brand, petrol){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndBrandAndPetrol",{ params: { numberOfSeats: numberOfSeats, brand: brand, petrol: petrol } })
 }

 getByNumberOfSeatsAndBrandAndYear(numberOfSeats,  brand, year){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndBrandAndYear",{ params: { numberOfSeats: numberOfSeats, brand: brand,  year:year } })
 }

getByNumberOfSeatsAndBrandAndTransmission(numberOfSeats,  brand, transmission){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndBrandAndTransmission",{ params: { numberOfSeats: numberOfSeats, brand: brand, transmission: transmission } })
}

getByNumberOfSeatsAndBrandAndCategory(numberOfSeats,  brand, category){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndBrandAndCategory",{ params: { numberOfSeats: numberOfSeats, brand: brand, category: category} })
}

getByNumberOfSeatsAndPetrolAndYear(numberOfSeats, petrol,  year){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndPetrolAndYear",{ params: { numberOfSeats: numberOfSeats,  petrol: petrol,  year:year } })
}

getByNumberOfSeatsAndPetrolAndCategory(numberOfSeats, petrol,  category){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndPetrolAndCategory",{ params: { numberOfSeats: numberOfSeats,  petrol: petrol,  category: category } })
}

getByNumberOfSeatsAndPetrolAndTransmision(numberOfSeats,  petrol, transmission){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndPetrolAndTransmision",{ params: { numberOfSeats: numberOfSeats,  petrol: petrol, transmission: transmission } })
}

getByNumberOfSeatsAndYearAndTransmission(numberOfSeats, transmission,year){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndYearAndTransmission",{ params: { numberOfSeats: numberOfSeats,  transmission: transmission,  year:year } })
}
getByNumberOfSeatsAndYearAndCategory(numberOfSeats,category, year){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndYearAndCategory",{ params: { numberOfSeats: numberOfSeats,  category: category, year:year } })
}

getByNumberOfSeatsAndTransmissionAndCategory(numberOfSeats, transmission, category){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndTransmissionAndCategory",{ params: { numberOfSeats: numberOfSeats,  transmission: transmission, category: category } })
}


getByBrandAndPetrolAndYear( brand, petrol, year){
    return axios.get(CAR_API_BASE_URL+"/getByBrandAndPetrolAndYear",{ params: {  brand: brand, petrol: petrol, year:year } })
}

getByBrandAndPetrolTransmission( brand, petrol, transmission){
    return axios.get(CAR_API_BASE_URL+"/getByBrandAndPetrolAndTransmission",{ params: {  brand: brand, petrol: petrol, transmission: transmission } })
}

getByBrandAndPetrolAndCategory( brand, petrol, category){
    return axios.get(CAR_API_BASE_URL+"/getByBrandAndPetrolAndCategory",{ params: { brand: brand, petrol: petrol,  category: category } })
}

getByBrandAndYearAndTransmission( brand,transmission, year){
    return axios.get(CAR_API_BASE_URL+"/getByBrandAndYearAndTransmission",{ params: {  brand: brand, transmission: transmission,  year:year } })
}

getByBrandAndYearAndCategory( brand, category, year){
    return axios.get(CAR_API_BASE_URL+"/getByBrandAndYearAndCategory",{ params: {  brand: brand, category: category, year:year } })
}

getByBrandAndTransmissionAndCategory( brand, transmission, category){
    return axios.get(CAR_API_BASE_URL+"/getByBrandAndTransmissionAndCategory",{ params: {  brand: brand, transmission: transmission, category: category} })
}

getByPetrolAndYearAndTransmission( petrol, transmission, year){
    return axios.get(CAR_API_BASE_URL+"/getByPetrolAndYearAndTransmission",{ params: {  petrol: petrol, transmission: transmission,  year:year } })
}

getByPetrolAndYearAndCategory(petrol,category, year){
    return axios.get(CAR_API_BASE_URL+"/getByPetrolAndYearAndCategory",{ params: {  petrol: petrol, category: category, year:year } })
}

getByPetrolAndTransmissionAndCategory(petrol, transmission, category){
    return axios.get(CAR_API_BASE_URL+"/getByPetrolAndTransmissionAndCategory",{ params: { petrol: petrol, transmission: transmission, category: category } })
}

getByYearAndTransmissionAndCategory(transmission, category, year){
    return axios.get(CAR_API_BASE_URL+"/getByYearAndTransmissionAndCategory",{ params: { transmission: transmission, category: category, year:year } })
}

//4
getByNumberOfSeatsAndBrandAndPetrolAndYear(numberOfSeats,  brand, petrol, year){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndBrandAndPetrolAndYear",{ params: { numberOfSeats: numberOfSeats, brand: brand, petrol: petrol, year:year } })
}

getByNumberOfSeatsAndBrandAndPetrolAndTransmission(numberOfSeats,  brand, petrol, transmission){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndBrandAndPetrolAndTransmission",{ params: { numberOfSeats: numberOfSeats, brand: brand, petrol: petrol, transmission: transmission } })
}

getByNumberOfSeatsAndBrandAndPetrolAndCategory(numberOfSeats,  brand, petrol, category){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndBrandAndPetrolAndCategory",{ params: { numberOfSeats: numberOfSeats, brand: brand, petrol: petrol, category: category } })
}

getByNumberOfSeatsAndPetrolAndYearAndTransmission(numberOfSeats, petrol, transmission, year){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndPetrolAndYearAndTransmission",{ params: { numberOfSeats: numberOfSeats, petrol: petrol, transmission: transmission, year:year } })
}

getByNumberOfSeatsAndPetrolAndYearAndCategory(numberOfSeats, petrol, category, year){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndPetrolAndYearAndCategory",{ params: { numberOfSeats: numberOfSeats, petrol: petrol, category: category, year:year } })
}

getByNumberOfSeatsAndPetrolAndTransmissionAndCategory(numberOfSeats, petrol, transmission, category){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndPetrolAndTransmissionAndCategory",{ params: { numberOfSeats: numberOfSeats, petrol: petrol, transmission: transmission, category: category } })
}

getByNumberOfSeatsAndYearAndTransmissionAndCategory(numberOfSeats, transmission, category, year){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndYearAndTransmissionAndCategory",{ params: { numberOfSeats: numberOfSeats, transmission: transmission, category: category, year:year } })
}

getByNumberOfSeatsAndBrandAndTransmisionAndCategory(numberOfSeats,  brand, transmission, category){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndBrandAndTransmisionAndCategory",{ params: { numberOfSeats: numberOfSeats, brand: brand, transmission: transmission, category: category } })
}

getByNumberOfSeatsAndBrandAndYearAndCategory(numberOfSeats,  brand, category, year){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndBrandAndYearAndCategory",{ params: { numberOfSeats: numberOfSeats, brand: brand, category: category, year:year } })
}

getByNumberOfSeatsAndBrandAndYearAndTransmission(numberOfSeats,  brand, transmission, year){
    return axios.get(CAR_API_BASE_URL+"/getByNumberOfSeatsAndBrandAndYearAndTransmission",{ params: { numberOfSeats: numberOfSeats, brand: brand,transmission: transmission, year:year } })
}

getByBrandAndPetrolAndYearAndTransmission( brand, petrol, transmission, year){
    return axios.get(CAR_API_BASE_URL+"/getByBrandAndPetrolAndYearAndTransmission",{ params: { brand: brand, petrol: petrol, transmission: transmission, year:year } })
}

getByBrandAndYearAndTransmissionAndCategory( brand,transmission, category, year){
    return axios.get(CAR_API_BASE_URL+"/getByBrandAndYearAndTransmissionAndCategory",{ params: { brand: brand, transmission: transmission, category: category, year:year } })
}

getByBrandAndPetrolAndTransmissionAndCategory( brand, petrol, transmission, category){
    return axios.get(CAR_API_BASE_URL+"/getByBrandAndPetrolAndTransmissionAndCategory",{ params: { brand: brand, petrol: petrol, transmission: transmission, category: category } })
}

getByPetrolAndYearAndTransmissionAndCategory(petrol, transmission, category, year){
    return axios.get(CAR_API_BASE_URL+"/getByPetrolAndYearAndTransmissionAndCategory",{ params: { petrol: petrol, transmission: transmission, category: category, year: year } })
}


getByKeywordActive(keyword){
    return axios.get(CAR_API_BASE_URL + "/keywordActive", {params: {keyword: keyword}})
}

getByKeyword(keyword){
    return axios.get(CAR_API_BASE_URL + "/keyword", {params: {keyword: keyword}})
}

checkCar(car,start_date,end_date){
    return axios.get(CAR_API_BASE_URL+"/checkCar", )
}

getYears(){
    return axios.get(CAR_API_BASE_URL+"/years")
}
}
export default new CarService()