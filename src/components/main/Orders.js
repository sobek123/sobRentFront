import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import OrderService from '../services/OrderService';
import { useState, useEffect } from 'react';
import Select from 'react-select';

import './Orders.css'
import { useRef } from 'react';
import FullOrderService from '../services/FullOrderService';

import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { FaCarAlt, FaChevronCircleUp, FaPrint, FaSearch, FaTimesCircle } from 'react-icons/fa';
import Dialog from './Dialog';
import { Document,Page,View,Text,StyleSheet, PDFDownloadLink, Image } from "@react-pdf/renderer";
import pic from "./output-onlinepngtools(2).png";
import { Group } from './Group';
import { Footer } from './Footer';
import { AccessDenied } from './AccessDenied';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';
import { Spinner } from 'react-bootstrap';


const options = [
  { value: 'Data i godzina złożenia zamówienia rosnąco', label: 'Data i godzina złożenia zamówienia rosnąco' },
  { value: 'Data i godzina złożenia zamówienia malejąco', label: 'Data i godzina złożenia zamówienia malejąco' },
  { value: 'Cena rosnąco', label: 'Cena rosnąco' },
  { value: 'Cena malejąco', label: 'Cena malejąco' }
  
];

export function Orders(){
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
    handleDialog("Czy na pewno chcesz anulować te zamówienie?", true);
    idProductRef.current = id;
  };

  const areUSureDelete = (choose) => {
    if (choose) {
        FullOrderService.deleteFullOrder(idProductRef.current).then(response => { 
          (response)
        })
        .catch(error => {
            (error.response)
        });
      setOrders(orders.filter((additional) => {
        return additional.id !== idProductRef.current;}))
      setFilteredData(orders.filter((additional) => {
        return additional.id !== idProductRef.current;}))
      setTodayOrders(todayOrders.filter((additional) => {
        return additional.id !== idProductRef.current;}))
      setFilteredDataRentToday(todayOrders.filter((additional) => {
        return additional.id !== idProductRef.current;}))
      setBackOrders(backOrders.filter((additional) => {
      return additional.id !== idProductRef.current;}))
      setFilteredDataBackToday(backOrders.filter((additional) => {
      return additional.id !== idProductRef.current;}))
      setHistoricalOrders(historicalOrders.filter((additional) => {
      return additional.id !== idProductRef.current;}))
      setFilteredDataHistorical(historicalOrders.filter((additional) => {
        return additional.id !== idProductRef.current;}))
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4"
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  const [dialog2, setDialog2] = useState({
    message: "",
    isLoading: false,
  });
  const idProductRef2 = useRef();
  const handleDialog2 = (message, isLoading) => {
    setDialog2({
      message,
      isLoading
    });
  };
  const [priz,setPriz] = useState(0)
const handleDelete2 = (id,p) => {
  setPriz(p)
    handleDialog2("Czy na pewno chcesz anulować zamówienie", true);
    idProductRef2.current = id;
  };



  const areUSureDelete2 = (choose) => {
    if (choose) {
      (idProductRef2)
      OrderService.getOrderById(idProductRef2.current)
      .then(response3 => {
        // setPriz(prie - response3.data.prize)
        // (response3.data.prize)
        // (prie)
        let res = priz - response3.data.priz
        document.getElementById('pr').innerHTML = "<h6><b>Cena całkowita: "+res+"zł</b><h6>"
      })
      .catch( (error) => (error.response))
        OrderService.deleteOrder(idProductRef2.current).then(response => { 
         
          // (respons3.data.prize)
          (response)
        })
        .catch(error => {
          // const respons3 = OrderService.getOrderById(idProductRef2.current)
          // (respons3.data.prize)
            (error.response)
        });
        for(let i =0 ;i< orders.length; i++){
          (orders[i].orders)
          const h = orders[i].orders.filter((additional) => {
            return additional.id !== idProductRef2.current})
          orders[i].orders = h
        }
        setOrders(orders)
        for(let i =0 ;i< orders.length; i++){
          (orders[i].orders)
          const h = orders[i].orders.filter((additional) => {
            return additional.id !== idProductRef2.current})
          orders[i].orders = h
        }
        setFilteredData(orders)
        for(let i =0 ;i< backOrders.length; i++){
          (backOrders[i].orders)
          const h = backOrders[i].orders.filter((additional) => {
            return additional.id !== idProductRef2.current})
            backOrders[i].orders = h
        }
        setBackOrders(backOrders)
        for(let i =0 ;i< backOrders.length; i++){
          (backOrders[i].orders)
          const h = backOrders[i].orders.filter((additional) => {
            return additional.id !== idProductRef2.current})
            backOrders[i].orders = h
        }
        setFilteredDataBackToday(backOrders)
        for(let i =0 ;i< historicalOrders.length; i++){
          (historicalOrders[i].orders)
          const h = historicalOrders[i].orders.filter((additional) => {
            return additional.id !== idProductRef2.current})
            historicalOrders[i].orders = h
        }
        setHistoricalOrders(historicalOrders)
        for(let i =0 ;i< historicalOrders.length; i++){
          (historicalOrders[i].orders)
          const h = historicalOrders[i].orders.filter((additional) => {
            return additional.id !== idProductRef2.current})
            historicalOrders[i].orders = h
        }
        setFilteredDataHistorical(historicalOrders)
        for(let i =0 ;i< todayOrders.length; i++){
          (todayOrders[i].orders)
          const h = todayOrders[i].orders.filter((additional) => {
            return additional.id !== idProductRef2.current})
            todayOrders[i].orders = h
        }
        setTodayOrders(todayOrders)
        for(let i =0 ;i< todayOrders.length; i++){
          (todayOrders[i].orders)
          const h = todayOrders[i].orders.filter((additional) => {
            return additional.id !== idProductRef2.current})
            todayOrders[i].orders = h
        }
        setFilteredDataRentToday(todayOrders)
      // setOrders(orders.orders.filter((additional) => {
      //   return additional.id !== idProductRef2.current;}))
      handleDialog2("", false);
    } else {
      handleDialog2("", false);
    }
  };

  const [dialog3, setDialog3] = useState({
    message: "",
    isLoading: false,
  });
  const idProductRef3 = useRef();
  const handleDialog3 = (message, isLoading) => {
    setDialog3({
      message,
      isLoading
    });
  };
const handleDelete3 = (id) => {
    handleDialog3("Czy na pewno chcesz anulować te zamówienie?", true);
    idProductRef3.current = id;
  };

  const areUSureDelete3 = (choose) => {
    if (choose) {
      (idProductRef3)
        OrderService.deleteOrder(idProductRef3.current).then(response => { 
          (response)
        })
        .catch(error => {
            (error.response)
        });
        // setOrders(orders.map(order => order.orders.filter((additional) => {
        // return additional.id !== idProductRef3.current})))
        // setFilteredData(orders.map(order => order.orders.filter((additional) => {
        //   return additional.id !== idProductRef3.current})))
        // setBackOrders(backOrders.map(order => order.orders.filter((additional) => {
        //   return additional.id !== idProductRef3.current})))
        // setFilteredDataBackToday(backOrders.map(order => order.orders.filter((additional) => {
        //   return additional.id !== idProductRef3.current})))
        // setFilteredDataHistorical(historicalOrders.map(order => order.orders.filter((additional) => {
        //   return additional.id !== idProductRef3.current})))
        // setHistoricalOrders(historicalOrders.map(order => order.orders.filter((additional) => {
        //   return additional.id !== idProductRef3.current})))
        // setFilteredDataRentToday(todayOrders.map(order => order.orders.filter((additional) => {
        //   return additional.id !== idProductRef3.current})))
        // setTodayOrders(todayOrders.map(order => order.orders.filter((additional) => {
        //   return additional.id !== idProductRef3.current})))
      // setOrders(orders.orders.filter((additional) => {
      //   return additional.id !== idProductRef2.current;}))
      for(let i =0 ;i< orders.length; i++){
        (orders[i].orders)
        const h = orders[i].orders.filter((additional) => {
          return additional.id !== idProductRef2.current})
        orders[i].orders = h
      }
      setOrders(orders)
      for(let i =0 ;i< orders.length; i++){
        (orders[i].orders)
        const h = orders[i].orders.filter((additional) => {
          return additional.id !== idProductRef2.current})
        orders[i].orders = h
      }
      setFilteredData(orders)
      for(let i =0 ;i< backOrders.length; i++){
        (backOrders[i].orders)
        const h = backOrders[i].orders.filter((additional) => {
          return additional.id !== idProductRef2.current})
          backOrders[i].orders = h
      }
      setBackOrders(backOrders)
      for(let i =0 ;i< backOrders.length; i++){
        (backOrders[i].orders)
        const h = backOrders[i].orders.filter((additional) => {
          return additional.id !== idProductRef2.current})
          backOrders[i].orders = h
      }
      setFilteredDataBackToday(backOrders)
      for(let i =0 ;i< historicalOrders.length; i++){
        (historicalOrders[i].orders)
        const h = historicalOrders[i].orders.filter((additional) => {
          return additional.id !== idProductRef2.current})
          historicalOrders[i].orders = h
      }
      setHistoricalOrders(historicalOrders)
      for(let i =0 ;i< historicalOrders.length; i++){
        (historicalOrders[i].orders)
        const h = historicalOrders[i].orders.filter((additional) => {
          return additional.id !== idProductRef2.current})
          historicalOrders[i].orders = h
      }
      setFilteredDataHistorical(historicalOrders)
      for(let i =0 ;i< todayOrders.length; i++){
        (todayOrders[i].orders)
        const h = todayOrders[i].orders.filter((additional) => {
          return additional.id !== idProductRef2.current})
          todayOrders[i].orders = h
      }
      setTodayOrders(todayOrders)
      for(let i =0 ;i< todayOrders.length; i++){
        (todayOrders[i].orders)
        const h = todayOrders[i].orders.filter((additional) => {
          return additional.id !== idProductRef2.current})
          todayOrders[i].orders = h
      }
      setFilteredDataRentToday(todayOrders)
      handleDialog3("", false);
    } else {
      handleDialog3("", false);
    }
  };

  
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedOption1, setSelectedOption1] = useState(0);
  const [selectedOption2, setSelectedOption2] = useState(0);
  const [selectedOption3, setSelectedOption3] = useState(0);

    const [orders,setOrders] = React.useState([])
    const [historicalOrders,setHistoricalOrders] = React.useState([])
    const [todayOrders,setTodayOrders] = React.useState([])
    const [backOrders,setBackOrders] = React.useState([])

    const [loading,setLoading] = useState(true)
    useEffect(() => {
      const fetchData =  async () => {
        setLoading(true);
        try {
          if (selectedOption.value === "Cena rosnąco") {
            const response = await FullOrderService.sortByPrizeAscending();
            setFilteredDataRentToday(response.data);
        } else if (selectedOption.value === "Cena malejąco") {
            const response1 = await FullOrderService.sortByPrizeDescending();
            setFilteredDataRentToday(response1.data);
            ("pd"+response1.data)
        } else if (selectedOption.value === "Data i godzina złożenia zamówienia rosnąco") {
          const response2 = await FullOrderService.sortByLaunchDateAscending();
          setFilteredDataRentToday(response2.data);
          ("dt"+response2.data)
        } else if (selectedOption.value === "Data i godzina złożenia zamówienia malejąco") {
          const response3 = await OrderService.sortByLaunchDateDescending();
          setFilteredDataRentToday(response3.data);
          ("dtt"+response3.data)
        }
        } catch (error) {
          (error);
        }
        setLoading(false);
      };
      fetchData();
    }, [selectedOption]);

    useEffect(() => {
      const fetchData =  async () => {
        setLoading(true);
        try {
          if (selectedOption1.value === "Cena rosnąco") {
            const response = await FullOrderService.sortByPrizeAscending();
            setFilteredDataBackToday(response.data);
        } else if (selectedOption1.value === "Cena malejąco") {
            const response1 = await FullOrderService.sortByPrizeDescending();
            setFilteredDataBackToday(response1.data);
            ("pd"+response1.data)
        } else if (selectedOption1.value === "Data i godzina złożenia zamówienia rosnąco") {
          const response2 = await FullOrderService.sortByLaunchDateAscending();
          setFilteredDataBackToday(response2.data);
          ("dt"+response2.data)
        } else if (selectedOption1.value === "Data i godzina złożenia zamówienia malejąco") {
          const response3 = await OrderService.sortByLaunchDateDescending();
          setFilteredDataBackToday(response3.data);
          ("dtt"+response3.data)
        }
        } catch (error) {
          (error);
        }
        setLoading(false);
      };
      fetchData();
    }, [selectedOption1]);

    useEffect(() => {
      const fetchData =  async () => {
        setLoading(true);
        try {
          if (selectedOption2.value === "Cena rosnąco") {
            const response = await FullOrderService.sortByPrizeAscending();
            setOrders(response.data);
        } else if (selectedOption2.value === "Cena malejąco") {
            const response1 = await FullOrderService.sortByPrizeDescending();
            setOrders(response1.data);
            ("pd"+response1.data)
        } else if (selectedOption2.value === "Data i godzina złożenia zamówienia rosnąco") {
          const response2 = await FullOrderService.sortByLaunchDateAscending();
          setOrders(response2.data);
          ("dt"+response2.data)
        } else if (selectedOption2.value === "Data i godzina złożenia zamówienia malejąco") {
          const response3 = await FullOrderService.sortByLaunchDateDescending();
          setOrders(response3.data);
          ("dtt"+response3.data)
        }
        } catch (error) {
          (error);
        }
        setLoading(false);
      };
      fetchData();
    }, [selectedOption2]);

    useEffect(() => {
      const fetchData =  async () => {
        setLoading(true);
        try {
          if (selectedOption.value === "Cena rosnąco") {
            const response = await FullOrderService.sortByPrizeAscending();
            setFilteredDataHistorical(response.data);
        } else if (selectedOption.value === "Cena malejąco") {
            const response1 = await FullOrderService.sortByPrizeDescending();
            setFilteredDataHistorical(response1.data);
            ("pd"+response1.data)
        } else if (selectedOption.value === "Data i godzina złożenia zamówienia rosnąco") {
          const response2 = await FullOrderService.sortByLaunchDateAscending();
          setFilteredDataHistorical(response2.data);
          ("dt"+response2.data)
        } else if (selectedOption.value === "Data i godzina złożenia zamówienia malejąco") {
          const response3 = await OrderService.sortByLaunchDateDescending();
          setFilteredDataHistorical(response3.data);
          ("dtt"+response3.data)
        }
        } catch (error) {
          (error);
        }
        setLoading(false);
      };
      fetchData();
    }, [selectedOption3]);

    function formatD(date){
      let m =  date.getMonth()+1
      var min = ""
      
      if(date.getMinutes() < 10){
        min = "0"+date.getMinutes()
      }else{
        min = date.getMinutes()
      }
      return date.getDate()+"/"+ m + "/" + date.getFullYear()+"r." + " " + date.getHours()+ ":"+min
    }
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await FullOrderService.getActiveOrders()
            setOrders(response.data);
            setFilteredData(response.data)
            ("el1"+ response.data)
            const response2 = await FullOrderService.getFullOrdersRentToday()
            setTodayOrders(response2.data);
            setFilteredDataRentToday(response2.data)
            ("el12"+ response2.data)

            const response3 = await FullOrderService.getFullOrdersBackToday()
            setFilteredDataBackToday(response3.data);
            setBackOrders(response3.data)
            ("el13"+ response3.data)

            const response4 = await FullOrderService.getFullOrders()
            setFilteredDataHistorical(response4.data);
            setHistoricalOrders(response4.data);
            ("el14"+ response4.data)

            (response.data)
          } catch (error) {
            (error);
          }
          setLoading(false);
        };
        fetchData();
      }, []);

      function format(order){
        if(order == 'FIRST'){
          order = 'Białystok, ul. Czesława Miłosza 2, Atrium Biała(parking podziemny)'
        }
        else if(order === 'SECOND'){
          order = 'Białystok, ul. Wrocławska 20, Galeria Zielone Wzgórza(parking podziemny)'
        }
        else if(order === 'THIRD'){
          order = 'Białystok, ul. aleja Jana Pawła II 92, Makro'
        }
        return order
      }

      const [filteredData, setFilteredData] = useState([]);
      const [filteredDataBackToday, setFilteredDataBackToday] = useState([]);
      const [filteredDataRentToday, setFilteredDataRentToday] = useState([]);
      const [filteredDataHistorical, setFilteredDataHistorical] = useState([]);


      const [wordEntered, setWordEntered] = useState(null);
      const [wordEntered1, setWordEntered1] = useState(null);
      const [wordEntered2, setWordEntered2] = useState(null);
      const [wordEntered3, setWordEntered3] = useState(null);

    
      const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        // const newFilter = orders.filter((value) => {
        //   return value.name.toLowerCase().includes(searchWord.toLowerCase());
        // });
    
        if (searchWord === "") 
        setFilteredDataRentToday(todayOrders);
        // } else {
        //   setFilteredData(newFilter);
        // }
      };

      useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await OrderService.getByKeyword(wordEntered)  
            setFilteredDataRentToday(response.data)
            (response.data)
          } catch (error) {
            (error);
          }
          setLoading(false);
        };
        fetchData();
      }, [wordEntered]);

      const handleFilter3 = (event) => {
        const searchWord = event.target.value;
        setWordEntered3(searchWord);
        // const newFilter = orders.filter((value) => {
        //   return value.name.toLowerCase().includes(searchWord.toLowerCase());
        // });
    
        if (searchWord === "") 
          setFilteredDataHistorical(backOrders);
        // } else {
        //   setFilteredData(newFilter);
        // }
      };

      useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await FullOrderService.getByKeyword(wordEntered3)  
            setFilteredDataHistorical(response.data)
            (response.data)
          } catch (error) {
            (error);
          }
          setLoading(false);
        };
        fetchData();
      }, [wordEntered3]);

      const handleFilter2 = (event) => {
        const searchWord = event.target.value;
        setWordEntered2(searchWord);
        // const newFilter = orders.filter((value) => {
        //   return value.name.toLowerCase().includes(searchWord.toLowerCase());
        // });
        (orders)
        if (searchWord === "") {
          setFilteredData(orders);
        }
        // } else {
        //   setFilteredData(newFilter);
        // }
      };

      useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await FullOrderService.getByKeyword(wordEntered2)  
            setFilteredData(response.data)
            (response.data)
          } catch (error) {
            (error);
          }
          setLoading(false);
        };
        fetchData();
      }, [wordEntered2]);

      const scrollToTop = () => {
        window.scroll({
          top: 0,
          behavior: 'smooth'
        });
      };

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
        // user.roles.map(e => (e.name))
        ("Halo"+response.data)
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

      if(user== null ){
        return <AccessDenied></AccessDenied>
      }else{
    return <div style={{marginTop:80}}>
        <hr></hr>
        <h4>Zamówienia</h4>
        <hr></hr>
        
        <h4><b>Dzisiejsze wypożyczenia</b></h4>
        {/* {orders.length == 0 ? <h4 style={{textAlign :'center', marginTop: 100}}>Brak dzisiejszych wypożyczeń</h4> : 
         <Group orders={orders}></Group>} */}
          {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,margnLeft:'auto',marginRight:'auto'}}/> : todayOrders.length == 0 ? <h4 style={{textAlign :'center', marginTop: 100}}>Brak dzisiejszych wypożyczeń</h4> : 
        <List sx={{ width: '100%', maxWidth: 1500, bgcolor: 'background.paper' }} style={{borderBottomRightRadius:10, borderBottomLeftRadius:10,borderTopRightRadius:10, borderTopLeftRadius:10}}>
        {/* <div style={{width: '30%', float:'left', marginLeft: 20, marginTop: 10, marginBottom: 10}}>
        <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder="Wybierz opcję sortowania"
        />
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
    </FormControl> */}
        {filteredDataRentToday.map(or => 
          <span>
            {/* priz = or.prize */}
       

              <ListItem alignItems="flex-start">
               
              <ListItemText
                  primary={<h4><b>Wypożyczenie nr {or.id}</b></h4>}
                  secondary={
                  <React.Fragment>
                    {or.orders.map( (order) => {
                      return (
                      <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      >
                    <div key={order.id} className="grid-container">
                        <div className='grid-item'>
                          <h5><b>Samochód</b></h5>
                          <h5 ><b style={{fontSize:20}}>{order.car.brand} {order.car.model}</b></h5>
                          <img src={require(''+order.car.image)} alt={order.car.brand + order.car.model} style={{marginRight:-350,marginLeft:250,marginTop:-60,borderRadius:15}} width={250} height={150}></img>
                          <h6 style={{marginTop:-80}}><b>Numer rejestracyjny</b> {order.car.licensePlate}</h6> 
                          <h6><b>Spalanie w mieście</b> {order.car.combustion}l/100km</h6>
                          <h6><b>Punkty</b> <FaCarAlt style={{marginTop:-3, marginRight:2}}size={20}></FaCarAlt>{order.car.points}</h6>
                          <h6><b>Kategoria</b> {order.car.category}</h6>
                          <h6><b>Moc</b> {order.car.km}KM</h6>
                          <h6><b>Moment obrotowy</b> {order.car.nm}NM</h6>
                          <h6><b>Skrzynia biegów</b> {order.car.transmission}</h6>  
                          <h6><b>Rodzaj paliwa</b> {order.car.petrol}</h6>
                          <h6><b>Rok produkcji</b> {order.car.year}r.</h6>
                          <h6><b>Wyposażenie</b> {order.car.details}</h6>
                          <span></span>
                        </div>
                      <div className='grid-item' style={{marginTop:30,marginLeft:60}}>
                        <h5><b>Szczegóły</b></h5>
                        <h6><b>Cena</b> {order.prize}zł</h6>
                        <h6><b>Okres wypożyczenia</b> {Math.ceil(Math.abs(new Date(order.endDate) - new Date(order.startDate)) / (1000 * 60 * 60 * 24))} {Math.ceil(Math.abs(new Date(order.endDate) - new Date(order.startDate)) / (1000 * 60 * 60 * 24)) > 1  ? 'dni' : 'dzień'}</h6>
                        <h6><b>Data rozpoczęcia</b> {new Date(order.startDate).toLocaleDateString("pl-PL")}r.</h6>
                        <h6><b>Data zakończenia</b> {new Date(order.endDate).toLocaleDateString("pl-PL")}r.</h6>
                        <h6><b>Miejsce wypożyczenia</b> {format(order.rentPlace)}</h6>
                        <h6><b>Miejsce zwrotu</b> {format(order.backPlace)}</h6>
                       {/* {order.additional == undefined && order.additional.length== 0 ? '' : <h6>Dodatkowe opcje: <ul>{order.additional.map(ad => <li><h6>{ad.name} - {ad.prize}zł</h6></li>)}</ul></h6>}  */}
                      {order?.additional == null ? '' : <h6><b>Dodatkowe opcje</b>  <ul>{order.additional.map(ad => <li><h6>{ad.name} - {ad.prize}zł</h6></li>)}</ul></h6>}
                        
                         <br></br>
                        <br></br>
                        <br></br>
                      {or.orders.length > 1 ? <Button type="submit" style={{color:'red'}} onClick={() => handleDelete2(order.id, or.prize)}><FaTimesCircle size={20} style={{marginTop:-3}}></FaTimesCircle><span style={{marginLeft:5}}>Anuluj</span></Button> : ''}
                      </div>
                     
                    </div>
                    <br></br>
                      </Typography>)})}
                     
                      <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      >
                         {dialog2.isLoading && (
                        <Dialog onDialog={areUSureDelete2} message={dialog2.message}/>
                      )}
                      <div className='grid-item'>
                        <h5><b>Wypożyczający/wypożyczająca</b></h5> 
                          <h5><b style={{fontSize: 20}}>{or.user.name}  {or.user.surname}</b></h5>
                          <h6><b>E-mail</b> {or.user.email}</h6>
                          <h6><b>Numer telefonu</b> +48 {or.user.phoneNumber}</h6> 
                          <h6><b>Data urodzenia</b> {new Date(or.user.dateOfBirth).toLocaleDateString("pl-PL")}r.</h6>
                          <h6><b>PESEL</b> {or.user.pesel}</h6>
                          <h6><b>Adres</b> {or.user.postCode} {or.user.city}, ul.{or.user.street} {or.user.numberOfStreet}/{or.user.numberOfFlat}</h6>
                      </div>
                      <div style={{float:'left'}}>
                      <h6><b>Data i godzina złożenia zamówienia {formatD(new Date(or.launchDate))}</b></h6>
                      <h6 id="pr"><b>Cena całkowita {or.prize - priz}zł</b></h6>
                      </div>
                      <div style={{float:'right'}}>
                      <Button type="submit"  style={{float:'left',marginRight:50,color:'red'}}  onClick={() => handleDelete(or.id)}><FaTimesCircle size={20} style={{marginTop:-3}}></FaTimesCircle><span style={{marginLeft:5}}>Anuluj całe zamówienie</span></Button>
                      <PDFDownloadLink document={<Document >
                      <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                        <Image src={pic} style={{width:200,height:170,marginTop:20}}></Image>

                          <Text>Faktura nr {or.id}</Text>
                          <Text>Data wystawienia: {formatD(new Date(or.launchDate))}</Text>
                          <Text>Data sprzedazy: {formatD(new Date(or.launchDate))}</Text>
                          <Text>Miejsce wystawienia: Bialystok</Text>
                          <Text>     </Text>
                          <b><Text>Sprzedawca</Text></b>
                          <Text>SobRent</Text>
                          <Text>ul.Branickiego 30/34 15-654 Bialystok</Text>
                          <Text>NIP 687-888-22-55</Text>
                          <Text>Telefon +48 85 576 534 213</Text>
                          <Text>E-mail sobrent@gmail.com, www.sobrent.pl</Text>

                          <Text>Razem do zaplaty: {or.prize}zł</Text>
                          <Text>     </Text>
                          <b><Text>Nabywca</Text></b>
                          <Text>{or.user.name} {or.user.surname}</Text>
                          <Text>ul.{or.user.street} {or.user.numberOfFlat != null ? or.user.numberOfStreet+"/"+or.user.numberOfFlat : or.user.numberOfFlat} </Text>    
                          <Text>{or.user.postCode} {or.user.city}</Text>
                          <Text>+48 {or.user.phoneNumber}</Text>
                          <Text>{or.user.email}</Text>
                          <Text>Lp.  Samochód           Cena</Text>
                          <br></br>
                            {or.orders.map((ord,index) => {
                              return(
                            <Text key={index}>{++index}.    {ord.car.brand} {ord.car.model}          {ord.prize}</Text>)
                          })} 
                        </View>
                        
                          
                        
                      </Page>
                    </Document>} fileName={"Faktura_"+or.id+".pdf"}>
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <Button type="submit" style={{float:'right',marginTop:-2}} ><FaPrint size={20} style={{marginTop:-3}}></FaPrint><span style={{marginLeft:2}}>Drukuj fakturę</span></Button>)}
                      </PDFDownloadLink>
                          
                            </div>
                            </Typography>
                        </React.Fragment>
                        }
                    />
                    </ListItem>
          <Divider variant="inset" component="li" /></span>)}
          {dialog.isLoading && (
        <Dialog onDialog={areUSureDelete} message={dialog.message}/>
      )}
    </List>} 


    <h4><b>Dzisiejsze zwroty</b></h4>
        {/* {orders.length == 0 ? <h4 style={{textAlign :'center', marginTop: 100}}>Brak dzisiejszych wypożyczeń</h4> : 
         <Group orders={orders}></Group>} */}
          {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,margnLeft:'auto',marginRight:'auto'}}/> : backOrders.length == 0 ? <h4 style={{textAlign :'center', marginTop: 100}}>Brak dzisiejszych zwrotów</h4> : 
        <List sx={{ width: '100%', maxWidth: 1500, bgcolor: 'background.paper' }} style={{borderBottomRightRadius:10, borderBottomLeftRadius:10,borderTopRightRadius:10, borderTopLeftRadius:10}}>
        {/* <div style={{width: '30%', float:'left', marginLeft: 20, marginTop: 10, marginBottom: 10}}>
        <Select
        defaultValue={selectedOption1}
        onChange={setSelectedOption1}
        options={options}
        placeholder="Wybierz opcję sortowania"
        />
        </div>
        <FormControl sx={{ m: 1, width: '25ch' }} style={{marginTop: 10}}variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password" style={{textAlign:'center', marginTop: -7}}>Szukaj</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        value={wordEntered1}
        onChange={handleFilter1}
        endAdornment={
          <InputAdornment position="end"><FaSearch></FaSearch>
          </InputAdornment>
        }
        label="Szukaj"
        style={{height:38, textAlign: 'center'}}
      />
    </FormControl> */}
        {filteredDataBackToday.map(or =>
          <span>
              <ListItem alignItems="flex-start">
               
              <ListItemText
                  primary={<h4><b>Wypożyczenie nr {or.id}</b></h4>}
                  secondary={
                  <React.Fragment>
                    {or.orders.map( (order) => {
                      return (
                      <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      >
                    <div key={order.id} className="grid-container">
                        <div className='grid-item'>
                          <h5><b>Samochód</b></h5>
                          <h5 ><b style={{fontSize:20}}>{order.car.brand} {order.car.model}</b></h5>
                          <img src={require(''+order.car.image)} alt={order.car.brand + order.car.model} style={{marginRight:-350,marginLeft:250,marginTop:-60,borderRadius:15}} width={250} height={150}></img>
                          <h6 style={{marginTop:-80}}><b>Numer rejestracyjny</b> {order.car.licensePlate}</h6> 
                          <h6><b>Spalanie w mieście</b> {order.car.combustion}l/100km</h6>
                          <h6><b>Punkty</b> <FaCarAlt style={{marginTop:-3, marginRight:2}}size={20}></FaCarAlt>{order.car.points}</h6>
                          <h6><b>Kategoria</b> {order.car.category}</h6>
                          <h6><b>Moc</b> {order.car.km}KM</h6>
                          <h6><b>Moment obrotowy</b> {order.car.nm}NM</h6>
                          <h6><b>Skrzynia biegów</b> {order.car.transmission}</h6>  
                          <h6><b>Rodzaj paliwa</b> {order.car.petrol}</h6>
                          <h6><b>Rok produkcji</b> {order.car.year}r.</h6>
                          <h6><b>Wyposażenie</b> {order.car.details}</h6>
                          <span></span>
                        </div>
                      <div className='grid-item' style={{marginTop:30,marginLeft:60}}>
                        <h5><b>Szczegóły</b></h5>
                        <h6><b>Cena</b> {order.prize}zł</h6>
                        <h6><b>Okres wypożyczenia</b> {Math.ceil(Math.abs(new Date(order.endDate) - new Date(order.startDate)) / (1000 * 60 * 60 * 24))} {Math.ceil(Math.abs(new Date(order.endDate) - new Date(order.startDate)) / (1000 * 60 * 60 * 24)) > 1  ? 'dni' : 'dzień'}</h6>
                        <h6><b>Data rozpoczęcia</b> {new Date(order.startDate).toLocaleDateString("pl-PL")}r.</h6>
                        <h6><b>Data zakończenia</b> {new Date(order.endDate).toLocaleDateString("pl-PL")}r.</h6>
                        <h6><b>Miejsce wypożyczenia</b> {format(order.rentPlace)}</h6>
                        <h6><b>Miejsce zwrotu</b> {format(order.backPlace)}</h6>
                        {/* {order.additional == undefined && order.additional.length== 0 ? '' : <h6>Dodatkowe opcje: <ul>{order.additional.map(ad => <li><h6>{ad.name} - {ad.prize}zł</h6></li>)}</ul></h6>}  */}
                        {order?.additional == null ? '' : <h6><b>Dodatkowe opcje</b>  <ul>{order.additional.map(ad => <li><h6>{ad.name} - {ad.prize}zł</h6></li>)}</ul></h6>}

                         <br></br>
                        <br></br>
                        <br></br>
                      {/* {or.orders.length > 1 ? <Button type="submit" style={{color:'red'}} onClick={() => handleDelete2(order.id)}><FaTimesCircle size={20} style={{marginTop:-3}}></FaTimesCircle><span style={{marginLeft:5}}>Anuluj</span></Button> : ''} */}
                      </div>
                    </div>
                    <br></br>
                      </Typography>)})}
                      {/* {dialog2.isLoading && (
                        <Dialog onDialog={areUSureDelete2} message={dialog2.message}/>
                      )} */}
                      <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      >
                      <div className='grid-item'>
                        <h5><b>Wypożyczający/wypożyczająca</b></h5> 
                          <h5><b style={{fontSize: 20}}>{or.user.name}  {or.user.surname}</b></h5>
                          <h6><b>E-mail</b> {or.user.email}</h6>
                          <h6><b>Numer telefonu</b> +48 {or.user.phoneNumber}</h6> 
                          <h6><b>Data urodzenia</b> {new Date(or.user.dateOfBirth).toLocaleDateString("pl-PL")}r.</h6>
                          <h6><b>PESEL</b> {or.user.pesel}</h6>
                          <h6><b>Adres</b> {or.user.postCode} {or.user.city}, ul.{or.user.street} {or.user.numberOfStreet}/{or.user.numberOfFlat}</h6>
                      </div>
                      <div style={{float:'left'}}>
                      <h6><b>Data i godzina złożenia zamówienia {formatD(new Date(or.launchDate))}</b></h6>
                      <h6><b>Cena całkowita {or.prize}zł</b></h6>
                      </div>
                      <div style={{float:'right'}}>
                      {/* <Button type="submit"  style={{float:'left',marginRight:50,color:'red'}}  onClick={() => handleDelete(or.id)}><FaTimesCircle size={20} style={{marginTop:-3}}></FaTimesCircle><span style={{marginLeft:5}}>Anuluj całe zamówienie</span></Button> */}
                      <PDFDownloadLink document={<Document >
                      <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                        <Image src={pic} style={{width:200,height:170,marginTop:20}}></Image>

                          <Text>Faktura nr {or.id}</Text>
                          <Text>Data wystawienia: {formatD(new Date(or.launchDate))}</Text>
                          <Text>Data sprzedazy: {formatD(new Date(or.launchDate))}</Text>

                          <Text>Miejsce wystawienia: Bialystok</Text>
                          <Text>  </Text>
                          <b><Text>Sprzedawca</Text></b>
                          <Text>SobRent</Text>
                          <Text>ul.Branickiego 30/34 15-654 Bialystok</Text>
                          <Text>NIP 687-888-22-55</Text>
                          <Text>Telefon +48 85 576 534 213</Text>
                          <Text>E-mail sobrent@gmail.com, www.sobrent.pl</Text>
                          <Text>Razem do zaplaty: {or.prize}zł</Text>
                          <Text>  </Text>

                          <b><Text>Nabywca</Text></b>
                          <Text>{or.user.name} {or.user.surname}</Text>
                          <Text>ul.{or.user.street} {or.user.numberOfFlat != null ? or.user.numberOfStreet+"/"+or.user.numberOfFlat : or.user.numberOfFlat} </Text>    
                          <Text>{or.user.postCode} {or.user.city}</Text>
                          <Text>+48 {or.user.phoneNumber}</Text>
                          <Text>{or.user.email}</Text>
                          <Text>Lp.  Samochód           Cena</Text>
                          <br></br>
                            {or.orders.map((ord,index) => {
                              return(
                            <Text key={index}>{++index}.    {ord.car.brand} {ord.car.model}          {ord.prize}</Text>)
                          })} 
                        </View>
                      </Page>
                    </Document>} fileName="Faktura.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <Button type="submit" style={{float:'right',marginTop:-2}} ><FaPrint size={20} style={{marginTop:-3}}></FaPrint><span style={{marginLeft:2}}>Drukuj fakturę</span></Button>)}
                      </PDFDownloadLink>
                          
                            </div>
                            </Typography>
                        </React.Fragment>
                        }
                    />
                    </ListItem>
          <Divider variant="inset" component="li" /></span>)}
          {/* {dialog2.isLoading && (
        <Dialog onDialog={areUSureDelete} message={dialog.message}/>
      )} */}
    </List>} 

    

    


    <h4><b>Aktualne wypożyczenia</b></h4>
        {/* {orders.length == 0 ? <h4 style={{textAlign :'center', marginTop: 100}}>Brak dzisiejszych wypożyczeń</h4> : 
         <Group orders={orders}></Group>} */}
          {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,margnLeft:'auto',marginRight:'auto'}}/> : orders.length == 0 ? <h4 style={{textAlign :'center', marginTop: 100}}>Brak aktualnych wypożyczeń</h4> : 
        <List sx={{ width: '100%', maxWidth: 1500, bgcolor: 'background.paper' }} style={{borderBottomRightRadius:10, borderBottomLeftRadius:10,borderTopRightRadius:10, borderTopLeftRadius:10}}>
        <div style={{width: '30%', float:'left', marginLeft: 20, marginTop: 10, marginBottom: 10}}>
        <Select
        defaultValue={selectedOption2}
        onChange={setSelectedOption2}
        options={options}
        placeholder="Wybierz opcję sortowania"
        />
        </div>
        <FormControl sx={{ m: 1, width: '25ch' }} style={{marginTop: 10}}variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password" style={{textAlign:'center', marginTop: -7}}>Szukaj</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        value={wordEntered2}
        onChange={handleFilter2}
        endAdornment={
          <InputAdornment position="end"><FaSearch></FaSearch>
          </InputAdornment>
        }
        label="Szukaj"
        style={{height:38, textAlign: 'center'}}
      />
    </FormControl>
        {filteredData.map(or =>
          <span>
              <ListItem alignItems="flex-start">
               
              <ListItemText
                  primary={<h4><b>Wypożyczenie nr {or.id}</b></h4>}
                  secondary={
                  <React.Fragment>
                    {or.orders.map( (order) => {
                      return (
                      <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      >
                    <div key={order.id} className="grid-container">
                        <div className='grid-item'>
                          <h5><b>Samochód</b></h5>
                          <h5 ><b style={{fontSize:20}}>{order.car.brand} {order.car.model}</b></h5>
                          <img src={require(''+order.car.image)} alt={order.car.brand + order.car.model} style={{marginRight:-350,marginLeft:250,marginTop:-60,borderRadius:15}} width={250} height={150}></img>
                          <h6 style={{marginTop:-80}}><b>Numer rejestracyjny</b> {order.car.licensePlate}</h6> 
                          <h6><b>Spalanie w mieście</b> {order.car.combustion}l/100km</h6>
                          <h6><b>Punkty</b> <FaCarAlt style={{marginTop:-3, marginRight:2}}size={20}></FaCarAlt>{order.car.points}</h6>
                          <h6><b>Kategoria</b> {order.car.category}</h6>
                          <h6><b>Moc</b> {order.car.km}KM</h6>
                          <h6><b>Moment obrotowy</b> {order.car.nm}NM</h6>
                          <h6><b>Skrzynia biegów</b> {order.car.transmission}</h6>  
                          <h6><b>Rodzaj paliwa</b> {order.car.petrol}</h6>
                          <h6><b>Rok produkcji</b> {order.car.year}r.</h6>
                          <h6><b>Wyposażenie</b> {order.car.details}</h6>
                          <span></span>
                        </div>
                      <div className='grid-item' style={{marginTop:30,marginLeft:60}}>
                        <h5><b>Szczegóły</b></h5>
                        <h6><b>Cena</b> {order.prize}zł</h6>
                        <h6><b>Okres wypożyczenia</b>  {Math.ceil(Math.abs(new Date(order.endDate) - new Date(order.startDate)) / (1000 * 60 * 60 * 24))} {Math.ceil(Math.abs(new Date(order.endDate) - new Date(order.startDate)) / (1000 * 60 * 60 * 24)) > 1  ? 'dni' : 'dzień'}</h6>
                        <h6><b>Data rozpoczęcia</b>  {new Date(order.startDate).toLocaleDateString("pl-PL")}r.</h6>
                        <h6><b>Data zakończenia</b>  {new Date(order.endDate).toLocaleDateString("pl-PL")}r.</h6>
                        <h6><b>Miejsce wypożyczenia</b>  {format(order.rentPlace)}</h6>
                        <h6><b>Miejsce zwrotu</b>  {format(order.backPlace)}</h6>
                        {/* {order.additional == undefined && order.additional.length== 0 ? '' : <h6>Dodatkowe opcje: <ul>{order.additional.map(ad => <li><h6>{ad.name} - {ad.prize}zł</h6></li>)}</ul></h6>}  */}
                        {order?.additional == null ? '' : <h6><b>Dodatkowe opcje</b>  <ul>{order.additional.map(ad => <li><h6>{ad.name} - {ad.prize}zł</h6></li>)}</ul></h6>}

                         <br></br>
                        <br></br>
                        <br></br>
                      {or.orders.length > 1 ? <Button type="submit" style={{color:'red'}} onClick={() => handleDelete3(order.id)}><FaTimesCircle size={20} style={{marginTop:-3}}></FaTimesCircle><span style={{marginLeft:5}}>Anuluj</span></Button> : ''}
                      </div>
                    </div>
                    <br></br>
                      </Typography>)})}
                      {dialog3.isLoading && (
                        <Dialog onDialog={areUSureDelete3} message={dialog3.message}/>
                      )}
                      <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      >
                      <div className='grid-item'>
                        <h5><b>Wypożyczający/wypożyczająca</b> </h5> 
                          <h5><b style={{fontSize: 20}}>{or.user.name}  {or.user.surname}</b></h5>
                          <h6><b>E-mail</b>  {or.user.email}</h6>
                          <h6><b>Numer telefonu</b>  +48 {or.user.phoneNumber}</h6> 
                          <h6><b>Data urodzenia</b>  {new Date(or.user.dateOfBirth).toLocaleDateString("pl-PL")}r.</h6>
                          <h6><b>PESEL</b>  {or.user.pesel}</h6>
                          <h6><b>Adres</b>  {or.user.postCode} {or.user.city}, ul.{or.user.street} {or.user.numberOfStreet}/{or.user.numberOfFlat}</h6>
                      </div>
                      <div style={{float:'left'}}>
                      <h6><b>Data i godzina złożenia zamówienia {formatD(new Date(or.launchDate))}</b></h6>
                      <h6><b>Cena całkowita {or.prize}zł</b></h6>
                      </div>
                      <div style={{float:'right'}}>
                      <Button type="submit"  style={{float:'left',marginRight:50,color:'red'}}  onClick={() => handleDelete(or.id, or.prize)}><FaTimesCircle size={20} style={{marginTop:-3}}></FaTimesCircle><span style={{marginLeft:5}}>Anuluj całe zamówienie</span></Button>
                      <PDFDownloadLink document={<Document >
                      <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                        <Image src={pic} style={{width:200,height:170,marginTop:20}}></Image>

                          <Text>Faktura nr {or.id}</Text>
                          <Text>Data wystawienia: {formatD(new Date(or.launchDate))}</Text>
                          <Text>Data sprzedazy: {formatD(new Date(or.launchDate))}</Text>
                          <Text>Miejsce wystawienia: Bialystok</Text>
                          <Text>  </Text>

                          <b><Text>Sprzedawca</Text></b>
                          <Text>SobRent</Text>
                          <Text>ul.Branickiego 30/34 15-654 Białystok</Text>
                          <Text>NIP 687-888-22-55</Text>
                          <Text>Telefon +48 85 576 534 213</Text>
                          <Text>E-mail sobrent@gmail.com, www.sobrent.pl</Text>

                          <Text>Razem do zaplaty: {or.prize}zł</Text>
                          <Text>  </Text>

                          <b><Text>Nabywca</Text></b>
                          <Text>{or.user.name} {or.user.surname}</Text>
                          <Text>ul.{or.user.street} {or.user.numberOfFlat != null ? or.user.numberOfStreet+"/"+or.user.numberOfFlat : or.user.numberOfFlat} </Text>    
                          <Text>{or.user.postCode} {or.user.city}</Text>
                          <Text>+48 {or.user.phoneNumber}</Text>
                          <Text>{or.user.email}</Text>
                          <Text>Lp.  Samochód           Cena</Text>
                          <br></br>
                            {or.orders.map((ord,index) => {
                              return(
                            <Text key={index}>{++index}.    {ord.car.brand} {ord.car.model}          {ord.prize}</Text>)
                          })} 
                        </View>
                        
                          
                        
                      </Page>
                    </Document>} fileName="faktura.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <Button type="submit" style={{float:'right',marginTop:-2}} ><FaPrint size={20} style={{marginTop:-3}}></FaPrint><span style={{marginLeft:2}}>Drukuj fakturę</span></Button>)}
                      </PDFDownloadLink>
                          
                            </div>
                            </Typography>
                        </React.Fragment>
                        }
                    />
                    </ListItem>
          <Divider variant="inset" component="li" /></span>)}
          {dialog.isLoading && (
        <Dialog onDialog={areUSureDelete} message={dialog.message}/>
      )}
    </List>} 





    <h4><b>Wszystkie wypożyczenia</b></h4>
        {/* {orders.length == 0 ? <h4 style={{textAlign :'center', marginTop: 100}}>Brak dzisiejszych wypożyczeń</h4> : 
         <Group orders={orders}></Group>} */}
          {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,margnLeft:'auto',marginRight:'auto'}}/> : historicalOrders.length == 0 ? <h4 style={{textAlign :'center', marginTop: 100}}>Brak archiwalnych wypożyczeń</h4> : 
        <List sx={{ width: '100%', maxWidth: 1500, bgcolor: 'background.paper' }} style={{borderBottomRightRadius:10, borderBottomLeftRadius:10,borderTopRightRadius:10, borderTopLeftRadius:10}}>
        <div style={{width: '30%', float:'left', marginLeft: 20, marginTop: 10, marginBottom: 10}}>
        <Select
        defaultValue={selectedOption3}
        onChange={setSelectedOption3}
        options={options}
        placeholder="Wybierz opcję sortowania"
        />
        </div>
        <FormControl sx={{ m: 1, width: '25ch' }} style={{marginTop: 10}}variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password" style={{textAlign:'center', marginTop: -7}}>Szukaj</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        value={wordEntered3}
        onChange={handleFilter3}
        endAdornment={
          <InputAdornment position="end"><FaSearch></FaSearch>
          </InputAdornment>
        }
        label="Szukaj"
        style={{height:38, textAlign: 'center'}}
      />
    </FormControl>
        {filteredDataHistorical.map(or =>
          <span>
              <ListItem alignItems="flex-start">
               
              <ListItemText
                  primary={<h4><b>Wypożyczenie nr {or.id}</b></h4>}
                  secondary={
                  <React.Fragment>
                    {or.orders.map( (order) => {
                      return (
                      <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      >
                    <div key={order.id} className="grid-container">
                        <div className='grid-item'>
                          <h5><b>Samochód</b> </h5>
                          <h5><b style={{fontSize:20}}>{order.car.brand} {order.car.model}</b></h5>
                          <img src={require(''+order.car.image)} alt={order.car.brand + order.car.model} style={{marginRight:-350,marginLeft:250,marginTop:-60,borderRadius:15}} width={250} height={150}></img>
                          <h6 style={{marginTop:-80}}><b>Numer rejestracyjny</b>  {order.car.licensePlate}</h6> 
                          <h6><b>Spalanie w mieście</b>  {order.car.combustion}l/100km</h6>
                          <h6><b>Punkty</b>  <FaCarAlt style={{marginTop:-3, marginRight:2}}size={20}></FaCarAlt>{order.car.points}</h6>
                          <h6><b>Kategoria</b>  {order.car.category}</h6>
                          <h6><b>Moc</b>  {order.car.km}KM</h6>
                          <h6><b>Moment obrotowy</b>  {order.car.nm}NM</h6>
                          <h6><b>Skrzynia biegów</b>  {order.car.transmission}</h6>  
                          <h6><b>Rodzaj paliwa</b>  {order.car.petrol}</h6>
                          <h6><b>Rok produkcji</b>  {order.car.year}r.</h6>
                          <h6><b>Wyposażenie</b>  {order.car.details}</h6>
                          <span></span>
                        </div>
                      <div className='grid-item' style={{marginTop:30,marginLeft:60}}>
                        <h5><b>Szczegóły</b> </h5>
                        <h6><b>Cena</b>  {order.prize}zł</h6>
                        <h6><b>Okres wypożyczenia</b>  {Math.ceil(Math.abs(new Date(order.endDate) - new Date(order.startDate)) / (1000 * 60 * 60 * 24))} {Math.ceil(Math.abs(new Date(order.endDate) - new Date(order.startDate)) / (1000 * 60 * 60 * 24)) > 1  ? 'dni' : 'dzień'}</h6>
                        <h6><b>Data rozpoczęcia</b>  {new Date(order.startDate).toLocaleDateString("pl-PL")}r.</h6>
                        <h6><b>Data zakończenia</b>  {new Date(order.endDate).toLocaleDateString("pl-PL")}r.</h6>
                        <h6><b>Miejsce wypożyczenia</b>  {format(order.rentPlace)}</h6>
                        <h6><b>Miejsce zwrotu</b>  {format(order.backPlace)}</h6>
                        {/* {order.additional === undefined && order.additional.length== 0 ? '' : <h6>Dodatkowe opcje: <ul>{order.additional.map(ad => <li><h6>{ad.name} - {ad.prize}zł</h6></li>)}</ul></h6>}  */}
                        {order?.additional == null ? '' : <h6><b>Dodatkowe opcje</b>  <ul>{order.additional.map(ad => <li><h6>{ad.name} - {ad.prize}zł</h6></li>)}</ul></h6>}

                         <br></br>
                        <br></br>
                        <br></br>
                      {or.orders.length > 1 ? <Button type="submit" style={{color:'red'}} onClick={() => handleDelete2(order.id, or.prize)}><FaTimesCircle size={20} style={{marginTop:0}}></FaTimesCircle><span style={{marginLeft:5}}>Anuluj</span></Button> : ''}
                      </div>
                    </div>
                    <br></br>
                      </Typography>)})}
                      {dialog2.isLoading && (
                        <Dialog onDialog={areUSureDelete2} message={dialog2.message}/>
                      )}
                      <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      >
                      <div className='grid-item'>
                        <h5><b>Wypożyczający/wypożyczająca</b> </h5> 
                          <h5><b style={{fontSize: 20}}>{or.user.name}  {or.user.surname}</b></h5>
                          <h6><b>E-mail</b>  {or.user.email}</h6>
                          <h6><b>Numer telefonu</b>  +48 {or.user.phoneNumber}</h6> 
                          <h6><b>Data urodzenia</b>  {new Date(or.user.dateOfBirth).toLocaleDateString("pl-PL")}r.</h6>
                          <h6><b>PESEL</b>  {or.user.pesel}</h6>
                          <h6><b>Adres</b>  {or.user.postCode} {or.user.city}, ul.{or.user.street} {or.user.numberOfStreet}/{or.user.numberOfFlat}</h6>
                      </div>
                      <div style={{float:'left'}}>
                      <h6><b>Data i godzina złożenia zamówienia {formatD(new Date(or.launchDate))}</b></h6>
                      <h6><b>Cena całkowita {or.prize}zł</b></h6>
                      </div>
                      <div style={{float:'right'}}>
                      <Button type="submit"  style={{float:'left',marginRight:50,color:'red'}}  onClick={() => handleDelete(or.id)}><FaTimesCircle size={20} style={{marginTop:-3}}></FaTimesCircle><span style={{marginLeft:5}}>Anuluj całe zamówienie</span></Button>
                      <PDFDownloadLink document={<Document >
                      <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                        <Image src={pic} style={{width:200,height:170,marginTop:20}}></Image>

                          <Text>Faktura nr {or.id}</Text>
                          <Text>Data wystawienia: {formatD(new Date(or.launchDate))}</Text>
                          <Text>Data sprzedazy: {formatD(new Date(or.launchDate))}</Text>
                          <Text>Miejsce wystawienia: Bialystok</Text>
                          <Text>  </Text>

                          <b><Text>Sprzedawca</Text></b>
                          <Text>SobRent</Text>
                          <Text>ul.Branickiego 30/34 15-654 Bialystok</Text>
                          <Text>NIP 687-888-22-55</Text>
                          <Text>Telefon +48 85 576 534 213</Text>
                          <Text>E-mail sobrent@gmail.com, www.sobrent.pl</Text>

                          <Text>Razem do zaplaty: {or.prize}zł</Text>
                          <Text>  </Text>

                          <b><Text>Nabywca</Text></b>
                          <Text>{or.user.name} {or.user.surname}</Text>
                          <Text>ul.{or.user.street} {or.user.numberOfFlat != null ? or.user.numberOfStreet+"/"+or.user.numberOfFlat : or.user.numberOfFlat} </Text>    
                          <Text>{or.user.postCode} {or.user.city}</Text>
                          <Text>+48 {or.user.phoneNumber}</Text>
                          <Text>{or.user.email}</Text>
                          <Text>Lp.  Samochód           Cena</Text>
                          <br></br>
                            {or.orders.map((ord,index) => {
                              return(
                            <Text key={index}>{++index}.    {ord.car.brand} {ord.car.model}          {ord.prize}</Text>)
                          })} 
                        </View>
                        
                          
                        
                      </Page>
                    </Document>} fileName="faktura.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <Button type="submit" style={{float:'right',marginTop:-2}} ><FaPrint size={20} style={{marginTop:-3}}></FaPrint><span style={{marginLeft:2}}>Drukuj fakturę</span></Button>)}
                      </PDFDownloadLink>
                          
                            </div>
                            </Typography>
                        </React.Fragment>
                        }
                    />
                    </ListItem>
          <Divider variant="inset" component="li" /></span>)}
          {dialog.isLoading && (
        <Dialog onDialog={areUSureDelete} message={dialog.message}/>
      )}
    </List>} 

    
    
        <div ><FaChevronCircleUp size={50} onClick={scrollToTop} style={{marginLeft: 1300,marginBottom: 50}}></FaChevronCircleUp></div>
        <Footer></Footer>
    </div>}
}