import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import UserService from '../services/UserService';
import { useState,useEffect } from 'react';

import { TextField } from "formik-material-ui";
import { styled } from '@mui/material/styles';

import * as Yup from 'yup';
import Girl from './girl-avatar.webp'
import Boy from './images.png'
import pic from "./output-onlinepngtools(2).png";
import Select from 'react-select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { FaCarAlt, FaChevronCircleUp, FaEnvelope, FaLock, FaSearch, FaSortAlphaDown, FaSortAlphaDownAlt, FaTimesCircle, FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { FaLockOpen } from 'react-icons/fa';
import { Box, Button, Collapse, FormControl, FormHelperText,IconButton, InputLabel, OutlinedInput} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { Footer } from './Footer';
import { Field, Form, Formik } from 'formik';
import AuthService from '../services/AuthService';
import { AccessDenied } from './AccessDenied';
import { Spinner } from 'react-bootstrap';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



export function Users(){
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
        const response = await UserService.sortDown("ROLE_USER")
        setFilteredData(response.data);
        }
        else{
          const response = await UserService.sortUp("ROLE_USER")
          setFilteredData(response.data);
        }
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, [selectedOption]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState(null);

  const scrollToTop = () => {
    ("h")
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await UserService.getByKeyword(wordEntered, "ROLE_USER")
        
        setFilteredData(response.data)
        // setShowHook(showTab)
        (response.data)
      } catch (error) {
        (error);
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
          const response = await UserService.getUsers()
          setUsers(response.data);
          setFilteredData(response.data)
          (response.data)
        } catch (error) {
          (error);
        }
        setLoading(false);
      };
      fetchData();
    }, []);

    

    const unlock = (user) => {
      user.enabled = true
      UserService.updateUser(user,user.id)
      .then((response) => {
      (response);
        // const tab = users
        //   for(let i=0;i<tab.length;i++){
        //     if(tab[i].id == user.id){
        //       tab[i].enabled = true
        //     }
        //   }
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
      (error);
      });
        
    }

    const [currentUser,setCurrentUser] = useState(null)
      const [id,setId] = useState('')
      useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const user = await AuthService.getCurrentUser();
            ("u"+user)
            const response = await UserService.findByEmail(user.email)
            setCurrentUser(response.data);
            ("Ez"+user)
            // user.roles.map(e => (e.name))
            ("Halo"+response.data)
          } catch (error) {
            (error);
          }
          setLoading(false);
        };
        fetchData();
      }, []);
      

    const block = (user) => {
      user.enabled = false
      UserService.updateUser(user,user.id)
      .then((response) => {
      (response);
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
      (error);
      });
    }

    if(currentUser == null || currentUser.role !== 'ROLE_ADMIN'){
      return <AccessDenied></AccessDenied>
    }else{
    return <div style={{marginTop:80}}>
        <hr></hr>
        <h4>Użytkownicy</h4>
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
        <div style={{marginTop:15, float:'right',marginBottom:30}}>
           <FaSortAlphaDown size={30} onClick={() => setSelectedOption(false)}></FaSortAlphaDown>
           <FaSortAlphaDownAlt size={30} onClick={() => setSelectedOption(true)}></FaSortAlphaDownAlt>
           </div>
 
           {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,margnLeft:'auto',marginRight:'auto'}}/> :filteredData.map((user,index) =>
        
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
                        { user.enabled ? <Button  style={{display: 'inline-block', marginRight: 25,color: 'red'}} id={"block"+index} onClick={() => block(user)}><FaLock style={{marginTop: -4}} size={20}></FaLock>Blokuj</Button> : 
                        <Button id={"unlock"+index}style={{display: 'inline-block', marginRight: 25,color: 'green'}} onClick={() => unlock(user)}><FaLockOpen style={{marginTop: -4}} size={20}></FaLockOpen>Odblokuj</Button>}
                        <ExpandMore
                            onClick={() => handleExpandClick(index)}
                            aria-expanded={expandedId === index}
                            // aria-label="show more"
                          >
                            <Button  style={{display: 'inline-block', float:'right',color:'blue'}}><FaEnvelope size={20} style={{marginTop: -4,marginRight: 4}}></FaEnvelope>Wyślij wiadomość</Button>
                        </ExpandMore>
                        <Collapse in={expandedId === index} timeout="auto" unmountOnExit>
            <Formik
                initialValues={{
                  title:'',
                    content: '',
                }}
                validationSchema={Yup.object().shape({
                    content: Yup.string()
                        .required('Wiadomość jest wymagana'),
                    title: Yup.string()
                        .required("Temat jest wymagany")
                })}
                onSubmit={fields => {
                    (fields)
                    // fields.acceptTerms = null
                    UserService.respond(currentUser.email, fields.content,fields.title, user.email).then((response) => {
                        (response);
                        // navigaye("/sport");
                        })
                        .catch((error) => {
                        (error);
                        });
                }}>
                {({ dirty, isValid, values, handleChange, handleBlur,errors,touched }) => {
              return (
                    <Form style={{ width: '150%', marginTop: 60}}>
                        <div className="form-group" style={{marginRight: 200}}>
                              <Field label={<span>Temat<span style={{color:'red'}}>*</span></span>} variant="outlined" fullWidth name="title" disabled={false} value={values.title} component={TextField} />
                            </div>
                        <div className="form-group" style={{marginTop:20,marginRight: 200}}>
                            <Field name="content" fullWidth value={values.content} label={<span>Wiadomość<span style={{color:'red'}}>*</span></span>} disabled={false} as="textarea" rows="6" cols={200}  component={TextField} multiline/>
                        </div>
                        <p><span style={{color:'red'}}>*</span> - pola są wymagane</p>
                        <div className="form-group" style={{marginTop:10}}>
                            <Button type="submit" style={{marginBottom: -20}}>Wyślij</Button>
                        </div>
                        <br></br>
                    </Form>
                    
                )}}
                </Formik>
          </Collapse>
                      </div>
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            { index != users.length-1 ? <Divider variant="inset" component="li" /> : ''}</span>     
        )}
        </List>
    <div ><FaChevronCircleUp size={50} onClick={scrollToTop} style={{marginLeft: 1300,marginBottom: 50}}></FaChevronCircleUp></div>
    <Footer></Footer>
    </div>}
}