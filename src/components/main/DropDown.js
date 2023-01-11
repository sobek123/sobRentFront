import React from "react"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaUserAlt, FaUserCircle, FaldCard, FaDoorOpen, FaRegFileAlt, FaRegIdCard } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useNavigate} from 'react-router-dom';

export function DropDown(){
  let navigate = useNavigate();

    const handleLogout = () => {
      AuthService.logout()
      navigate("/logowanie");
      window.location.reload();
      

    }
    return(
            <DropdownButton id="dropdown-button-dark" variant="dark" title={<FaUserAlt></FaUserAlt>} style={{borderRadius: 15}}>
              <Dropdown.Item ><Link to="/informacje" style={{textDecoration: 'none', color:'black'}}><FaRegIdCard size={20} style={{marginTop:-3, marginRight:4}}></FaRegIdCard>Profil</Link></Dropdown.Item>
              <Dropdown.Item><Link to="/wypozyczenia" style={{textDecoration: 'none', color:'black'}}><FaRegFileAlt size={20} style={{marginTop:-3, marginRight:4}}></FaRegFileAlt>Moje wypożyczenia</Link></Dropdown.Item>
              <Dropdown.Divider></Dropdown.Divider>
              <Dropdown.Item onClick={() => handleLogout()}><FaDoorOpen size={20} style={{marginTop:-3, marginRight:4}}></FaDoorOpen>Wyloguj</Dropdown.Item>
            </DropdownButton>
    )
}