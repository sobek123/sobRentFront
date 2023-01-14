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
import { Card } from '@material-ui/core';
import {CardContent} from '@material-ui/core';
import ReactSelect from 'react-select';
import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { FaChevronCircleUp, FaPrint, FaSearch, FaTimesCircle } from 'react-icons/fa';
import Dialog from './Dialog';
import { Document,Page,View,Text,StyleSheet, PDFDownloadLink, Image } from "@react-pdf/renderer";
import pic from "./output-onlinepngtools(2).png";

const options = [
    { value: 'Data i godzina złożenia zamówienia rosnąco', label: 'Data i godzina złożenia zamówienia rosnąco' },
    { value: 'Data i godzina złożenia zamówienia malejąco', label: 'Data i godzina złożenia zamówienia malejąco' },
    { value: 'Cena rosnąco', label: 'Cena rosnąco' },
    { value: 'Cena malejąco', label: 'Cena malejąco' }
    
  ];
  
  
export function Group(props){
    (props.orders)
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
            FullOrderService.deleteFullOrder(idProductRef.current).then(response => { 
              (response)
            })
            .catch(error => {
                (error.response)
            });
          setOrders(orders.filter((additional) => {
            return additional.id !== idProductRef.current;
        }))
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
        setDialog({
          message,
          isLoading
        });
      };
    const handleDelete2 = (id) => {
        handleDialog2("Czy na pewno chcesz usunąć ten samochód?", true);
        idProductRef2.current = id;
      };
    
      const areUSureDelete2 = (choose) => {
        if (choose) {
            OrderService.deleteOrder(idProductRef2.current).then(response => { 
              (response)
            })
            .catch(error => {
                (error.response)
            });
        //   setOrders(additionals.filter((additional) => {
        //     return additional.id !== idProductRef2.current;
        // }))
          handleDialog("", false);
        } else {
          handleDialog("", false);
        }
      };
      const [selectedOption, setSelectedOption] = useState(null);
        const [orders,setOrders] = React.useState(props.orders)
 
        const [loading,setLoading] = useState(true)
        useEffect(() => {
          const fetchData =  async () => {
            setLoading(true);
            try {
              if (selectedOption.value === "Cena rosnąco") {
                const response = await FullOrderService.sortByPrizeAscending();
                setOrders(response.data);
                props.orders = response.data
            } else if (selectedOption.value === "Cena malejąco") {
                const response1 = await FullOrderService.sortByPrizeDescending();
                setOrders(response1.data);
                (response1.data)
                props.orders = response1.data
            } else if (selectedOption.value === "Data i godzina złożenia zamówienia rosnąco") {
              const response2 = await FullOrderService.sortByLaunchDateAscending();
              setOrders(response2.data);
              (response2.data)
              props.orders = response2.data
            } else if (selectedOption.value === "Data i godzina złożenia zamówienia malejąco") {
              const response3 = await OrderService.sortByLaunchDateDescending();
              setOrders(response3.data);
              (response3.data)
              props.orders = response3.data
            }
            } catch (error) {
              (error);
            }
            setLoading(false);
          };
          fetchData();
        }, [selectedOption]);
    
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
        // useEffect(() => {
        //     const fetchData = async () => {
        //       setLoading(true);
        //       try {
        //         // const response = await FullOrderService.getFullOrders()
        //         // setOrders(response.data);
        //         // setOrders(props.orders)
        //         setFilteredData(props.orders)
        //         const response2 = await FullOrderService.getFullOrdersRentToday()
        //         setTodayOrders(response2.data);
        //         setFilteredDataRentToday(response2.data)
        //         const response3 = await FullOrderService.getFullOrdersBackToday()
        //         setFilteredDataBackToday(response3.data);
        //         setFilteredData(response3.data)
        //         // (response.data)
        //       } catch (error) {
        //         (error);
        //       }
        //       setLoading(false);
        //     };
        //     fetchData();
        //   }, []);
    
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
          
    
          const [filteredData, setFilteredData] = useState(props.orders);
          const [filteredDataBackToday, setFilteredDataBackToday] = useState([]);
          const [filteredDataRentToday, setFilteredDataRentToday] = useState([]);
    
          const [wordEntered, setWordEntered] = useState("");

          const handleFilter = (event) => {
            const searchWord = event.target.value;
            setWordEntered(searchWord);
            // const newFilter = orders.filter((value) => {
            //   return value.name.toLowerCase().includes(searchWord.toLowerCase());
            // });
        
            if (searchWord === "") 
            props.orders = props.orders

            // } else {
            //   setFilteredData(newFilter);
            // }
          };
    
          useEffect(() => {
            const fetchData = async () => {
              setLoading(true);
              try {
                (wordEntered)
                const response = await FullOrderService.getByKeyword(wordEntered)  
                props.orders = response.data
                ("jh"+response.data)
                ("fsfgsdg")
              } catch (error) {
                (error);
              }
              setLoading(false);
            };
            fetchData();
          }, [wordEntered]);
    return (
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
        {props.orders.map(or =>
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
                          <h5>Samochód</h5>
                          <h5 ><b style={{fontSize:20}}>{order.car.brand} {order.car.model}</b></h5>
                          <img src={require(''+order.car.image)} alt={order.car.brand + order.car.model} style={{marginRight:-350,marginLeft:250,marginTop:-60,borderRadius:15}} width={250} height={150}></img>
                          <h6 style={{marginTop:-80}}>Numer rejestracyjny: {order.car.licensePlate}</h6> 
                          <h6>Spalanie w mieście: {order.car.combustion}l/100km</h6>
                          <h6>Punkty: {order.car.points}</h6>
                          <h6>Kategoria: {order.car.category}</h6>
                          <h6>Moc: {order.car.km}KM</h6>
                          <h6>Moment obrotowy: {order.car.nm}NM</h6>
                          <h6>Skrzynia biegów: {order.car.transmission}</h6>  
                          <h6>Rodzaj paliwa: {order.car.petrol}</h6>
                          <h6>Rok produkcji: {order.car.year}r.</h6>
                          <h6>Wyposażenie: {order.car.details}</h6>
                          <span></span>
                        </div>
                      <div className='grid-item' style={{marginTop:30,marginLeft:60}}>
                        <h5>Szczegóły</h5>
                        <h6>Cena: {order.prize}zł</h6>
                        <h6>Okres wypożyczenia: {Math.ceil(Math.abs(new Date(order.end_date) - new Date(order.start_date)) / (1000 * 60 * 60 * 24))} {Math.ceil(Math.abs(new Date(order.end_date) - new Date(order.start_date)) / (1000 * 60 * 60 * 24)) > 1  ? 'dni' : 'dzień'}</h6>
                        <h6>Data rozpoczęcia: {new Date(order.start_date).toLocaleDateString("pl-PL")}r.</h6>
                        <h6>Data zakończenia: {new Date(order.end_date).toLocaleDateString("pl-PL")}r.</h6>
                        <h6>Miejsce wypożyczenia: {format(order.rentPlace)}</h6>
                        <h6>Miejsce zwrotu: {format(order.backPlace)}</h6>
                        <br></br>
                        <br></br>
                        <br></br>
                      {or.orders.length > 1 ? <Button type="submit" style={{color:'red'}} onClick={() => handleDelete2(order.id)}><FaTimesCircle size={20} style={{marginTop:-3}}></FaTimesCircle><span style={{marginLeft:5}}>Anuluj</span></Button> : ''}
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
                        <h5>Wypożyczający/wypożyczająca</h5> 
                          <h5><b style={{fontSize: 20}}>{or.user.name}  {or.user.surname}</b></h5>
                          <h6>E-mail: {or.user.email}</h6>
                          <h6>Numer telefonu: +48 {or.user.phoneNumber}</h6> 
                          <h6>Data urodzenia: {new Date(or.user.dateOfBirth).toLocaleDateString("pl-PL")}r.</h6>
                          <h6>PESEL: {or.user.pesel}</h6>
                          <h6>Adres: {or.user.postCode} {or.user.city}, ul.{or.user.street} {or.user.numberOfStreet}/{or.user.numberOfFlat}</h6>
                      </div>
                      <div style={{float:'left'}}>
                      <h6><b>Data i godzina złożenia zamówienia: {formatD(new Date(or.launchDate))}</b></h6>
                      <h6><b>Cena całkowita: {or.prize}zł</b></h6>
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
                          <b><Text>Sprzedawca</Text></b>
                          <Text>SobRent</Text>
                          <Text>ul.Branickiego 30/34 15-654 Białystok</Text>
                          <Text>NIP 687-888-22-55</Text>
                          <Text>Telefon +48 85 576 534 213</Text>
                          <Text>E-mail sobrent@gmail.com, www.sobrent.pl</Text>



                          <Text>Razem do zaplaty: {or.prize}zł</Text>
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
    </List>)
}