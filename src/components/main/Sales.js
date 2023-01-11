import { SalesModal } from "./SalesModal";
import { useState } from "react";
import Autobus from './autobusy.png'
import TIR from './fordtir.jpg'
import HappyHours from './happy-hour.jpg'
import KDR from './kdr_grafika.jpg'
import { FaCarAlt, FaInfo, FaInfoCircle } from "react-icons/fa";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import pic from "./output-onlinepngtools(2).png";
import { Footer } from "./Footer";

export function Sales(){
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [modalShow4, setModalShow4] = useState(false);

    return <div style={{marginTop:80}}>
       <hr ></hr>
        <div style={{textAlign:'center'}}><h2 >Promocje</h2>
        </div>
        <hr ></hr>

        <div style={{textAlign:'center',marginleft:'auto',marginRight:'auto'}}>
            <h4 >Karta SobRent</h4>
            <Grid style={{display:'flex',justifyContent: 'center'}}>
            <Card id={"card"} style={{ width: 350 , height: 200, borderRadius: 10, backgroundColor:'#CD5C5C'}} >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              <img src={pic} alt="RentCar Logo" style={{ width:180, height:180,marginTop:-10, marginBottom: -80, marginLeft: 170}} class="rounded-pill"/>  
              </Typography>
              <Typography variant="h6" color="text.secondary">
                <hr style={{marginBottom:0}}></hr>
                <span style={{marginBottom: 0,marginLeft: 150}}>004 665 444 321</span>
                <hr style={{marginTop:0}}></hr>
                <div style={{marginLeft: 230, marginTop: -15}}><FaCarAlt style={{display: 'inline-block'}}></FaCarAlt><h6 style={{display: 'inline-block', marginLeft:5}}>5665</h6></div>
              </Typography>
            </CardContent>
            </Card>
            </Grid>
            <FaInfoCircle onClick={() => setModalShow1(true)} style={{margin: 'auto', marginTop:10}} size={30}/>
            <SalesModal show={modalShow1} onHide={() => setModalShow1(false)} header="Karta SobRent" 
            text={<span>Posiadacze naszej karty SobRent mogą liczyć na zniżki w zależności od ilości posiadanych na niej punktów, comiesięcznych promocji, które są dostępne tylko tutaj oraz 5% rabatu na wszystkie zamówienia po dokonaniu 10 wypożyczeń!
            <span><br></br><FaCarAlt size = {30}/><b>100000 - 50% zniżki</b></span>
            <br></br>
            <FaCarAlt size = {30}/><b>50000 - 30% zniżki</b>   
            <br></br>
            <FaCarAlt size = {30}/><b>25000 - 20% zniżki</b>
            <br></br>
            <FaCarAlt size = {30}/><b>10000 - 5% zniżki</b></span>}/>
        </div>
        <hr></hr>
        <div style={{textAlign:'center'}}>
            <h4 >Karta Dużej Rodziny</h4>
            <img src={KDR} alt="Karta Dużej Rodziny" width={300} height={200}></img>
            <br></br>
            <FaInfoCircle onClick={() => setModalShow2(true)} style={{margin: 'auto', marginTop:10}} size={30}/>
            <SalesModal show={modalShow2} onHide={() => setModalShow2(false)} header="Karta Dużej Rodziny" text="Posiadacze karty dużej rodziny mają więcej! Wspieramy polskie rodziny!
             Po okazaniu Karty Dużej Rodziny w zamówieniu, w którym występuje/ą samochód/y z kategorii SUV, udzielamy zniżki w wysokości 10% na dany/e samochód/samochody!"/>
        </div>
        <hr></hr>
        <div style={{textAlign:'center'}}>
            <h4 >Kierowcy ciężarówek oraz autobusów/autokarów</h4>
            <img src={Autobus} alt="Autobus" style={{display: 'inline-block'}} height={200}></img>
            <img src={TIR} alt="Ciężarówka" style={{display: 'inline-block'}} width={350} height={200}></img>
            <br></br>
            <FaInfoCircle onClick={() => setModalShow3(true)} style={{margin: 'auto', marginTop:10}} size={30}/>
            <SalesModal show={modalShow3} onHide={() => setModalShow3(false)} header="Kierowcy autobusów oraz autokarów" text="Kierowcy autobusów oraz autokarów jeżdzą taniej!
          Po okazaniu prawa jazdy na podnay wyżej typ pojazdu, zostanie naliczony rabat w wysokości 10% na dane zamówienie! "/>
        </div>
        <hr></hr>
        <div style={{textAlign:'center'}}>
            <h4 > Happy Hours</h4>
            <img src={HappyHours} alt="Happy Hours" width={200} height={200}></img>
            <br></br>
            <FaInfoCircle onClick={() => setModalShow4(true)} style={{margin: 'auto', marginTop:10}} size={30}/>
            <SalesModal show={modalShow4} onHide={() => setModalShow4(false)} header="Happy Hours" text="Od poniedziałku do piątku w godzinach 14:00 - 16:00, nasi klienci mogą liczyć na rabat w wysokości 5% na każde złożone zamówienie! "/>
        </div>
      <br></br>
      <p>Aby uzyskać spersonaliowane i większe rabaty załóż konto i dołącz do społeczności SobRent!</p>
      <br></br>
      <Footer></Footer>
    </div>
}