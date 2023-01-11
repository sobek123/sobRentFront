import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import { Link } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useState} from 'react';
import {useNavigate} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CarService from '../services/CarService';
import React, { useEffect} from "react";

import { styled } from '@mui/material/styles';
import { FaRegSave } from 'react-icons/fa';
import { ButtonBase, CardHeader, FormControl, InputLabel, MenuItem } from '@mui/material';
import { CustomTextFields } from '../main/CustomTextFields';
import { TextField } from 'formik-material-ui';

export function AddCar(){
    const navigaye = useNavigate()
    const [categories, setCategories] = useState([]);
    const [petrols, setPetrols] = useState([]);
    const [loading, setLoading] = useState(true);

    const [transmissions, setTransmissions] = useState([]);

        useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
            const response = await CarService.getCategories();
            setCategories(response.data);
            const response2 = await CarService.getPetrols();
            setPetrols(response2.data);
            const response3 = await CarService.getTransmissions();
            setTransmissions(response3.data);
            console.log(response3.data)
            } catch (error) {
            console.log(error);
            }
            setLoading(false);
        };
        fetchData();
        }, []);

        const [file,setFile] = useState('')
   
    function handleSubmit(values){
        console.log(values)
        const form = new FormData()
        values.image = ''
        console.log(values)
        // form.append('file',file)
        CarService.saveCar(values)
        .then((response) => {
        console.log(response);
        navigaye("/samochody");
        })
        .catch((error) => {
        console.log(error);
        });
    }
    return <div>
        <Formik
                initialValues={{
                    brand: '',
                    model: '',
                    image: '',
                    km: 0,
                    nm: 0,
                    year: 0,
                    transmission: 'AUTOMATYCZNA',
                    category: 'KOMFORTOWE',
                    prize: {
                      firstPeriod: 0,
                      secondPeriod: 0,
                      thirdPeriod: 0,
                      fourthPeriod: 0,
                      fifthPeriod: 0,
                      sixthPeriod: 0,
                      deposit: 0,
                    },
                    petrol: 'DIESEL',
                    points: 0,
                    engine: '',
                    licensePlate: '',
                    combustion: '',
                    numberOfSeats: 0,
                    details: '',
                    taken: false,
                    rentings: 0,
                    fault: ''
                }}
                validationSchema={Yup.object().shape({
                    brand: Yup.string()
                        .required('Marka jest wymagana'),
                    model: Yup.string()
                        .required('Model jest wymagany'),
                    image: Yup.string()
                        .required('Zdjęcie jest nieprawidłowy'),
                    km: Yup.number()
                        .required('Konie mechaniczne są wymagane'),
                    nm: Yup.number()
                        .required('Niutonmetry są wymagane'),
                    transmission: Yup.string()
                        .required('Typ skrzyni biegów jest wymagany'),
                    points: Yup.number()
                        .required('Punkty są wymagane jest wymagana'),
                    prize: Yup.object().shape({
                        firstPeriod: Yup.number()
                          .required('Cena za jeden dzień  jest wymagana'),
                        secondPeriod: Yup.number()
                          .required('Cena od do dni jest wymagana'),
                        thirdPeriod: Yup.number()
                          .required('Cena od do dni wymagana'),
                          fourthPeriod: Yup.number()
                          .required('Cena od do dni wymagana'),
                        fifthPeriod: Yup.number()
                          .required('Cena od do dni jest wymagana'),
                        sixthPeriod: Yup.number()
                          .required('Cena od do dni jest wymagana'),
                        deposit: Yup.number()
                          .required('Cena od do dni jest wymagana'),
                    }).required("Cena jest wymagana"),
                    engine: Yup.number()
                        .required('Silnik jest wymagany'),
                    licensePlate: Yup.string()
                        .required('Tablica rejestracyjna jest wymagane'),
                    combustion: Yup.string()
                        .required('Spalanie jest wymagane'),
                    petrol: Yup.string()
                        .required('Rodzaj paliwa jest  wymagane'),
                    details: Yup.string()
                        .required('Rodzaj paliwa jest  wymagane'),
                    numberOfSeats: Yup.number()
                        .required('Silnik jest wymagany')
                        .min(2, "Liczba miejsc nie może być mniejsza niż 2")
                        .max(5, "Liczba miejsc nie może być większa niż 5")
                        ,
                    year: Yup.number()
                        .required("Rok produkcji jest wymagany")
                        .min(2010, "Nieporpawny rok produkcji")
                })}
                onSubmit={handleSubmit}
               
                  
                 render={({ errors, status, touched }) => (
                    <Form style={{marginTop:80}} >
                    <Card sx={{ maxWidth: 700 }}>
                        <CardHeader title='Nowy samochód' style={{textAlign:'center'}}></CardHeader>
      <CardContent>
        <Typography gutterBottom  component="div">
             <div className="form-group">
                        <label htmlFor="image">Zdjęcie<span style={{color:'red'}}>*</span></label>
                        <Field name="image" id="image" type="file" className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} 
//                         onChange={(event) => {
//   setFile(event.currentTarget.files[0]);
// }}
/>
                        <ErrorMessage name="image" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group" style={{marginTop:20}}>
                        {/* <label htmlFor="brand">Marka<span style={{color:'red'}}>*</span></label> */}
                        <Field name="brand" type="text" label={<span>Marka<span style={{color:'red'}}>*</span></span>} fullWidth component={TextField} size="medium"/>

                        {/* <ErrorMessage name="brand" component="div" className="invalid-feedback" /> */}
                </div>
                <div className="form-group" style={{marginTop:20}}>
                        {/* <label htmlFor="model">Model<span style={{color:'red'}}>*</span></label> */}
                        {/* <Field name="model" type="text" className={'form-control' + (errors.model && touched.model ? ' is-invalid' : '')}id="model"/> */}
                        {/* <ErrorMessage name="model" component="div" className="invalid-feedback" /> */}
                        <Field name="model" type="text" label={<span>Model<span style={{color:'red'}}>*</span></span>} fullWidth component={TextField} size="medium"/>

                </div>
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
        <div className="form-group" style={{marginTop:20}}>
            {/* <label htmlFor="category">Kategoria<span style={{color:'red'}}>*</span></label>
            <Field name="category" as="select" id="category" 
                  >
                {categories.map(category => {
                    return (
                        <option key={category.id}>{category}</option>
                    )
                })}
            </Field>
            <ErrorMessage name="category" component="div" className="invalid-feedback" /> */}
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Kategoria<span style={{color:'red'}}>*</span></InputLabel>
                <Field name="category" component={CustomTextFields}>
        
                    {categories.map(category => {
                    return (
                    <MenuItem value={category}>{category}</MenuItem>)
                    })}
                    
                </Field>
            </FormControl>
        </div>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
        <CardContent>
          <Typography paragraph style={{width: '23%', display: 'inline-block'}}>Specyfikacja</Typography>
          <Typography paragraph>
          <div className="form-group" >
                {/* <label htmlFor="petrol">Rodzaj paliwa<span style={{color:'red'}}>*</span></label> */}
                {/* <Field name="petrol" as="select" id="petrol" value="DIESEL" className={'form-control' + (errors.petrol && touched.petrol ? ' is-invalid' : '')}
                 >
                {petrols.map(petrol => {
                    return (
                        <option key={petrol.id}>{petrol}</option>
                    )
                })}
                </Field>
                <ErrorMessage name="petrol" component="div" className="invalid-feedback" /> */}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Rodzaj paliwa<span style={{color:'red'}}>*</span></InputLabel>
                    <Field name="petrol" component={CustomTextFields}>
                  
                        {petrols.map(petrol => {
                        return (
                        <MenuItem value={petrol}>{petrol}</MenuItem>)
                        })}
                        
                    </Field>
                </FormControl>
            </div>
            <div className="form-group" style={{marginTop:20}}>
                {/* <label htmlFor="transmission">Skrzynia biegów<span style={{color:'red'}}>*</span></label> */}
                {/* <Field name="transmission" as="select" id="transmission" className={'form-control' + (errors.transmission && touched.transmission ? ' is-invalid' : '')}
                  >
                {transmissions.map(transmission => {
                    return (
                        <option key={transmission.id}>{transmission}</option>
                    )
                })}
                </Field>
                <ErrorMessage name="transmission" component="div" className="invalid-feedback" /> */}
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Skrzynia biegów<span style={{color:'red'}}>*</span></InputLabel>
                    <Field name="transmission" component={CustomTextFields}>
               
                        {transmissions.map(transmission => {
                        return (
                        <MenuItem value={transmission}>{transmission}</MenuItem>)
                        })}
                        
                    </Field>
                </FormControl>
            </div>
            <div className="form-group" style={{marginTop:20}}>
                {/* <label htmlFor="km">KM<span style={{color:'red'}}>*</span></label>
                <Field name="km" type="number" id="km"  className={'form-control' + (errors.km && touched.km ? ' is-invalid' : '')} min="50" />
                <ErrorMessage name="km" component="div" className="invalid-feedback" /> */}
                <Field name="km" type="number" label={<span>Moc<span style={{color:'red'}}>*</span></span>} fullWidth component={TextField} size="medium"/>

            </div>
            <div className="form-group" style={{marginTop:20}}>
                {/* <label htmlFor="nm">NM<span style={{color:'red'}}>*</span></label>
                <Field name="nm" type="number" id="nm" className={'form-control' + (errors.nm && touched.nm ? ' is-invalid' : '')} min="100"
                  />
                <ErrorMessage name="nm" component="div" className="invalid-feedback" /> */}
                <Field name="nm" type="number" label={<span>Moment obrotowy<span style={{color:'red'}}>*</span></span>} fullWidth component={TextField} size="medium"/>

            </div>
            <div className="form-group" style={{marginTop:20}}>
                {/* <label htmlFor="licensePlate">Tablica rejestracyjna<span style={{color:'red'}}>*</span></label>
                <Field name="licensePlate" type="text" id="licensePlate" className={'form-control' + (errors.licensePlate && touched.licensePlate ? ' is-invalid' : '')}
                  />
                <ErrorMessage name="licensePlate" component="div" className="invalid-feedback" /> */}
                <Field name="licensePlate" type="text" label={<span>Tablica rejestracyjna<span style={{color:'red'}}>*</span></span>} fullWidth component={TextField} size="medium"/>

            </div>
            <div className="form-group" style={{marginTop:20}}>
                {/* <label htmlFor="engine">Pojemnośc silnika<span style={{color:'red'}}>*</span></label>
                <Field name="engine" type="number" id="engine" className={'form-control' + (errors.engine && touched.engine ? ' is-invalid' : '')} min="1"
                  />
                <ErrorMessage name="engine" component="div" className="invalid-feedback" /> */}
                <Field name="engine" type="number" label={<span>Pojemność silnika<span style={{color:'red'}}>*</span></span>} fullWidth component={TextField} size="medium"/>
            </div>
            <div className="form-group" style={{marginTop:20}}>
                {/* <label htmlFor="combustion">Spalanie<span style={{color:'red'}}>*</span></label>
                <Field name="combustion" type="number" id="combustion" className={'form-control' + (errors.combustion && touched.combustion ? ' is-invalid' : '')} min="3"
                  />
                <ErrorMessage name="combustion" component="div" className="invalid-feedback" /> */}
                <Field name="combustion" type="number" label={<span>Spalanie w mieście<span style={{color:'red'}}>*</span></span>} fullWidth component={TextField} size="medium"/>
            </div> 
            <label htmlFor="prize" style={{marginTop:20}}>Cena<span style={{color:'red'}}>*</span></label>
            <table className="table" style={{width: '50%', margin: 'auto', position: 'relative'}}>
                <thead>
                  <tr>
                    <th><span style={{color: 'white'}}>gfee</span>1<span style={{color:'red'}}>*<span style={{color: 'white'}}>gfe</span></span></th>
                    <th><span style={{color: 'white'}}>gfe</span>2-3<span style={{color:'red'}}>*<span style={{color: 'white'}}>ge</span></span></th>
                    <th><span style={{color: 'white'}}>gfe</span>4-8<span style={{color:'red'}}>*<span style={{color: 'white'}}>ge</span></span></th>
                    <th><span style={{color: 'white'}}>gg</span>10-16<span style={{color:'red'}}>*<span style={{color: 'white'}}>g</span></span></th>
                    <th><span style={{color: 'white'}}>ge</span>17-29<span style={{color:'red'}}>*<span style={{color: 'white'}}>g</span></span></th>
                    <th><span style={{color: 'white'}}>ge</span>{'>'}29<span style={{color:'red'}}>*<span style={{color: 'white'}}>gfe</span></span></th>
                    <th><span style={{color: 'white'}}>g</span>Kaucja<span style={{color:'red'}}>*<span style={{color: 'white'}}>g</span></span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                        <div className="form-group">
                            <Field name="prize.firstPeriod" type="number" id="firstPeriod" className={'form-control' + (errors.firstPeriod && touched.firstPeriod ? ' is-invalid' : '')} min = "100"/>
                            <ErrorMessage name="firstPeriod" component="div" className="invalid-feedback" />
                        </div>
                    </td>
                    <td>
                        <div className="form-group">
                            <Field name="prize.secondPeriod" type="number" id="secondPeriod" className={'form-control' + (errors.secondPeriod && touched.secondPeriod ? ' is-invalid' : '')} min = "100"/>
                            <ErrorMessage name="prize.secondPeriod" component="div" className="invalid-feedback" />
                        </div>
                    </td>
                    <td>
                        <div className="form-group">
                            <Field name="prize.thirdPeriod" type="number" id="thirdPeriod" className={'form-control' + (errors.thirdPeriod && touched.thirdPeriod ? ' is-invalid' : '')} min = "100"/>
                            <ErrorMessage name="prize.thirdPeriod" component="div" className="invalid-feedback" />
                        </div>
                    </td>
                    <td>
                        <div className="form-group">
                            <Field name="prize.fourthPeriod" type="number" id="fourthPeriod" className={'form-control' + (errors.fourthPeriod && touched.fourthPeriod ? ' is-invalid' : '')} min = "100"/>
                            <ErrorMessage name="prize.fourthPeriod" component="div" className="invalid-feedback" />
                        </div>
                    </td>
                    <td>
                        <div className="form-group">
                            <Field name="prize.fifthPeriod" type="number" id="fifthPeriod" className={'form-control' + (errors.fifthPeriod && touched.fifthPeriod ? ' is-invalid' : '')} min = "100"/>
                            <ErrorMessage name="prize.fifthPeriod" component="div" className="invalid-feedback" />
                        </div>
                    </td>
                    <td>
                        <div className="form-group">
                            <Field name="prize.sixthPeriod" type="number" id="sixthPeriod" className={'form-control' + (errors.sixthPeriod && touched.sixthPeriod ? ' is-invalid' : '')} min = "100"/>
                            <ErrorMessage name="prize.sixthPeriod" component="div" className="invalid-feedback" />
                        </div>
                    </td>
                    <td>
                        <div className="form-group">
                            <Field name="prize.deposit" type="number" id="deposit" className={'form-control' + (errors.deposit && touched.deposit ? ' is-invalid' : '')} min = "100"
                            />
                            <ErrorMessage name="prize.deposit" component="div" className="invalid-feedback" />
                        </div>
                    </td>
                  </tr>
                </tbody>
              </table>

            <div className="form-group" style={{marginTop:20}}>
                {/* <label htmlFor="points">Punkty<span style={{color:'red'}}>*</span></label>
                <Field name="points" type="number" id="points" className={'form-control' + (errors.points && touched.points ? ' is-invalid' : '')} min="100"/>
                <ErrorMessage name="points" component="div" className="invalid-feedback" /> */}
                <Field name="points" type="number" label={<span>Punkty<span style={{color:'red'}}>*</span></span>} fullWidth component={TextField} size="medium"/>
            </div>
            <div className="form-group" style={{marginTop:20}}>
                {/* <label htmlFor="numberOfSeats">Liczba miejsc<span style={{color:'red'}}>*</span></label>
                <Field name="numberOfSeats" type="number" id="numberOfSeats" className={'form-control' + (errors.numberOfSeats && touched.numberOfSeats ? ' is-invalid' : '')} min="2"/>
                <ErrorMessage name="numberOfSeats" component="div" className="invalid-feedback"  /> */}
                <Field name="numberOfSeats" type="number" label={<span>Liczba miejsc<span style={{color:'red'}}>*</span></span>} fullWidth component={TextField} size="medium" min="2" max="5"/>
            </div>
            <div className="form-group" style={{marginTop:20}}>
                {/* <label htmlFor="details">Wyposażenie<span style={{color:'red'}}>*</span></label>
                <Field name="details" as="textarea" id="details" className={'form-control' + (errors.details && touched.details ? ' is-invalid' : '')}/>
                <ErrorMessage name="details" component="div" className="invalid-feedback" /> */}
                <Field name="details" fullWidth label={<span>Wyposażenie<span style={{color:'red'}}>*</span></span>} as="textarea" rows="6" cols={200}  component={TextField} multiline/>

            </div>
            <div className="form-group" style={{marginTop:20}}>
                {/* <label htmlFor="year">Rok produkcji<span style={{color:'red'}}>*</span></label>
                <Field name="year" type="number" id="year" className={'form-control' + (errors.year && touched.year ? ' is-invalid' : '')} min="2014"/>
                <ErrorMessage name="year" component="div" className="invalid-feedback" /> */}
                <Field name="year" type="number" label={<span>Rok produkcji<span style={{color:'red'}}>*</span></span>} fullWidth component={TextField} size="medium" min="2010"/>
            
            </div>
            <p style={{marginTop:10}}><span style={{color:'red'}}>*</span> - pola są wymagane</p>

          </Typography>
                <Button className='btn btn-primary'type = "submit"><FaRegSave style={{marginTop: -3,color: 'blue'}} size={20}></FaRegSave>Zapisz</Button>
                <Button className='btn btn-danger' type="reset" style={{color: 'red'}}>Wyczyść</Button>
        </CardContent>
    </Card>
    </Form>)}
    />
 </div>  
}