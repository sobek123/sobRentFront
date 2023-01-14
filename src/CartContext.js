import { createContext, useState } from "react";
import { Cars } from "./components/main/Cars";
import CarService from "./components/services/CarService";

const CartContext = createContext();

export function CartProvider({children}){
    const [items,setItems] = useState([])
    const [additionalss,setAdditionalss] = useState([])
    const [ca,setCa] = useState('')
    const [brand,setBrand] = useState('')
    const [numberOfSeats,setNumberOfSeats]=useState('')
    const [offer,setOffer] = useState([])
    const [startDate,setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [id,setId] = useState(null)
    
    const updateCars = (cars) => {
        setOffer(cars)
    }

    const updateId = (id) => {
        ("CART"+id)
        setId(id)
    }

    const addToCart = (order) => {
        setItems((prevState) => [...prevState, order])
    }

    const sCa = (ca) => {
        setCa(ca)
    }

    const updateOffer = (cars, start,end) => {
        (cars)
        setOffer(cars)
        (offer)
        setStartDate(start)
        setEndDate(end)
    }

    const updateAdditionals = (additionalss) => {
        ("cart"+additionalss)
        setAdditionalss(additionalss)
    }
    
    const updateBrand = (brand) => {
        setBrand(brand)
    }

    const updateNumberOfSeats = (numberOfSeats) => {
        setNumberOfSeats(numberOfSeats)
    }

    const deleteFromCart = (idd) => {
        ("id"+idd)
        ("Oferta"+offer)
        setItems(items.filter(item => {return item.car.id != idd}))
        (offer.filter(i => {return i.id !== idd}))
        CarService.getCarById(idd).then(response => offer.unshift(response.data))
        (offer)
        
        // setOffer()
        ("Ofertapo"+offer)

    }

    const deleteItems = () => {
        setItems([])
    }

    return (
        <CartContext.Provider value={{deleteItems,updateCars,offer,updateOffer,items,addToCart,deleteFromCart,additionalss,updateAdditionals,ca,sCa,brand,updateBrand,numberOfSeats,updateNumberOfSeats,startDate,endDate, updateId, id}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;