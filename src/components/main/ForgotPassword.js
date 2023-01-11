import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserService from '../services/UserService';
import {useNavigate} from 'react-router-dom'
import { TextField } from 'formik-material-ui';
import { Footer } from './Footer';
import { Button, Card,CardHeader } from '@mui/material';


export function ForgotPassword(){
  
    const navigaye = useNavigate();

    return <div>
        <Card style={{marginTop:80,width: 500 ,height: 400,marginLeft: 'auto',marginRight: 'auto', borderRadius: 15,boxShadow: '10 10 5 black'}}>
        <CardHeader title="Zmiana hasła" style={{ textAlign: 'center', marginTop:50 }}></CardHeader>
        <Formik
                initialValues={{
                    newPassword: '',
                    confirmPassword: '',
                }}
                validationSchema={Yup.object().shape({
                    newPassword: Yup.string()
                        .min(8, 'Hasło musi mieć co najmniej osiem znaków')
                        .required('Hasło jest wymagane'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('newPassword'), null], 'Hasła muszą się zgadzać')
                        .required('Powtórzenie hasła jest wymagane'),
                })}
                onSubmit={fields => {
                    UserService.forgotPassword({ password: fields.newPassword, token: window.location.pathname.slice(22)}).then((response) => {
                        console.log(response);
                        document.getElementById("false").hidden = false
                        setTimeout( () => 
                            navigaye("/logowanie")
                        ,4000);
                        })
                        .catch((error) => {
                        console.log(error);
                        });
                }}>
              {({ dirty, isValid, values, handleChange, handleBlur, errors, status, touched }) => {
                    return (
                  <div className="row" >
                    <Form >
                        <h6 style={{color:'blue',marginLeft: 'auto', marginRight:'auto', textAlign:'center'}} id="false" hidden>Hasło zostało zmienione. Jesteś przekierowywany do strony logowania...</h6>
                        <div className="column" style={{marginTop:80, width:'35%', margin:'auto'}}>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field name="newPassword" type="password"  label={<span>Nowe hasło<span style={{color:'red'}}>*</span></span>} fullWidth component={TextField} size="small" disabled={false} style={{width: 300, marginLeft: -60, marginRight: 'auto', textAlign:'center'}}/>
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field name="confirmPassword" type="password" label={<span>Powtórz hasło<span style={{color:'red'}}>*</span></span>} fullWidth component={TextField} size="small" style={{width: 300, marginLeft: -60, marginRight: 'auto', textAlign:'center'}} disabled={false}/>
                            </div>      
                            <div className="form-group" style={{marginTop:10, marginLeft:'auto', marginRight:'auto', textAlign:'center'}}>
                                <Button type="submit" style={{color:'blue'}}>Zmień hasło</Button>
                            </div>
                        </div>
                    </Form>
                    </div>
                )}}
            </Formik>
            </Card>
            <br></br>
            <Footer></Footer>
    </div>
}