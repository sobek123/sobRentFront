import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useState,useEffect } from 'react';
import CarService from '../services/CarService';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaCarAlt, FaChevronCircleUp, FaEdit, FaLock, FaLockOpen, FaPencilAlt, FaSearch } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { useRef } from 'react';
import Dialog from './Dialog';
import { FaPlusCircle } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import ReactSelect from 'react-select';
import { Button, FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Footer } from './Footer';
import { AccessDenied } from './AccessDenied';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';
import { Spinner } from 'react-bootstrap';
// import 'semantic-ui-css/semantic.min.css';
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

export function Cars(){
  const [selectedOption, setSelectedOption] = useState(null);
  const [faults,setFaults] = useState([])
  useEffect(() => {
    const fetchData =  async () => {
      setLoading(true);
      try {
        if (selectedOption.value === "Moc rosnąco") {
          const response = await CarService.sortByKmAscending("SPORT");
          setFilteredData(response.data);
      } else if (selectedOption.value === "Moc malejąco") {
          const response = await CarService.sortByKmDescending("SPORT");
          setFilteredData(response.data);
          (response.data)
      } else if (selectedOption.value === "Moment obrotowy rosnąco") {
        const response = await CarService.sortByNmAscending("SPORT");
        setFilteredData(response.data);
        (response.data)
      } else if (selectedOption.value === "Moment obrotowy malejąco") {
        const response = await CarService.sortByNmDescending("SPORT");
        setFilteredData(response.data);
        (response.data)
      } else if (selectedOption.value === "Spalanie w mieście rosnąco") {
        const response = await CarService.sortByCombustionAscending("SPORT");
        setFilteredData(response.data);
        (response.data)
      } else if (selectedOption.value === "Spalanie w mieście malejąco") {
        const response = await CarService.sortByCombustionDescending("SPORT");
        setFilteredData(response.data);
        (response.data)}
      else if (selectedOption.value === "Pojemność silnika rosnąco") {
        const response = await CarService.sortByEngineAscending("SPORT");
        setFilteredData(response.data);
        (response.data)}
      else if (selectedOption.value === "Pojemność silnika malejąco") {
        const response = await CarService.sortByEngineDescending("SPORT");
        setFilteredData(response.data);
        (response.data)}
      else if (selectedOption.value === "Kaucja rosnąco") {
        const response = await CarService.sortByDepositAscending("SPORT");
        setFilteredData(response.data);
        (response.data)}
      else if (selectedOption.value === "Kaucja malejąco") {
        const response = await CarService.sortByDepositDescending("SPORT");
        setFilteredData(response.data);
        (response.data)}
      else if (selectedOption.value === "Rok produkcji rosnąco") {
        const response = await CarService.sortByYearAscending("SPORT");
        setFilteredData(response.data);
        (response.data)}
      else if (selectedOption.value === "Rok produkcji malejąco") {
        const response = await CarService.sortByYearDescending("SPORT");
        setFilteredData(response.data);
        (response.data)}
      else if (selectedOption.value === "Liczba miejsc rosnąco") {
        const response = await CarService.sortByNumberOfSeatsAscending("SPORT");
        setFilteredData(response.data);
        (response.data)}
      else if (selectedOption.value === "Liczba miejsc malejąco") {
        const response = await CarService.sortByNumberOfSeatsDescending("SPORT");
        setFilteredData(response.data);
        (response.data)}
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, [selectedOption]);
  const [show2,setShow2] = useState(false)
  const [updatedCar, setUpdatedCar] = useState('')
    const [dialog, setDialog] = useState({
        message: "",
        isLoading: false,
      });
      const idProductRef = useRef();
      const handleDialog = (message, isLoading) => {
        setDialog({
          message,
          isLoading
        });
      };
    const handleDelete = (id) => {
        handleDialog("Czy na pewno chcesz usunąć ten samochód?", true);
        idProductRef.current = id;
      };

      const areUSureDelete = (choose) => {
        if (choose) {
            CarService.deleteCar(idProductRef.current).then(response => { 
              (response)
            })
            .catch(error => {
                (error.response)
            });
          setCars(cars.filter((car) => {
            return car.id !== idProductRef.current;
        }))
        setFilteredData(cars.filter((car) => {
          return car.id !== idProductRef.current;
      }))
          handleDialog("", false);
        } else {
          handleDialog("", false);
        }
      };
    const handleExit = (id) => {
      document.getElementById("deleteButton"+id).hidden = false
      document.getElementById("exitButton"+id).hidden = true
          document.getElementById("acceptButton"+id).hidden = true
          document.getElementById("first"+id).hidden = true
          document.getElementById("second"+id).hidden = true
          document.getElementById("three"+id).hidden = true
          document.getElementById("forth"+id).hidden = true
          document.getElementById("fifth"+id).hidden = true
          document.getElementById("six"+id).hidden = true
          document.getElementById("seventh"+id).hidden = true
          document.getElementById("span"+id).hidden = false
          document.getElementById("span2"+id).hidden = false
          document.getElementById("span3"+id).hidden = false
          document.getElementById("span4"+id).hidden = false
          document.getElementById("span5"+id).hidden = false
          document.getElementById("span6"+id).hidden = false
          document.getElementById("span7"+id).hidden = false
          document.getElementById("tab").style.width = '30%'
          document.getElementById("thf1"+id).hidden = false
          document.getElementById("thf2"+id).hidden = false
          document.getElementById("thf3"+id).hidden = false
          document.getElementById("thf4"+id).hidden = false
          document.getElementById("thf5"+id).hidden = false
          document.getElementById("thf6"+id).hidden = false
          document.getElementById("thf7"+id).hidden = false
          document.getElementById("th1"+id).hidden = true
          document.getElementById("th2"+id).hidden = true
          document.getElementById("th3"+id).hidden = true
          document.getElementById("th4"+id).hidden = true
          document.getElementById("th5"+id).hidden = true
          document.getElementById("th6"+id).hidden = true
          document.getElementById("th7"+id).hidden = true
          document.getElementById("pointN"+id).hidden = false
          document.getElementById("point"+id).hidden = true
      }
      const handleAccept = (id) => {
        document.getElementById("deleteButton"+id).hidden = false
      document.getElementById("exitButton"+id).hidden = true
          document.getElementById("acceptButton"+id).hidden = true
          document.getElementById("first"+id).hidden = true
          document.getElementById("second"+id).hidden = true
          document.getElementById("three"+id).hidden = true
          document.getElementById("forth"+id).hidden = true
          document.getElementById("fifth"+id).hidden = true
          document.getElementById("six"+id).hidden = true
          document.getElementById("seventh"+id).hidden = true
          document.getElementById("point"+id).hidden = true
          document.getElementById("pointN"+id).hidden = false
          document.getElementById("span"+id).hidden = false
          document.getElementById("span2"+id).hidden = false
          document.getElementById("span3"+id).hidden = false
          document.getElementById("span4"+id).hidden = false
          document.getElementById("span5"+id).hidden = false
          document.getElementById("span6"+id).hidden = false
          document.getElementById("span7"+id).hidden = false
          document.getElementById("th1"+id).hidden = true
          document.getElementById("th2"+id).hidden = true
          document.getElementById("th3"+id).hidden = true
          document.getElementById("th4"+id).hidden = true
          document.getElementById("th5"+id).hidden = true
          document.getElementById("th6"+id).hidden = true
          document.getElementById("th7"+id).hidden = true
          document.getElementById("thf1"+id).hidden = false
          document.getElementById("thf2"+id).hidden = false
          document.getElementById("thf3"+id).hidden = false
          document.getElementById("thf4"+id).hidden = false
          document.getElementById("thf5"+id).hidden = false
          document.getElementById("thf6"+id).hidden = false
          document.getElementById("thf7"+id).hidden = false
          document.getElementById("tab").style.width = '30%'
        
    }
    const [loading,setLoading] = useState(true)
    const handleEdit = (id) => {
        (showTab[id])
        if(show === false){
          setShow(true)
          document.getElementById("first"+id).hidden = true
          document.getElementById("second"+id).hidden = true
          document.getElementById("three"+id).hidden = true
          document.getElementById("forth"+id).hidden = true
          document.getElementById("fifth"+id).hidden = true
          document.getElementById("six"+id).hidden = true
          document.getElementById("seventh"+id).hidden = true
          document.getElementById("span"+id).hidden = false
          document.getElementById("span2"+id).hidden = false
          document.getElementById("span3"+id).hidden = false
          document.getElementById("span4"+id).hidden = false
          document.getElementById("span5"+id).hidden = false
          document.getElementById("span6"+id).hidden = false
          document.getElementById("span7"+id).hidden = false
          document.getElementById("exitButton"+id).hidden = true
          document.getElementById("acceptButton"+id).hidden = true
          document.getElementById("tab").style.width = '30%'
          document.getElementById("point"+id).hidden = true
          document.getElementById("pointN"+id).hidden = false
          document.getElementById("deleteButton"+id).hidden = true
          document.getElementById("thf1"+id).hidden = false
          document.getElementById("thf2"+id).hidden = false
          document.getElementById("thf3"+id).hidden = false
          document.getElementById("thf4"+id).hidden = false
          document.getElementById("thf5"+id).hidden = false
          document.getElementById("thf6"+id).hidden = false
          document.getElementById("thf7"+id).hidden = false
          document.getElementById("th1"+id).hidden = true
          document.getElementById("th2"+id).hidden = true
          document.getElementById("th3"+id).hidden = true
          document.getElementById("th4"+id).hidden = true
          document.getElementById("th5"+id).hidden = true
          document.getElementById("th6"+id).hidden = true
          document.getElementById("th7"+id).hidden = true
          document.getElementById("deleteButton"+id).hidden = false
          // document.getElementById("tab").style.marginRight = -150

        }
        else
        {
          setShow(false)
          document.getElementById("pointN"+id).hidden = true
          document.getElementById("point"+id).hidden = false
          document.getElementById("th1"+id).hidden = false
          document.getElementById("th2"+id).hidden = false
          document.getElementById("th3"+id).hidden = false
          document.getElementById("th4"+id).hidden = false
          document.getElementById("th5"+id).hidden = false
          document.getElementById("th6"+id).hidden = false
          document.getElementById("th7"+id).hidden = false
          document.getElementById("thf1"+id).hidden = true
          document.getElementById("thf2"+id).hidden = true
          document.getElementById("thf3"+id).hidden = true
          document.getElementById("thf4"+id).hidden = true
          document.getElementById("thf5"+id).hidden = true
          document.getElementById("thf6"+id).hidden = true
          document.getElementById("thf7"+id).hidden = true
          document.getElementById("first"+id).hidden = false
          document.getElementById("second"+id).hidden = false
          document.getElementById("three"+id).hidden = false
          document.getElementById("forth"+id).hidden = false
          document.getElementById("fifth"+id).hidden = false
          document.getElementById("six"+id).hidden = false
          document.getElementById("seventh"+id).hidden = false
          document.getElementById("span"+id).hidden = true
          document.getElementById("span2"+id).hidden = true
          document.getElementById("span3"+id).hidden = true
          document.getElementById("span4"+id).hidden = true
          document.getElementById("span5"+id).hidden = true
          document.getElementById("span6"+id).hidden = true
          document.getElementById("span7"+id).hidden = true
          document.getElementById("exitButton"+id).hidden = false
          document.getElementById("acceptButton"+id).hidden = false
          // document.getElementById("tab").style.width = '85%'
          document.getElementById("tab").style.marginLeft = 300

          document.getElementById("deleteButton"+id).hidden = true
        } 
      };
      const [show,setShow] = useState(false)
    const [cars,setCars] = React.useState([])
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await CarService.getCars()
            setCars(response.data);
            setFilteredData(response.data)
            
          } catch (error) {
            (error);
          }
          setLoading(false);
        };
        fetchData();
      }, []);
      const [filteredData, setFilteredData] = useState([]);
      const [wordEntered, setWordEntered] = useState(null);
      useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await CarService.getByKeyword(wordEntered)
            
            setFilteredData(response.data)
            (response.data)
          } catch (error) {
            (error);
          }
          setLoading(false);
        };
        fetchData();
      }, [wordEntered]);

      const showTab = []

      const unlock = (user) => {
        user.taken = false
        CarService.updateCar(user.id,user)
        .then((response) => {
          (response)
          // const tab = cars
          // for(let i=0;i<tab.length;i++){
          //   if(tab[i].id == user.id){
          //     tab[i].taken = false
          //   }
          //   (tab[i])

          // }
          const newA = cars.map(obj => {

            if (obj.id == id) {
            
            return {obj, taken: false};
            
            }
            
            return obj;
            
            })
          setCars(newA)
          setFilteredData(newA)
        })
        .catch((error) => {
        (error);
        }); 
      }
  
      const block = (user) => {
        (user)
        user.taken = true
        CarService.updateCar(user.id,user)
        .then((response) => {
          (response)
          // const tab = cars
          // for(let i=0;i<tab.length;i++){
          //   if(tab[i].id == user.id){
          //     tab[i].taken = true
          //   }
          //   (tab[i])
          // }
          const newA = cars.map(obj => {

            if (obj.id == id) {
            
            return {obj, taken: true};
            
            }
            
            return obj;
            
            })
          setCars(newA)
          setFilteredData(newA)
        })
        .catch((error) => {
        (error);
        });
        // window.onload
      }
    
      const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        // const newFilter = cars.filter((value) => {
        //   return value.name.toLowerCase().includes(searchWord.toLowerCase());
        // });
    
        if (searchWord === "") 
          setFilteredData(cars);
        // } else {
        //   setFilteredData(newFilter);
        // }
      };
      const scrollToTop = () => {
        ("h")
        window.scroll({
          top: 0,
          behavior: 'smooth'
        });
      };

      const [id,setId] = useState('')
  const [user,setUser] = useState('')

  // useEffect(() => {
    
  //   const response = await UserService.findByEmail(id)
  //       setUser(response.data)
  // if(user != null){
  // ("U"+user)
  // (user.email)
  // setId(user.email)
  // } 
  // }, []);


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

      if(user !== null || user.role !== 'ROLE_WORKER' || user.role !== 'ROLE_WORKER'){
        

    return <div style={{marginTop:80}}>
        <hr></hr>
        <h4>Samochody</h4>
        <hr></hr>

        <List sx={{ width: '100%', maxWidth: 1500, bgcolor: 'background.paper' }} style={{borderBottomRightRadius:10, borderBottomLeftRadius:10,borderTopRightRadius:10, borderTopLeftRadius:10}}>
        <div style={{width: '30%', float:'left', marginLeft: 20, marginTop: 10, marginBottom: 10}}>
          <ReactSelect defaultValue={selectedOption} onChange={setSelectedOption} options={options} placeholder="Wybierz opcje sortowania"/>
        </div>
        <FormControl sx={{ m: 1, width: '25ch' }} style={{marginTop: 10}}variant="outlined">
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
        <Link to="/sport" style={{  float: 'right', marginTop: -40, marginRight: 20}}><FaPlusCircle style={{marginTop:'auto',marginBottom:'auto', color: 'black', marginBottom: 8, marginLeft:1000}} size={30}></FaPlusCircle></Link>
        {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,margnLeft:'auto',marginRight:'auto'}}/> :  filteredData.map((car,index) => 
            
            <span>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={require(''+car.image)} alt={car.brand + car.model} style={{width: 250, height: 170, marginRight: 20,marginTop:30, borderRadius: 10}}></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<span><b style={{fontSize: 20}}>{car.brand} {car.model}</b><span style={{marginRight: -40, marginTop: -4}}><FaEdit style={{ marginLeft: 5, marginTop: -6}} size={20} onClick={() => handleEdit(car.id)}></FaEdit></span></span>}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                        <Formik
              initialValues={{
                  editPrize:{
                    firstPeriod: car.price.firstPeriod,
                    secondPeriod: car.price.secondPeriod,
                    thirdPeriod: car.price.thirdPeriod,
                    fourthPeriod: car.price.fourthPeriod,
                    fifthPeriod: car.price.fifthPeriod,
                    sixthPeriod: car.price.sixthPeriod,
                    deposit: car.price.deposit
                  },
                  editPoints: car.points
                }}
                validationSchema={Yup.object().shape({
                    editPoints: Yup.number(),
                    editPrize: Yup.object().shape({
                      firstPeriod: Yup.number(),
                      secondPeriod: Yup.number(),
                      thirdPeriod: Yup.number(),
                      fourthPeriod: Yup.number(),
                      fifthPeriod: Yup.number(),
                      sixthPeriod: Yup.number(),
                      deposit: Yup.number(),
                  }),
                })}
                onSubmit={fields => {
                  car.points = fields.editPoints
                  car.price = fields.editPrize
                  car.fault = ''
                  CarService.updateCar(car.id,car)
                  .then((response) => {
                  (response);
                  const tab = cars
                    // for(let i=0;i<tab.length;i++){
                    //   if(tab[i].id == car.id){
                    //     (tab[i])
                    //     tab[i].price = fields.editPrize
                    //     tab[i].points = fields.editPoints
                    //   }
                    // }
                    // setCars(tab)
                    // setFilteredData(tab)
                    const newA = cars.map(obj => {

                      if (obj.id == id) {
                      
                      return {obj, price: fields.editPrize, points: fields.editPoints};
                      
                      }
                      
                      return obj;
                      
                      })
                    setCars(newA)
                    setFilteredData(newA)
                  })
                  .catch((error) => {
                  (error);
                  })}}
                render={({ errors, status, touched }) => (
                  <Form>
                      <h6 style={{marginTop:10}}><b>Numer rejestracyjny</b>  {car.licensePlate}</h6> 
                      <h6><b>Spalanie w mieście</b>  {car.combustion}l/100km</h6>
                      <h6><b>Kategoria</b>  {car.category}</h6>
                      <h6><b>Moc</b>  {car.km}KM</h6>
                      <h6><b>Moment obrotowy</b>  {car.nm}NM</h6>
                      <h6><b>Rodzaj paliwa</b>  {car.petrol}</h6>
                      <h6><b>Pojemność silnika</b>  {car.engine}l</h6>
                      <h6><b>Skrzynia biegów</b>  {car.transmission} </h6>
                      <h6><b>Rok produkcji</b>  {car.year}r.</h6>
                      <h6><b>Wyposażenie</b>  {car.details}</h6>
                      <span id={'pointN'+car.id}><h6><b>Punkty</b>  <FaCarAlt style={{marginTop:-3, marginRight:2}}size={20}></FaCarAlt>{car.points}</h6></span><span hidden id={'point'+car.id}><h6>Punkty  <Field style={{display: 'inline-block',width: '8%'}} name="editPoints" type="number" id="first" className={'form-control' + (errors.editPoints && touched.editPoints ? ' is-invalid' : '')} min = "1"/></h6></span>
                      {car.fault == null ?  <h6><b>Usterki</b>  brak</h6> : <h6 style={{marginBottom: -40}}><b>Usterki</b>  {car.fault}</h6>}
                      <h6 style={{ marginRight: 320, marginTop: -280, float:'right'}}><b>Cena (zł)</b> </h6>
                      <table id="tab" className="table" style={{width: '30%', marginRight: 200, marginTop: -260, float:'right'}}>
                        <thead>
                            <tr>
                                <th><span id={"thf1"+car.id}>1</span><span id={"th1"+car.id} hidden><span style={{color: 'white'}}>gg</span>1<span style={{color:'red'}}>*<span style={{color: 'white'}}>gggg</span></span></span></th>
                                <th><span id={"thf2"+car.id}>2-3</span><span id={"th2"+car.id} hidden><span style={{color: 'white'}}>ggg</span>2-3<span style={{color:'red'}}>*<span style={{color: 'white'}}>gg</span></span></span></th>
                                <th><span id={"thf3"+car.id}>4-9</span><span id={"th3"+car.id} hidden><span style={{color: 'white'}}>ggg</span>4-9<span style={{color:'red'}}>*<span style={{color: 'white'}}>gg</span></span></span></th>
                                <th><span id={"thf4"+car.id}>10-16</span><span id={"th4"+car.id} hidden><span style={{color: 'white'}}>g</span>10-16<span style={{color:'red'}}>*<span style={{color: 'white'}}>g</span></span></span></th>
                                <th><span id={"thf5"+car.id}>17-29</span><span id={"th5"+car.id} hidden><span style={{color: 'white'}}>g</span>17-29<span style={{color:'red'}}>*<span style={{color: 'white'}}>g</span></span></span></th>
                                <th><span id={"thf6"+car.id}>{'>'}29</span><span id={"th6"+car.id} hidden><span style={{color: 'white'}}>gg</span>{'>'}29<span style={{color:'red'}}>*<span style={{color: 'white'}}>gg</span></span></span></th>
                                <th><span id={"thf7"+car.id}>Kaucja</span><span id={"th7"+car.id} hidden><span style={{color: 'white'}}>g</span>Kaucja<span style={{color:'red'}}>*<span style={{color: 'white'}}>g</span></span></span></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td><span id={"span"+car.id}>{car.price.firstPeriod}</span> <Field hidden style={{width: '110%'}} name="editPrize.firstPeriod" type="number" id={"first"+car.id} className={'form-control' + (errors.firstPeriod && touched.firstPeriod ? ' is-invalid' : '')} min = "1"/></td> 
                            <td><span id={"span2"+car.id}>{car.price.secondPeriod}</span> <Field hidden style={{width: '110%'}} name="editPrize.secondPeriod" type="number" id={"second"+car.id} className={'form-control' + (errors.secondPeriod && touched.secondPeriod ? ' is-invalid' : '')} min = "1"/></td>
                            <td><span id={"span3"+car.id}>{car.price.thirdPeriod}</span> <Field hidden style={{width: '110%'}} name="editPrize.thirdPeriod" type="number" id={"three"+car.id} className={'form-control' + (errors.thirdPeriod && touched.thirdPeriod ? ' is-invalid' : '')} min = "1"/></td>
                            <td><span id={"span4"+car.id}><span style={{color: 'white'}}>g</span>{car.price.fourthPeriod}</span> <Field hidden style={{width: '120%'}} name="editPrize.fourthPeriod" type="number" id={"forth"+car.id} className={'form-control' + (errors.fourthPeriod && touched.fourthPeriod ? ' is-invalid' : '')} min = "1"/></td>
                            <td><span id={"span5"+car.id}><span style={{color: 'white'}}>g</span>{car.price.fifthPeriod}</span> <Field hidden style={{width: '120%'}} name="editPrize.fifthPeriod" type="number" id={"fifth"+car.id} className={'form-control' + (errors.fifthPeriod && touched.fifthPeriod ? ' is-invalid' : '')} min = "1"/></td>
                            <td><span id={"span6"+car.id}>{car.price.sixthPeriod}</span> <Field hidden style={{width: '110%'}} name="editPrize.sixthPeriod" type="number" id={"six"+car.id} className={'form-control' + (errors.sixthPeriod && touched.sixthPeriod ? ' is-invalid' : '')} min = "1"/></td>
                            <td><span id={"span7"+car.id}><span style={{color: 'white'}}>g</span>{car.price.deposit}</span> <Field hidden style={{width: '110%'}}name="editPrize.deposit" type="number" id={"seventh"+car.id} className={'form-control' + (errors.deposit && touched.deposit ? ' is-invalid' : '')} min = "1"/></td>
                            </tr>
                            </tbody>  
                        </table>
                         <Button hidden id={"exitButton"+car.id}  style={{marginLeft: 615, marginRight: 10,marginTop:-280,color: 'red'}} onClick={() => handleExit(car.id)} >Anuluj</Button>
                         <Button hidden id={"acceptButton"+car.id}  onClick={() => handleAccept(car.id)} style={{marginTop:-280,color: 'green'}} type="submit">Aktualizuj</Button>
                         <Button id={"deleteButton"+car.id}  style={{marginLeft: 600, marginTop: -320,color: 'red'}} type="button" onClick={() => handleDelete(car.id)}><FaTrash style={{marginTop: -5}} size={15}></FaTrash>Usuń</Button>
                         
                         { car.taken ?  <Button  id={"unlock"+car.id} style={{display: 'inline-block', marginLeft: 700, marginTop: -150,color: 'green'}} onClick={() => unlock(car)}><FaLockOpen style={{marginTop: -4}} size={15}></FaLockOpen>Odblokuj</Button> : <Button  style={{display: 'inline-block', marginLeft: 700,marginRight:'auto', textAlign:'center', marginTop: -150,color: 'red'}} id={"block"+car.id} onClick={() => block(car)}><FaLock style={{marginTop: -4}} size={15}></FaLock>Blokuj</Button>}
                       { car.taken ? <p style={{float: 'right', marginTop: -70, color: 'red', fontSize: 22}}><b>ZAJĘTY</b></p> : <p style={{float: 'right', marginTop: -70, color: 'green', fontSize: 22}}><b>WOLNY</b></p>}
                       
                       </Form>)}
                       />
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            { index != cars.length-1 ? <Divider variant="inset" component="li" /> : ''}</span>
        )}
        </List>
        {dialog.isLoading && (
            <Dialog onDialog={areUSureDelete} message={dialog.message}/>
          )}
          <br></br>
          <div><FaChevronCircleUp size={50} onClick={scrollToTop} style={{marginLeft: 1300,marginBottom: 50}}></FaChevronCircleUp></div>
          <Footer></Footer>
          
    </div>}else if (user == null){
      return <AccessDenied/>
    }
}