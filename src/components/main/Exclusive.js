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
import {Link} from 'react-router-dom';
import CarService from '../services/CarService';
import React, { useEffect, useState, useRef } from "react";
import { OrderModal } from './OrderModal';
import { AddCar } from '../car/AddCar';
import AuthService from '../services/AuthService';
import Select from 'react-select';
import { ShoppingCart } from './ShoppingCart';
import { Button } from '@mui/material';
import { FormControl, InputAdornment, InputLabel, OutlinedInput, Pagination } from '@mui/material';
import usePagination from "./Pagination";
import { CustomTextFields } from './CustomTextFields';
import { MenuItem } from '@material-ui/core';
import { CustomRangeInput } from './CustomRangeInput';
import { useContext } from 'react';
import CartContext from '../../CartContext';
import { CustomTextFieldsBrand } from './CustomTextFieldsBrand';
import UserService from '../services/UserService';
import {Footer} from './Footer'



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
  
export function Exclusive(){
  const [selectedOption, setSelectedOption] = useState('');
  const [currentUser, setCurrentUser] = useState(undefined);
  const [show,setShow] = useState(false)
  // const [brand, setBrand] = useState("")
  const [expanded, setExpanded] = useState(false);
  const [ob,setOb] = useState('')

  const expands = []
  
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  };

  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState(null);
  const {brand} = useContext(CartContext)
  const {numberOfSeats} = useContext(CartContext)
  const [initialCars, setInitialCars] = useState([])


  const [prize, setPrize] = useState([]);
  const [categories, setCategories] = useState([]);
  const [petrols, setPetrols] = useState([]);
  const [transmissions, setTransmissions] = useState([]);
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [years, setYears] = useState([]);

  const [id,setId] = useState('')
  const [user,setUser] = useState(null)

 
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
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        (brand)
        const response = await CarService.getModelsByBrand(brand,'EKSKLUZYWNE');
        setModels(response.data);
        ("m"+response.data)
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
          setCars(response.data.filter(el => el.category === 'EKSKLUZYWNE'));
          _DATA = response.data.filter(el => el.category === 'EKSKLUZYWNE')
      } else if (selectedOption.value === "Moc malejąco") {
          const response = await CarService.sortByKmDescending();
          setCars(response.data.filter(el => el.category === 'EKSKLUZYWNE'));
          _DATA = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          
      } else if (selectedOption.value === "Moment obrotowy rosnąco") {
        const response = await CarService.sortByNmAscending();
        setCars(response.data.filter(el => el.category === 'EKSKLUZYWNE'));
        _DATA = response.data.filter(el => el.category === 'EKSKLUZYWNE')
        
      } else if (selectedOption.value === "Moment obrotowy malejąco") {
        const response = await CarService.sortByNmDescending();
        setCars(response.data.filter(el => el.category === 'EKSKLUZYWNE'));
        _DATA = response.data.filter(el => el.category === 'EKSKLUZYWNE')
        
      } else if (selectedOption.value === "Spalanie rosnąco") {
        const response = await CarService.sortByCombustionAscending();
        setCars(response.data.filter(el => el.category === 'EKSKLUZYWNE'));
        _DATA = response.data.filter(el => el.category === 'EKSKLUZYWNE')
        
      } else if (selectedOption.value === "Spalanie malejąco") {
        const response = await CarService.sortByCombustionDescending();
        setCars(response.data.filter(el => el.category === 'EKSKLUZYWNE'));
        _DATA = response.data.filter(el => el.category === 'EKSKLUZYWNE')
        }
      else if (selectedOption.value === "Pojemność silnika rosnąco") {
        const response = await CarService.sortByEngineAscending();
        setCars(response.data.filter(el => el.category === 'EKSKLUZYWNE'));
        _DATA = response.data.filter(el => el.category === 'EKSKLUZYWNE')
        }
      else if (selectedOption.value === "Pojemność silnika malejąco") {
        const response = await CarService.sortByEngineDescending();
        setCars(response.data.filter(el => el.category === 'EKSKLUZYWNE'));
        _DATA = response.data.filter(el => el.category === 'EKSKLUZYWNE')
        }
      else if (selectedOption.value === "Kaucja rosnąco") {
        const response = await CarService.sortByDepositAscending();
        setCars(response.data.filter(el => el.category === 'EKSKLUZYWNE'));
        _DATA = response.data.filter(el => el.category === 'EKSKLUZYWNE')
        }
      else if (selectedOption.value === "Kaucja malejąco") {
        const response = await CarService.sortByDepositDescending();
        setCars(response.data.filter(el => el.category === 'EKSKLUZYWNE'));
        _DATA = response.data.filter(el => el.category === 'EKSKLUZYWNE')
        }
      else if (selectedOption.value === "Rok produkcji rosnąco") {
        const response = await CarService.sortByYearAscending();
        setCars(response.data.filter(el => el.category === 'EKSKLUZYWNE'));
        _DATA = response.data.filter(el => el.category === 'EKSKLUZYWNE')
        }
      else if (selectedOption.value === "Rok produkcji malejąco") {
        const response = await CarService.sortByYearDescending();
        setCars(response.data.filter(el => el.category === 'EKSKLUZYWNE'));
        _DATA = response.data.filter(el => el.category === 'EKSKLUZYWNE')
        }
      else if (selectedOption.value === "Liczba miejsc rosnąco") {
        const response = await CarService.sortByNumberOfSeatsAscending();
        setCars(response.data.filter(el => el.category === 'EKSKLUZYWNE'));
        _DATA = response.data.filter(el => el.category === 'EKSKLUZYWNE')
        }
      else if (selectedOption.value === "Liczba miejsc malejąco") {
        const response = await CarService.sortByNumberOfSeatsDescending();
        setCars(response.data.filter(el => el.category === 'EKSKLUZYWNE'));
        _DATA = response.data.filter(el => el.category === 'EKSKLUZYWNE')
        }
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, [selectedOption]);

  ("Mo"+models)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await CarService.getCarsExclusive();
        setCars(response.data);
        setInitialCars(response.data)
        const response2 = await CarService.getCategories();
        setCategories(response2.data);
        const response3 = await CarService.getPetrols();
        setPetrols(response3.data);
        const response4 = await CarService.getTransmissions();
        setTransmissions(response4.data); 
        const response5 = await CarService.getBrands();
        setBrands(response5.data); 
        const response6 = await CarService.getYears();
        setYears(response6.data); 
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);


