import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import AdditionalService from '../services/AdditionalService';
import OrderService from '../services/OrderService';
import SelectField from "./CustomSelect";
import { useNavigate } from 'react-router-dom';
import CartContext from '../../CartContext';
import { CustomTextFields } from './CustomTextFields';
import { TextField } from 'formik-material-ui';
import { Button } from '@mui/material';
import CarService from '../services/CarService';


const options = [
];
export function OrderModal(props){


 
  const {addToCart} = useContext(CartContext)
  const {additionalss} = useContext(CartContext)
  const {updateId} = useContext(CartContext)
  const {updateCars, offer,endDate} = useContext(CartContext)
    const [places,setPlaces] = useState([])
    const [ad, setAd] = useState('false')
    const [fullCost,setFullCost] = useState(0)
    const [additionals,setAdditionals] = useState([])
    const [loading, setLoading] = useState(true);
    const navigaye = useNavigate();
    const [stDate,setStDate] = useState(null)
    const [edDate,setEdDate] = useState(null)
    additionals.map(additional => {
      options[additional.id - 1] = {value: additional.prize, label: additional.name + " - " + additional.prize + "zł"}
    })
    // console.log(sh)

    useEffect(() => {
      // const user = CarService.checkCar()
      // .then(response => {
      //   if(response.data === true){
      //     document.getElementById("msg").hidden = false
      //   }
      //   else{
      //     document.getElementById("msg").hidden = true
        
      //   }
      //   console.log(sh)
      //   console.log(response)
      // })
      // .catch(error => console.log(error))
      if( stDate != '' && edDate != ''){
        console.log(stDate)
        console.log(edDate)
      const diffTime = Math.abs(new Date(stDate) - new Date(edDate));
          const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          var calculateCost = 0
          console.log(days)
          if(days === 1 && days===0){
            calculateCost = props.prize.firstPeriod + props.prize.deposit
          }
          else if(days >=2 && days <=3){
              calculateCost = days * props.prize.secondPeriod + props.prize.deposit
          }
          else if(days >= 4 && days <=8){
              calculateCost = days * props.prize.thirdPeriod + props.prize.deposit
          }
          else if(days >= 10 && days <=16){
              calculateCost = days * props.prize.fourthPeriod + props.prize.deposit
          }
          else if(days >= 17 && days <=29){
              calculateCost = days * props.prize.fifthPeriod + props.prize.deposit
          }
          else if(days >= 29){
              calculateCost = days * props.prize.sixthPeriod + props.prize.deposit
          }
          console.log(ad)
          let cost = document.getElementById("cost")
          if(cost){
            // if(additionalss.length !=0){
            //   for(let i=0;i< additionalss.length;i++){
            //     calculateCost += additionalss[i].value
            //   }
            // }
            cost.innerHTML= '<h5><b>Koszt wypożyczenia   '+calculateCost+'zł</b></h5>'
          }
  
        }
  
     
    }, [stDate,edDate,ad]);

    // setAdditionals(additionalss)
      // console.log("Opcje" + options)
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await OrderService.getPlaces()
            setPlaces(response.data);
            const response2 = await AdditionalService.getAdditionals()
            setAdditionals(response2.data);
            console.log(response.data)
            setStDate('')
            setEdDate('')
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        };
        fetchData();
      }, []);

      const handleChangeAd = (e) =>{
        console.log("halo")
        console.log("Elo"+e.target.value)
      }

  

    const handleChange1 = (e) =>{
      // console.log(Array.isArray(e.target.value))
        var startDate
        var endDate
        var cCost = 0
        var pr = 0
        // console.log(props.prize)
        let costt = document.getElementById("cost")
        let days2 = e.target.id
        console.log("Eluwina")
        console.log(e)
        // var calculateCost = 0
        // console.log("Halo"+days2)
        if(days2 === "startDate"){
          startDate = ""
          console.log("elo")
          // setStDate(e.target.value.toString())
          
        }
        else if(days2 === "endDate"){
          console.log("ed")
          
        }
       
       
        // else if( days2 === "additional"){
        //   console.log(e.target.value)
        // }
    }

    const handleChange = (e) => {
      var startDate = ""
      var endDate = ""
      var d =e.target.id
      if(d === "startDate"){
        startDate = e.target.value
        console.log(startDate)
        console.log(endDate)
        if(startDate != null && endDate != null){
          console.log("wchodze")

          let cost = document.getElementById("cost")
          let calculateCost = 0
          const diffTime = Math.abs(new Date(startDate) - new Date(endDate));
          const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          if(days === 1){
            calculateCost = props.prize.firstPeriod + props.prize.deposit
          }
          else if(days >=2 && days <=3){
              calculateCost = days * props.prize.secondPeriod + props.prize.deposit
          }
          else if(days >= 4 && days <=8){
              calculateCost = days * props.prize.thirdPeriod + props.prize.deposit
          }
          else if(days >= 10 && days <=16){
              calculateCost = days * props.prize.fourthPeriod + props.prize.deposit
          }
          else if(days >= 17 && days <=29){
              calculateCost = days * props.prize.fifthPeriod + props.prize.deposit
          }
          else if(days >= 29){
              calculateCost = days * props.prize.sixthPeriod + props.prize.deposit
          }
          cost.innerText= calculateCost
        }
      }
      else if(d === "endDate"){
        endDate = e.target.value
        console.log(startDate)
        console.log(endDate)
        if(startDate != null && endDate != null){
          console.log("wchodze")
        let cost = document.getElementById("cost")
        let calculateCost = 0
        const diffTime = Math.abs(new Date(startDate) - new Date(endDate));
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        if(days === 1){
          calculateCost = props.prize.firstPeriod + props.prize.deposit
        }
        else if(days >=2 && days <=3){
            calculateCost = days * props.prize.secondPeriod + props.prize.deposit
        }
        else if(days >= 4 && days <=8){
            calculateCost = days * props.prize.thirdPeriod + props.prize.deposit
        }
        else if(days >= 10 && days <=16){
            calculateCost = days * props.prize.fourthPeriod + props.prize.deposit
        }
        else if(days >= 17 && days <=29){
            calculateCost = days * props.prize.fifthPeriod + props.prize.deposit
        }
        else if(days >= 29){
            calculateCost = days * props.prize.sixthPeriod + props.prize.deposit
        }
        cost.innerText= calculateCost
      }
      }
      else{
      let cost = document.getElementById("cost")
      let calculateCost = 0
      const diffTime = Math.abs(new Date(startDate) - new Date(endDate));
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      if(days === 1){
        calculateCost = props.prize.firstPeriod + props.prize.deposit
      }
      else if(days >=2 && days <=3){
          calculateCost = days * props.prize.secondPeriod + props.prize.deposit
      }
      else if(days >= 4 && days <=8){
          calculateCost = days * props.prize.thirdPeriod + props.prize.deposit
      }
      else if(days >= 10 && days <=16){
          calculateCost = days * props.prize.fourthPeriod + props.prize.deposit
      }
      else if(days >= 17 && days <=29){
          calculateCost = days * props.prize.fifthPeriod + props.prize.deposit
      }
      else if(days >= 29){
          calculateCost = days * props.prize.sixthPeriod + props.prize.deposit
      }
      cost.innerText= calculateCost
    }
    }
    const handleConvert = (ob) => {
      let array = []
      ob.additional.map(additional =>  {
          console.log(additional.id)
        array.push({name: additional.label.substring(0,additional.label.length - 8), prize: additional.value})
        setFullCost(fullCost + additional.value)
        console.log(additional)}
        )
        console.log(array)
       return array
    }

    const handleSubmit = (values) =>{
      // values.prize = fullCost
      values.car = props.car
      // CarService.getCarsByStartDateAndEndDateAndRentPlaceAndEndDate(startDate, endDate)
      // .then((response) => {
      //   const fil = response.data.filter(el => el.id !== values.car.id)
      //   updateCars(fil)
      // // updateOffer(cars)
      // // navigate("/oferta")
      // //  setShow(true)

      // })
      // .catch((error) => {
      // console.log(error);
      // });
      console.log(offer)
      const fil = offer.filter(el => el.id !== values.car.id)
      updateId(values.car.id)
      updateCars(fil)
      console.log(fil)
      console.log("IDMODALLKU"+values.car.id)
      if(values.additional.length != 0){
      values.additional = handleConvert(values)}
      else{
        values.additional=[]
      }

      console.log(values.additional.length)

      // values.prize = 0
      for(let i =0 ;i<values.additional.length;i++){
        console.log(values.additional[i].prize)
        values.prize = values.prize + values.additional[i].prize
      }
      
      const diffTime = Math.abs(new Date(values.endDate) - new Date(values.startDate));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      values.days = diffDays
      
      if(values.days === 1 || values.days === 0){
        values.prize = fullCost + props.prize.firstPeriod + props.prize.deposit
      }
      else if(values.days >=2 && values.days <=3){
        values.prize = fullCost + values.days * props.prize.secondPeriod + props.prize.deposit
      }
      else if(values.days >= 4 && values.days <=8){
        values.prize = fullCost + values.days * props.prize.thirdPeriod + props.prize.deposit
      }
      else if(values.days >= 10 && values.days <=16){
        values.prize = fullCost + values.days * props.prize.fourthPeriod + props.prize.deposit
      }
      else if(values.days >= 17 && values.days <=29){
        values.prize = fullCost + values.days * props.prize.fifthPeriod + props.prize.deposit
      }
      else if(values.days >= 29){
        values.prize = fullCost + values.days * props.prize.sixthPeriod + props.prize.deposit
      }
      // values.prize = fullCost
      console.log("Cena" + values.prize)
      console.log("Img"+values.car.image)
      addToCart(values)
      console.log(values)
      console.log(values.additional)
      // {props.onHide}
      
    }


    
    
    // console.log(additionals)
    return (
        
        <Modal
          {...props}
          size="lg"
          // aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{borderRadius:15}}
          
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Wypożyczenie
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Formik
                initialValues={{
                    startDate: '',
                    endDate: '',
                    rentPlace: 'Białystok, ul. Czesława Miłosza 2, Atrium Biała(parking podziemny)',
                    backPlace: 'Białystok, ul. Czesława Miłosza 2, Atrium Biała(parking podziemny)',
                    additional: '',
                    days: 0,
                    prize: fullCost
                }}
                validationSchema={Yup.object().shape({
                    startDate: Yup.date()
                        .required('Data rozpoczęcia wynajmu jest wymagana')
                        .min(
                          new Date(), "Data rozpoczęcia nie może byc mniejsza niz obecna data"
                        ),
                        // .test("stDate", "Pojazd w tym terminie jest niedostępny", function (value) {
                        //   // setStDate(value)
                        //   // console.log("Sthook"+stDate)
                        //   console.log("St"+value)
                        // }),
                    endDate: Yup.date()
                        .required('Data zakończenia wynajmu jest wymagana')
                        .min(
                            Yup.ref('startDate'),
                            "Data zakończenia nie może byc mniejsza niz data rozpoczęcia"
                          )
                          .min(
                            new Date(), "Data zakończenia nie może byc mniejsza niz obecna data"
                          ),
                          // .test("endDate", "Pojazd w tym terminie jest niedostępny", function (value) {
                          //   // setEdDate(value)
                          //   // console.log("Edhook"+edDate)
                          //   console.log("st"+stDate)
                          //   console.log("Ed"+value)
                          // }),
                    days: Yup.number().
                        required("Ilość dni jest wymagane"),
                    rentPlace: Yup.string().
                        required("Miejsce wypożyczenia jest wymagane"),
                    backPlace: Yup.string().
                        required("Miejsce zwrotu jest wymagane")

                })}
                onSubmit={handleSubmit}>
           
                {({ dirty, isValid, values, handleChange, handleBlur, errors, status, touched }) => {
                  return (
                    <Form style={{marginTop:80, width:'35%', margin:'auto'}}  >
                     {/* {!sh ? <h6 style={{color:'red'}} id="msg" hidden>Ten pojazd nie jest dostepny w danym terminie</h6> : ''} */}
                        <div className="form-group">
                        <Field label={<span>Data rozpoczęcia<span style={{color:'red'}}>*</span></span>} name="startDate" onBlur={e => {

        // call the built-in handleBur
        handleBlur(e)
        // and do something about e
        let someValue = e.currentTarget.value
       setStDate(someValue)
      //  var calculateCost = 0
      //  if(edDate!== '' && stDate !== ''){
      //   console.log(stDate)
      //   console.log(edDate)

      // const diffTime = Math.abs(new Date(stDate) - new Date(edDate));
      // const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // let cost = document.getElementById("cost")

      // if(days === 1){
      //   calculateCost = props.prize.first + props.prize.deposit
      // }
      // else if(days >=2 && days <=3){
      //     calculateCost = days * props.prize.second + props.prize.deposit
      // }
      // else if(days >= 4 && days <=8){
      //     calculateCost = days * props.prize.third + props.prize.deposit
      // }
      // else if(days >= 10 && days <=16){
      //     calculateCost = days * props.prize.forth + props.prize.deposit
      // }
      // else if(days >= 17 && days <=29){
      //     calculateCost = days * props.prize.fifth + props.prize.deposit
      // }
      // else if(days >= 29){
      //     calculateCost = days * props.prize.six + props.prize.deposit
      // }
      // cost.innerHTML= '<p>Koszt wypożyczenia: '+calculateCost+'</p>'
      // // setStDate('')

      //  }
    }} type="date"  fullWidth placeholder="" value={values.startDate} component={TextField} InputLabelProps={{ shrink: true }} />
                        </div>
                        <div className="form-group" style={{marginTop:20}}>
                        
                            <Field label={<span>Data zakończenia<span style={{color:'red'}}>*</span></span>} onBlur={e => {
                              
        // call the built-in handleBur
        handleBlur(e)

        // and do something about e
        let someValue = e.currentTarget.value
       setEdDate(someValue)
      console.log(additionalss)
    }} name="endDate" type="date"  fullWidth placeholder="" value={values.endDate} component={TextField} InputLabelProps={{ shrink: true }} />
                        </div>
                        <div className="form-group" style={{marginTop:20,width:500}}>
                           
                            <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Miejsce wypożyczenia<span style={{color:'red'}}>*</span></InputLabel>
                                    <Field name="rentPlace" component={CustomTextFields} value={values.rentPlace} >
                                      {places.map(place => {
                                        return <MenuItem value={place}>{place}</MenuItem>
                                      })}
                                      
                                    </Field>
                                </FormControl>    
                            <ErrorMessage name="rentPlace" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group" style={{marginTop:20,width:500}}>
                            
                            <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Miejsce zwrotu<span style={{color:'red'}}>*</span></InputLabel>
                                    <Field name="backPlace" component={CustomTextFields} value={values.backPlace} >
                                      {places.map(place => {
                                        return <MenuItem value={place}>{place}</MenuItem>
                                      })}
                                      
                                    </Field>
                                </FormControl>    
                            <ErrorMessage name="backPlace" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group" style={{marginTop:20}}>
                            <Field component={SelectField}  options={options} name="additional" id="additional" onChange={e => {
                            console.log("elo")
                              
                              // call the built-in handleBur
                              handleChange(e)
                              
                              // and do something about e
                              let someValue = e.currentTarget.value
                             setAd(additionalss)
                            console.log(someValue)
                          }} />
                        </div>

                        <div className="form-group" style={{marginTop:5}}>
                            <Button type="submit" onClick={props.onHide}>Potwierdź</Button>
                            
                        </div>
                        <p id="cost"></p>
                        <p>(cena jest liczona na podstawie ilości dni, kaucji oraz ewentualnych opcji dodatkowych)</p>
                        <p><span style={{color:'red'}}>*</span> - pola są wymagane</p>
                    </Form>
                    
                          )}}
            </Formik>
       
          </Modal.Body>
          
        </Modal>
      );
}
