import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Card, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Cars } from "./Cars";
import { useNavigate} from 'react-router-dom';

import { useState,useEffect, useContext,} from "react";
import OrderService from "../services/OrderService";
import CarService from "../services/CarService";
import { Offer } from "./Offer";
import { Button, FormControl, InputLabel, MenuItem } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { CustomTextFields } from './CustomTextFields';
import { TextField } from 'formik-material-ui';
import CartContext from '../../CartContext';
import { Footer } from './Footer';
var result = new Date();
var result2 = new Date();
result.setDate(result.getDate() + 1);
result2.setDate(result2.getDate() + 2);

export function HomePage(props){
    const {updateOffer} = useContext(CartContext)
    const {deleteItems} = useContext(CartContext)
    const [places,setPlaces] = useState([])
    const [values, setValues] = useState('')
    const [cars,setCars] = useState([])
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await OrderService.getPlaces()
            setPlaces(response.data);
            console.log(response.data)
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        };
        fetchData();
      }, []);

    
    useEffect(() => {
      CarService.getCarsByStartDateAndEndDateAndRentPlaceAndEndDate(values.startDate, values.endDate)
        .then((response) => {
        setCars(response.data)
        console.log(response.data)
        updateOffer(response.data, values.startDate, values.endDate)
        deleteItems()
        navigate("/oferta")
        //  setShow(true)

        })
        .catch((error) => {
        console.log(error);
        });
    }, [values]);
    const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    // 👇️ toggle
    setIsActive(current => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };
    return <div style={{marginTop:80}}>
        <Card style={{ maxWidth: 800, textAlign: 'center', marginLeft: 'auto', marginRight:'auto', borderRadius:15 }}>
        <CardContent> 
        <h2>Sprawdź dostępność pojazdów oraz koszt wypożyczenia</h2>
         <Formik
                initialValues={{
                    startDate: result.toISOString().slice(0, 10),
                    endDate: result2.toISOString().slice(0, 10),
                    rentPlace: 'Białystok, ul. Czesława Miłosza 2, Atrium Biała(parking podziemny)',
                    backPlace: 'Białystok, ul. Czesława Miłosza 2, Atrium Biała(parking podziemny)'
                }}
                validationSchema={Yup.object().shape({
                    startDate: Yup.date()
                        .required('Data rozpoczęcia wynajmu jest wymagana').min(
                          new Date()  , "Data rozpoczęcia nie może byc mniejsza niz obecna data"
                        ),
                    endDate: Yup.date()
                        .required('Data zakończenia wynajmu jest wymagana').min(
                            Yup.ref('startDate'),
                            "Data zakończenia nie może byc mniejsza niz data rozpoczęcia"
                          ),
                        rentPlace: Yup.string().
                          required("Miejsce wypożyczenia jest wymagane"),
                      backPlace: Yup.string().
                          required("Miejsce zwrotu jest wymagane")
                })}
                onSubmit={fields => {
               
                        // const response = CarService.getCarsByStartDateAndEndDateAndRentPlaceAndEndDate(fields.startDate, fields.endDate)
                        // setCars(response.data);
                        // return <Offer cars={cars}></Offer>
                        setValues(fields)
                        console.log(values)
                        
                        // CarService.getCarsByStartDateAndEndDateAndRentPlaceAndEndDate(values.startDate, values.endDate)
                        // .then((response) => {
                        // setCars(response.data)
                        // return <Offer cars={cars}></Offer>

                        // })
                        // .catch((error) => {
                        // console.log(error);
                        // });
                        // console.log(response.data)
                      
                    
                }}>
                  {({ dirty, isValid, values, handleChange, handleBlur, errors, status, touched }) => {
                  return (
                    
                    
                    <Form style={{marginTop:80, width:'35%', margin:'auto'}} onChange={handleChange} >
                        <div className="form-group" style={{marginTop:20}}>
                        <Field label={<span>Data rozpoczęcia</span>} name="startDate" type="date"  fullWidth placeholder="" value={values.startDate} component={TextField} disabled={false}/>
                        </div>
                        <div className="form-group" style={{marginTop:20}}>
                        
                            <Field label={<span>Data zakończenia</span>} name="endDate" type="date"  fullWidth placeholder="" value={values.endDate} component={TextField} disabled={false}/>
                        </div>
                        <div className="form-group" style={{marginTop:20,width:500, marginLeft: -120}}>
                            <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Miejsce wypożyczenia</InputLabel>
                                    <Field name="rentPlace" component={CustomTextFields} value={values.rentPlace} placeholder={values.rentPlace}>
                                      {places.map(place => {
                                        return <MenuItem value={place} >{place}</MenuItem>
                                      })}
                                      
                                    </Field>
                                </FormControl>    
                            <ErrorMessage name="rentPlace" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group" style={{marginTop:20,width:500, marginLeft: -120, marginRight: 'auto'}}>  
                            <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Miejsce zwrotu</InputLabel>
                                    <Field name="backPlace" component={CustomTextFields} value={values.backPlace} >
                                      {places.map(place => {
                                        return <MenuItem value={place}>{place}</MenuItem>
                                      })}
                                      
                                    </Field>
                                </FormControl>    
                            <ErrorMessage name="backPlace" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group" style={{marginTop:10}}>
                        <Button type="submit"><FaSearch size={20}></FaSearch>Wyszukaj</Button>
                            
                        </div>
                        
                    </Form>
                    
                          )}}
                </Formik>
                {/* render={({ errors, status, touched }) => (
                    <Form style={{marginTop:80, width:'35%', margin:'auto'}}>
                        
                        <div className="form-group">
                            <label htmlFor="startDate">Data rozpoczęcia</label>
                            <Field name="startDate" type="date" className={'form-control' + (errors.startDate && touched.startDate ? ' is-invalid' : '')} />
                            <ErrorMessage name="startDate" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">Data zakończenia</label>
                            <Field name="endDate" type="date" className={'form-control' + (errors.endDate && touched.endDate ? ' is-invalid' : '')} />
                            <ErrorMessage name="endDate" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rentPlace">Miejsce wypożyczenia</label>
                            <Field name="rentPlace" as="select" className={'form-control' + (errors.rentPlace && touched.rentPlace ? ' is-invalid' : '')}>
                            {places.map(place => {
                                    return (
                                        <option key={place.id}>{place}</option>
                                    )
                            })}
                            </Field>
                            <ErrorMessage name="rentPlace" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="backPlace">Miejsce zwrotu</label>
                            <Field name="backPlace" as="select" className={'form-control' + (errors.backPlace && touched.backPlace ? ' is-invalid' : '')}>
                            {places.map(place => {
                                    return (
                                        <option key={place.id}>{place}</option>
                                    )
                            })}
                            </Field>
                            <ErrorMessage name="backPlace" component="div" className="invalid-feedback" />
                        </div>
                        
                        <div className="form-group" style={{marginTop:10}}>
                           <Button type="submit"><FaSearch size={20}></FaSearch>Wyszukaj</Button>
                        </div>
                    </Form>
                )}
            />
      */}
        
            </CardContent>
       </Card>
       <br></br>
       <Footer></Footer>
       </div>
  
}