if(cars != null){
    for(let i = 0;i < cars.length; i++){
      expands[cars[i].id] = false;
    }
  }



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (ob.brand != '' && ob.transmission == '' && ob.petrol == '' && ob.year == '' && ob.category == '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByBrand(ob.brand)
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
        }
        else if (ob.brand == '' && ob.transmission != '' && ob.petrol == '' && ob.year == '' && ob.category == '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByTransmission(ob.transmission)
        
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
        }else if (ob.brand == '' && ob.transmission == '' && ob.petrol != '' && ob.year == '' && ob.category == '' && ob.numberOfSeats == '') {
          const response = await CarService.getByPetrol(ob.petrol)
          ("Halo")
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
        }else if (ob.brand == '' && ob.transmission == '' && ob.petrol == '' && ob.year != '' && ob.category == '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByYear(ob.year)
          
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
        }else if (ob.brand == '' && ob.transmission == '' && ob.petrol == '' && ob.year == '' && ob.category == '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeats(ob.numberOfSeats)
          
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
        }
        else if (ob.brand != '' && ob.transmission != '' && ob.petrol == '' && ob.year == '' && ob.category == '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByBrandAndTransmission(ob.brand,ob.transmission)
    
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }else if (ob.brand != '' && ob.transmission == '' && ob.petrol != '' && ob.year == '' && ob.category == '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByBrandAndPetrol(ob.brand,ob.petrol);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission == '' && ob.petrol == '' && ob.year == '' && ob.category == '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByBrandAndNumberOfSeats(ob.brand,ob.numberOfSeats);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission == '' && ob.petrol == '' && ob.year == '' && ob.category != '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByBrandAndCategory(ob.brand, ob.category);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission == '' && ob.petrol == '' && ob.year != '' && ob.category == '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByBrandAndYear(ob.brand, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission == '' && ob.petrol != '' && ob.year == '' && ob.category == '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByPetrolAndNumberOfSeats(ob.petrol, ob.numberOfSeats);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission != '' && ob.petrol != '' && ob.year == '' && ob.category == '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByPetrolAndTransmission(ob.petrol, ob.transmission);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission == '' && ob.petrol != '' && ob.year == '' && ob.category != '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByPetrolAndCategory(ob.petrol, ob.category);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission == '' && ob.petrol != '' && ob.year != '' && ob.category == '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByPetrolAndYear(ob.petrol, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission != '' && ob.petrol == '' && ob.year == '' && ob.category == '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndTransmission(ob.numberOfSeats, ob.transmission);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission == '' && ob.petrol == '' && ob.year == '' && ob.category != '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndCategory(ob.numberOfSeats, ob.category);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission == '' && ob.petrol == '' && ob.year != '' && ob.category == '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndYear(ob.numberOfSeats,ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission != '' && ob.petrol == '' && ob.year == '' && ob.category != '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByTransmissionAndCategory(ob.transmission, ob.category);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission != '' && ob.petrol == '' && ob.year != '' && ob.category == '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByTransmissionAndYear(ob.transmission, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission == '' && ob.petrol == '' && ob.year != '' && ob.category != '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByCategoryAndYear(ob.category, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission != '' && ob.petrol != '' && ob.year != '' && ob.category != '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndBrandAndPetrolAndTransmissionAndCategoryAndYear(ob.numberOfSeats,  ob.brand, ob.petrol, ob.transmission, ob.category, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission != '' && ob.petrol != '' && ob.year == '' && ob.category != '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndBrandAndPetrolAndTransmissionAndCategory(ob.numberOfSeats,  ob.brand, ob.petrol, ob.transmission, ob.category);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission != '' && ob.petrol != '' && ob.year != '' && ob.category == '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndBrandAndPetrolAndTransmissionAndYear(ob.numberOfSeats,  ob.brand, ob.petrol, ob.transmission, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission == '' && ob.petrol != '' && ob.year != '' && ob.category != '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndBrandAndPetrolAndCategoryAndYear(ob.numberOfSeats,  ob.brand, ob.petrol, ob.category, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission != '' && ob.petrol == '' && ob.year != '' && ob.category != '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndBrandAndTransmissionAndCategoryAndYear(ob.numberOfSeats,  ob.brand, ob.transmission, ob.category, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission != '' && ob.petrol != '' && ob.year != '' && ob.category != '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndTransmissionAndPetrolAndCategoryAndYear(ob.numberOfSeats, ob.petrol, ob.transmission, ob.category, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission != '' && ob.petrol != '' && ob.year != '' && ob.category != '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByTransmissionAndBrandAndPetrolAndCategoryAndYear(ob.brand, ob.petrol, ob.transmission, ob.category, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission == '' && ob.petrol != '' && ob.year == '' && ob.category == '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndBrandAndPetrol(ob.numberOfSeats,  ob.brand, ob.petrol);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission == '' && ob.petrol == '' && ob.year != '' && ob.category == '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndBrandAndYear(ob.numberOfSeats,  ob.brand, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission != '' && ob.petrol == '' && ob.year == '' && ob.category == '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndBrandAndTransmission(ob.numberOfSeats,  ob.brand, ob.transmission);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission == '' && ob.petrol == '' && ob.year == '' && ob.category != '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndBrandAndCategory(ob.numberOfSeats,  ob.brand, ob.category);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission == '' && ob.petrol != '' && ob.year != '' && ob.category == '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndPetrolAndYear(ob.numberOfSeats, ob.petrol,  ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission == '' && ob.petrol != '' && ob.year == '' && ob.category != '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndPetrolAndCategory(ob.numberOfSeats, ob.petrol,  ob.category);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission != '' && ob.petrol != '' && ob.year == '' && ob.category == '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndPetrolAndTransmision(ob.numberOfSeats,  ob.petrol, ob.transmission);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission != '' && ob.petrol == '' && ob.year != '' && ob.category == '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndYearAndTransmission(ob.numberOfSeats, ob.transmission,ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission == '' && ob.petrol == '' && ob.year != '' && ob.category != '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndYearAndCategory(ob.numberOfSeats,ob.category, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission != '' && ob.petrol == '' && ob.year == '' && ob.category != '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndTransmissionAndCategory(ob.numberOfSeats, ob.transmission, ob.category);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission == '' && ob.petrol != '' && ob.year != '' && ob.category == '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByBrandAndPetrolAndYear(ob.brand, ob.petrol, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission != '' && ob.petrol != '' && ob.year == '' && ob.category == '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByBrandAndPetrolTransmission(ob.brand, ob.petrol, ob.transmission);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission == '' && ob.petrol != '' && ob.year == '' && ob.category != '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByBrandAndPetrolAndCategory(ob.brand, ob.petrol, ob.category);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission != '' && ob.petrol == '' && ob.year != '' && ob.category == '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByBrandAndYearAndTransmission(ob.brand,ob.transmission, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission == '' && ob.petrol == '' && ob.year != '' && ob.category != '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByBrandAndYearAndCategory(ob.brand, ob.category, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission != '' && ob.petrol == '' && ob.year == '' && ob.category != '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByBrandAndTransmissionAndCategory(ob.brand, ob.transmission, ob.category);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission != '' && ob.petrol != '' && ob.year != '' && ob.category == '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByPetrolAndYearAndTransmission(ob.petrol, ob.transmission, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission == '' && ob.petrol != '' && ob.year != '' && ob.category != '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByPetrolAndYearAndCategory(ob.petrol,ob.category, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission != '' && ob.petrol != '' && ob.year == '' && ob.category != '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByPetrolAndTransmissionAndCategory(ob.petrol, ob.transmission, ob.category);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission != '' && ob.petrol == '' && ob.year != '' && ob.category != '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByYearAndTransmissionAndCategory(ob.transmission, ob.category, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission == '' && ob.petrol != '' && ob.year != '' && ob.category == '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndBrandAndPetrolAndYear(ob.numberOfSeats,  ob.brand, ob.petrol, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission != '' && ob.petrol != '' && ob.year == '' && ob.category == '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndBrandAndPetrolAndTransmission(ob.numberOfSeats,  ob.brand, ob.petrol, ob.transmission);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission == '' && ob.petrol != '' && ob.year == '' && ob.category != '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndBrandAndPetrolAndCategory(ob.numberOfSeats,  ob.brand, ob.petrol, ob.category);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission != '' && ob.petrol != '' && ob.year != '' && ob.category == '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndPetrolAndYearAndTransmission(ob.numberOfSeats, ob.petrol, ob.transmission, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission == '' && ob.petrol != '' && ob.year != '' && ob.category != '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndPetrolAndYearAndCategory(ob.numberOfSeats, ob.petrol, ob.category, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission != '' && ob.petrol != '' && ob.year == '' && ob.category != '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndPetrolAndTransmissionAndCategory(ob.numberOfSeats, ob.petrol, ob.transmission, ob.category);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission != '' && ob.petrol == '' && ob.year != '' && ob.category != '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndYearAndTransmissionAndCategory(ob.numberOfSeats, ob.transmission, ob.category, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission != '' && ob.petrol == '' && ob.year == '' && ob.category != '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndBrandAndTransmisionAndCategory(ob.numberOfSeats,  ob.brand, ob.transmission, ob.category);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission == '' && ob.petrol == '' && ob.year != '' && ob.category != '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndBrandAndYearAndCategory(ob.numberOfSeats,  ob.brand, ob.category, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission != '' && ob.petrol == '' && ob.year != '' && ob.category == '' && ob.numberOfSeats != 0) {
          const response = await CarService.getByNumberOfSeatsAndBrandAndYearAndTransmission(ob.numberOfSeats,  ob.brand, ob.transmission, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission != '' && ob.petrol != '' && ob.year != '' && ob.category == '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByBrandAndPetrolAndYearAndTransmission(ob.brand, ob.petrol, ob.transmission, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission == '' && ob.petrol != '' && ob.year != '' && ob.category != '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByBrandAndPetrolAndYearAndCategory(ob.brand,ob.petrol, ob.category, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission != '' && ob.petrol == '' && ob.year != '' && ob.category != '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByBrandAndYearAndTransmissionAndCategory(ob.brand,ob.transmission, ob.category, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand != '' && ob.transmission != '' && ob.petrol != '' && ob.year == '' && ob.category != '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByBrandAndPetrolAndTransmissionAndCategory(ob.brand, ob.petrol, ob.transmission, ob.category);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission != '' && ob.petrol != '' && ob.year != '' && ob.category != '' && ob.numberOfSeats == 0) {
          const response = await CarService.getByPetrolAndYearAndTransmissionAndCategory(ob.petrol, ob.transmission, ob.category, ob.year);
          const fil = response.data.filter(el => el.category === 'EKSKLUZYWNE')
          if(ob.model !== ''){
            const f = fil.filter(car => car.model === ob.model)
            setCars(f);
            _DATA = f
          }
          else{
            setCars(fil);
            _DATA = fil
            }
          }
        else if (ob.brand == '' && ob.transmission == '' && ob.petrol == '' && ob.year == '' && ob.category == '' && ob.numberOfSeats == 0) {
          const response = await CarService.getCarsSport();
          setCars(response.data);
          _DATA = response.data
        }
      } catch (error) {
        (error);
      }
  
      setLoading(false);
    };
    fetchData();
  }, [ob]);
  const content = "Aby dodać samochód do koszyka musisz się zalogować!"

  const rent = (prize,car) => {
    setModalShow(true)
    setPrize(prize)
    setCar(car)
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
      setFilteredData(cars);
      _DATA = filteredData
    }
    // } else {
    //   setFilteredData(newFilter);
    // }
  };

  const clearInput = () => {
    setFilteredData(cars);
    setWordEntered("");
  };

  const {updateBrand} = useContext(CartContext)

  const reset = () => {
    
    setCars(initialCars);
    _DATA = initialCars
    updateBrand('')
  }


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await CarService.getByKeyword(wordEntered)
        const fil = response.data.filter(car => car.category === 'EKSKLUZYWNE')
        setCars(fil)
        setFilteredData(fil)
        _DATA = fil
        ("D"+_DATA)
        // setShowHook(showTab)
        
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, [wordEntered]);
    return <div style={{marginTop:80}}>
      <hr></hr>
        <h4>Grupa Ekskluzywne</h4>
        <hr></hr>
        
        <Card style={{borderRadius:15}}>
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
                  numberOfSeats: numberOfSeats}}
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
                  // onChange={handleChange}
                  <div className="row" style={{display: 'flex'}}>
                     <Form style={{marginTop:20}} >
                        <div className="column" >
                            <div className="form-group" style={{width: '23%', display: 'inline-block'}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Marka</InputLabel>
                                    <Field name="brand" component={CustomTextFieldsBrand} >
                                    <MenuItem value=''>-------</MenuItem>
                                      {brands.map(brand => {
                                        return (
                                        <MenuItem value={brand}>{brand}</MenuItem>)
                                      })}
                                      
                                    </Field>
                                </FormControl>                            
                              </div>      
                            <div className="form-group" style={{width: '23%', display: 'inline-block', marginLeft: 10}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Model</InputLabel>
                                    <Field name="model" component={CustomTextFields}>
                                      <MenuItem value=''>-------</MenuItem>
                                      {models.map(model => {
                                        return (
                                        <MenuItem value={model}>{model}</MenuItem>)
                                      })}
                                      
                                    </Field>
                                </FormControl>
                            </div>
                            <div className="form-group" style={{width: '23%', display: 'inline-block', marginLeft: 10}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Rodzaj paliwa</InputLabel>
                                    <Field name="petrol" component={CustomTextFields}>
                                    <MenuItem value=''>-------</MenuItem>
                                      {petrols.map(petrol => {
                                       return (
                                       <MenuItem value={petrol}>{petrol}</MenuItem>)
                                      })}
                                      
                                    </Field>
                                </FormControl>
                            </div>
                            <div className="form-group" style={{width: '23%', display: 'inline-block', marginLeft: 10}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Rok produkcji</InputLabel>
                                    <Field name="year" component={CustomTextFields}>
                                    <MenuItem value=''>-------</MenuItem>
                                      {years.map(year => {
                                        return (
                                        <MenuItem value={year}>{year}</MenuItem>)
                                      })}
                                    </Field>
                                </FormControl>
                            </div>
                            <div className="form-group" style={{width: '23%', display: 'inline-block',marginTop: 20,marginLeft: 5}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Skrzynia biegów</InputLabel>
                                    <Field name="transmission" component={CustomTextFields}>
                                    <MenuItem value=''>-------</MenuItem>
                                      {transmissions.map(transmission => {
                                        return (
                                        <MenuItem value={transmission}>{transmission}</MenuItem>)
                                      })}
                                      
                                    </Field>
                                </FormControl>
                            </div>                              
                            <div className="form-group" style={{width: '23%',marginTop: 15,float:'left',marginLeft:5}}>
                                    <Field name="numberOfSeats" id="numberOfSeats" component={CustomRangeInput} ></Field>
                            </div>      
                            
                            <Button type = "submit" style={{ display: 'inline-block', marginLeft: 10, marginTop: 27, color:'blue'}}>Szukaj</Button>
                            <Button type='reset' onClick = {reset} style={{ display: 'inline-block', marginLeft: 10, marginTop: 27, color:'black'}}>Wyczyść</Button>

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
            
            <div>{ cars.length == 0 ? <h4 style={{textAlign :'center', marginTop: 200}}>Brak wyników odpowiadających wybranym kryteriom</h4> : 
        <div className='grid-container'>
         {/* {user != null ? <h4 id="ad" >{content}</h4> : '' } */}
        

        {_DATA.currentData().map((car,index) => {
       return (
       
        <Card id={"card"+index} style={{ maxWidth: 380 ,borderRadius:15 }} key={car.id}>
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
              <h6 style={{display: 'inline-block'}}><b>Rodzaj paliwa</b></h6> <span style={{dispaly: 'inline-block'}}>{car.petrol}</span>
              <br></br>
              <h6 style={{display: 'inline-block'}}><b>Moc</b></h6> {car.km}KM
              <br></br>
              <h6 style={{display: 'inline-block'}}><b>Moment obrotowy</b></h6> {car.nm}NM
              <br></br>
              <h6 style={{display: 'inline-block'}}><b>Spalanie w mieście</b></h6> {car.combustion}l/100km
              <br></br>
              <h6 style={{display: 'inline-block'}}><b>Pojemność silnika</b></h6> {car.engine}l
              <br></br>
              <h6 style={{display: 'inline-block'}}><b>Skrzynia biegów</b></h6> {car.transmission}
              <br></br>
              <h6 style={{display: 'inline-block'}}><b>Rok produkcji</b></h6> {car.year}r.
              <br></br>
              <h6 style={{display: 'inline-block'}}><b>Cena (zł):</b></h6>
              <div style={{marginLeft: '-16px'}}>
              <table className="table" style={{width: '55%', margin: 'auto', position: 'relative'}}>
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
                  <td>{car.price.Period}</td> 
                  <td>{car.price.secondPeriod}</td>
                  <td>{car.price.thirdPeriod}</td>
                  <td><span style={{color: 'white'}}>g</span>{car.price.fourthPeriod}</td>
                  <td><span style={{color: 'white'}}>g</span>{car.price.fifthPeriod}</td>
                  <td><span>{car.price.sixthPeriod}</span> </td>
                  <td><span style={{color: 'white'}}>g</span>{car.price.deposit}</td>
                  </tr>
                </tbody>
              </table>
              </div>
              <h6 style={{display: 'inline-block'}}><b>Liczba miejsc</b></h6> {car.numberOfSeats}
              <br></br>   
              <h6 style={{display: 'inline-block'}}><b>Wyposażenie</b></h6> {car.details}
              <br></br>
             <h6 style={{display: 'inline-block'}}><b>Punkty </b><FaCarAlt style={{marginTop:-3, marginRight:2}}size={20}></FaCarAlt>{car.points}</h6>
            </CardContent>
            <div id="buttons">
            <CardActions>
            {/* { user != null && !car.taken ? <Button id={"rentButton"+car.id}  style = {{marginLeft:'auto', marginRight: 'auto',color:'blue'}} onClick={() => rent(car.prize, car)}><FaCartPlus size={21} style={{marginTop:-4}}></FaCartPlus><span style={{marginLeft: 3}}>Dodaj</span></Button>  : ''} */}
            </CardActions>
            </div>
        </Card>
         
       )}
    )}
    <OrderModal show={modalShow} onHide={() => setModalShow(false)} prize={prize} car={car} />
    
    </div>
    
    }
    <br></br>

    <h6 style={cars.length == 0 ? {marginleft: 'auto', marginRight: 'auto', textAlign:'center'} : {}}>Jeżeli chcesz, żeby samochód, którego nie ma na liście pojawił się w naszej wypożyczalni to daj nam o tym znać <Link to="/kontakt">tutaj</Link>.</h6>

    <div ><FaChevronCircleUp size={50} onClick={scrollToTop} style={{marginLeft: 1300,marginBottom: 50}}></FaChevronCircleUp></div></div>
    <Footer></Footer>
    </div>
    
}