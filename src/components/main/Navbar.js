import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import pic from "./output-onlinepngtools(2).png";
import { Popup } from "@progress/kendo-react-popup";
import Badge from "@material-ui/core/Badge";
import { FaCarAlt, FaEdit, FaEnvelope, FaHome, FaRegFile, FaToggleOff, FaToggleOn, FaUserCircle, FaUserPlus } from "react-icons/fa";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useRef,useState,useEffect } from 'react';
import { DropDown } from './DropDown';
import AuthService from '../services/AuthService.js'
import EventBus from './EventBus'
import { Button } from '@mui/material';
import { ShoppingCart } from './ShoppingCart';
import { Offcanvas } from 'react-bootstrap';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import OrderService from '../services/OrderService';
import { Basket } from './Basket';
import { useContext } from 'react';
import CartContext from '../../CartContext';
import { FaTrash } from 'react-icons/fa';
import pic2 from './images.jpg'
import { OrderModal } from './OrderModal';
import './Navbar.css'
import UserService from '../services/UserService';
import CarService from '../services/CarService';
import { Cars } from './Cars';
import { FaCoins } from 'react-icons/fa';
import ContactService from '../services/ContactService';
export default function Navbar(){
    const {items} = useContext(CartContext)
    const {deleteFromCart} = useContext(CartContext)
    const handleDelete = (id) => {
        console.log(id)
        deleteFromCart(id)
        
     }

    const [currentUser, setCurrentUser] = useState(null);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    const [loading,setLoading] = useState(true)
    const [modalShow, setModalShow] = useState(false);
    const [cars, setCars] = useState('');
    const [order, setOrder] = useState('');

    const [id,setId] = useState('')

 

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
          const response = await ContactService.getByOpened()
          setCars(response.data);
          console.log(response.data)
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      };
      fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const user = await AuthService.getCurrentUser();
        console.log("u"+user)
        const response = await UserService.findByEmail(user.email)
        setCurrentUser(response.data);
        console.log(user)
        // user.roles.map(e => console.log(e.name))
        console.log("Halo"+response.data.roles)
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

    const handleRent = () =>{
        <Basket></Basket>
        setShow(false)
    }
    var pri = 0
    items.map(item => pri+= item.prize)
  
    return <div><nav className="navbar navbar-expand-lg nb-example fb-example shadow" style={{position:'fixed',zIndex: 1, top: 0, width:'100%', opacity:100, left:0, paddingBottom: 0, height: 65,marginRight:'auto', color:'white' }}>
        <div className="container-fluid" style={{marginTop: -70, marginBottom: 'auto'}}>
            <Link className="navbar-brand" to="/">
                <img src={pic} alt="SobRent Logo" style={{ width:180, height:180,marginTop:4}} class="rounded-pill"/>  
            </Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent" style={ {marginTop: 'auto', marginBottom: 'auto'}}>
                    {currentUser == null ?
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 " style={{ marginBottom: 'auto',marginTop:-10}}>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/" style={{fontSize: 19, marginLeft: 100 }}><FaHome style={{marginTop: -4,marginRight: 2}}/>Start</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/flota" style={{fontSize: 19, marginLeft: 10 }}>Flota</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cennik" style={{fontSize: 19, marginLeft: 10}}>Cennik</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/promocje" style={{fontSize: 19, marginLeft: 10}}>Promocje</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/onas" style={{fontSize: 19, marginLeft: 10}}>O nas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/regulamin" style={{fontSize: 19, marginLeft: 10}}>Regulamin</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/kontakt" style={{fontSize: 19, marginLeft: 10}}>Kontakt</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/FAQ" style={{fontSize: 19, marginLeft: 10}}>FAQ</Link>
                    </li>
                    <li className="nav-item" style={{display:'inline-block'}}>
                        <Link className="nav-link" to="/logowanie" style={{fontSize: 19,marginLeft:250, marginRight:-15}}>Zaloguj się</Link>
                    </li>
                    <li className="nav-item" style={{display:'inline-block'}}>
                        <span className="nav-link"  disabled   aria-disabled="true" style={{fontSize: 19, marginRight:-15, display:'inline-block'}}>/</span>
                    </li>
                    <li className="nav-item" style={{display:'inline-block'}}>
                        <Link className="nav-link" to="/rejestracja" style={{fontSize: 19, marginRight: 3, display:'inline-block'}}>Zarejestruj się</Link>
                    </li>
                </ul> : ''}
                {currentUser != null ? (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ marginBottom: 'auto', marginTop: 7}}>
                    <li className="nav-item">
                        <Link className="nav-link" to="/" style={{fontSize: 19, marginLeft: 10 }}><FaHome style={{marginTop: -4,marginRight: 2}}/>Start</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/flota" style={{fontSize: 19, marginLeft: 10 }}>Flota</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cennik" style={{fontSize: 19, marginLeft: 10}}>Cennik</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/promocje" style={{fontSize: 19, marginLeft: 10}}>Promocje</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/onas" style={{fontSize: 19, marginLeft: 10}}>O nas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/regulamin" style={{fontSize: 19, marginLeft: 10}}>Regulamin</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/FAQ" style={{fontSize: 19, marginLeft: 10}}>FAQ</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/zestawienie" style={{fontSize: 19, marginLeft: 10}}>Zestawienie</Link>
                    </li>
                    <li class="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="javascript:void(0)" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize: 19, marginLeft: 10 }}>
                            Podgląd
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown" style={{borderRadius:15, zIndex: 1}}>
                            <li><Link class="dropdown-item" to="/uzytkownicy"><FaUserCircle size={20} style={{marginRight:6,marginTop:-3}}></FaUserCircle>Użytkownicy</Link></li>
                            <li><Link class="dropdown-item" to="/zamowienia"><FaRegFile size={20} style={{marginRight:6,marginTop:-3}}></FaRegFile>Zamówienia</Link></li>
                            <li><Link class="dropdown-item" to="/samochody"><FaCarAlt size = {20} style={{marginRight:6,marginTop:-3}}></FaCarAlt>Samochody</Link></li>
                            { currentUser == null && (currentUser.role !== 'ROLE_ADMIN') ? '':<li><Link class="dropdown-item" to="/pracownicy"><FaUserPlus size={20} style={{marginRight:6,marginTop:-3}}></FaUserPlus>Pracownicy</Link></li> }
                            { currentUser == null && (currentUser.role !== 'ROLE_ADMIN') ? '' : <li><Link class="dropdown-item" to="/finanse"><FaCoins size = {20} style={{marginRight:6}}></FaCoins>Finanse</Link></li>}
                            <li><Link class="dropdown-item" to="/wiadomosci"><Badge badgeContent={cars} color="success" style={{marginTop:-3}}><FaEnvelope color="action" size = {20} style={{marginRight:6}}/></Badge><span style={{marginLeft:6}}>Wiadomości</span></Link></li>
                        </ul>
                    </li>
                    
                    <li className="nav-item">
                    { currentUser !== null ? <p style={{color:'red', marginLeft:160, marginTop: 12}}> {currentUser.name} {currentUser.surname}</p> : ''}
                    </li> 
                    <li className="nav-item" style={{marginTop: 6, marginLeft: 20}}>
                        <DropDown ></DropDown>
                    </li>
                    <li className="nav-item" style={{marginTop: 3,marginLeft:10}}>
                            <span onClick={handleShow} style={{marginRight: 0}}><ShoppingCart counter={items.length}></ShoppingCart></span>
                            <Offcanvas show={show} onHide={handleClose} placement="end" scroll style={{height: '100%', overflow: 'auto'}}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Koszyk</Offcanvas.Title>
                            </Offcanvas.Header>
                            {items.length == 0 ? <div style={{marginTop: 'auto',marginBottom: 'auto',textAlign: 'center', marginRight: 'auto', marginLeft: 'auto'}}><h4>Koszyk jest pusty</h4></div> : 
                            <div>
                            <Offcanvas.Body>
                            
                            <div>
                            <List sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper' }}>
                                {items.map((order,index) => (
                                <span>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                    <div
                                        className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                                        style={{
                                            color: "white",
                                            width: "1.3rem",
                                            height: "1.4rem",
                                            position: "absolute",
                                            marginLeft: -18,
                                            top: 9,
                                            transform: "translate(25%, 25%)"
                                        }}
                                        >
                                        {++index}
                                    </div>
                                    </ListItemAvatar>
                                <ListItemText
                                    primary={<span><h5><b style={{fontSize: 18}}>{order.car.brand} {order.car.model}</b></h5></span>}
                                    style={{marginLeft: -35}}
                                    secondary={
                                    <React.Fragment >
                                        <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                        >
                                        <img src={require(''+order.car.image)} alt={order.car.brand + order.car.model} width="120" height="70" style={{marginTop:-10, marginLeft: 120, borderRadius:15}}></img>
                                <FaTrash style={{marginTop: -100, color:'black',marginLeft: 270}} size={30} onClick={() => handleDelete(order.car.id)}></FaTrash>        
                                        <h6 style={{marginTop:-70}}><b>Cena</b>  {order.prize}zł</h6> 
                                        <h6><b>Liczba dni</b>  {order.days}</h6>
                                        <h6><b>Data rozpoczęcia</b>  {new Date(order.startDate).toLocaleDateString("pl-PL")}r.</h6>
                                        <h6><b>Data zakończenia</b>  {new Date(order.endDate).toLocaleDateString("pl-PL")}r.</h6>
                                        <h6><b>Miejsce wypożyczenia</b>  {order.rentPlace}</h6>
                                        <h6><b>Miejsce zwrotu</b>  {order.backPlace}</h6>
                                        {order?.additional.length == 0 ? '' :<h6><b>Dodatkowe opcje</b>  {order.additional.map(or => <h6>{or.name} - {or.prize}zł</h6>)}</h6>}
                                        </Typography>
                                    </React.Fragment>
                                    }
                                />
                                </ListItem>
                            <Divider variant="inset" component="li" /></span>
                            ))
                        }
                        </List>
                        <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                        >
                            <h5 id="pri"><b>Cena całkowita {pri}zł</b></h5>
                        </Typography>
                        </div>
                            </Offcanvas.Body>
                            <div style={{textAlign: 'center', bottom:0}}>
                                <Link to="/koszyk"><Button type="submit"  onClick={handleRent} style={{color: 'blue',marginBottom:-400}}>Przejdź do podsumowania</Button></Link>
                                <br></br>
                                <Button type="submit" onClick={handleClose} style={{color: 'red',marginBottom:-420}}>Kontynuuj zakupy</Button>
                            </div>
                        </div>
                        }
                        </Offcanvas>
                    </li>
                    </ul>) : ''}
            </div>
        </div>
    </nav>
</div>
}