import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { Button, TableContainer } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CarService from '../services/CarService';
import React, { useEffect, useState } from "react";
import AdditionalService from "../services/AdditionalService";
import { FaPlusCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { CustomTable } from "./CustomTable";
import Dialog from './Dialog';
import { useRef } from 'react';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';
import { Footer } from './Footer';
import { Spinner } from 'react-bootstrap';

export function Tariff(){
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });
  
  const idProductRef = useRef();
  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading
    });
  };
const handleDelete = (id) => {
    handleDialog("Czy na pewno chcesz usunąć tę opcję?", true);
    idProductRef.current = id;
  };

  const areUSureDelete = (choose) => {
    if (choose) {
        AdditionalService.deleteAdditional(idProductRef.current).then(response => { 
          console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });
      setAdditionals(additionals.filter((additional) => {
        return additional.id !== idProductRef.current;
    }))
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  const [loading, setLoading] = useState(true);
  const [name,setName] = useState("")
  const [prize,setPrize]=useState(0)
  const [economyCars, setEconomyCars] = useState([]);
  const [comfortCars, setComfortCars] = useState([]);
  const [exclusiveCars, setExclusiveCars] = useState([]);
  const [sportCars, setSportCars] = useState([]);
  const [suvCars, setSuvCars] = useState([]);
  const [cargoCars, setCargoCars] = useState([]);
  const [additionals,setAdditionals] = useState([])
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)

  
  
  const handleAdd = () => {
    AdditionalService.addAdditional({name: name, prize: prize})
        .then((response) => {
        console.log(response);
        })
        .catch((error) => {
        console.log(error);
        });
        additionals.push({name: name, prize: prize})
    setShow(false)
    // setChange(true)
    setName('')
    setPrize(0)
    document.getElementById("addButton").hidden = false
    

    
  }

  const handleEdit = (id) => {
    if(show2 === false){
      // setShow2(true)
      document.getElementById("exitButton"+id).hidden = false
      document.getElementById("acceptButton"+id).hidden = false
      // document.getElementById("editName"+id).hidden = false
      document.getElementById("editPrize"+id).hidden = false
    
      document.getElementById("prize"+id).hidden = true

      document.getElementById("editButton"+id).hidden = true
      document.getElementById("deleteButton"+id).hidden = true
      
    }
    else
    {
      // setShow2(false) 
      document.getElementById("exitButton"+id).hidden = true
      document.getElementById("acceptButton"+id).hidden = true
      // document.getElementById("editName"+id).hidden = true
      document.getElementById("editPrize"+id).hidden = true
      document.getElementById("deleteButton"+id).hidden = false
      document.getElementById("editButton"+id).hidden = false
    
      document.getElementById("prize"+id).hidden = false

    } 
  };
  
    const handleAccept = (id) => {
      
        document.getElementById("first"+id).hidden = true
        document.getElementById("second"+id).hidden = true
        document.getElementById("three"+id).hidden = true
        document.getElementById("forth"+id).hidden = true
        document.getElementById("fifth"+id).hidden = true
        document.getElementById("six"+id).hidden = true
        document.getElementById("seventh"+id).hidden = true
        document.getElementById("span"+id).hidden = false
        document.getElementById("span2"+id).hidden = false
        document.getElementById("span3"+id).hidden = false
        document.getElementById("span4"+id).hidden = false
        document.getElementById("span5"+id).hidden = false
        document.getElementById("span6"+id).hidden = false
        document.getElementById("span7"+id).hidden = false
        document.getElementById("tab").style.width = '30%'
      
  }

  const handleAcceptEdit = (id) => {
    AdditionalService.editAdditional(id,{name: name, prize: prize})
        .then((response) => {
        console.log(response);
        // const tab = additionals
        // for(let i=0;i<additionals.length;i++){
        //   if(additionals[i].id == id){
        //     console.log(additionals[i])
            
        //     additionals[i].prize = Number(prize)
        //   }
        // }
        const newA = additionals.map(obj => {

          if (obj.id == id) {
          
          return {name: obj.name, prize: prize};
          
          }
          
          return obj;
          
          })
        // console.log(tab)
        
        setAdditionals(newA)
        // additionals.find(el => el.name === name).
        })
        .catch((error) => {
        console.log(error);
        });
        

        document.getElementById("deleteButton"+id).hidden = false
        document.getElementById("editButton"+id).hidden = false
    document.getElementById("exitButton"+id).hidden = true
        document.getElementById("acceptButton"+id).hidden = true
        // document.getElementById("editName"+id).hidden = true
        document.getElementById("editPrize"+id).hidden = true
      
      document.getElementById("prize"+id).hidden = false

      setPrize(0)
  }

  const handleShow = () => {
    setShow(true)
  }

  const handleChangeName = event => {
    setName(event.target.value);
  };

  const handleChangePrize = event => {
    setPrize(event.target.value);
  };

  
  const handleExit = (id) => {
    document.getElementById("deleteButton"+id).hidden = false
    document.getElementById("editButton"+id).hidden = false
    document.getElementById("exitButton"+id).hidden = true
    document.getElementById("acceptButton"+id).hidden = true
    // document.getElementById("editName"+id).hidden = true
    document.getElementById("editPrize"+id).hidden = true
   
    document.getElementById("addButton").hidden = false
    document.getElementById("prize"+id).hidden = false

    
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await AdditionalService.getAdditionals()
        setAdditionals(response.data);
        const response1 = await CarService.getCarsEconomy();
        setEconomyCars(response1.data);
        const response2 = await CarService.getCarsSUV();
        setSuvCars(response2.data);
        const response3 = await CarService.getCarsComfort();
        setComfortCars(response3.data);
        const response4 = await CarService.getCarsExclusive();
        setExclusiveCars(response4.data);
        const response5 = await CarService.getCarsCargo();
        setCargoCars(response5.data);
        const response6 = await CarService.getCarsSport();
        setSportCars(response6.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  

  const [id,setId] = useState('')
  const [user,setUser] = useState('')

  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const user = await AuthService.getCurrentUser();
        console.log("u"+user)
        const response = await UserService.findByEmail(user.email)
        setUser(response.data);
        console.log(user)
        user.roles.map(e => console.log(e.name))
        console.log("Halo"+response.data)
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
 
    return <div style={{marginTop:80}}>
        <hr ></hr>
        <div style={{textAlign:'center'}}><h2 >Cennik</h2>
        </div>
        <hr></hr>
        <h4>Grupa Komfortowe</h4>
        {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,marginLeft: 'auto', marginRight: 'auto'}}/> :<CustomTable cars={comfortCars}></CustomTable>}
    <br></br>
    <h4>Grupa Sportowe</h4>
    {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,marginLeft: 'auto', marginRight: 'auto'}}/> :<CustomTable cars={sportCars}></CustomTable>}
    <br></br>
    <h4>Grupa Ekonomiczne</h4>
    {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,marginLeft: 'auto', marginRight: 'auto'}}/> :<CustomTable cars={economyCars}></CustomTable>}
    <br></br>
    <h4>Grupa Ekskluzywne</h4>
    {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,marginLeft: 'auto', marginRight: 'auto'}}/> :<CustomTable cars={exclusiveCars}></CustomTable>}
    <br></br>
    <h4>Grupa Dostawcze</h4>
    {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,marginLeft: 'auto', marginRight: 'auto'}}/> :<CustomTable cars={cargoCars}></CustomTable>}
    <br></br>
    <h4>Grupa SUV</h4>
    {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,marginLeft: 'auto', marginRight: 'auto'}}/> :<CustomTable cars={suvCars}></CustomTable>}
     <br></br>       
     <h5>Opłaty dodatkowe</h5>
     <TableContainer component={Paper}>
      <Table sx={{ maxWidth: "100%" }} size="small" aria-label="a dense table">
        <TableBody>
        {loading ? <Spinner animation="border" role="status" style={{marginTop: 80,margnLeft:'auto',marginRight:'auto'}}/> :additionals.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >
              <b>{row.name}</b>
              </TableCell>
              { user == null && (user.role !== 'ROLE_ADMIN' || user.role !== 'ROLE_ADMIN' )? <TableCell>{row.prize}</TableCell> : <TableCell><input type="number" hidden style={{width: 80}} min="1" required onChange={handleChangePrize} value={prize} id={"editPrize"+row.id}></input><span><span id={"prize"+row.id}> {row.prize}</span><Button id={"editButton"+row.id}  onClick={() => handleEdit(row.id)} style={row.prize < 1000 ? { marginLeft: 14,marginRight: 4,marginTop: 'auto', marginBottom: 'auto',color: 'green'} : { marginLeft: 6,marginTop: 'auto', marginBottom: 'auto',marginRight: 4,color: 'green'}}>Edytuj</Button><Button id={"deleteButton"+row.id} onClick={() => handleDelete(row.id)} style={{marginRight: -115, marginTop: 'auto', marginBottom: 'auto',color: 'red'}}><FaTrash style={{marginTop: -5}}></FaTrash>Usuń</Button></span>
              <span><Button id={"acceptButton"+row.id} onClick={() => handleAcceptEdit(row.id)} hidden style={ row.prize < 1000 ? { marginLeft: 14,marginRight: 4,marginTop: 'auto', marginBottom: 'auto',color: 'blue'} : { marginLeft: 6,marginTop: 'auto', marginBottom: 'auto',marginRight: 4,color: 'blue'}}>Aktualizuj</Button><Button id={"exitButton"+row.id} onClick={() => handleExit(row.id)} style={{marginRight: -135, marginTop: 'auto', marginBottom: 'auto',color: 'red'}} hidden>Anuluj</Button></span></TableCell>}

            </TableRow>
          ))}
          {dialog.isLoading && (
            <Dialog onDialog={areUSureDelete} message={dialog.message}/>
          )}
          { show  ? <TableRow >
              <TableCell style={{marginTop: 0}}>
                 <input type="text" style={{width: 600}} onChange={handleChangeName} value={name} required></input>
              </TableCell>
              <TableCell style={{paddingBottom: -10, paddingTop: 0}}>
                   <input type="number" style={{width: 80}} min="1"onChange={handleChangePrize} value={prize} id="" required></input>
                  <Button type="submit"  style={{marginRight: 1, marginTop: 9, height: 35,color: 'blue'}} onClick={handleAdd} >Dodaj</Button>
                  <Button type="submit" style={{marginRight:-108,  marginTop: 9,height: 35,color: 'red'}} onClick={() => setShow(false)}>Anuluj</Button>
              </TableCell>
            </TableRow> : '' 
          }
        </TableBody>
      </Table>
    </TableContainer>
   
    {  user== null &&  (user.role !== 'ROLE_ADMIN' ||  user.role !== 'WORKER') ? '' : <div style={{textAlign:'center', marginLeft: 'auto', marginRight: 'auto'}}><button className = "btn" onClick={() => setShow(true)} id = "addButton" style={{marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}><FaPlusCircle  size={50} color="black"></FaPlusCircle></button></div> }
    <br></br>
    <Footer></Footer>
    </div>
}