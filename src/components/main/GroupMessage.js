import { Button, Card, CardActions, CardContent, Collapse, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { FaChevronCircleUp, FaEnvelope, FaEnvelopeOpen, FaPen } from "react-icons/fa";
import ContactService from "../services/ContactService";
import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from 'yup';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  function formatD(date){
    let m =  date.getMonth()+1
    var min = ""
    console.log(min)
    if(date.getMinutes() < 10){
      min = "0"+date.getMinutes()
    }else{
      min = date.getMinutes()
    }
    return date.getDate()+"/"+ m + "/" + date.getFullYear() + " " + date.getHours()+ ":"+min
  }
export function GroupMesage({props}){

    const [expandedId, setExpandedId] = React.useState(-1);

  const scrollToTop = () => {
    console.log("h")
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleExpandClick = i => {
    setExpandedId(expandedId === i ? -1 : i);
  };
  console.log("Witam")
    return props.messages.filter(msg => msg.opened === true).map((message, i) => (
        <Card  key={message.id}>
          <CardContent >
          <Typography gutterBottom component="div">
          <FaEnvelopeOpen style={{display: 'inline-block',marginTop:-10}}size={30}/>
          <h5 style={{display: 'inline-block',marginLeft:10}}><b style={{fontSize: 20,marginRight:580}}>Wiadomość od {message.name} {message.surname} ({message.email})</b> {formatD(new Date(message.date))}</h5>
          <h6>+48 {message.phoneNumber.slice(0,3)} {message.phoneNumber.slice(3,6)} {message.phoneNumber.slice(6,9)}</h6>
          </Typography>
          <Typography variant="h6" color="text.secondary"> 
            {message.content}
          </Typography>
          </CardContent>
          <CardActions disableSpacing>
          <ExpandMore
               onClick={() => handleExpandClick(i)}
               aria-expanded={expandedId === i}
              aria-label="show more"
            >
              <FaPen size={20}/><span style={{fontSize:20,marginLeft:2}}>Odpowiedz</span>
            </ExpandMore>
          </CardActions>
          <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
            <CardContent>

            <Formik
                initialValues={{
                    content: '',
                }}
                validationSchema={Yup.object().shape({
                    content: Yup.string()
                        .required('Wiadomość jest wymagana')
                })}
                onSubmit={fields => {
                    console.log(fields)
                    // fields.acceptTerms = null
                    ContactService.respond(fields).then((response) => {
                        console.log(response);
                        // navigaye("/sport");
                        })
                        .catch((error) => {
                        console.log(error);
                        });
                }}>
                {({ dirty, isValid, values, handleChange, handleBlur,errors,touched }) => {
              return (
                    <Form style={{ width: '40%',marginTop:-40}}>
                        <div className="form-group" style={{marginTop:20}}>
                            <Field name="content" fullWidth value={values.content} label={<span>Wiadomość<span style={{color:'red'}}>*</span></span>} as="textarea" rows="6" cols={200}  component={TextField} multiline/>
                        </div>
                        <p><span style={{color:'red'}}>*</span> - pola są wymagane</p>
                        <div className="form-group" style={{marginTop:10}}>
                            <Button type="submit" style={{marginBottom: -20}}>Wyślij</Button>
                        </div>
                        <br></br>
                    </Form>
                    
                )}}
                </Formik>
            </CardContent>
          </Collapse>
        </Card>
      ))
}