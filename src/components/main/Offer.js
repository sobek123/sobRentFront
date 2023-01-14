import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GTR from './images.jpg'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./Sport.css"
import { styled } from '@mui/material/styles';
import { FaCarAlt, FaCartPlus, FaChevronCircleUp, FaPlusCircle, FaSearch } from 'react-icons/fa';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Link, useNavigate} from 'react-router-dom';
import CarService from '../services/CarService';
import React, { useEffect, useState, useRef, useContext } from "react";
import { OrderModal } from './OrderModal';
import { AddCar } from '../car/AddCar';
import AuthService from '../services/AuthService';
import Select from 'react-select';
import { ShoppingCart } from './ShoppingCart';
import { Button } from '@mui/material';
import { ButtonBase, FormControl, InputAdornment, InputLabel, OutlinedInput, Pagination } from '@mui/material';
import usePagination from "./Pagination";
import { CustomTextFields } from './CustomTextFields';
import { MenuItem } from '@material-ui/core';
import { CustomRangeInput } from './CustomRangeInput';
import CartContext from '../../CartContext';
import UserService from '../services/UserService';
import { Footer } from './Footer';
import { CustomTextFieldsBrand } from './CustomTextFieldsBrand';


  const options = [
    { value: 'Moc rosnąco', label: 'Moc rosnąco' },
    { value: 'Moc malejąco', label: 'Moc malejąco' },
    { value: 'Moment obrotowy rosnąco', label: 'Moment obrotowy rosnąco' },
    { value: 'Moment obrotowy malejąco', label: 'Moment obrotowy malejąco' },
    { value: 'Spalanie rosnąco', label: 'Spalanie rosnąco' },
    { value: 'Spalanie malejąco', label: 'Spalanie malejąco' },
    { value: 'Pojemność silnika rosnąco', label: 'Pojemność silnika rosnąco' },
    { value: 'Pojemność silnika malejąco', label: 'Pojemność silnika malejąco' },
    { value: 'Kaucja rosnąco', label: 'Kaucja rosnąco' },
    { value: 'Kaucja malejąco', label: 'Kaucja malejąco' },
    { value: 'Rok produkcji rosnąco', label: 'Rok produkcji rosnąco' },
    { value: 'Rok produkcji malejąco', label: 'Rok produkcji malejąco' },
    { value: 'Liczba miejsc rosnąco', label: 'Liczba miejsc rosnąco' },
    { value: 'Liczba miejsc malejąco', label: 'Liczba miejsc malejąco' },
    
  ];
  
