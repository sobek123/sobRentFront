import { useState, useEffect } from "react";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React from "react";
import CarService from "../services/CarService";
import FullOrderService from "../services/FullOrderService";
import { Success } from "./Success";
import { FaCarAlt, FaChevronCircleUp, FaPrint, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { Document,Page,View,Text,StyleSheet, PDFDownloadLink, Image } from "@react-pdf/renderer";
import { Button } from "@mui/material";
import pic from "./output-onlinepngtools(2).png";
import { Footer } from "./Footer";
import { AccessDenied } from "./AccessDenied";
import { Spinner } from "react-bootstrap";

export function Rentings(){

  //   const [currentUser, setCurrentUser] = useState(undefined);
  const [user,setUser] = useState('')
  const [loading,setLoading] = useState(true)
  const [fault,setFault] = useState("")
  const [fault2,setFault2] = useState("")
  const [show,setShow] = useState(false)
  const [fullOrders, setFullOrders] =useState([])
  const [isActive,setIsActive] = useState(false)
  const [activeOrders,setActiveOrders] = useState([])
  const [historicOrders,setHistoricOrders] = useState([])
  const [id,setId] = useState('')

  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const user = await AuthService.getCurrentUser();
        console.log("u"+user)
        const response = await UserService.findByEmail(user.email)
        setUser(response.data);
        console.log(user)
        user.roles.map(e => console.log(e.name))
        console.log("Halo"+response.data)
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
 
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


  const handleFault = (id) => {
        document.getElementById("exitButton"+id).hidden = false
        document.getElementById("addButton"+id).hidden = false
        document.getElementById("fault"+id).hidden = false
        document.getElementById("callFault"+id).hidden = true
  }

 

  const handleExit = (id) => {
    document.getElementById("exitButton"+id).hidden = true
    document.getElementById("addButton"+id).hidden = true
    document.getElementById("fault"+id).hidden = true
    document.getElementById("callFault"+id).hidden = false
  }

  const handleExit2 = (id) => {
    document.getElementById("exitButton2"+id).hidden = true
    document.getElementById("addButton2"+id).hidden = true
    document.getElementById("fault2"+id).hidden = true
    document.getElementById("callFault2"+id).hidden = false
  }

  const handleFault2 = (id) => {
    document.getElementById("exitButton2"+id).hidden = false
    document.getElementById("addButton2"+id).hidden = false
    document.getElementById("fault2"+id).hidden = false
    document.getElementById("callFault2"+id).hidden = true
    
}

const handleChangeFault = event => {
  setFault(event.target.value);

  console.log('value is:', event.target.value);
};

const handleChangeFault2 = event => {
  setFault2(event.target.value);

  console.log('value is:', event.target.value);
};
const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const handleFaultAccept = (car,index) => {
    
    car.fault = fault
    console.log(car)
    CarService.updateCar(car,car.id)
    .then((response) => {
    console.log(response);
    // navigaye("/sport");
    <Success show={modalShow} onHide={() => setModalShow(false)} text={ <span><h5><b>GRATULACJE</b></h5>
            Usterka została poprawnie zgłoszona!</span>}/>
    })
    .catch((error) => {
    console.log(error);
    });
    document.getElementById("exitButton"+index).hidden = true
    document.getElementById("addButton"+index).hidden = true
    document.getElementById("fault"+index).hidden = true
    document.getElementById("callFault"+index).hidden = false
  }

  


  const handleFaultAccept2 = (car,index) => {
    
    car.fault = fault2
    console.log(car)
    CarService.updateCar(car,car.id)
    .then((response) => {
    console.log(response);
    // navigaye("/sport");
    <Success show={modalShow2} onHide={() => setModalShow2(false)} text={ <span><h5><b>GRATULACJE</b></h5>
            Usterka została poprawnie zgłoszona!</span>}/>
    })
    .catch((error) => {
    console.log(error);
    });
    document.getElementById("exitButton2"+index).hidden = true
    document.getElementById("addButton2"+index).hidden = true
    document.getElementById("fault2"+index).hidden = true
    document.getElementById("callFault2"+index).hidden = false
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const response = await UserService.getUserById(2)
        // setUser(response.data);
        // // console.log(user.orders.length())
        // console.log(response.data)
        console.log(user.id)
        const response2 = await FullOrderService.getActiveOrdersUser(user.id)
        const g = response2.data.map(el => {if(el.additional == undefined) el.additional = null})
        console.log(response2.data)
        setActiveOrders(response2.data);
        // console.log(user.orders.length())
        console.log(response2.data)
        const response3 = await FullOrderService.getHistoricOrdersUser(user.id)
        setHistoricOrders(response3.data);
        // console.log(user.orders.length())
        console.log(response3.data)
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await FullOrderService.getFullOrders()
        
        // console.log(user.orders.length())
        setFullOrders(response.data.filter(order => order.user.email === user.email))
        console.log(response.data.filter(order => order.user.email === user.email))
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

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
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  };
  function formatD(date){
    let m =  date.getMonth()+1
    var min = ""
    console.log(min)
    if(date.getMinutes() < 10){
      min = "0"+date.getMinutes()
    }else{
      min = date.getMinutes()
    }
    return date.getDate()+"/"+ m + "/" + date.getFullYear()+"r." + " " + date.getHours()+ ":"+min
  }

  if(user === null){
    return <AccessDenied></AccessDenied>
  }else{
  
    return <div style={{marginTop:80,backgroundColor: isActive ? 'black' : 'white'}}>
        <hr ></hr>
        <h2 style={{ width:'100%', textAlign:'center'}} >Moje wypożyczenia</h2>
        <hr ></hr>
        {/* {isActive ? <div style={{right:0}}><FaToggleOn onClick={() => setIsActive(false)} style={{marginTop:100,right: 0}} size={30}></FaToggleOn></div> : <FaToggleOff size={30} onClick={() => setIsActive(true)} style={{marginTop:100}}></FaToggleOff>} */}
        <h4>Aktualne wypożyczenia</h4>
        {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,margnLeft:'auto',marginRight:'auto'}}/> : activeOrders.length == 0 ? <h4 style={{textAlign :'center', marginTop: 100}}>Brak aktualnych wypożyczeń</h4> :  
        <List sx={{ width: '100%', maxWidth: 1500, bgcolor: 'background.paper' }} style={{borderBottomRightRadius:10, borderBottomLeftRadius:10,borderTopRightRadius:10, borderTopLeftRadius:10}}>
        {activeOrders.map(ord =>
              <span>
                  <ListItem alignItems="flex-start">
                  <ListItemText
                      primary={<h4><b>Wypożyczenie nr {ord.id}</b></h4>}
                      secondary={
                      <React.Fragment>
                        {ord.orders.map( (order,index) => {
                          return (
                          <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                          >
                          <span key={order.id}>
                              <span>
                              <h5><b>Samochód</b></h5>
                                <h5><b>{order.car.brand} {order.car.model}</b></h5>
                          <img src={require(''+order.car.image)} alt={order.car.brand + order.car.model} style={{marginRight:-350,marginLeft:250,marginTop:-30,borderRadius:15}} width={250} height={150}></img>

                              <h6 style={{marginTop:-120}}><b>Numer rejestracyjny</b> {order.car.licensePlate}</h6> 
                              <h6><b>Spalanie w mieście</b> {order.car.combustion}l/100km</h6>
                              <h6><b>Punkty</b> <FaCarAlt size={20} style={{marginTop:-3}}></FaCarAlt> {order.car.points}</h6>
                              <h6><b>Kategoria</b> {order.car.category}</h6>
                              <h6><b>Moc</b> {order.car.km}KM</h6>
                              <h6><b>Moment obrotowy</b> {order.car.nm}NM</h6>
                              <h6><b>Skrzynia biegów</b> {order.car.transmission}</h6>
                              <h6><b>Rodzaj paliwa</b> {order.car.petrol}</h6>
                              <h6><b>Rok produkcji</b> {order.car.year}r.</h6>
                              <h6><b>Wyposażenie</b> {order.car.details}</h6>
                              <textarea max="1000" id={"fault"+index} hidden  onChange={handleChangeFault}></textarea>
                            </span>
                            <div style={{float:'right',marginTop: -310}}>
                            <h5><b>Szczegóły</b></h5>
                            <h6><b>Cena</b> {order.prize}zł</h6>
                            <h6><b>Okres wypożyczenia</b> {Math.ceil(Math.abs(new Date(order.endDate) - new Date(order.startDate)) / (1000 * 60 * 60 * 24))} {Math.ceil(Math.abs(new Date(order.endDate) - new Date(order.startDate)) / (1000 * 60 * 60 * 24)) > 1  ? 'dni' : 'dzień'}</h6>
                            <h6><b>Data rozpoczęcia</b> {new Date(order.startDate).toLocaleDateString("pl-PL")}r.</h6>
                            <h6><b>Data zakończenia</b> {new Date(order.endDate).toLocaleDateString("pl-PL")}r.</h6>
                            <h6><b>Miejsce wypożyczenia</b> {format(order.rentPlace)}</h6>
                            <h6><b>Miejsce zwrotu</b> {format(order.backPlace)}</h6>
                      {order?.additional == null ? '' : <h6><b>Dodatkowe opcje</b>  <ul>{order.additional.map(ad => <li><h6>{ad.name} - {ad.prize}zł</h6></li>)}</ul></h6>}

                          </div>
                          {/* <div style={{float: 'right', marginTop: -70}}> */}
                          {/* new Date(order.startDate) - 3 > new Date() ? */}
                             <Button style={{display: 'inline-block', marginRight: 25, color: 'red'}} onClick={() => handleFault(index)} id={"callFault"+index}>Zgłoś usterkę</Button> 
                            <Button type="submit"  hidden style={{marginRight: 1, marginTop: 70, height: 35,marginLeft: -170, color:'blue'}} onClick={() => handleFaultAccept(order.car, index)} id={"addButton"+index}>Dodaj</Button>
                            <Button type="submit"  hidden style={{marginRight:-108,  marginTop: 70,height: 35, color:'red'}} onClick={() => handleExit(index)} id={"exitButton"+index}>Anuluj</Button>
                            {/* <button className='btn btn-primary' style={{display: 'inline-block', float:'right',marginTop: -52}}>Przypomnij</button> */}
                          {/* </div> */}
                          <br></br>
                        </span>
                          </Typography>)})}
                          <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                          >
                            <h5><b>Data złożenia zamówienia {formatD(new Date(ord.launchDate))}</b></h5>
                          <h5><b>Koszt całkowity {ord.prize}zł</b></h5>
                          </Typography>
                      </React.Fragment>
                      }
                  />
                  </ListItem>
                  <h5 style={{textAlign: 'center'}}><b>UWAGA!!! NIEZGŁOSZENIE USTERKI POWSTAŁEJ W TRAKCIE WYPOŻYCZENIA, BĘDZIE WIĄZAŁO SIĘ Z NALICZENIEM DODATKOWYCH OPŁAT!</b></h5>
                  <PDFDownloadLink document={<Document >
                      <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                        <Image src={pic} style={{width:200,height:170,marginTop:20}}></Image>

                          <Text>Faktura nr {ord.id}</Text>
                          <Text>Data wystawienia: {formatD(new Date(ord.launchDate))}</Text>
                          <Text>Data sprzedazy: {formatD(new Date(ord.launchDate))}</Text>
                          <Text>Miejsce wystawienia: Bialystok</Text>
                          <Text>  </Text>
                          <b><Text>Sprzedawca</Text></b>
                          <Text>SobRent</Text>
                          <Text>ul.Branickiego 30/34 15-654 Bialystok</Text>
                          <Text>NIP 687-888-22-55</Text>
                          <Text>Telefon +48 85 576 534 213</Text>
                          <Text>E-mail sobrent@gmail.com, www.sobrent.pl</Text>
                          <Text>  </Text>

                          <Text>Razem do zaplaty: {ord.prize}zł</Text>
                          <Text>  </Text>
                          <b><Text>Nabywca</Text></b>
                          <Text>{ord.user.name} {ord.user.surname}</Text>
                          <Text>ul.{ord.user.street} {ord.user.numberOfFlat != null ? ord.user.numberOfStreet+"/"+ord.user.numberOfFlat : ord.user.numberOfFlat} </Text>    
                          <Text>{ord.user.postCode} {ord.user.city}</Text>
                          <Text>+48 {ord.user.phoneNumber}</Text>
                          <Text>{ord.user.email}</Text>
                          <Text>Lp.  Samochód           Cena</Text>
                          <br></br>
                            {ord.orders.map((orde,index) => {
                              return(
                            <Text key={index}>{++index}.    {orde.car.brand} {orde.car.model}          {orde.prize}</Text>)
                          })} 
                        </View>
                        
                          
                        
                      </Page>
                    </Document>} fileName="Faktura.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <Button type="submit" style={{float:'right', marginTop:-120}} ><FaPrint size={20} style={{marginTop:-3}}></FaPrint><span style={{marginLeft:2}}>Drukuj fakturę</span></Button>)}
                      </PDFDownloadLink>
              <Divider variant="inset" component="li" /></span>)}
        </List>}
     
         <h4>Historyczne wypożyczenia</h4>
         {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,margnLeft:'auto',marginRight:'auto'}}/> : historicOrders.length == 0 ? <h4 style={{textAlign :'center', marginTop: 100}}>Brak historycznych wypożyczeń</h4> : 
        <List sx={{ width: '100%', maxWidth: 1500, bgcolor: 'background.paper' }} style={{borderBottomRightRadius:10, borderBottomLeftRadius:10,borderTopRightRadius:10, borderTopLeftRadius:10}}>
        {historicOrders.map(ord =>
              <span>
                  <ListItem alignItems="flex-start">
                  <ListItemText
                      primary={<h4><b>Wypożyczenie nr {ord.id}</b></h4>}
                      secondary={
                      <React.Fragment>
                        {ord.orders.map( (order,index) => {
                          return (
                          <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                          >
                          <span key={order.id}>
                              <span>
                              <h5><b>Samochód</b></h5>
                                <h5><b>{order.car.brand} {order.car.model}</b></h5>
                          <img src={require(''+order.car.image)} alt={order.car.brand + order.car.model} style={{marginRight:-350,marginLeft:250,marginTop:-30,borderRadius:15}} width={250} height={150}></img>

                              <h6 style={{marginTop:-120}}><b>Numer rejestracyjny</b> {order.car.licensePlate}</h6> 
                              <h6><b>Spalanie w mieście</b> {order.car.combustion}l/100km</h6>
                              <h6><b>Punkty</b> <FaCarAlt size={20} style={{marginTop:-3}}></FaCarAlt> {order.car.points}</h6>
                              <h6><b>Kategoria</b> {order.car.category}</h6>
                              <h6><b>Moc</b> {order.car.km}KM</h6>
                              <h6><b>Moment obrotowy</b> {order.car.nm}NM</h6>
                              <h6><b>Skrzynia biegów</b> {order.car.transmission}</h6>
                              <h6><b>Rodzaj paliwa</b> {order.car.petrol}</h6>
                              <h6><b>Rok produkcji</b> {order.car.year}r.</h6>
                              <h6><b>Wyposażenie</b> {order.car.details}</h6>
                              <textarea max="1000" id={"fault2"+index} hidden  onChange={handleChangeFault2}></textarea>
                            </span>
                            <div style={{float:'right',marginTop: -310}}>
                            <h5><b>Szczegóły</b></h5>
                            <h6><b>Cena</b> {order.prize}zł</h6>
                            <h6><b>Okres wypożyczenia</b> {Math.ceil(Math.abs(new Date(order.endDate) - new Date(order.startDate)) / (1000 * 60 * 60 * 24))} {Math.ceil(Math.abs(new Date(order.endDate) - new Date(order.startDate)) / (1000 * 60 * 60 * 24)) > 1  ? 'dni' : 'dzień'}</h6>
                            <h6><b>Data rozpoczęcia</b> {new Date(order.startDate).toLocaleDateString("pl-PL")}r.</h6>
                            <h6><b>Data zakończenia</b> {new Date(order.endDate).toLocaleDateString("pl-PL")}r.</h6>
                            <h6><b>Miejsce wypożyczenia</b> {format(order.rentPlace)}</h6>
                            <h6><b>Miejsce zwrotu</b> {format(order.backPlace)}</h6>
                      {order?.additional.length == null ? '' : <h6><b>Dodatkowe opcje</b>  <ul>{order.additional.map(ad => <li><h6>{ad.name} - {ad.prize}zł</h6></li>)}</ul></h6>}

                          </div>
                          {/* <div style={{float: 'right', marginTop: -70}}> */}
                          {/* new Date(order.startDate) - 3 > new Date() ? */}
                             <Button style={{display: 'inline-block', marginRight: 25, color: 'red'}} onClick={() => handleFault2(index)} id={"callFault2"+index}>Zgłoś usterkę</Button> 
                            <Button type="submit"  hidden style={{marginRight: 1, marginTop: 70, height: 35,marginLeft: -170, color:'blue'}} onClick={() => handleFaultAccept2(order.car, index)} id={"addButton2"+index}>Dodaj</Button>
                            <Button type="submit"  hidden style={{marginRight:-108,  marginTop: 70,height: 35, color:'red'}} onClick={() => handleExit2(index)} id={"exitButton2"+index}>Anuluj</Button>
                            {/* <button className='btn btn-primary' style={{display: 'inline-block', float:'right',marginTop: -52}}>Przypomnij</button> */}
                          {/* </div> */}
                          <br></br>
                        </span>
                          </Typography>)})}
                          <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                          >
                            <h5><b>Data złożenia zamówienia {formatD(new Date(ord.launchDate))}</b></h5>
                          <h5><b>Koszt całkowity {ord.prize}zł</b></h5>
                          </Typography>
                      </React.Fragment>
                      }
                  />
                  </ListItem>
                  <h5 style={{textAlign: 'center'}}><b>UWAGA!!! NIEZGŁOSZENIE USTERKI POWSTAŁEJ W TRAKCIE WYPOŻYCZENIA, BĘDZIE WIĄZAŁO SIĘ Z NALICZENIEM DODATKOWYCH OPŁAT!</b></h5>
                  <PDFDownloadLink document={<Document >
                      <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                        <Image src={pic} style={{width:200,height:170,marginTop:20}}></Image>

                          <Text>Faktura nr {ord.id}</Text>
                          <Text>Data wystawienia: {formatD(new Date(ord.launchDate))}</Text>
                          <Text>Data sprzedazy: {formatD(new Date(ord.launchDate))}</Text>
                          <Text>Miejsce wystawienia: Bialystok</Text>
                          <Text>  </Text>
                          <b><Text>Sprzedawca</Text></b>
                          <Text>SobRent</Text>
                          <Text>ul.Branickiego 30/34 15-654 Bialystok</Text>
                          <Text>NIP 687-888-22-55</Text>
                          <Text>Telefon +48 85 576 534 213</Text>
                          <Text>E-mail sobrent@gmail.com, www.sobrent.pl</Text>
                          <Text>  </Text>

                          <Text>Razem do zaplaty: {ord.prize}zł</Text>
                          <Text>  </Text>
                          <b><Text>Nabywca</Text></b>
                          <Text>{ord.user.name} {ord.user.surname}</Text>
                          <Text>ul.{ord.user.street} {ord.user.numberOfFlat != null ? ord.user.numberOfStreet+"/"+ord.user.numberOfFlat : ord.user.numberOfFlat} </Text>    
                          <Text>{ord.user.postCode} {ord.user.city}</Text>
                          <Text>+48 {ord.user.phoneNumber}</Text>
                          <Text>{ord.user.email}</Text>
                          <Text>Lp.  Samochód           Cena</Text>
                          <br></br>
                            {ord.orders.map((orde,index) => {
                              return(
                            <Text key={index}>{++index}.    {orde.car.brand} {orde.car.model}          {orde.prize}</Text>)
                          })} 
                        </View>

                      </Page>
                    </Document>} fileName="Faktura.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <Button type="submit" style={{float:'right', marginTop:-120}} ><FaPrint size={20} style={{marginTop:-3}}></FaPrint><span style={{marginLeft:2}}>Drukuj fakturę</span></Button>)}
                      </PDFDownloadLink>
              <Divider variant="inset" component="li" /></span>)}
            
            
        </List>}
            <div><FaChevronCircleUp size={50} onClick={scrollToTop} style={{marginLeft: 1300,marginBottom: 50}}></FaChevronCircleUp></div>
            <Footer></Footer>
    </div>}
}