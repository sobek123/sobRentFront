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
import { SendEmail } from './SendEmail';
import { Spinner } from 'react-bootstrap';
export function Login(){
    let navigate = useNavigate();

    const [showPassword,setShowPassword] = useState(true)
    const [show, setShow] = useState(false)
    const [showButton, setShowButton] = useState(true)

    const [loading,setLoading] = useState(false)
    return <>
    <Card style={{marginTop:80,width: 550 ,height: 550,marginLeft: 'auto',marginRight: 'auto', borderRadius: 15,boxShadow: '10 10 5 black'}}>
        <CardHeader title="Logowanie" style={{ textAlign: 'center', marginTop:60 }}></CardHeader>
        <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('E-mail jest nieprawidłowy')
                        .required('E-mail jest wymagany'),
                    password: Yup.string()
                        .required('Hasło jest wymagane')
                })}
                onSubmit={fields => {
                    console.log(fields)
                    setShowButton(false)
                    setLoading(true)
                    AuthService.login(fields).then(
                        () => {
                            setLoading(false)
                            setShowButton(true)
                            setShow(false)
                            navigate("/");
                          window.location.reload();

                          
                        },
                        (error) => {
                          console.log(error);
                          setShow(true)

                        }
                      );
                }}>
                {({ dirty, isValid, values, handleChange, handleBlur }) => {
                    return (
                    <Form style={{ width:'45%', margin:'auto'}}  >
                        <div className="form-group" style={{width: 300, marginLeft: -30, marginRight: 300}}>
                            <Field name="email" type="email" width="500"label={<span>E-mail<span style={{color:'red'}}>*</span></span>} fullWidth component={TextField} id="email" disabled={false}/>
                            
                        </div>
                        <div className="form-group" style={{marginTop:20, width: 300, marginLeft: -30, marginRight: 300}}>
                            <Field name="password" type={showPassword ? "password" : "text"} label = {<span>Hasło<span style={{color:'red'}}>*</span></span>} disabled={false} fullWidth component={TextField} InputProps={{endAdornment: (<InputAdornment position="end">{ showPassword ? <FaEye size={20} onClick={ () => setShowPassword(false)}/> : <FaEyeSlash size={20}  onClick={ () => setShowPassword(true)}></FaEyeSlash>} </InputAdornment>)}}/>
                        </div>
                        <br></br>
                        { show ? <h6 style={{color:'red'}}>Nieprawidłowy e-mail lub hasło</h6> : ''}

                        <div className="form-group"  style={{marginTop:5}}>
                            <Field name="rememberMe" type="checkbox"  />
                            <label htmlFor="rememberMe">Zapamiętaj mnie</label>
                        </div>
                        <div className="form-group">
                            <Link className="nav-link" to="/zapomnialem-hasla" style={{marginLeft: '-15px', color:'blue'}}>Zapomniałeś hasła?</Link>
                        </div>
                        <p style={{marginTop:10}}><span style={{color:'red' }}>*</span> - pola są wymagane</p>


                        <div className="form-group">
                            {showButton ? <Button type="submit" style={{textAlign:'center',marginLeft:70}}>Zaloguj</Button> : ''}
                            {loading ? <Spinner animation="border" role="status" style={{marginLeft: 'auto', marginRight: 'auto',textAlign:'center',marginLeft:70}}></Spinner> : ''}


                        </div>
                        <br></br>
      <p style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}}>Nie masz konta? Zarejestruj się <Link to="/rejestracja">tutaj</Link>.</p>

                    </Form>)}}
            </Formik>
      </Card>
      <br></br>
      <br></br>
      <Footer></Footer>
      </>
}