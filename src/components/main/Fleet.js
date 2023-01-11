import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
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
import GTR from './images.jpg'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import './Fleet.css'
import {Link} from 'react-router-dom';

export function Fleet(){
  
    return <div style={{marginTop:80}}>
      <hr ></hr>
      <div style={{textAlign:'center'}}><h2 >Nasze samochody</h2>
      </div>
      <hr ></hr>
      <div className="grid-container">
        <Link to="/ekskluzywne" className="link">
        <div className="grid-item1">
          <h3>Grupa Ekskluzywne</h3>
        </div>
        </Link>
        <Link to="/sportowe" className="link">
        <div className="grid-item2">
          <h3>Grupa Sportowe</h3>
        </div>
        </Link>
        <Link to="/economy" className="link">
        <div className="grid-item3">
          <h3>Grupa Ekonomiczne</h3>
        </div>  
        </Link>
        <Link to="/comfort" className="link">
        <div className="grid-item4">
          <h3>Grupa Komfortowe</h3>
        </div>
        </Link>
        <Link to="/suv" className="link">
        <div className="grid-item5">
          <h3>Grupa SUV</h3>
        </div>
        </Link>
        <Link to="/dostawcze" className="link">
        <div className="grid-item6">
          <h3>Grupa Dostawcze</h3>
        </div>   
        </Link>
      </div>
      <br></br>
      <Footer></Footer>
    </div>
}