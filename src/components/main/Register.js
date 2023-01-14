import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./SocialMedia.css";
import { Link } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom'
import AuthService from '../services/AuthService';
import { Card, CardActions, CardContent, CardHeader, InputAdornment} from '@mui/material';
import { Label } from '@mui/icons-material';
import { TextField } from "formik-material-ui"
import { Button } from '@mui/material';
import { CustomTextFields } from './CustomTextFields';
import UserService from '../services/UserService';
import { Successful } from './Successful';
import { Footer } from './Footer';
import { Spinner } from 'react-bootstrap';
// import { CustomTextField } from './CustomTextFields';
export function Register(){
    // const [passwordShown, setPasswordShown] = useState(false);
    // let navigate = useNavigate();

    // const handleRegister = (e) => {
    //     e.preventDefault();
    
       
    
        
    
    //     if (checkBtn.current.context._errors.length === 0) {
    //       AuthService.register().then(
    //         (response) => {
    //           setMessage(response.data.message);
    //           setSuccessful(true);
    //         },
    //         (error) => {
    //           const resMessage =
    //             (error.response &&
    //               error.response.data &&
    //               error.response.data.message) ||
    //             error.message ||
    //             error.toString();
    
            
    //         }
    //       );
    //     }
    //   };
  // Password toggle handler
//   const togglePassword = () => {
//     // When the handler is invoked
//     // inverse the boolean state of passwordShown
//     setPasswordShown(!passwordShown);
//   };
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')

    const [email,setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const [showPassword,setShowPassword] = useState(true)
    const [showPassword2,setShowPassword2] = useState(true)

    const [passwordScore,setPasswordScore] = useState()
    let navigate = useNavigate();

    const [pesel,setPesel] = useState('')
    const [loading,setLoading] = useState(false)
    const [showButton,setShowButton] = useState(true)
    const onSubmit = (values) => {
        (values)
        setLoading(true)
        setShowButton(false)
        UserService.saveUser(values)
        .then((response) => {
        (response);
        setLoading(false)
        setShowButton(true)
        // navigate("/logowanie");
        document.getElementById("form").hidden = false
        // document.getElementById("f").hidden = true
        // return <Successful></Successful>
        })
        .catch((error) => {
        // document.getElementById("error").hidden = false
        // document.getElementById("form").hidden = true
        // document.getElementById("f").hidden = false
        (error);
        });
      }

      
    // const { password } = this.state;
    return <div>
        <Card style={{marginTop:80, borderRadius:15,boxShadow: '10 10 5 black'}}>
            <CardHeader title="Rejestracja" style={{textAlign:'center'}} ></CardHeader>
        <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                    postCode: '',
                    street: '',
                    city: '',
                    dateOfBirth: '',
                    phoneNumber: '',
                    pesel: '',
                    numberOfStreet: '',
                    numberOfFlat: '',
                    password: '',
                    confirmPassword: '',
                    acceptTerms: false
                }}
                validationSchema={
                    Yup.object().shape({
                    name: Yup.string()
                        .required('Imię jest wymagane'),
                    surname: Yup.string()
                        .required('Nazwisko jest wymagane'),
                    email: Yup.string()
                        .email('E-mail jest nieprawidłowy')
                        .test("email", "Podany adres e-mail już istnieje", (value) => {
                            UserService.findByEmail(value).then((response) =>{
                                setEmail(response.data)
                            })
                            .catch((error) => {
                                (error);
                            });
                            // (response)

                            return !email
                            })
                        .required('E-mail jest wymagany'),
                    postCode: Yup.string()
                        .required('Kod pocztowy jest wymagany')
                        .matches('[0-9]{2}-[0-9]{3}', 'Kod pocztowy jest niepoprawny'),
                    street: Yup.string()
                        .required('Ulica jest wymagana'),
                    city: Yup.string()
                        .required('Miasto jest wymagane')
                        .matches('[a-z]+([ -][A-Z][a-z]+)?','Miasto jest niepoprawne'),
                    phoneNumber: Yup.string()
                        .required('Numer telefonu jest wymagany')
                        .min(9, "Numer telefonu ma nieprawidłową ilość znaków")
                        .max(12, "Numer telefonu ma nieprawidłową ilość znaków")
                        .test("phoneNumber", "Podany numer telefonu już istnieje", async (value) => {
                            const response = UserService.findByPhoneNumber(value)
                            .then(response =>{
                                setPhoneNumber(response.data)
                            })
                            .catch(error => (error))

                            return !phoneNumber
                        })
                        .matches('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}$', 'Numer telefonu jest niepoprawny'),
                        // .matches('[0-9]{3}-[0-9]{3}-[0-9]{3}', 'Numer telefonu jest niepoprawny')
                        // .matches('[0-9]{9}', "Numer telefonu jest nieprawidłowy"),
                    dateOfBirth: Yup.date()
                        .required('Data urodzenia jest wymagana')
                        .test("dateOfBirth", "Niepoprawny wiek", function (value) {
                            const diffTime = Math.abs(new Date() - new Date(value));
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                            return diffDays >= 18;
                          }),
                    pesel: Yup.string()
                        .min(11, "Numer PESEL ma nieprawidłową ilość znaków")
                        .max(11, "Numer PESEL ma nieprawidłową ilość znaków")
                        .matches('[0-9]{11}', "Numer PESEL jest nieprawidłowy")
                        .test("pesel", "Podany numer PESEL już istnieje", function (value) {
                            const response = UserService.findByPesel(value)
                            .then(response =>{
                                setPesel(response.data)
                            })
                            .catch(error => (error))

                            return !pesel
                          })
                        .required('Numer PESEL jest wymagany'),
                    numberOfStreet: Yup.string()
                        .required('Numer domu/bloku jest wymagany')
                        .min(1, 'Nieprawidłowy numer domu/bloku'),
                        // .matches('[0-9]+[A-Z]?[0-9]+[A-Z]?', 'Numer domu/bloku jest niepoprawny'),
                    numberOfFlat: Yup.number()
                        .min(1, 'Nieprawidłowy numer mieszkania'),
                    password: Yup.string()
                        .min(8, 'Hasło musi mieć co najmniej osiem znaków')
                        // .matches("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/", "Hasło musi zawierać co najmniej jedną wielka literę, małą literę, cyfrę oraz znak specjalny")
                        .required('Hasło jest wymagane'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Hasła muszą się zgadzać')
                        .required('Powtórzenie hasła jest wymagane'),
                    acceptTerms: Yup.bool().oneOf([true], "Wyrażenie zgody na przetwarzanie danych osobowych jest wymagane")
                })
            }
                onSubmit={onSubmit}
                >
                    {({ dirty, isValid, values, handleChange, handleBlur, errors, status, touched }) => {
              return (
                
                
                  <div className="row" style={{display: 'flex'}}>
                    <Form >
                        <CardContent>
                            <h6 style={{color:'blue', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}} id="form" hidden>Aby dokończyć rejestrację, przejdź do swojej skrzynki pocztowej</h6>
                            <h6 id="error" style={{color:'red', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}} hidden>Coś poszło nie tak. Spróbuj jeszcze raz</h6>
                        <br></br>
                        <div id="f">
                        <div className="column" style={{float:'left', display:'inline', width: '35%',marginRight:50,marginLeft: 100}}>
                            <div className="form-group" >
                                <Field label={<span>Imię<span style={{color:'red'}}>*</span></span>} variant="outlined" fullWidth name="name" disabled={false} value={values.firstName} component={TextField} />
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Nazwisko<span style={{color:'red'}}>*</span></span>} variant="outlined" disabled={false} fullWidth name="surname" value={values.lastName} component={TextField}/>
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>E-mail<span style={{color:'red'}}>*</span></span>} variant="outlined" disabled={false} fullWidth name="email" value={values.email} component={TextField} />
                            </div>
                             <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>PESEL<span style={{color:'red'}}>*</span></span>} disabled={false} variant="outlined" fullWidth name="pesel" value={values.pesel} component={TextField} />
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Data urodzenia<span style={{color:'red'}}>*</span></span>} name="dateOfBirth" type="date"  fullWidth placeholder="" value={values.dateOfBirth} component={TextField} InputLabelProps={{ shrink: true }}/>
                            </div>
                            
                            <div className="form-group form-check" style={{marginTop: 40,display:'block',marginLeft: 0}}>
                                <Field type="checkbox" name="acceptTerms"  style={{display:'inline'}}  disabled={false} className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')}/>
                                <label htmlFor="acceptTerms" className="form-check-label" style={{display:'block',marginLeft: 5,marginTop:-23}}>Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z ustawą o ochronie danych osobowych w związku z (np. wysłaniem zapytania przez formularz kontaktowy).
                                Podanie danych jest dobrowolne, ale niezbędne do przetworzenia zapytania. Zostałem poinformowany, że przysługuje mi prawo dostępu do swoich danych, możliwości ich poprawiania, żądania zaprzestania ich przetwarzania.
                                Administratorem danych osobowych jest SobRent Wypożyczalnia Sp. z o.o z siedzibą  w  Białymstoku na ul.Branickiego 30/34, 15-654 Białystok, NIP: 5423313186<span style={{color:'red'}}>*</span></label>
                                <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                            </div> 
                            <p><span style={{color:'red'}}>*</span> - pola są wymagane</p>
                            <CardActions>
                            <div className="form-group" style={{marginTop:10}}>
                               {showButton ? <Button type="Submit">Utwórz nowe konto</Button> : ''}
                            {loading ? <Spinner animation="border" role="status" style={{marginLeft: 'auto', marginRight: 'auto'}}></Spinner> : ''}

                            </div>
                            </CardActions>
                         </div>
                        <div className="column" style={{float:'left', display:'inline', width: '35%', marginLeft:100}}>
                            <div className="form-group" >
                                <Field label={<span>Miejscowość<span style={{color:'red'}}>*</span></span>} name="city" disabled={false} type="text"  fullWidth  value={values.city} component={TextField}/>
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Ulica<span style={{color:'red'}}>*</span></span>} name="street" type="text"  disabled={false} fullWidth  value={values.street} component={TextField}/>
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Numer domu/bloku<span style={{color:'red'}}>*</span></span>} name="numberOfStreet" type="text" disabled={false}  fullWidth value={values.numberOfStreet} component={TextField}/>
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label="Numer mieszkania" name="numberOfFlat" type="number" min="1"  fullWidth value={values.numberOfFlat} disabled={false} component={TextField}/>
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Kod pocztowy<span style={{color:'red'}}>*</span></span>} name="postCode" type="text"  fullWidth  disabled={false} value={values.postCode} component={TextField}/>
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Numer telefonu<span style={{color:'red'}}>*</span></span>} name="phoneNumber" type="tel"  fullWidth  disabled={false} value={values.phoneNumber} component={TextField}/>
                            </div>
                        
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Hasło<span style={{color:'red'}}>*</span></span>} name="password" type={showPassword ? "password" : "text"} disabled={false} fullWidth spellCheck="false" value={values.password} onKeyUp={(e) => {setPassword(e.currentTarget.value);}} component={TextField} InputProps={{
      endAdornment: (
          <InputAdornment position="end">
              { showPassword ? <FaEye size={20} onClick={ () => setShowPassword(false)}/> : <FaEyeSlash size={20}  onClick={ () => setShowPassword(true)}></FaEyeSlash>} 
          </InputAdornment>
      )}}/>
                                <PasswordStrengthBar password={values.password} onChangeScore={setPasswordScore} scoreWords={["brak","bardzo słabe","słabe", "średnie", "mocne", "bardzo mocne"]}></PasswordStrengthBar>
                            </div>
                        
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Powtórz hasło<span style={{color:'red'}}>*</span></span>} disabled={false} name="confirmPassword" type={showPassword2 ? "password" : "text"} fullWidth spellCheck="false" value={values.confirmPassword} onKeyUp={(e) => {setPassword2(e.currentTarget.value);}} component={TextField} InputProps={{ endAdornment: (
          <InputAdornment position="end">
              { showPassword2 ? <FaEye size={20} onClick={ () => setShowPassword2(false)}/> : <FaEyeSlash size={20}  onClick={ () => setShowPassword2(true)}></FaEyeSlash>} 
          </InputAdornment>
      )}}/>
                            </div>

                            <div className="form-group" style={{marginTop:20}}>
                                <h6>Masz już konto? Zaloguj się <Link to="/logowanie">tutaj</Link>.</h6>
                            </div>
                        </div>
                        </div>
                        </CardContent> 
                    </Form>
                    </div>)}}</Formik></Card>
                
            
            
            <br></br>
            <br></br>
            <Footer></Footer>
        </div>
}