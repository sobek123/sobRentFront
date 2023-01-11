// import { TextField } from "formik-material-ui";
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import UserService from '../services/UserService';
// import { Card } from "@mui/material";
// import { Footer } from "./Footer";

import { Formik, Field, Form, ErrorMessage } from 'formik';
import "./SocialMedia.css";
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService.js'
import { useNavigate} from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import { Button, Card, CardHeader, InputAdornment } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { Footer } from './Footer';
import UserService from '../services/UserService';
import { Spinner } from 'react-bootstrap';

export function SendEmail(){

    const [showButton, setShowButton] = useState(true)
    const [loading,setLoading] = useState(false)
    return <div style={{marginTop: 80}}>
        {/* <Card>
        <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required("Email jest wymagany")
                    
                })}
                onSubmit={fields => {
                    UserService.processEmail(fields).then((response) => {
                        console.log(response);
                        document.getElementById("sent").hidden = false
                        })
                        .catch((error) => {
                        console.log(error);
                        });
                }}> {({ dirty, isValid, values, handleChange, handleBlur, errors, status, touched }) => {
                    return (
                  <div className="row" >
                    <h6 hidden id="sent">Wysłaliśmy wiadomośc na Twój adres email</h6>
                    <Form style={{marginTop:80}}>
                        <h3>Aby dokonać zmiany hasła, podaj adres email, na który mamy przesłać link</h3>
                        <div className="column" style={{marginTop:80, width:'35%', margin:'auto'}}>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Email<span style={{color:'red'}}>*</span></span>} variant="outlined" disabled={false} fullWidth name="email" value={values.email} component={TextField} />
                            </div>
                           
                            <div className="form-group" style={{marginTop:10}}>
                                <button type="submit" className="btn btn-primary mr-2">Wyślij</button>
                            </div>
                        </div>
                    </Form>
                    </div>
                )}}
            </Formik>
            </Card>
      <Footer></Footer> */}
<Card style={{marginTop:80,width: 500 ,height: 350,marginLeft: 'auto',marginRight: 'auto', borderRadius: 15,boxShadow: '10 10 5 black'}}>
        <CardHeader title="Aby dokonać zmiany hasła, podaj adres e-mail (do którego przypisane jest konto), na który mamy przesłać wiadomość" style={{ textAlign: 'center', marginTop:20 }}></CardHeader>
        <Formik
                initialValues={{
                    email: '',

                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('E-mail jest nieprawidłowy')
                        .required('E-mail jest wymagany'),
                    
                })}
                onSubmit={fields => {
                    console.log(fields)
                    setLoading(true)
                    setShowButton(false)
                    UserService.processEmail(fields.email).then((response) => {
                        console.log(response);
                        setLoading(false)
                        setShowButton(true)
                        document.getElementById("sent").hidden = false
                        document.getElementById("sentError").hidden = true
                        })
                        .catch((error) => {
                        document.getElementById("sentError").hidden = false
                        document.getElementById("sent").hidden = true
                        console.log(error);
                        });
                }}>
                {({ dirty, isValid, values, handleChange, handleBlur }) => {
                    return (
                        <Form style={{marginTop:20}}>
                    <h6 hidden id="sent" style={{textAlign: 'center', color:'blue'}}>Wysłaliśmy wiadomośc na Twój adres e-mail</h6>
                    <h6 hidden id="sentError" style={{textAlign: 'center', color:'red'}}>Nie znaleziono użytkownika o podanym adresie e-mail</h6>
                        
                        <div className="column" style={{marginTop:80, width:'35%', margin:'auto'}}>
                            <div className="form-group" style={{marginTop:20, width: 300, marginLeft:-60}}>
                                <Field label={<span>E-mail<span style={{color:'red'}}>*</span></span>} variant="outlined" disabled={false} fullWidth name="email" value={values.email} component={TextField} />
                            </div>
                           
                            <div className="form-group" style={{marginTop:10, marginLeft:60}}>
                                {showButton ? <Button type="submit" style={{color:'blue'}}>Wyślij</Button> : ''}
                                {loading ? <Spinner animation="border" role="status" style={{marginLeft: 'auto', marginRight: 'auto'}}></Spinner> : ''}

                            </div>
                        </div>
                    </Form>)}}
            </Formik>
      </Card>
<br></br>
      <div style={{marginBottom: -110}}><Footer></Footer></div>
            </div>
}