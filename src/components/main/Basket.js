import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import UserService from '../services/UserService';
import { useState,useEffect } from 'react';
import OrderService from '../services/OrderService';
import { FaAddressCard, FaCarAlt, FaCoins, FaCreditCard, FaPlusCircle, FaRegIdCard, FaTrash } from 'react-icons/fa';
import { useContext } from 'react';
import CartContext from '../../CartContext';
import {PaymentForm} from './PaymentForm'
import FullOrderService from '../services/FullOrderService';
import pic from './images.jpg'
import { Card, CardContent, ListItemAvatar } from '@material-ui/core';
import { Success } from './Success';
import KDR from './kdr_grafika.jpg'
import DL from './1581919.png'
import { Button } from '@mui/material';
import { useNavigate} from 'react-router-dom';
import { Footer } from './Footer';
import AuthService from '../services/AuthService';


export function Basket(){
  let navigate = useNavigate()
  const [showProm,setShowProm] = useState(true)
  const {deleteItems} = useContext(CartContext)
  const handleDelete = (id) => {
    document.getElementById("proms").hidden = true

    deleteFromCart(id)
    items.map(item => pri+= item.prize)
    document.getElementById("prize").innerHTML = '<h5 style={{marginLeft: 80}} id="prize"><b>Suma: '+pri+'zł</b></h5>'
    
    if(items.length == 0){
      navigate("/")
    }
 }

 
 const handleSubmit = (values) => {
  var rP
  var bP
  ("opcje"+items)
  values.map(order => {
    (order.prize)
    (order.rentPlace)

      rP = order.rentPlace
      bP = order.backPlace
      order.car.taken = true
      ("e" + order.rentPlace + order.backPlace)
      if(order.rentPlace === 'Białystok, ul. Czesława Miłosza 2, Atrium Biała(parking podziemny)' || order.backPlace === 'Białystok, ul. Czesława Miłosza 2, Atrium Biała(parking podziemny)'){
        order.rentPlace = 'FIRST'
        order.backPlace = 'FIRST'
      }
      else if(order.rentPlace === 'Białystok, ul. Wrocławska 20, Galeria Zielone Wzgórza(parking podziemny)'|| order.backPlace === 'Białystok, ul. Wrocławska 20, Galeria Zielone Wzgórza(parking podziemny)' ){
        order.rentPlace = 'SECOND'
        order.backPlace = 'SECOND'
      }
      else if(order.rentPlace === 'Białystok, ul. aleja Jana Pawła II 92, Makro' || order.backPlace === 'Białystok, ul. aleja Jana Pawła II 92, Makro'){
        order.rentPlace = 'THIRD'
        order.backPlace = 'THIRD'
      }
      ("halo" + order.rentPlace + order.backPlace)
      ("sD"+order.startDate)
      ("eD"+order.endDate)

    // order.startDate = new Date('2022-10-10')
    // order.endDate = new Date('2022-11-11')
  })

  for(let i =0 ;i< values.length; i++){
    if(values[i].rentPlace === 'Białystok, ul. Czesława Miłosza 2, Atrium Biała(parking podziemny)')
    values[i].rentPlace = 'FIRST'
  }


  
  
  let array = {orders: values, prize: pri, user: user}

  
  // array.push(values)
  (array)
        FullOrderService.saveFullOrder(array)
        .then((response) => {
        (response);
        setShow(false)
    setModalShow(true)
        deleteItems()
        
        
        setTimeout( () =>{
          navigate("/")
        // window.location.reload(false)
          
      },4000)
        
        
        })
        .catch((error) => {
        (error);
        });
    // order.rentPlace = rP
    // order.backPlace=bP
    
    values.map(order => {
      order.rentPlace = rP
      order.backPlace = bP
  
    })
 }

 
 var pri = 0;
  const {items} = React.useContext(CartContext)
  const {deleteFromCart} = useContext(CartContext)
  const [show, setShow] = useState(false)
  const [modalShow, setModalShow] = useState(false);
  const [user,setUser] = useState('')
  const [loading,setLoading] = useState(null)
  items.map(item => pri+= item.prize)
  if(new Date().getHours() < 14 && new Date().getHours() > 10){
    pri = pri - pri * 0.1
  }
  if(user.role == 'ROLE_WORKER'){
    pri = pri - pri * 0.1
  }

  const minusDL = () => {
    pri = pri - pri * 0.1
    (pri)

    if(new Date().getHours() < 14 && new Date().getHours() > 10){
      pri = pri - pri * 0.1
      document.getElementById("prize").innerHTML = '<h5 style={{marginLeft: 80}} id="prize"><b>Suma: '+pri+'zł</b></h5>'

    document.getElementById("proms").hidden = false

    document.getElementById("proms").innerHTML = '<b><h6>Zastosowane zniżki<br></br>Prawo jazdy<br/>Happy Hours</h6></b>'
    }else{
      document.getElementById("prize").innerHTML = '<h5 style={{marginLeft: 80}} id="prize"><b>Suma: '+pri+'zł</b></h5>'


      document.getElementById("proms").hidden = false
  
    document.getElementById("proms").innerHTML = '<b><h6>Zastosowane zniżki<br></br>Prawo jazdy</h6></b>'
    }

    

 
    setShowProm(false)

  }

  const minusKDR = () => {
    items.map((order,index) => {
      if(order.car.category === "SUV"){
          order.prize = order.prize - order.prize * 0.1
      } 
    }
    )

  items.map(item => pri += item.prize)

  if(new Date().getHours() < 14 && new Date().getHours() > 10){
    pri = pri - pri * 0.1
    (pri)
    document.getElementById("prize").innerHTML = '<h5 style={{marginLeft: 80}} id="prize"><b>Suma: '+pri+'zł</b></h5>'

  document.getElementById("proms").hidden = false

  document.getElementById("proms").innerHTML = '<b><h6>Zastosowane zniżki<br></br>Karta Dużej Rodziny<br/>Happy Hours</h6></b>'
  }else{
    document.getElementById("prize").innerHTML = '<h5 style={{marginLeft: 80}} id="prize"><b>Suma: '+pri+'zł</b></h5>'


    document.getElementById("proms").hidden = false

  document.getElementById("proms").innerHTML = '<b><h6>Zastosowane zniżki<br></br>Karta Dużej Rodziny</h6></b>'
  }

  // document.getElementById("prize").textContent = <h5 style={{marginLeft: 80}} id="prize"><b>Suma: {pri}zł</b></h5>
  // document.getElementById("proms").hidden = false

  // document.getElementById("proms").innerHTML = '<b><h6>Zastosowane zniżki<br></br>Karta Dużej Rodziny</h6></b>'
  // document.getElementById("proms").innerHTML = 'Karta Dużej Rodziny'

  setShowProm(false)

  }

  const minusPoints = (points)=> {

    if(points == 100000){
      pri =pri -  pri * 0.05
      if(new Date().getHours() < 14 && new Date().getHours() > 10){
      
        pri = pri - pri * 0.1
      document.getElementById("prize").innerHTML = '<h5 style={{marginLeft: 80}} id="prize"><b>Suma: '+pri+'zł</b></h5>'
      document.getElementById("proms").hidden = false
      document.getElementById("proms").innerHTML = '<b><h6>Zastosowane zniżki<br></br><span>Punkty SobRent '+points+'</span><br/>Happy Hours</h6></b>'


      }else{


        document.getElementById("prize").innerHTML = '<h5 style={{marginLeft: 80}} id="prize"><b>Suma: '+pri+'zł</b></h5>'
    
        document.getElementById("proms").hidden = false
    
        document.getElementById("proms").innerHTML = '<b><h6>Zastosowane zniżki<br></br><span>Punkty '+points+'</span></b>'

      }
      
      UserService.minusPoints(user,points)
        .then((response) => {
          (response)
          
        })
        .catch((error) => {
        (error);
        }); 
    }
    else if(points == 50000){
      pri = pri - pri * 0.20
      if(new Date().getHours() < 14 && new Date().getHours() > 10){
    

        pri = pri - pri * 0.1
        document.getElementById("prize").innerHTML = '<h5 style={{marginLeft: 80}} id="prize"><b>Suma: '+pri+'zł</b></h5>'
      document.getElementById("proms").hidden = false
    
      document.getElementById("proms").innerHTML = '<b><h6>Zastosowane zniżki<br></br><span>Punkty SobRent '+points+'</span><br/>Happy Hours</h6></b>'
      }else{
        document.getElementById("prize").innerHTML = '<h5 style={{marginLeft: 80}} id="prize"><b>Suma: '+pri+'zł</b></h5>'
    
        document.getElementById("proms").hidden = false
    
      document.getElementById("proms").innerHTML = '<b><h6>Zastosowane zniżki<br></br><span>Punkty '+points+'</span></h6></b>'
      }
      UserService.minusPoints(user,points)
      .then((response) => {
        (response)
        
      })
      .catch((error) => {
      (error);
      }); 
    }
    else if(points == 25000){
      pri = pri - pri * 0.1
      if(new Date().getHours() < 14 && new Date().getHours() > 10){
        pri = pri - pri * 0.1
        document.getElementById("prize").innerHTML = '<h5 style={{marginLeft: 80}} id="prize"><b>Suma: '+pri+'zł</b></h5>'
      document.getElementById("proms").hidden = false
    
      document.getElementById("proms").innerHTML = '<b><h6>Zastosowane zniżki<br></br><span>Punkty SobRent '+points+'</span><br/>Happy Hours</h6></b>'
      }else{
        document.getElementById("prize").innerHTML = '<h5 style={{marginLeft: 80}} id="prize"><b>Suma: '+pri+'zł</b></h5>'
    
        document.getElementById("proms").hidden = false
    
      document.getElementById("proms").innerHTML = '<b><h6>Zastosowane zniżki<br></br><span>Punkty '+points+'</span></h6></b>'
      }
      UserService.minusPoints(user,points)
      .then((response) => {
        (response)
        
      })
      .catch((error) => {
      (error);
      }); 
    }else{
      pri = pri - pri * 0.05
      if(new Date().getHours() < 14 && new Date().getHours() > 10){
        pri = pri - pri * 0.1
      
      document.getElementById("prize").innerHTML = '<h5 style={{marginLeft: 80}} id="prize"><b>Suma: '+pri+'zł</b></h5>'
      document.getElementById("proms").hidden = false
    
      document.getElementById("proms").innerHTML = '<b><h6>Zastosowane zniżki<br></br><span>Punkty SobRent '+points+'</span><br/>Happy Hours</h6></b>'
      }else{
        document.getElementById("prize").innerHTML = '<h5 style={{marginLeft: 80}} id="prize"><b>Suma: '+pri+'zł</b></h5>'
    
        document.getElementById("proms").hidden = false
    
      document.getElementById("proms").innerHTML = '<b><h6>Zastosowane zniżki<br></br><span>Punkty '+points+'</span></h6></b>'
      }
      UserService.minusPoints(user,points)
      .then((response) => {
        (response)
        
      })
      .catch((error) => {
      (error);
      }); 
    }

    (user.card)
    (user.card.points)

    
    
    // UserService.updateUser(user,points)
    // .then((response) => {
    // (response);
    // // navigaye("/sport");
    // })
    // .catch((error) => {
    // (error);
    // });
   

    setShowProm(false)
  }
  const [id,setId] = useState('')
  

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

    return <div style={{marginTop:80}}>
        <hr ></hr>
        <h2 style={{ width:'100%', textAlign:'center'}} >Podsumowanie</h2>
        <hr ></hr>

        <List sx={{ width: '100%', maxWidth: 1500, bgcolor: 'background.paper' }} style={{borderTopRightRadius:10, borderTopLeftRadius:10}}>
        {items.map((order, index) => (        
              <span>
            <ListItem alignItems="flex-start" key={order.id} >
              <ListItemAvatar>
              <div
                  className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                  style={{
                      color: "white",
                      width: "1.3rem",
                      height: "1.4rem",
                      position: "absolute",
                      marginLeft: 5,
                      top: 32,
                      transform: "translate(25%, 25%)"
                  }}
                  >
                  {++index}
              </div>
              </ListItemAvatar>
              <ListItemText
                primary={<span><h5 style={{marginTop:23}}><b>{order.car.brand} {order.car.model}</b></h5><FaTrash style={{marginTop: -5, color:'black', marginLeft: 750}} size={40} onClick={() => handleDelete(order.car.id)}></FaTrash>   </span>}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <img src={require(''+order.car.image)} alt={order.car.brand + order.car.model} width="150" style={{marginTop:-80, marginLeft: -10, borderRadius:15}}></img>
                      <div style={{float: 'left', marginTop: -20}}>
                     <h6><b>Kategoria</b>  {order.car.category}</h6>
                     <h6><b>Rodzaj paliwa</b>  {order.car.petrol}</h6>
                     <h6><b>Skrzynia biegów</b>  {order.car.transmission}</h6>
                     <h6><b>Moc</b>  {order.car.km}KM</h6>
                     <h6><b>Moment obrotowy</b>  {order.car.nm}NM</h6>
                     <h6><b>Liczba miejsc</b>  {order.car.numberOfSeats}</h6>
                     <h6><b>Rok produkcji</b>  {order.car.year}r.</h6>
                     <h6><b>Wyposażenie</b>  {order.car.details}</h6>
                     </div>
                      <div style={{float:'right', marginRight: 100, marginTop: -25}}>
                        <h6><b>Szczegóły</b></h6>
                      <h6><b>Cena</b>  {order.prize}zł</h6>
                      <h6><b>Okres wypożyczenia</b>  {order.days} {order.days > 1  ? 'dni' : 'dzień'}</h6>
                      <h6><b>Data rozpoczęcia</b>  {new Date(order.startDate).toLocaleDateString("pl-PL")}r.</h6>
                      <h6><b>Data zakończenia</b>  {new Date(order.endDate).toLocaleDateString("pl-PL")}r.</h6>
                      <h6><b>Miejsce wypożyczenia</b>  {order.rentPlace}</h6>
                      <h6><b>Miejsce zwrotu</b>  {order.backPlace}</h6>
                      {order?.additional.length == 0 ? '' : <h6><b>Dodatkowe opcje</b>  <ul>{order.additional.map(ad => <li><h6>{ad.name} - {ad.prize}zł</h6></li>)}</ul></h6>}
                      </div>
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          <Divider variant="inset" component="li" />          
          </span>
        ))
        
    }
    { showProm && items.length > 0 ? <h6><b>UWAGA! Promocje nie łączą się!</b></h6> : ''}
    { showProm && user.card != null && user.card.points > 100000  && items.length > 0 ? <h6><FaPlusCircle size={30} onClick={() => minusPoints(100000)}/><FaCarAlt size={30} style={{marginLeft: 5}}/>100 000</h6> : ''}
    { showProm && user.card != null && user.card.points > 50000 && items.length > 0 ? <h6><FaPlusCircle size={30} onClick={() => minusPoints(50000)}/><FaCarAlt size={30} style={{marginLeft: 5}}/>50 000</h6> : ''}
    { showProm && user.card != null && user.card.points > 25000 && items.length > 0 ? <h6><FaPlusCircle size={30} onClick={() => minusPoints(25000)}/><FaCarAlt size={30} style={{marginLeft: 5}}/>25 000</h6> : ''}
    { showProm && user.card != null && user.card.points > 10000 && items.length > 0 ? <h6><FaPlusCircle size={30} onClick={() => minusPoints(10000)}/><FaCarAlt size={30} style={{marginLeft: 5}}/>10 000</h6> : ''}
    { showProm  && items.length > 0 ? <span><FaPlusCircle size={30} onClick={() => minusKDR()}/><img src={KDR} width={100} height={70} o></img></span>: ''}
    <br></br>
    { showProm  && items.length > 0 ? <span ><FaPlusCircle size={30} onClick={() => minusDL()}/><FaRegIdCard size={40} style={{marginLeft: 20}}></FaRegIdCard></span> : ''}
    <h6 id="proms" style={{color:'green',marginLeft: 1000}} hidden><b>Zastosowane zniżki</b></h6>
    {  items.length > 0 ? <h5 style={{marginLeft: 80}} id="prize"><b>Suma: {pri}zł</b></h5> : ''}
    </List>
    <br></br>
    {  items.length > 0 ? <div style={{ marginLeft:'auto',marginRight: 'auto', textAlign: 'center'}} ><h5>Wybierz sposób płatności</h5></div> : ''}
    <br></br>
    <div style={{ marginLeft:'auto',marginRight: 'auto', textAlign: 'center'}} >
      { items.length > 0 && user!=null ?  <div style={{  textAlign: 'center', display:'inline-block'}} onClick={() => setShow(true)}>
        <FaCreditCard size={80} style={{marginLeft: 'auto', marginRight: 'auto'}}></FaCreditCard>
        <h3>Płatność kartą</h3>
      </div> : ''}
      { ((user.role !== 'ROLE_WORKER' || user.role !== 'ROLE_ADMIN') && user === null) || items.length == 0 || show == true ?  '' : <div style={{ textAlign: 'center', display:'inline-block', marginLeft: 60}} onClick={() => 
      handleSubmit(items)
      }>
        
        <FaCoins size={80} style={{marginLeft: 'auto', marginRight: 'auto'}}></FaCoins>
        <h3>Płatność gotówką</h3>
        </div>
     }
    </div>
    
    <br></br>
    <Success show={modalShow} onHide={() => setModalShow(false)} text={ <span><h5><b>GRATULACJE</b></h5>
            Udało Ci się złożyć zamówienie. Aby otrzymać potwierdzenie, wejdź do swojej skrzynki pocztowej!</span>}/>
    { show ? <div><PaymentForm handleSubmit={handleSubmit}></PaymentForm> 
     <Button style={{ marginLeft: 1020, textAlign: 'center',color:'red',marginTop:-110}} onClick={() => setShow(false)} id="exit" >Anuluj</Button> </div> : ''}
   <br></br>
   <Footer></Footer>
    </div>
}