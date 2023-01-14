import UserService from '../services/UserService';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import ContactService from '../services/ContactService';
import { Checkbox, TextField } from 'formik-material-ui';
import { Button, TextareaAutosize } from '@mui/material';
import { Footer } from './Footer';

export function Contact(){
    return <div><div >   
        <div style={{float:'left', display:'inline', width: '49%'}}>
        <hr style={{marginTop:80, width: '50%'}}></hr>
        <div style={{width:'50%'}}><h2 style={{textAlign:'center'}}>Kontakt</h2></div>
        
        <hr style={{width: '50%'}}></hr>
            <h4 style={{marginTop: 20}}><FaLocationArrow style={{marginRight:5}}></FaLocationArrow>Adres:</h4>
            <h5>ul.Branickiego 30/34
                <br></br>
                15-654 Białystok
            </h5>
            <h4 style={{marginTop: 20}}><FaRegClock style={{marginTop:-4,marginRight:5}}></FaRegClock>Godziny otwarcia:</h4>
            <h5>Poniedziałek - Piątek: 8:00 - 18:00
                <br></br>
                Sobota: 9:00 - 15:00
            </h5>

            <h4 style={{marginTop: 20}}><FaRegEnvelope style={{marginTop:-4,marginRight:5}}></FaRegEnvelope>E-mail:</h4>
            <h5>
                sobrent@gmail.com
            </h5>
            <h4 style={{marginTop: 20}}><FaPhoneAlt style={{marginRight:5}}></FaPhoneAlt>Telefon:</h4>
            <h5>
            +48 85 576 534 213
            </h5>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            

        </div>
        <div>
        <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                    phoneNumber: '',
                    content: '',
                    acceptTerms: false
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required('Imię jest wymagane'),
                        surname: Yup.string()
                        .required('Nazwisko jest wymagane'),
                    email: Yup.string()
                        .email('E-mail jest nieprawidłowy')
                        .required('E-mail jest wymagany'),
                        phoneNumber: Yup.string()
                        .required('Numer telefonu jest wymagany'),
                    content: Yup.string()
                        .required('Wiadomość jest wymagana'),
                    acceptTerms: Yup.bool().oneOf([true], "Wyrażenie zogdy na przetwarzanie danych osobowych jest wymagane")
                })}
                onSubmit={fields => {
                    (fields)
                    // fields.acceptTerms = null
                    ContactService.addContact(fields).then((response) => {
                        (response);
                        // navigaye("/sport");
                        })
                        .catch((error) => {
                        (error);
                        });
                }}>
                {({ dirty, isValid, values, handleChange, handleBlur,errors,touched }) => {
              return (
                    <Form style={{marginTop:100,float:'left', display:'inline', width: '40%'}}>
                        <h2>Napisz do nas</h2>
                        <br></br>
                        <div className="form-group" >
                                <Field label={<span>Imię<span style={{color:'red'}}>*</span></span>} variant="outlined" fullWidth name="name" disabled={false} value={values.firstName} component={TextField} />
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Nazwisko<span style={{color:'red'}}>*</span></span>} variant="outlined" disabled={false} fullWidth name="surname" value={values.lastName} component={TextField}/>
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>E-mail<span style={{color:'red'}}>*</span></span>} disabled={false} variant="outlined" fullWidth name="email" value={values.email} component={TextField} />
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Numer telefonu<span style={{color:'red'}}>*</span></span>} name="phoneNumber" disabled={false} type="tel"  fullWidth  value={values.phoneNumber} component={TextField}/>
                            </div>
                        <div className="form-group" style={{marginTop:20}}>
                            <Field name="content" fullWidth label={<span>Wiadomość<span style={{color:'red'}}>*</span></span>} disabled={false} as="textarea" rows="6" cols={200}  component={TextField} multiline/>
                        </div>
                        <div className="form-group form-check" style={{marginTop: 40,display:'block',marginLeft: 0}}>
                                <Field type="checkbox" name="acceptTerms"  style={{display:'inline'}}  disabled={false} className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')}/>
                                <label htmlFor="acceptTerms" className="form-check-label" style={{display:'block',marginLeft: 5,marginTop:-23}}>Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z ustawą o ochronie danych osobowych w związku z (np. wysłaniem zapytania przez formularz kontaktowy).
                                Podanie danych jest dobrowolne, ale niezbędne do przetworzenia zapytania. Zostałem poinformowany, że przysługuje mi prawo dostępu do swoich danych, możliwości ich poprawiania, żądania zaprzestania ich przetwarzania.
                                Administratorem danych osobowych jest SobRent Wypożyczalnia Sp. z o.o z siedzibą  w  Białymstoku na ul.Branickiego 30/34, 15-654 Białystok, NIP: 5423313186<span style={{color:'red'}}>*</span></label>
                                <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                            </div> 
                        <p><span style={{color:'red'}}>*</span> - pola są wymagane</p>

                        <div className="form-group" style={{marginTop:10}}>
                            <Button type="submit" style={{color:'blue'}}>Wyślij</Button>
                        </div>
                        {/* <h6 style={{}}>Skontaktujemy się z Tobą telefonicznie lub mailowo w przeciągu kilki dni. Pozdrawiamy, zespół SobRent!</h6> */}

                        <br></br>
                    </Form>
                    
                )}}
                
                </Formik>
                </div>
                <br></br>
            
    </div>
                <div style={{marginTop: 1000}}><Footer ></Footer></div>
</div>
}