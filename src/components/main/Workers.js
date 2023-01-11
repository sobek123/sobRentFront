import * as React from 'react';
import List from '@mui/material/List';
import Dialog from './Dialog';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import UserService from '../services/UserService';
import { useState,useEffect, useRef } from 'react';
import Girl from './girl-avatar.webp'
import Boy from './images.png'
import pic from "./output-onlinepngtools(2).png";
import Select from 'react-select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { FaCarAlt, FaChevronCircleUp, FaEnvelope, FaLock, FaPlusCircle, FaSearch, FaSortAlphaDown, FaSortAlphaDownAlt, FaTimesCircle, FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';
import { FaLockOpen } from 'react-icons/fa';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import {Link} from 'react-router-dom';
import { Footer } from './Footer';
import AuthService from '../services/AuthService';
import { AccessDenied } from './AccessDenied';
import { Spinner } from 'react-bootstrap';

export function Workers(){
  
  const [expandedId, setExpandedId] = React.useState(-1);

  const handleExpandClick = id => {
    
    setExpandedId(expandedId === id ? -1 : id);
    
    
  };
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if(selectedOption === false){
        const response = await UserService.sortDown("ROLE_WORKER")
        setFilteredData(response.data);
        }
        else{
          const response = await UserService.sortUp("ROLE_WORKER")
          setFilteredData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [selectedOption]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState(null);

  const scrollToTop = () => {
    console.log("h")
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await UserService.getByKeyword(wordEntered, "ROLE_WORKER")
        setUsers(response.data)
        setFilteredData(response.data)
        // setShowHook(showTab)
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [wordEntered]);
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    // const newFilter = users.filter((value) => {
    //   return value.name.toLowerCase().includes(searchWord.toLowerCase());
    // });

    if (searchWord === "") 
      setFilteredData(users);
    // } else {
    //   setFilteredData(newFilter);
    // }
  };

  const clearInput = () => {
    setFilteredData(users);
    setWordEntered("");
  };
  
  const [show, setShow] = useState(true)
    const [loading,setLoading] = useState(true)
    
  const [users,setUsers] = React.useState([])
  useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await UserService.getWorkers()
          console.log(response.data)
          const fil = response.data.filter(el => el.id !== currentUser.id)
          setUsers(fil);
          setFilteredData(fil)
          console.log(fil)
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      };
      fetchData();
    }, []);

    

    const unlock = (user) => {
      user.enabled = true
      UserService.updateUser(user,user.id)
      .then((response) => {
        const tab = users
          // for(let i=0;i<tab.length;i++){
          //   if(tab[i].id == user.id){
          //     tab[i].enabled = true
          //   }
          // }
          const newA = users.map(obj => {

            if (obj.id == id) {
            
            return {obj, enabled: true};
            
            }
            
            return obj;
            
            })
          setUsers(newA)
          setFilteredData(newA)
      })
      .catch((error) => {
      console.log(error);
      });
        
    }

    

    const block = (user) => {
      user.enabled = false
      UserService.updateUser(user,user.id)
      .then((response) => {
      console.log(response);
          // const tab = users
          // for(let i=0;i<tab.length;i++){
          //   if(tab[i].id == user.id){
          //     tab[i].enabled = false
          //   }
          // }
          const newA = users.map(obj => {

            if (obj.id == id) {
            
            return {obj, enabled: false};
            
            }
            
            return obj;
            
            })
          setUsers(newA)
          setFilteredData(newA)
      })
      .catch((error) => {
      console.log(error);
      });
      
      // window.onload
    }
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
  console.log("halo")
    handleDialog("Czy na pewno chcesz usunąć tego pracownika?", true);
    idProductRef.current = id;
  };

  const areUSureDelete = (choose) => {
    if (choose) {
        UserService.deleteUser(idProductRef.current).then(response => { 
          console.log(response)
          setUsers(users.filter((user) => {
            return user.id !== idProductRef.current;
        }))
        })
        .catch(error => {
            console.log(error.response)
        });
        
      setFilteredData(users.filter((user) => {
        return user.id !== idProductRef.current;
    }))
    setUsers(users.filter((user) => {
      return user.id !== idProductRef.current;
  }))
    
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  
 
  const [currentUser,setCurrentUser] = useState("")
  const [id,setId] = useState('')
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
        console.log("Halo"+response.data.role)
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  

  
  if(currentUser == null || currentUser.role !== 'ROLE_ADMIN'){
      return <AccessDenied></AccessDenied>
    }else{
      return (
     <div style={{marginTop:80}}>
        <hr></hr>
        <h4>Pracownicy</h4>
        <hr></hr>

        <List sx={{ width: '100%', maxWidth: 1500, bgcolor: 'background.paper' }} style={{borderBottomRightRadius:10, borderBottomLeftRadius:10,borderTopRightRadius:10, borderTopLeftRadius:10}}>
            
            <FormControl sx={{ m: 1, width: '25ch' }} style={{marginTop: 10,float:'left'}}variant="outlined">
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
        <div style={{marginTop:15,marginBottom:30, marginLeft:50}}>
           <FaSortAlphaDown size={30} onClick={() => setSelectedOption(false)}></FaSortAlphaDown>
           <FaSortAlphaDownAlt size={30} onClick={() => setSelectedOption(true)}></FaSortAlphaDownAlt>
        <Link to="/pracownik" style={{  float: 'right', marginTop: -40, marginRight: 20}}><FaPlusCircle style={{marginTop:'auto',marginBottom:'auto', color: 'black', marginBottom: 8, marginLeft:1000}} size={30}></FaPlusCircle></Link>
           </div>
           {/* <div>{ users.length == 0 ? <span><h4 style={{textAlign :'center', marginTop: 200}} id="or">Brak wyników odpowiadających wybranym kryteriom</h4></span> :  */}
 
        {loading ? <Spinner animation="border" role="status" style={{marginTop: 80}}/> : filteredData.map((user,index) =>
        
        <span>
            <ListItem alignItems="flex-start" key={user.id}>
              <ListItemAvatar>
                {user.name.endsWith("a") ? <Avatar alt={user.name + user.surname} src={Girl} style={{height: 90, width: 70, marginTop: -10, marginLeft: -5, marginRight: 8}}/> : <Avatar alt={user.name + user.surname} src={Boy} style={{height: 90, width: 70, marginTop: -10, marginLeft: -5, marginRight: 8}}/>}
              </ListItemAvatar>
              <ListItemText
                primary={<h5><b style={{fontSize: 20}}>{user.name} {user.surname}</b></h5>}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <h6><b>E-mail</b> {user.email}</h6>
                      <h6><b>Numer telefonu</b> +48 {user.phoneNumber}</h6>
                      <h6><b>Data urodzenia</b> {new Date(user.dateOfBirth).toLocaleDateString("pl-PL")}r.</h6>
                      <h6><b>PESEL</b> {user.pesel}</h6>
                      <h6><b>Adres</b> {user.postCode} {user.city}, ul.{user.street} {user.numberOfStreet}/{user.numberOfFlat}</h6>
                      {user.card == null ? '' : 
                      <Card id={"card"} style={{ width: 350 , height: 200, borderRadius: 10, backgroundColor:'#CD5C5C', marginLeft: 400,marginTop:-170 }} >
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                          <img src={pic} alt="RentCar Logo" style={{ width:180, height:180,marginTop:-10, marginBottom: -80, marginLeft: 170}} class="rounded-pill"/>  
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                            <hr style={{marginBottom:0}}></hr>
                            <span style={{marginBottom: 0,marginLeft: 150}}>         
                            {user.card.code.slice(0,3)} {user.card.code.slice(3,6)} {user.card.code.slice(6,9)} {user.card.code.slice(9,12)}
                            </span>
                            <hr style={{marginTop:0}}></hr>
                            <div style={{marginLeft: 230, marginTop: -15}}><FaCarAlt style={{display: 'inline-block'}}></FaCarAlt><h6 style={{display: 'inline-block', marginLeft:5}}>{user.card.points}</h6></div>
                          </Typography>
                        </CardContent>
                      </Card>}
                      <div style={{float: 'right', marginTop: -70}}>
                        { user.enabled ? <Button  style={{display: 'inline-block', marginRight: 25,color: 'red'}} id="block" onClick={() => block(user)}><FaLock style={{marginTop: -4}} size={20}></FaLock>Blokuj</Button> : 
                        <Button id="unlock "style={{display: 'inline-block', marginRight: 25,color: 'green'}} onClick={() => unlock(user)}><FaLockOpen style={{marginTop: -4}} size={20}></FaLockOpen>Odblokuj</Button>}
                        <Button  style={{display: 'inline-block', float:'right',color:'red'}} onClick={() => handleDelete(user.id)}><FaTrash size={20} style={{marginTop: -4,marginRight: 4}} ></FaTrash>Usuń</Button>
                      </div>
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            { index != users.length-1 ? <Divider variant="inset" component="li" /> : ''}</span>     
        )}
        </List>
        {dialog.isLoading && (
            <Dialog onDialog={areUSureDelete} message={dialog.message}/>
          )}
    <div ><FaChevronCircleUp size={50} onClick={scrollToTop} style={{marginLeft: 1300,marginBottom: 50}}></FaChevronCircleUp></div>
    <Footer></Footer>
    </div>)}
  }
// }