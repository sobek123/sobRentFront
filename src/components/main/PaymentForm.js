import React, { useContext } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import "./SocialMedia.css";
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService.js'
import { useNavigate} from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import { Button } from '@mui/material';
import { Success } from './Success';
import { useState } from 'react';
import CartContext from '../../CartContext';

export function PaymentForm(props){
    const [show,setShow] = useState(true)
    const {items} = useContext(CartContext)
    return (
      <Formik
                initialValues={{
                    cvc: '',
                    expiry: '',
                    focused: '',
                    name: '',
                    number: ''
                }}
                validationSchema={Yup.object().shape({
                    number: Yup.string()
                        .required('Numer karty jest wymagany')
                        .matches(/^[0-9]+$/, "Nieprawidłowy typ danych")
                        .max(16,"Nieprawidłowa ilość znaków"),
                    cvc: Yup.string()
                        .required('CVC jest wymagany')
                        .min(3, "Nieprawidłowa ilość znaków")
                        .matches(/^[0-9]+$/, "Nieprawidłowy typ danych")
                        .max(3,"Nieprawidłowa ilość znaków"),
                    name: Yup.string()
                        .required("Imię i nazwisko jest wymagane"),
                    expiry: Yup.string()
                        .max(4,"Nieprawidłowa ilość znaków")
                        .matches(/^[0-9]+$/, "Nieprawidłowy typ danych")
                        .min(4, "Nieprawidłowa ilość znaków")
                        .required("Data ważności jest wymagana"),
                })}
                onSubmit={fields => {
                    // handleSubmit
                }}>
                {({ dirty, isValid, values, handleChange, handleBlur }) => {
                    return (
                      <span>
                      <span style={{float:"left",marginLeft:400,marginRight:'auto'}}>
                      <Cards
                      cvc={values.cvc}
                      expiry={values.expiry}
                      focused={values.focused}
                      name={values.name}
                      number={values.number}
                    />
                    </span>
                    { show ? <Form style={{ width:'45%', margin:'auto',float:'right',marginLeft:'auto',marginRight:'auto'}}  >
                        <div className="form-group">
                            <Field name="number" type="text" label={<span>Numer karty<span style={{color:'red'}}>*</span></span>} disabled={false} component={TextField} value={values.number} style={{width: 400}} maxLength="16"/>
                        </div>
                        <div className="form-group" style={{marginTop:15}}>
                            <Field name="name" type="text" label={<span>Imię i nazwisko<span style={{color:'red'}}>*</span></span>} disabled={false} component={TextField} value={values.name} style={{width: 400}} />
                        </div>
                        <div className="form-group" style={{marginTop:15,float:'left'}}>
                            <Field name="expiry" type="text" label={<span>Data ważności<span style={{color:'red'}}>*</span></span>} disabled={false} component={TextField} value={values.expiry} style={{width: 250}} maxLength={4}/>
                        </div>
                        <div className="form-group" style={{marginTop:15,float:'right',marginRight: 180}}>
                            <Field name="cvc" type="number" label={<span>CVC<span style={{color:'red'}}>*</span></span>} disabled={false} component={TextField} value={values.cvc} style={{width: 150}} maxLength={3} max={3}/>
                        </div>
                        <div className="form-group" style={{marginTop:100}}>
                            <Button type="submit" onClick={() => props.handleSubmit(items) }>Złóż zamówienie</Button>
                            <Button type="reset" style={{color:'black'}}>Wyczyść</Button>
                        </div> 
                        <br></br>
                    </Form> : ''}</span>)}}
            </Formik>
    );
}