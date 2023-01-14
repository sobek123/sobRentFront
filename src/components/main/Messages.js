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
import {Footer} from './Footer'
import OrderService from "../services/OrderService";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";
import { AccessDenied } from "./AccessDenied";
import { Spinner } from "react-bootstrap";

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

export function Messages(){
    const [messages,setMessages] = useState([])
    const [opened,setOpened] = useState([])
    const [notOpened,setNotOpened] = useState([])

  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = React.useState(-1);

  const scrollToTop = () => {
    ("h")
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleExpandClick = i => {
    setExpandedId(expandedId === i ? -1 : i);
  };
  ("Witam")

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            ("halo");

            const response = await ContactService.getContacts();
            (response.data)
            setMessages(response.data);
          } catch (error) {
            (error);
          }
          setLoading(false);
        };
        fetchData();
      }, []);
      function formatD(date){
        let m =  date.getMonth()+1
        var min = ""
        (min)
        if(date.getMinutes() < 10){
          min = "0"+date.getMinutes()
        }else{
          min = date.getMinutes()
        }
        return date.getDate()+"/"+ m + "/" + date.getFullYear() + " " + date.getHours()+ ":"+min
      }
      // messages.map((msg,index) => {
      //   msg.opened = true
      //   ContactService.setOpened({msg}).then((response) => {
      //     (response);
      //     // navigaye("/sport");
      //     })
      //     .catch((error) => {
      //     (error);
      //     });
      // })

      // setOpened(messages.filter(msg => msg.opened === true))
      // setNotOpened(messages.filter(msg => msg.opened === false))
      const tab = messages.filter(msg => msg.opened === true && msg.fault != null)
      const [user,setUser] = useState("")
      const [id,setId] = useState('')
      
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const user = await AuthService.getCurrentUser();
        ("u"+user)
        const response = await UserService.findByEmail(user.email)
        setUser(response.data);
        (user)
        user.roles.map(e => (e.name))
        ("Halo"+response.data)
      } catch (error) {
        (error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
      
      if(user == null && (user.role != 'ROLE_ADMIN' || user.role != 'ROLE_WORKER')){
        return <AccessDenied></AccessDenied>
      }
    else{

    return <div style={{marginTop:80}}>
        <hr></hr>
        <h4>Wiadomości</h4>
        <hr></hr>
        <h5>Nieprzeczytane Wiadomości</h5>
      {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,margnLeft:'auto',marginRight:'auto'}}/> : messages.filter(msg => msg.opened === false).map((message, i) => (
        <Card  key={message.id} style={{marginBottom: 10}}>
          <CardContent >
          <Typography gutterBottom component="div">
          <FaEnvelope size={30} style={{display: 'inline-block',marginTop:-10}}></FaEnvelope>
          <h5 style={{display: 'inline-block',marginLeft:10}}><b style={{fontSize: 20,display: 'inline-block'}}>Wiadomość od {message.name} {message.surname} ({message.email})</b> </h5><h5 style={{display: 'inline-block',marginLeft: 520}}>{formatD(new Date(message.date))}</h5>
          <h6>+48 {message.phoneNumber.slice(0,3)} {message.phoneNumber.slice(3,6)} {message.phoneNumber.slice(6,9)}</h6>
          </Typography>
          <Typography variant="h6" color="text.secondary"> 
            {/* {message.content} */}
          </Typography>
          </CardContent>
          <CardActions disableSpacing>
          <ExpandMore
               onClick={() => {
                handleExpandClick(i)
                message.opened = true
                ContactService.setOpened(message).then((response) => {
                  (message)
                      (response);
                      })
                      .catch((error) => {
                      (error);
                      });
              }}
               aria-expanded={expandedId === i}
              aria-label="show more"
            >
              <FaPen size={20}/><span style={{fontSize:20,marginLeft:2}}>Odpowiedz</span>
            </ExpandMore>
          </CardActions>
          <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
            <CardContent>
            {message.content}

            <Formik
                initialValues={{
                    content: '',
                    title:''
                }}
                validationSchema={Yup.object().shape({
                    content: Yup.string()
                        .required('Wiadomość jest wymagana'),
                    title: Yup.string()
                        .required('Temat jest wymagany')
                })}
                onSubmit={fields => {
                    (fields)
                    // fields.acceptTerms = null
                    UserService.respond(user.email, fields.content,fields.title, message.email).then((response) => {
                        (response);
                        handleExpandClick(i)
                        })
                        .catch((error) => {
                        (error);
                        });
                }}>
                {({ dirty, isValid, values, handleChange, handleBlur,errors,touched }) => {
              return (
                    <Form style={{ width: '40%',marginTop:-40}}>
                      <div className="form-group">
                          <Field label={<span>Temat<span style={{color:'red'}}>*</span></span>} variant="outlined" fullWidth name="name" disabled={false} value={values.title} component={TextField} />
                        </div>
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
        
      ))}
      <br></br>
    <h5>Przeczytane wiadomości</h5>
    {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,margnLeft:'auto',marginRight:'auto'}}/> : messages.filter(msg => msg.opened === true).map((message, i) => (
        <Card  key={message.id}>
          <CardContent >
          <Typography gutterBottom component="div">
          <FaEnvelopeOpen style={{display: 'inline-block',marginTop:-10}}size={30}/>
          <h5 style={{display: 'inline-block',marginLeft:10}}><b style={{fontSize: 20,marginRight:580}}>Wiadomość od {message.name} {message.surname} ({message.email})</b> {formatD(new Date(message.date))}</h5>
          <h6>+48 {message.phoneNumber.slice(0,3)} {message.phoneNumber.slice(3,6)} {message.phoneNumber.slice(6,9)}</h6>
          </Typography>
          <Typography variant="h6" color="text.secondary"> 
            {message.content} { message.respond == null ? <span style={{marginLeft: 1000}}>Odpowiedź: TAK</span> : <span style={{marginLeft: 700}}>Odpowiedź: NIE</span>}
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
                    title:''
                }}
                validationSchema={Yup.object().shape({
                    content: Yup.string()
                        .required('Wiadomość jest wymagana'),
                    title: Yup.string()
                        .required('Temat jest wymagany')
                })}
                onSubmit={fields => {
                    (fields)
                           UserService.respond(user.email, fields.content,fields.title, message.email).then((response) => {
                        (response);
                        })
                        .catch((error) => {
                        (error);
                        });
                }}>
                {({ dirty, isValid, values, handleChange, handleBlur,errors,touched }) => {
              return (
                    <Form style={{ width: '40%',marginTop:-40}}>
                        <div className="form-group">
                          <Field label={<span>Temat<span style={{color:'red'}}>*</span></span>} variant="outlined" fullWidth name="title" disabled={false} value={values.title} component={TextField} />
                        </div>
                        <div className="form-group" style={{marginTop:20}}>
                            <Field name="content" fullWidth value={values.content} label={<span>Wiadomość<span style={{color:'red'}}>*</span></span>} disabled={false}  as="textarea" rows="6" cols={200}  component={TextField} multiline/>
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
      ))}
      
       
    <div ><FaChevronCircleUp size={50} onClick={scrollToTop} style={{marginLeft: 1300,marginBottom: 50}}></FaChevronCircleUp></div>
    <Footer></Footer>
    </div>}
}