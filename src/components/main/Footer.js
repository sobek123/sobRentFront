import React from 'react';
import SocialMedia from "./SocialMedia";
import "./SocialMedia.css";
import "./Footer.css"
import {Link} from 'react-router-dom';

export function Footer() {
  return <div>
  <footer className="bg-light " style={{marginLeft:-120,bottom:0,right:0, marginBottom: 0,width: 1528}}>
    <div className="container-fluid bg-light" style={{backgroundColor: 'light'}}>
      <div className="row ">
        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0"><img src="img/logo.png" alt="" width="180" className="mb-3"/>
          <p claclassNamess="font-italic text-muted" style={{marginLeft:30}}>SobRent to wypożyczalnia samochodowa z wieloletnim doświadczeniem na rynku i wyróżniająca się bogatą oferta oraz nietuzinkowym podejściem do potrzeb klienta.</p>
          <div style={{marginLeft:30}}><SocialMedia></SocialMedia></div>
        </div>
        <div className="col-lg-2 col-md-6 mb-4 mb-lg-0" style={{marginTop:20}}>
          <h6 className="text-uppercase font-weight-bold mb-3">Pomoc</h6>
          <ul className="list-unstyled mb-0">
            <li className="mb-2"><Link to="/kontakt" className="text-muted text-decoration-none">Kontakt</Link></li>
            <li className="mb-2"><Link to="/FAQ" className="text-muted text-decoration-none">FAQ</Link></li>
            <li className="mb-2"><Link to="/regulamin" className="text-muted text-decoration-none">Regulamin</Link></li>
            <li className="mb-2"><Link to="/o-nas" className="text-muted text-decoration-none">O nas</Link></li>
          </ul>
        </div>
        <div className="col-lg-2 col-md-6 mb-4 mb-lg-0" style={{marginTop:20}}>
          <h6 className="text-uppercase font-weight-bold mb-3">Wypożyczalnia</h6>
          <ul className="list-unstyled mb-0">
            <li className="mb-2"><Link to="/promocje" className="text-muted text-decoration-none" >Promocje</Link></li>
            <li className="mb-2"><Link to="/cennik" className="text-muted text-decoration-none">Cennik</Link></li>
            <li className="mb-2"><Link to="/flota" className="text-muted text-decoration-none">Nasze Samochody</Link></li>
          </ul>
        </div>
        <div className="col-lg-4 col-md-6 mb-lg-0" style={{marginTop:20}}>
          <h6 className="text-uppercase font-weight-bold mb-2">Newsletter</h6>
          <p className="text-muted mb-4">Zapisz się do naszego newslettera, aby być na bieżąco z naszymi nowościami i promocjami. Uzyskaj również specjalne rabaty dla stałych klientów!</p>
          <div className="p-1 rounded border">
            <div className="input-group" >
              <input type="email" placeholder="Wpisz swój adres e-mail" id="in" aria-describedby="button-addon1" className="form-control border-0 shadow-0" style={{width: 900, marginLeft: 3}} />
         
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div className=" py-2" style={{backgroundColor: 'lightgrey'}}>
      <div className="container text-center">
        <p className="text-muted mb-0 py-2">© 2022 SobRent. Wszelkie prawa zastrzeżone.</p>
      </div>
    </div>
  </footer>
  </div>
}