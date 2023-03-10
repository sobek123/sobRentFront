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
            (response.data)
          } catch (error) {
            (error);
          }
          setLoading(false);
        };
        fetchData();
      }, []);

    
    useEffect(() => {
      CarService.getCarsByStartDateAndEndDateAndRentPlaceAndEndDate(values.startDate, values.endDate)
        .then((response) => {
        setCars(response.data)
        (response.data)
        updateOffer(response.data, values.startDate, values.endDate)
        deleteItems()
        navigate("/oferta")
        //  setShow(true)

        })
        .catch((error) => {
        (error);
        });
    }, [values]);
    const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    // ??????? toggle
    setIsActive(current => !current);

    // ??????? or set to true
    // setIsActive(true);
  };
    return <div style={{marginTop:80}}>
        <Card style={{ maxWidth: 800, textAlign: 'center', marginLeft: 'auto', marginRight:'auto', borderRadius:15 }}>
        <CardContent> 
        <h2>Sprawd?? dost??pno???? pojazd??w oraz koszt wypo??yczenia</h2>
         <Formik
                initialValues={{
                    startDate: result.toISOString().slice(0, 10),
                    endDate: result2.toISOString().slice(0, 10),
                    rentPlace: 'Bia??ystok, ul. Czes??awa Mi??osza 2, Atrium Bia??a(parking podziemny)',
                    backPlace: 'Bia??ystok, ul. Czes??awa Mi??osza 2, Atrium Bia??a(parking podziemny)'
                }}
                validationSchema={Yup.object().shape({
                    startDate: Yup.date()
                        .required('Data rozpocz??cia wynajmu jest wymagana').min(
                          new Date()  , "Data rozpocz??cia nie mo??e byc mniejsza niz obecna data"
                        ),
                    endDate: Yup.date()
                        .required('Data zako??czenia wynajmu jest wymagana').min(
                            Yup.ref('startDate'),
                            "Data zako??czenia nie mo??e byc mniejsza niz data rozpocz??cia"
                          ),
                        rentPlace: Yup.string().
                          required("Miejsce wypo??yczenia jest wymagane"),
                      backPlace: Yup.string().
                          required("Miejsce zwrotu jest wymagane")
                })}
                onSubmit={fields => {
               
                        // const response = CarService.getCarsByStartDateAndEndDateAndRentPlaceAndEndDate(fields.startDate, fields.endDate)
                        // setCars(response.data);
                        // return <Offer cars={cars}></Offer>
                        setValues(fields)
                        (values)
                        
                        // CarService.getCarsByStartDateAndEndDateAndRentPlaceAndEndDate(values.startDate, values.endDate)
                        // .then((response) => {
                        // setCars(response.data)
                        // return <Offer cars={cars}></Offer>

                        // })
                        // .catch((error) => {
                        // (error);
                        // });
                        // (response.data)
                      
                    
                }}>
                  {({ dirty, isValid, values, handleChange, handleBlur, errors, status, touched }) => {
                  return (
                    
                    
                    <Form style={{marginTop:80, width:'35%', margin:'auto'}} onChange={handleChange} >
                        <div className="form-group" style={{marginTop:20}}>
                        <Field label={<span>Data rozpocz??cia</span>} name="startDate" type="date"  fullWidth placeholder="" value={values.startDate} component={TextField} disabled={false}/>
                        </div>
                        <div className="form-group" style={{marginTop:20}}>
                        
                            <Field label={<span>Data zako??czenia</span>} name="endDate" type="date"  fullWidth placeholder="" value={values.endDate} component={TextField} disabled={false}/>
                        </div>
                        <div className="form-group" style={{marginTop:20,width:500, marginLeft: -120}}>
                            <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Miejsce wypo??yczenia</InputLabel>
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
                            <label htmlFor="startDate">Data rozpocz??cia</label>
                            <Field name="startDate" type="date" className={'form-control' + (errors.startDate && touched.startDate ? ' is-invalid' : '')} />
                            <ErrorMessage name="startDate" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">Data zako??czenia</label>
                            <Field name="endDate" type="date" className={'form-control' + (errors.endDate && touched.endDate ? ' is-invalid' : '')} />
                            <ErrorMessage name="endDate" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rentPlace">Miejsce wypo??yczenia</label>
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