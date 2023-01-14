import Select from 'react-select';
import { useState, useEffect } from "react";
import CarService from '../services/CarService';
import BarChart from './BarChart';
import { Bar, Line, Pie } from "react-chartjs-2";

import { borderRadius } from '@mui/system';
import { Footer } from './Footer';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { AccessDenied } from './AccessDenied';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';

  const options = [
    { value: '7', label: '7'},
    { value: '14', label: '14'},
    { value: '21', label: '21'},
    { value: '26', label: '26'},
    { value: '30', label: '30'},
  ]

export function Carts(){
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [selectedOption4, setSelectedOption4] = useState(null);

  const [loading, setLoading] = useState(true);

  const [car,setCar] = useState([])
  const [cars,setCars] = useState([])
  const [brands,setBrands] = useState([])

  const [mostCars,setMostCars] = useState([])
  const [brandCars,setBrandCars] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        (typeof selectedOption.value)
        const response = await CarService.getMostRentedCar(selectedOption.value);
        setCar(response.data);
        
        ("C"+response.data)
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, [selectedOption]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await CarService.getRentedCars(selectedOption2.value)
        setCars(response.data);
        (response.data)
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, [selectedOption2]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response5 = await CarService.getBrands();
        setBrands(response5.data);
        (response5.data)
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
        const response = await CarService.getMostRentedCarBrand(selectedOption3.value)
        setMostCars(response.data);
        (response.data)
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, [selectedOption3]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await CarService.getRentedCarsBrand(selectedOption4.value)
        setBrandCars(response.data);
        ("Br"+response.data)
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, [selectedOption4]);

  const o = []

  const op =  [];
  for(let i = 0;i<car.length;i++){
    let k = i;
      op.push({id: ++k, year: car[i].brand + ' '+car[i].model, userGain: car[i].rentings})
  }

  const op2 =  [];
  for(let i = 0;i<cars.length;i++){
    let k = i;
      op2.push({id: ++k, year: cars[i].brand + ' '+cars[i].model, userGain: cars[i].rentings})
  }

  const op3 =  [];
  for(let i = 0;i<mostCars.length;i++){
    let k = i;
      op3.push({id: ++k, year: mostCars[i].brand, userGain: mostCars[i].rentings})
  }

  const op4 =  [];
  for(let i = 0;i<brandCars;i++){
    let k = i;
      op4.push({id: ++k, year: brandCars[i].brand, userGain: brandCars[i].rentings})
  }

  const uD = {
    labels: op.map((data) => data.year),
      datasets: [
        {
          label: "Ilość wypożyczeń",
          data: op.map((data) => data.userGain),
          backgroundColor:'red',
          borderColor: "black",
          borderWidth: 2,
     
          borderRadius: 15
        },
      ],
      options: {
        
          
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        
      }
      
  }

  const uD2 = {
    labels: op2.map((data) => data.year),
      datasets: [
        {
          label: "Ilość wypożyczeń",
          data: op2.map((data) => data.userGain),
          backgroundColor:'red',
          borderColor: "black",
          borderWidth: 2,
        },
      ]
  }

  const uD3 = {
    labels: op3.map((data) => data.year),
      datasets: [
        {
          label: "Ilość wypożyczeń",
          data: op3.map((data) => data.userGain),
          backgroundColor:'red',
          borderColor: "black",
          borderWidth: 2,
        },
      ]
  }

  const uD4 = {
    labels: op4.map((data) => data.year),
      datasets: [
        {
          label: "Ilość wypożyczeń",
          data: op2.map((data) => data.userGain),
          backgroundColor:'red',
          borderColor: "black",
          borderWidth: 2,
        },
      ]
  }

  const [user,setUser] = useState('')

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

  if(user === null || user.role !== 'ROLE_ADMIN' || user.role !== 'ROLE_WORKER'){
    return <AccessDenied></AccessDenied>
  }else{


    return <div style={{marginTop:80}}>
        <hr ></hr>
        <h2 style={{ width:'100%', textAlign:'center'}} >Zestawienie</h2>
        <hr ></hr>

        <div><span><h5 style={{display: 'inline-block'}}><b>Najczęściej wypożyczany/wypożyczane samochód w ostatnich
        <div style={{width: 100, display: 'inline-block'}}>
          <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          placeholder=""
          >
          </Select>
        </div> dniach</b></h5></span>
        {/* {/* <div style={{height: 1000, width:1000}}><BarChart chartData={uD} /></div> */}
        <TableContainer component={Paper} style={{width:500}}>
      <Table sx={{ maxWidth: 500 }} size="small" aria-label="a dense table">
        <TableBody>
          {op.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.year}</TableCell>
              <TableCell align="center">{row.userGain}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div> 
    
        <div style={{marginTop:50}}><span><h5 style={{display: 'inline-block'}}><b>Wypożyczone samochody w ostatnich
        <div style={{width: 100, display: 'inline-block'}}>
          <Select
          defaultValue={selectedOption2}
          onChange={setSelectedOption2}
          options={options}
          placeholder=""
          menuPlacement='bottom'
          menuPosition='relative'
          >
          </Select>
        </div> dniach</b></h5></span>
        <div style={{height: 1000, width:1000}}><BarChart chartData={uD2} /></div></div>

        <div style={{marginTop:-450}}><span><h5 style={{display: 'inline-block'}}><b>Najczęsciej wypożyczana/wypożyczane marka w ostatnich
        <div style={{width: 100, display: 'inline-block'}}>
          <Select
          defaultValue={selectedOption3}
          onChange={setSelectedOption3}
          options={options}
          placeholder=""
          >
          </Select>
        </div> dniach</b></h5></span>
        {/* <div style={{height: 1000, width:1000}}><BarChart chartData={uD3} /></div> */}
        <TableContainer component={Paper} style={{width:500}}>
      <Table sx={{ maxWidth: 500 }} size="small" aria-label="a dense table">
        <TableBody>
          {op3.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.year}</TableCell>
              <TableCell align="center">{row.userGain}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
        
        <div style={{marginTop:50}}><span><h5 style={{display: 'inline-block'}}><b>Wypożyczone marki w ostatnich
        <div style={{width: 100, display: 'inline-block'}}>
          <Select
          defaultValue={selectedOption4}
          onChange={setSelectedOption4}
          options={options}
          placeholder=""
          menuPlacement='bottom'
          menuPosition='relative'
          >
          </Select>
        </div> dniach</b></h5></span>
        {/* <div style={{height: 600, width:600}}><Pie data={uD4} /></div></div> */}
        <div style={{height: 1000, width:1000}}><BarChart chartData={uD4} /></div></div>

        <br></br>
        <Footer style={{marginTop: -400}}></Footer>
    </div>
}}