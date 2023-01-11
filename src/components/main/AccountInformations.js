import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import { useState, useEffect } from "react";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import { FaCarAlt, FaRegIdCard, FaTaxi, FaUserEdit } from 'react-icons/fa';
import pic from "./output-onlinepngtools(2).png";
import CarService from '../services/CarService';
import './AccountInformation.css'
import { fieldToSwitch, TextField } from 'formik-material-ui';
import { Footer } from './Footer';
import { AccessDenied } from './AccessDenied';
import Girl from './girl-avatar.webp'
import Boy from './images.png'

export function AccountInformation(){
  const [currentUser, setCurrentUser] = useState(undefined);
  const [user,setUser] = useState('')
  const [loading,setLoading] = useState(null)
  const [show,setShow] = useState(false)
  const [showPassword,setShowPassword] = useState(false)

  const [id,setId] = useState('')
  const changeData = () => {
    if(show === false){
      setShow(true)
    }else{
      setShow(false)
    }
  }

  const changePassword = () => {
    if(showPassword === false){
      setShowPassword(true)
    }else{
      setShowPassword(false)
    }
  }

  const makeCard = (user) => {
    console.log(user.id)
    console.log(user.email)
    const ne = UserService.makeCard(user)
    .then((response) => {
      console.log(response);
      // const response2 = UserService.getUserById(user.id)
      // console.log(response2.data)
      //   setUser(response2.data);
      // window.onload()
      // console.log(ne.data)
      setUser(response.data)
      })
      .catch((error) => {
      console.log(error);
      });
      // console.log(ne.data)

      // setUser(ne.data)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const user = await AuthService.getCurrentUser();
        console.log("u"+user)
        const response = await UserService.findByEmail(user.email)
        setUser(response.data);
        console.log(user)
        
        console.log("Halo"+response.data)
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);


  const [password,setPassword] = useState(false)
  
  if(user == null){
    <AccessDenied></AccessDenied>
  }else{

    return <div style={{marginTop:80}}>
        <hr></hr>
        <h4>Informacje</h4>
        <hr></hr>
   
        <Card style={{ minWidth: 400 , float: 'left',borderRadius:15, textAlign:'center',marginRight:100}}>
            <CardContent>
                <FaRegIdCard size={30}></FaRegIdCard>
                <Typography variant="h5" component="div">
                <b>{user.name} {user.surname}</b>
                {user?.name.endsWith("a") ? <Avatar alt={user.name + user.surname} src={Girl} style={{height: 90, width: 70, marginTop: -80, marginLeft: -5, marginRight: 8}}/> : <Avatar alt={user.name + user.surname} src={Boy} style={{height: 90, width: 70, marginTop: -80, marginLeft: -5, marginRight: 8}}/>}
                </Typography>
                <Typography variant="body2" >
                  <Formik
                initialValues={{
                    id: user.id,
                    name: user.name,
                    surname: user.surname,
                    enabled: user.enabled,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    street: user.street,
                    postCode: user.postCode,
                    numberOfStreet: user.numberOfStreet,
                    numberOfFlat: user.numberOfFlat,
                    city: user.city,
                    password: user.password,
                    dateOfBirth:user.dateOfBirth,
                    verificationCode: user.verificationCode,
                    resetPasswordToken: user.resetPasswordToken,
                    points: user.points,
                    pesel: user.pesel,
                    createdTime: user.createdTime
                }}
                enableReinitialize="true"
                validationSchema={Yup.object().shape({
                    email: Yup.string().email("Nieprawidłowy email"),
                    postCode: Yup.string().matches('[0-9]{2}-[0-9]{3}', 'Kod pocztowy jest niepoprawny'),
                    numberOfFlat: Yup.number(),
                    city: Yup.string(),
                    street: Yup.string(),
                    phoneNumber: Yup.string()
                })
                  
                }
                onSubmit={fields => {
                  console.log("Elo")
                  console.log(fields)
                    UserService.updateUser(fields,user.id)
                    .then((response) => {
                            console.log(response);
                            // navigaye("/sport");
                            setUser(response.data)
                            })
                            .catch((error) => {
                            console.log(error);
                            });
                      setShow(false)
                }}
                render={({ errors, status, touched }) => (
                    <Form style={{marginTop:30}}>
                <h6><b>Data urodzenia</b> {new Date(user.dateOfBirth).toLocaleDateString("pl-PL")}r.</h6>
                <h6 style={{display: 'inline-block'}}><b>Adres </b></h6> { !show ? <h6 style={{display: 'inline-block'}}>{user.postCode} {user.city}, ul.{user.street} {user.numberOfFlat != null ? user.numberOfStreet+"/"+user.numberOfFlat : user.numberOfFlat}</h6> : <span>       
                <br></br>
                <label htmlFor="postCode"><b>Kod pocztowy</b> </label>
                <Field name="postCode" type="text"  className={'form-control' + (errors.postCode && touched.postCode ? ' is-invalid' : '')} placeholder={user.postCode}/> 
                <br></br>
                <label htmlFor="city"><b>Miejscowość</b> </label>
                <Field name="city" type="text" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} placeholder={user.city}/>
                <br></br>
                <label htmlFor="street"><b>Ulica</b> </label>
                <Field name="street" type="text" className={'form-control' + (errors.street && touched.street ? ' is-invalid' : '')} placeholder={user.street}/>
                <br></br>
                <label htmlFor="numberOfStreet"><b>Numer domu/bloku</b> </label>
                <Field name="numberOfStreet" type="text" className={'form-control' + (errors.numberOfStreet && touched.numberOfStreet ? ' is-invalid' : '')} placeholder={user.numberOfStreet}/>
                <br></br>
                <label htmlFor="numberOfFlat"><b>Numer mieszkania</b> </label>
                <Field name="numberOfFlat" type="text" className={'form-control' + (errors.numberOfFlat && touched.numberOfFlat ? ' is-invalid' : '')} placeholder={user.numberOfFlat}/></span>}
                { show ? <br></br> : ''}
                <h6><b>PESEL</b> {user.pesel}</h6>
                { show ? <br></br> : ''}
                <h6 style={{display: 'inline-block'}}><b>Email</b> </h6>{ !show ? <h6 style={{display: 'inline-block'}}> {user.email}</h6> : <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} placeholder={user.email}/>} 
                <br></br>
                <h6 style={{display: 'inline-block'}}><b>Numer telefonu </b> </h6>{ !show ? <h6 style={{display: 'inline-block'}}>  +48 {user.phoneNumber}</h6> : <Field name="phoneNumber" type="text" className={'form-control' + (errors.phoneNumber && touched.phoneNumber ? ' is-invalid' : '')} placeholder={user.phoneNumber}/>}
                { show ? <div><Button type="submit" >Aktualizuj</Button>
                <Button type="submit" onClick={() => setShow(false)}>Anuluj</Button></div> : ''}
                </Form>)}/>
                </Typography>
                
            </CardContent>
            <CardActions>
                <div style={{textAlign: 'center',width:'100%'}}>
                { show ? '' : <Button onClick={changePassword} style={{display:'inline-block',textAlign: 'center'}}>Zmień hasło</Button>}
                {show ? '' : <Button  onClick={changeData} style={{marginLeft: 0,display:'inline-block',textAlign: 'center'}} ><FaUserEdit size={25} style={{marginRight: 3, marginTop: -3}}></FaUserEdit>Edytuj dane</Button>}
                { user.card == null ? <Button onClick={() => makeCard(user)} style={{marginLeft: 0,display:'inline-block',textAlign: 'center', marginRight:-7}}>Załóż kartę</Button> : ''}
                </div>
              </CardActions>
        </Card>  
        
        {user.card != null ? <span ><h4 style={{textAlign:'center',marginRight:500}}><b>Karta SobRent</b></h4>
        <Card id={"card"} style={{ width: 350 , height: 200, borderRadius: 10, backgroundColor:'#CD5C5C', marginRight: -350 }} >
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
              <div style={{ marginTop: -15, marginLeft:225}}><FaCarAlt style={{display: 'inline-block',marginRight: 4}}></FaCarAlt><h6 style={{display: 'inline-block'}}>{user.card.points}</h6></div>
            </Typography>
          </CardContent>
        </Card></span> : ''}
        <Formik
                initialValues={{
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                }}
                validationSchema={Yup.object().shape({
                    oldPassword: Yup.string()
                    .test('oldPassword', "Nieprawidłowe hasło",async (value) => {
                      const response = UserService.findByPassword(value)
                      .then(response =>{
                          setPassword(response.data)
                      })
                      .catch(error => console.log(error))

                      return password
                  })
                    .required('Hasło jest wymagane'),
                    newPassword: Yup.string()
                        .min(8, 'Hasło musi mieć co najmniej 8 znaków')
                        // .matches("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/", "Hasło musi zawierać co najmniej jedną wielka literę, małą literę, cyfrę oraz znak specjalny")
                        .required('Hasło jest wymagane'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('newPassword'), null], 'Hasła muszą się zgadzać')
                        .required('Powtórzenie hasła jest wymagane'),
                })}
                onSubmit={fields => {
                  user.password = fields.newPassword
                    UserService.changePassword(user).then((response) => {
                        console.log(response);
                        document.getElementById("false").hidden = false
                        setTimeout( () =>
                          setShowPassword(false)
                        ,3000);
                        })
                        .catch((error) => {
                        console.log(error);
                        });
                    fields.newPassword = ''
                    fields.oldPassword = ''
                    fields.confirmPassword = ''
                }}
                render={({ errors, status, touched }) => (
                  <div className="row" >
                   { showPassword ? <Form style={{ float: 'right', display: 'inline-block', marginLeft: -10, marginTop:0}} >
                        <h4 style={{marginLeft: 500, textAlign:'center'}}>Zmiana hasła</h4>
                        <h6 style={{color:'blue',marginLeft: 500, textAlign:'center'}} id="false" hidden>Hasło zostało poprawnie zmienione.</h6>
                        <div className="column" style={{top:0, width:'35%',float: 'right', display: 'inline-block'}}>
                            <div className="form-group" style={{marginTop:10}}>
                                <Field name="oldPassword" type="password" label={<span>Stare hasło<span style={{color:'red'}}>*</span></span>} disabled={false} fullWidth component={TextField} size="small"/>
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field name="newPassword" type="password"  label={<span>Nowe hasło<span style={{color:'red'}}>*</span></span>} disabled={false} fullWidth component={TextField} size="small"/>
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field name="confirmPassword" type="password" label={<span>Powtórz hasło<span style={{color:'red'}}>*</span></span>} disabled={false} fullWidth component={TextField} size="small"/>
                            </div>      
                            <br></br>
                            <p><span style={{color:'red'}}>*</span> - pola są wymagane</p>
                            <div className="form-group" style={{marginTop:10, }}>
                                <Button type="submit" style={{marginLeft: 70}}>Zmień hasło</Button>
                            </div>
                        </div>
                        <br></br>
                        
                    </Form> : ''
                }
                    </div>
                )}
            />

        
            <div style={{marginTop:650}}><Footer></Footer></div>
    </div>}
}