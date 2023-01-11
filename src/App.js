import {Route, Routes} from 'react-router-dom';
import { About } from "./components/main/About";
import { Contact } from "./components/main/Contact";
import { FAQ } from "./components/main/FAQ";
import { Fleet } from "./components/main/Fleet";
import { Tariff } from "./components/main/Tariff";
import { Sales } from "./components/main/Sales";
import { HomePage } from "./components/main/HomePage";
import { Rules } from "./components/main/Rules";
import { Login } from './components/main/Login';
import { Register } from './components/main/Register';
import CookieConsent from 'react-cookie-consent';
import "./App.css";
import { PrivacyPolicy } from './components/main/PrivacyPolicy';
import {Link} from 'react-router-dom';
import { Exclusive } from './components/main/Exclusive';
import { Cargo } from './components/main/Cargo';
import { Sport } from './components/main/Sport';
import { Economy } from './components/main/Economy';
import { Comfort } from './components/main/Comfort';
import {AddCar} from './components/car/AddCar'
import { Cars } from './components/main/Cars';
import {Basket} from './components/main/Basket'
import { AccountInformation } from './components/main/AccountInformations';
import { Rentings } from './components/main/Rentings';
import { Carts } from './components/main/Carts';
import { Settings } from '@mui/icons-material';
import { Users } from './components/main/Users';
import { Orders } from './components/main/Orders';
import { Offer } from './components/main/Offer';
import { CartProvider } from './CartContext';
import Navbar from './components/main/Navbar';
import {useEffect, useState} from 'react'
import { SUV } from './components/main/SUV';
import { Footer } from './components/main/Footer';
import { Finances } from './components/main/Finances';
import { Workers } from './components/main/Workers';
import { Messages } from './components/main/Messages';
import { AddWorker } from './components/main/AddWorker';
import { Successful } from './components/main/Successful';
import { PageNotFound } from './components/main/PageNotFound';
import {ForgotPassword} from './components/main/ForgotPassword'
import { SendEmail } from './components/main/SendEmail';
function App() {
  
  
  useEffect(() => {
    document.title = "Wypożyczalnia samochodów Białystok SobRent"
  }, [])

  
  return (
    
    <>
     <div className="container">
      <CartProvider>
      <Navbar></Navbar>      
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/flota" element={<Fleet />}/>
          <Route path="/cennik" element={<Tariff />}/>
          <Route path="/promocje" element={<Sales />}/>
          <Route path="/uzytkownicy" element={<Users />}/>
          <Route path="/zamowienia" element={<Orders />}/>
          <Route path="/FAQ" element={<FAQ />}/>
          <Route path="/regulamin" element={<Rules/>}/>
          <Route path="/kontakt" element={<Contact />}/>
          <Route path="/onas" element={<About/>}/>
          <Route path="/logowanie" element={<Login />}/>
          <Route path="/verify/code=:code" element={<Successful />}/>
          <Route path="/reset_password/token=:token" element={<ForgotPassword />}/>
          <Route path="/rejestracja" element={<Register />}/>
          <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />}/>
          <Route path="/comfort" element={<Comfort />}/>
          <Route path="/ekskluzywne" element={<Exclusive />}/>
          <Route path="/dostawcze" element={<Cargo />}/>
          <Route path="/sportowe" element={<Sport />}/>
          <Route path="/economy" element={<Economy />}/>
          <Route path="/suv" element={<SUV />}/>
          <Route path="/sport" element={<AddCar />}/>
          <Route path="/samochody" element={<Cars />}/>
          <Route path="/oferta" element={<Offer />}/>
          <Route path="/koszyk" element={<Basket />}/>
          <Route path="/wypozyczenia" element={<Rentings />}/>
          <Route path="/informacje" element={<AccountInformation />}/>
          <Route path="/zestawienie" element={<Carts />}/>
          <Route path="/ustawienia" element={<Settings />}/>
          <Route path="/pracownicy" element={<Workers />}/>
          <Route path="/pracownik" element={<AddWorker />}/>
          <Route path="/finanse" element={<Finances />}/>
          <Route path="/wiadomosci" element={<Messages />}/>
          <Route path="*" element={<PageNotFound />}/>
          <Route path="/zapomnialem-hasla" element={<SendEmail />}/>
        </Routes>
        </CartProvider>
     </div>
     <CookieConsent
     style={{backgroundColor: 'gray'}}
        debug={true} 
        location='bottom'
        buttonText='Akceptuję pliki cookie'
        buttonStyle={{backgroundColor: 'white', marginRight:50, marginTop: -10}}
     >W celu świadczenia usług na najwyższym poziomie stosujemy pliki cookies, które będą zamieszczane w Państwa urządzeniu (komputerze, laptopie, smartfonie). W każdym momencie mogą Państwo dokonać zmiany ustawień Państwa przeglądarki internetowej i wyłączyć opcję zapisu plików cookies. Ze szczegółowymi informacjami dotyczącymi cookies na tej stronie można się zapoznać w <Link to="/polityka-prywatnosci">polityce prywatności</Link>. </CookieConsent>
     
    </>
)
}

export default App;