export function Offer(props){
  const [selectedOption, setSelectedOption] = useState('');
  const {id} = useContext(CartContext)
  const [currentUser, setCurrentUser] = useState(undefined);
  const [show,setShow] = useState(false)
  const [user,setUser] = useState(null)
  const [ob,setOb] = useState('')
 
  const {brand} = useContext(CartContext)
  const {numberOfSeats} = useContext(CartContext)
  const navigate = useNavigate()
  const scrollToTop = () => {
    ("h")
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  };
  const {offer,startDate,endDate,updateOffer,updateId} = useContext(CartContext)
 
  const content = "Aby dodać samochód do koszyka musisz się zalogować!"


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const user = await AuthService.getCurrentUser();
        ("u"+user)
        const response = await UserService.findByEmail(user.email)
        setUser(response.data);
        (user)
        user.roles.map(e => (e.name))
        ("Halo"+response.data)
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState(null);

  const [prize, setPrize] = useState([]);
  const [categories, setCategories] = useState([]);
  const [petrols, setPetrols] = useState([]);
  const [transmissions, setTransmissions] = useState([]);
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [years, setYears] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        (brand)
        const response = await CarService.getModelsByBrand(brand);
        setModels(response.data);
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, [brand]);

  

  useEffect(() => {
    const fetchData =  async () => {
      setLoading(true);
      try {
        if (selectedOption.value === "Moc rosnąco") {
          const response = await CarService.sortByKmAscending();
          setCars(response.data);
          _DATA = response.data
      } else if (selectedOption.value === "Moc malejąco") {
          const response = await CarService.sortByKmDescending();
          setCars(response.data);
          _DATA = response.data
          (response.data)
      } else if (selectedOption.value === "Moment obrotowy rosnąco") {
        const response = await CarService.sortByNmAscending();
        setCars(response.data);
        _DATA = response.data
        (response.data)
      } else if (selectedOption.value === "Moment obrotowy malejąco") {
        const response = await CarService.sortByNmDescending();
        setCars(response.data);
        _DATA = response.data
        (response.data)
      } else if (selectedOption.value === "Spalanie rosnąco") {
        const response = await CarService.sortByCombustionAscending();
        setCars(response.data);
        _DATA = response.data
        (response.data)
      } else if (selectedOption.value === "Spalanie malejąco") {
        const response = await CarService.sortByCombustionDescending();
        setCars(response.data);
        _DATA = response.data
        (response.data)}
      else if (selectedOption.value === "Pojemność silnika rosnąco") {
        const response = await CarService.sortByEngineAscending();
        setCars(response.data);
        _DATA = response.data
        (response.data)}
      else if (selectedOption.value === "Pojemność silnika malejąco") {
        const response = await CarService.sortByEngineDescending();
        setCars(response.data);
        _DATA = response.data
        (response.data)}
      else if (selectedOption.value === "Kaucja rosnąco") {
        const response = await CarService.sortByDepositAscending();
        setCars(response.data);
        _DATA = response.data
        (response.data)}
      else if (selectedOption.value === "Kaucja malejąco") {
        const response = await CarService.sortByDepositDescending();
        setCars(response.data);
        _DATA = response.data
        (response.data)}
      else if (selectedOption.value === "Rok produkcji rosnąco") {
        const response = await CarService.sortByYearAscending();
        setCars(response.data);
        _DATA = response.data
        (response.data)}
      else if (selectedOption.value === "Rok produkcji malejąco") {
        const response = await CarService.sortByYearDescending();
        setCars(response.data);
        _DATA = response.data
        (response.data)}
      else if (selectedOption.value === "Liczba miejsc rosnąco") {
        const response = await CarService.sortByNumberOfSeatsAscending();
        setCars(response.data);
        _DATA = response.data
        (response.data)}
      else if (selectedOption.value === "Liczba miejsc malejąco") {
        const response = await CarService.sortByNumberOfSeatsDescending();
        setCars(response.data);
        _DATA = response.data
        (response.data)}
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, [selectedOption]);

  ("KURA"+offer)
  const [force,setForce] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
       
        const response2 = await CarService.getCategories();
        setCategories(response2.data);
        const response3 = await CarService.getPetrols();
        setPetrols(response3.data);
        const response4 = await CarService.getTransmissions();
        setTransmissions(response4.data); 
        const response5 = await CarService.getBrands();
        setBrands(response5.data); 
        // (response.data)
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const fun =() => {
    setCars(offer)
    setFilteredData(offer)
  }

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      if (ob.brand != '' && ob.transmission == '' && ob.petrol == '' && ob.year == '' && ob.category == '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.brand === ob.brand)
        ("HALO"+response)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }else{
          setCars(response);
        _DATA = response
        }
      }
      else if (ob.brand == '' && ob.transmission != '' && ob.petrol == '' && ob.year == '' && ob.category == '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.transmission === ob.transmission)
      
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }else{
          setCars(response);
        _DATA = response
        }
      }else if (ob.brand == '' && ob.transmission == '' && ob.petrol != '' && ob.year == '' && ob.category == '' && ob.numberOfSeats == '') {
        const response = cars.filter(el => el.petrol === ob.petrol)

        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }else{
          setCars(response);
        _DATA = response
        }
      }else if (ob.brand == '' && ob.transmission == '' && ob.petrol == '' && ob.year != '' && ob.category == '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.year === ob.year)
        
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }else{
          setCars(response);
        _DATA = response
        }
      }else if (ob.brand == '' && ob.transmission == '' && ob.petrol == '' && ob.year == '' && ob.category == '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats)
        
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }else{
          setCars(response);
        _DATA = response
        }
      }else if (ob.brand == '' && ob.transmission == '' && ob.petrol == '' && ob.year == '' && ob.category != '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.category === ob.category)
        
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }else{
          setCars(response);
        _DATA = response
        }
      }
      else if (ob.brand != '' && ob.transmission != '' && ob.petrol == '' && ob.year == '' && ob.category == '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.brand === ob.brand).filter(el => el.transmission === ob.transmission)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }else{
          setCars(response);
        _DATA = response
        }
      }else if (ob.brand != '' && ob.transmission == '' && ob.petrol != '' && ob.year == '' && ob.category == '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.brand === ob.brand).filter(el => el.petrol === ob.petrol)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission == '' && ob.petrol == '' && ob.year == '' && ob.category == '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.brand === ob.brand).filter(el => el.numberOfSeats === ob.numberOfSeats)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission == '' && ob.petrol == '' && ob.year == '' && ob.category != '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.brand === ob.brand).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission == '' && ob.petrol == '' && ob.year != '' && ob.category == '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.brand === ob.brand).filter(el => el.year === ob.year)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission == '' && ob.petrol != '' && ob.year == '' && ob.category == '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.petrol === ob.petrol).filter(el => el.numberOfSeats === ob.numberOfSeats)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission != '' && ob.petrol != '' && ob.year == '' && ob.category == '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.petrol === ob.petrol).filter(el => el.transmission === ob.transmission)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission == '' && ob.petrol != '' && ob.year == '' && ob.category != '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.petrol === ob.petrol).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission == '' && ob.petrol != '' && ob.year != '' && ob.category == '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.petrol === ob.petrol).filter(el => el.year === ob.year)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission != '' && ob.petrol == '' && ob.year == '' && ob.category == '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.transmission === ob.transmission)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission == '' && ob.petrol == '' && ob.year == '' && ob.category != '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission == '' && ob.petrol == '' && ob.year != '' && ob.category == '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.year === ob.year)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission != '' && ob.petrol == '' && ob.year == '' && ob.category != '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.transmission === ob.transmission).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission != '' && ob.petrol == '' && ob.year != '' && ob.category == '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.transmission === ob.transmission).filter(el => el.year === ob.year)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission == '' && ob.petrol == '' && ob.year != '' && ob.category != '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.category === ob.category).filter(el => el.year === ob.year)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission != '' && ob.petrol != '' && ob.year != '' && ob.category != '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.petrol === ob.petrol).filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.brand === ob.brand).filter(el => el.transmission === ob.transmission).filter(el => el.category === ob.category).filter(el => el.year === ob.year)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission != '' && ob.petrol != '' && ob.year == '' && ob.category != '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.petrol === ob.petrol).filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.brand === ob.brand).filter(el => el.transmission === ob.transmission).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission != '' && ob.petrol != '' && ob.year != '' && ob.category == '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.petrol === ob.petrol).filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.brand === ob.brand).filter(el => el.transmission === ob.transmission).filter(el => el.year === ob.year)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission == '' && ob.petrol != '' && ob.year != '' && ob.category != '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.petrol === ob.petrol).filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.brand === ob.brand).filter(el => el.category === ob.category).filter(el => el.year === ob.year)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission != '' && ob.petrol == '' && ob.year != '' && ob.category != '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.transmission === ob.transmission).filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.brand === ob.brand).filter(el => el.category === ob.category).filter(el => el.year === ob.year)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission != '' && ob.petrol != '' && ob.year != '' && ob.category != '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.transmission === ob.transmission).filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.petrol === ob.petrol).filter(el => el.category === ob.category).filter(el => el.year === ob.year)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission != '' && ob.petrol != '' && ob.year != '' && ob.category != '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.transmission === ob.transmission).filter(el => el.brand === ob.brand).filter(el => el.petrol === ob.petrol).filter(el => el.category === ob.category).filter(el => el.year === ob.year)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission == '' && ob.petrol != '' && ob.year == '' && ob.category == '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.brand === ob.brand).filter(el => el.petrol === ob.petrol)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission == '' && ob.petrol == '' && ob.year != '' && ob.category == '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.brand === ob.brand).filter(el => el.year === ob.year)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission != '' && ob.petrol == '' && ob.year == '' && ob.category == '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.brand === ob.brand).filter(el => el.transmission === ob.transmission)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission == '' && ob.petrol == '' && ob.year == '' && ob.category != '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.brand === ob.brand).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission == '' && ob.petrol != '' && ob.year != '' && ob.category == '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.petrol === ob.petrol).filter(el => el.year === ob.year)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission == '' && ob.petrol != '' && ob.year == '' && ob.category != '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.petrol === ob.petrol).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission != '' && ob.petrol != '' && ob.year == '' && ob.category == '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.petrol === ob.petrol).filter(el => el.transmission === ob.transmission)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission != '' && ob.petrol == '' && ob.year != '' && ob.category == '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.year === ob.year).filter(el => el.transmission === ob.transmission)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission == '' && ob.petrol == '' && ob.year != '' && ob.category != '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.year === ob.year).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission != '' && ob.petrol == '' && ob.year == '' && ob.category != '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.transmission === ob.transmission).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission == '' && ob.petrol != '' && ob.year != '' && ob.category == '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.petrol === ob.petrol).filter(el => el.year === ob.year).filter(el => el.brand === ob.brand)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission != '' && ob.petrol != '' && ob.year == '' && ob.category == '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.petrol === ob.petrol).filter(el => el.transmission === ob.transmission).filter(el => el.brand === ob.brand)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission == '' && ob.petrol != '' && ob.year == '' && ob.category != '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.petrol === ob.petrol).filter(el => el.category === ob.category).filter(el => el.brand === ob.brand)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission != '' && ob.petrol == '' && ob.year != '' && ob.category == '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.year === ob.year).filter(el => el.transmission === ob.transmission).filter(el => el.brand === ob.brand)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission == '' && ob.petrol == '' && ob.year != '' && ob.category != '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.year === ob.year).filter(el => el.category === ob.category).filter(el => el.brand === ob.brand)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission != '' && ob.petrol == '' && ob.year == '' && ob.category != '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.transmission === ob.transmission).filter(el => el.category === ob.category).filter(el => el.brand === ob.brand)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission != '' && ob.petrol != '' && ob.year != '' && ob.category == '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.transmission === ob.transmission).filter(el => el.year === ob.year).filter(el => el.petrol === ob.petrol)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission == '' && ob.petrol != '' && ob.year != '' && ob.category != '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.category === ob.category).filter(el => el.year === ob.year).filter(el => el.petrol === ob.petrol)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission != '' && ob.petrol != '' && ob.year == '' && ob.category != '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.category === ob.category).filter(el => el.transmission === ob.transmission).filter(el => el.petrol === ob.petrol)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission != '' && ob.petrol == '' && ob.year != '' && ob.category != '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.category === ob.category).filter(el => el.transmission === ob.transmission).filter(el => el.year === ob.year)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission == '' && ob.petrol != '' && ob.year != '' && ob.category == '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.petrol === ob.petrol).filter(el => el.brand === ob.brand).filter(el => el.year === ob.year)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission != '' && ob.petrol != '' && ob.year == '' && ob.category == '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.petrol === ob.petrol).filter(el => el.brand === ob.brand).filter(el => el.transmission === ob.transmission)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission == '' && ob.petrol != '' && ob.year == '' && ob.category != '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.petrol === ob.petrol).filter(el => el.brand === ob.brand).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission != '' && ob.petrol != '' && ob.year != '' && ob.category == '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.petrol === ob.petrol).filter(el => el.year === ob.year).filter(el => el.transmission === ob.transmission)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission == '' && ob.petrol != '' && ob.year != '' && ob.category != '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.petrol === ob.petrol).filter(el => el.year === ob.year).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission != '' && ob.petrol != '' && ob.year == '' && ob.category != '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.petrol === ob.petrol).filter(el => el.transmission === ob.transmission).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission != '' && ob.petrol == '' && ob.year != '' && ob.category != '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.year === ob.year).filter(el => el.transmission === ob.transmission).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission != '' && ob.petrol == '' && ob.year == '' && ob.category != '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.brand === ob.brand).filter(el => el.transmission === ob.transmission).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission == '' && ob.petrol == '' && ob.year != '' && ob.category != '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.brand === ob.brand).filter(el => el.year === ob.year).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission != '' && ob.petrol == '' && ob.year != '' && ob.category == '' && ob.numberOfSeats != 0) {
        const response = cars.filter(el => el.numberOfSeats === ob.numberOfSeats).filter(el => el.brand === ob.brand).filter(el => el.year === ob.year).filter(el => el.transmission === ob.transmission)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission != '' && ob.petrol != '' && ob.year != '' && ob.category == '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.year === ob.year).filter(el => el.brand === ob.brand).filter(el => el.petrol === ob.petrol).filter(el => el.transmission === ob.transmission)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission == '' && ob.petrol != '' && ob.year != '' && ob.category != '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.year === ob.year).filter(el => el.brand === ob.brand).filter(el => el.petrol === ob.petrol).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission != '' && ob.petrol == '' && ob.year != '' && ob.category != '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.year === ob.year).filter(el => el.brand === ob.brand).filter(el => el.transmission === ob.transmission).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand != '' && ob.transmission != '' && ob.petrol != '' && ob.year == '' && ob.category != '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.petrol === ob.petrol).filter(el => el.brand === ob.brand).filter(el => el.transmission === ob.transmission).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
          setCars(response);
          _DATA = response
          (response)}}
      else if (ob.brand == '' && ob.transmission != '' && ob.petrol != '' && ob.year != '' && ob.category != '' && ob.numberOfSeats == 0) {
        const response = cars.filter(el => el.petrol === ob.petrol).filter(el => el.year === ob.year).filter(el => el.transmission === ob.transmission).filter(el => el.category === ob.category)
        if(ob.model !== ''){
          setCars(response.filter(el => el.model === ob.model))
          _DATA = response.filter(el => el.model === ob.model)
        }
        else{
        setCars(response);
        _DATA = response
        (response)}}
        else if (ob.brand == '' && ob.transmission == '' && ob.petrol == '' && ob.year == '' && ob.category == '' && ob.numberOfSeats == 0) {
          setCars(offer);
          _DATA = offer
        }
    } catch (error) {
      (error);
    }

    setLoading(false);
  };
  fetchData();
}, [ob]);

  const rent = (prize,car) => {
    setModalShow(true)
    setPrize(prize)
    setCar(car)
    const fil = cars.filter(el => el.id !== car.id)
    (fil)
    // updateOffer(fil,startDate,endDate)
    setCars(fil)
    setFilteredData(fil)
    _DATA = fil
  };

  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(cars.length / PER_PAGE);
  var _DATA = usePagination(cars, PER_PAGE);

  
  const handleChange2 = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState(null);
  const [model,setModel] = useState("")
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    // const newFilter = users.filter((value) => {
    //   return value.name.toLowerCase().includes(searchWord.toLowerCase());
    // });

    if (searchWord === "") {
      setFilteredData(offer);
      _DATA = filteredData
    }
    // } else {
    //   setFilteredData(newFilter);
    // }
  };

  const {updateBrand} = useContext(CartContext)
  const [initialCars, setInitialCars] = useState([])

  const reset = () => {
    
    setCars(initialCars);
    (initialCars)
    _DATA = initialCars
    updateBrand('')
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        
        _DATA = offer
        setInitialCars(offer)
        setCars(offer)
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, [force]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        (id)
        if(id != null){
          CarService.getCarsByStartDateAndEndDateAndRentPlaceAndEndDate(startDate, endDate)
          .then((response) => {
            const fil = response.data.filter(el => el.id !== id)
          setCars(fil)
          _DATA = fil
          // updateOffer(cars)
          navigate("/oferta")
          //  setShow(true)
    
          })
          .catch((error) => {
          (error);
          });
          // setCars(props.cars)
          // _DATA = props.cars
          
        }else{
          CarService.getCarsByStartDateAndEndDateAndRentPlaceAndEndDate(startDate, endDate)
          .then((response) => {
          setCars(response.data)
          _DATA = response.data
          setInitialCars(offer)
          // updateOffer(cars)
          navigate("/oferta")
          //  setShow(true)
    
          })
          .catch((error) => {
          (error);
          });
        }
        // _DATA = offer
        // setInitialCars(offer)
        // setCars(offer)
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const clearInput = () => {
    setFilteredData(cars);
    setWordEntered("");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await CarService.getByKeyword(wordEntered)

        setCars(response.data)
        setFilteredData(response.data)
        _DATA = response.data

        (response.data)
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, [wordEntered]);

  const [expandedId, setExpandedId] = React.useState(-1);
  
  // _DATA = props.cars
    return <div style={{marginTop:80}}>
      <hr></hr>
        <h4>Oferta</h4>
        <hr></hr>
        
        <Card style={{borderRadius: 15}}>
        <CardContent>
            <div style={{width: '20%', display: 'inline-block'}}>
            <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder="Wybierz opcję sortowania"
        />
        </div>
        <FormControl sx={{ m: 1, width: '25ch' }} style={{marginTop: 0}}variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" style={{textAlign:'center', marginTop: -7}}>Szukaj</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={wordEntered}
            onChange={handleFilter}
            endAdornment={
              <InputAdornment position="end"><FaSearch></FaSearch>
              </InputAdornment>
            }
            label="Szukaj"
            style={{height:38, textAlign: 'center'}}
          />
        </FormControl>
        
            <Formik
                initialValues={{
                  brand: '',
                  model: '',
                  petrol: '',
                  transmission: '',
                  category: '',
                  year: '',
                  numberOfSeats: 0}}
                validationSchema={Yup.object().shape({
                    year: Yup.number(),
                    numberOfSeats: Yup.number(),
                    model: Yup.string(),
                    brand: Yup.string(),
                    petrol: Yup.string(),
                    transmission: Yup.string(),
                    category: Yup.string(),
                })}
                onSubmit={
                  fields => {
                    (fields)
                    setOb(fields)
                  }
                }
                render={({ errors, status, touched }) => (
                  <div className="row" style={{display: 'flex'}}>
                    <Form style={{marginTop:20}} >
                        <div className="column" >
                            <div className="form-group" style={{width: '23%', display: 'inline-block'}}>
                                {/* <label htmlFor="brand">Marka</label> */}
                                {/* <Field name="brand" as="select" className={'form-control' + (errors.brand && touched.brand ? ' is-invalid' : '')} onKeyUp={handleChange}>
                                {brands.map(brand => {
                                    return (
                                        <option key={brand.id}>{brand}</option>
                                    )
                                })}
                                </Field> */}
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Marka</InputLabel>
                                    <Field name="brand" component={CustomTextFieldsBrand} >
                                    <MenuItem value=''>-------</MenuItem>
                                      {brands.map(brand => {
                                        return <MenuItem value={brand}>{brand}</MenuItem>
                                      })}
                                      
                                    </Field>
                                </FormControl>                            
                              </div>      
                            <div className="form-group" style={{width: '23%', display: 'inline-block', marginLeft: 10}}>
                                {/* <label htmlFor="model">Model</label> */}
                                {/* <Field name="model" as="select" className={'form-control' + (errors.model && touched.model ? ' is-invalid' : '')} >
                                {models.map(model => {
                                    return (
                                        <option key={model.id}>{model}</option>
                                    )
                                })}
                                </Field> */}
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Model</InputLabel>
                                    <Field name="model" component={CustomTextFields}>
                                    <MenuItem value=''>-------</MenuItem>
                                      {models.map(model => {
                                        return <MenuItem value={model}>{model}</MenuItem>
                                      })}
                                      
                                    </Field>
                                </FormControl>
                            </div>
                            <div className="form-group" style={{width: '23%', display: 'inline-block', marginLeft: 10}}>
                                {/* <label htmlFor="petrol">Rodzaj paliwa</label> */}
                                {/* <Field name="petrol" component={CustomTextFields}  className={'form-control' + (errors.petrol && touched.petrol ? ' is-invalid' : '')}>
                                {/* {petrols.map(petrol => {
                                  return (
                                      <option key={petrol.id}>{petrol}</option>
                                  )
                                })} */}
                                {/* </Field>   */}
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Rodzaj paliwa</InputLabel>
                                    <Field name="petrol" component={CustomTextFields}>
                                    <MenuItem value=''>-------</MenuItem>
                                      {petrols.map(petrol => {
                                        return <MenuItem value={petrol}>{petrol}</MenuItem>
                                      })}
                                      
                                    </Field>
                                </FormControl>
                            </div>
                            <div className="form-group" style={{width: '23%', display: 'inline-block', marginLeft: 10}}>
                                {/* <label htmlFor="year">Rok produkcji</label> */}
                                {/* <Field name="year" as="select" className={'form-control' + (errors.year && touched.year ? ' is-invalid' : '')} >
                                {years.map(year => {
                                    return (
                                        <option key={year.id}>{year}</option>
                                    )
                                })}
                                </Field> */}
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Rok produkcji</InputLabel>
                                    <Field name="year" component={CustomTextFields}>
                                    <MenuItem value=''>-------</MenuItem>
                                      {years.map(year => {
                                        return <MenuItem value={year}>{year}</MenuItem>
                                      })}
                                    </Field>
                                </FormControl>
                            </div>
                            <div className="form-group" style={{width: '23%', display: 'inline-block',marginTop: 20}}>
                                {/* <label htmlFor="transmission">Skrzynia biegów</label> */}
                                {/* <Field name="transmission" as="select" className={'form-control' + (errors.transmission && touched.transmission ? ' is-invalid' : '')}>
                                {transmissions.map(transmission => {
                                    return (
                                        <option key={transmission.id}>{transmission}</option>
                                    )
                                })}
                                </Field>  */}
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Skrzynia biegów</InputLabel>
                                    <Field name="transmission" component={CustomTextFields}>
                                    <MenuItem value=''>-------</MenuItem>
                                      {transmissions.map(transmission => {
                                        return <MenuItem value={transmission}>{transmission}</MenuItem>
                                      })}
                                      
                                    </Field>
                                </FormControl>
                            </div>      
                            <div className="form-group" style={{width: '23%', display: 'inline-block', marginLeft: 10,marginTop: 20}}>
                                {/* <label htmlFor="category">Kategoria</label> */}
                                {/* <Field name="category" as="select" className={'form-control' + (errors.category && touched.category ? ' is-invalid' : '')} > */}
                                {/* {categories.map(category => {
                                    return (
                                        <option key={category.id}>{category}</option>
                                    )
                                })}
                                </Field> */}
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Kategoria</InputLabel>
                                    <Field name="category" component={CustomTextFields}>
                                    <MenuItem value=''>-------</MenuItem>
                                      {categories.map(category => {
                                        return <MenuItem value={category}>{category}</MenuItem>
                                      })}
                                      
                                    </Field>
                                </FormControl>
                            </div>
                            <div className="form-group" style={{width: '23%', marginLeft: 610,marginTop: -60,float:'left'}}>
                                {/* <label htmlFor="numberOfSeats">Liczba miejsc</label> */}
                                {/* <Field name="numberOfSeats" type="range" className={'form-control' + (errors.numberOfSeats && touched.numberOfSeats ? ' is-invalid' : '')} min="2" max="5"/> */}
                                    <Field name="numberOfSeats" id="numberOfSeats" component={CustomRangeInput} ></Field>
                            </div>        
                            
                            <Button type = "submit" style={{ display: 'inline-block', marginLeft: 10,float:'left', marginTop: -47, color:'blue'}}>Szukaj</Button>
                            <Button type="reset" onClick = {reset} style={{ display: 'inline-block', marginLeft: 400, marginTop: 27, color:'black'}}>Wyczyść</Button>

                        </div>
                    </Form>
                    </div>
                )}
            /> 
           
              </CardContent>
            </Card>  
            <br></br>
            
            <Pagination
        count={count}
        page={page}
        variant="outlined" color="primary"
        onChange={handleChange2}
      />
          {user === null ? <h4 id="ad" style={{marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}} >{content}</h4> : '' }
            
            <div>{ cars.length == 0 ? <h4 style={{textAlign :'center', marginTop: 200}}>Brak wyników odpowiadających wybranym kryteriom</h4> : 
        <div className='grid-container'>

        {_DATA.currentData().map((car,index) => {
      
       return (
       
        <Card id={"card"+index} style={{ maxWidth: 400 ,borderRadius:15 }} key={car.id}>
          <CardMedia
            component="img"
            height="250"
            image={require(''+car.image)}
            alt={<span>{car.brand} {car.model}</span>}
            style={{borderBottomLeftRadius:15, borderBottomRightRadius:15}}
          ></CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <b>{car.brand} {car.model}</b> 
            </Typography>
            <Typography variant="p" color="text.secondary">
             {car.category}
            </Typography>
          </CardContent>
            <CardContent>
            <Typography paragraph><h4>Specyfikacja</h4></Typography>
              <h6 style={{display: 'inline-block'}}><b>Rodzaj paliwa</b></h6> <span style={{dispaly: 'inline-block'}}>  {car.petrol}</span>
              <br></br>
              <h6 style={{display: 'inline-block'}}><b>Moc</b></h6>    {car.km}KM
              <br></br>
              <h6 style={{display: 'inline-block'}}><b>Moment obrotowy:</b></h6>   {car.nm}NM
              <br></br>
              <h6 style={{display: 'inline-block'}}><b>Spalanie w mieście</b></h6>   {car.combustion}l/100km
              <br></br>
              <h6 style={{display: 'inline-block'}}><b>Pojemność silnika</b></h6>   {car.engine}l
              <br></br>
              <h6 style={{display: 'inline-block'}}><b>Skrzynia biegów</b></h6>   {car.transmission}
              <br></br>
              <h6 style={{display: 'inline-block'}}><b>Rok produkcji</b></h6>   {car.year}r.
              <br></br>
              <h6 style={{display: 'inline-block'}}><b>Cena (zł)</b></h6>
              <div style={{marginLeft: '-16px'}}>
              <table className="table" style={{width: '55%', position: 'relative', marginLeft:8}}>
                <thead>
                  <tr>
                    <th>1</th>
                    <th>2-3</th>
                    <th>4-9</th>
                    <th>10-16</th>
                    <th>17-29</th>
                    <th>{'>'}29</th>
                    <th>Kaucja</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  <td>{car.price.firstPeriod}</td> 
                  <td>{car.price.secondPeriod}</td>
                  <td>{car.price.thirdPeriod}</td>
                  <td><span style={{color: 'white'}}>g</span>{car.price.fourthPeriod}</td>
                  <td><span style={{color: 'white'}}>g</span>{car.price.fifthPeriod}</td>
                  <td><span>{car.price.sixthPeriod}</span> </td>
                  <td>{car.price.deposit}</td>
                  </tr>
                </tbody>
              </table>
              </div>
              <h6 style={{display: 'inline-block'}}><b>Liczba miejsc</b></h6>  {car.numberOfSeats}
              <br></br>   
              <h6 style={{display: 'inline-block'}}><b>Wyposażenie   </b></h6>  {car.details}
              <br></br>
             <h6 style={{display: 'inline-block'}}><b>Punkty  </b><FaCarAlt style={{marginTop:-3, marginRight:2}}size={20}></FaCarAlt>{car.points}</h6>
            </CardContent>
            <div id="buttons">
            <CardActions>
              {user === null   ? '' : <Button id={"rentButton"+car.id}  style = {{marginLeft:'auto', marginRight: 'auto'}} onClick={() => rent(car.price, car)}><FaCartPlus size={21} style={{marginTop:-4}}></FaCartPlus><span style={{marginLeft: 3}}>Dodaj</span></Button> }
            </CardActions>
            </div>
        </Card>
       )}
    )}
    <OrderModal show={modalShow} onHide={() => {
      ("IDKURWO"+id)
    //    if(cars.length !== offer.length){
    //     ("wszedlem")
    //      const fil = cars.filter(el => el.id !== id)
    //    setCars(offer)
    //    _DATA = offer
    // //  updateOffer(cars)
     

     
      
    //  }else{
    //   (offer)
    //    setCars(offer)
    //    _DATA = offer
    // //  updateOffer(cars)
      

      
    // }
    fun()

    // updateId(null)
    setModalShow(false)
  }

    
   }
  
       prize={prize} car={car} />
    
    </div>
    
    }
    <br></br>
    <h6 style={cars.length == 0 ? {marginleft: 'auto', marginRight: 'auto', textAlign:'center'} : {}}>Jeżeli chcesz, żeby samochód, którego nie ma na liście pojawił się w naszej wypożyczalni to daj nam o tym znać <Link to="/kontakt">tutaj</Link>.</h6>

    <div ><FaChevronCircleUp size={50} onClick={scrollToTop} style={{marginLeft: 1300,marginBottom: 50}}></FaChevronCircleUp></div></div>
    <Footer></Footer>
    </div>
    
}