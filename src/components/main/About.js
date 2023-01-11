import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function About(){
    return <div style={{marginTop:80}}>
        <hr ></hr>
        <div style={{textAlign:'center'}}><h2 >O nas,</h2>
        <h4>czyli o wypożyczalni samochodów SobRent</h4>
        </div>
        <hr ></hr>
        <div className="containter">
            <span style={{fontSize: 18,textAlign:'center'}}><p>SobRent to obecnie najbardziej popularna wypożyczalnia samochodowa w województwie podlaskim według magazynu opinie.pl.
            W swojej ofercie mamy ponad 100 samochodów z różnych kategorii, takich jak: sportowe, dostawcze, ekskluzywne, ekonomiczne, suvy, komfortowe.
            Jesteśmy partnerami i sponosrami różnego rodzaju wydarzeń kulturalnych, społecznych, sportowych, a także aktywnie bierzemy udział w akcjach charytatywnych na rzecz pomocy potrzebującym.</p></span>
        

 
        <div className="grid-container" style={{float: 'left', width:'100%'}}>
            <div className="grid-container" style={{float: 'left', width:'50%',textAlign:'center'}}>
                <img src={require('./cars/wyscigi-samochodowe-1.webp')} alt="Wyścigi samochodowe" width={500} height={300} style={{marginLeft:40,marginRight:'auto',textAlign:'center', borderRadius: 15}}></img>
                <br></br>
                <span style={{marginTop:320,marginLeft:-500}}>Nasze samochody regularnie biorą udział w różnych wyścigach charytatywnych, podczas których zbierane są pieniądze na wiele zbiórek organizowanych przez fundacje!!</span>
            </div>
            <div className="grid-container" style={{float: 'right', width:'50%',textAlign:'center'}}>
                <img src={require('./cars/basketball-team-4609620_960_720.jpg')} alt="Drużyna koszykówki" width={500} height={300} style={{marginLeft:50,marginRight:'auto',textAlign:'center', borderRadius: 15}}></img>
                <br></br>
                <span style={{marginTop:320,marginLeft:-500}}>Jesteśmy jednym ze sponsorów oraz partnerów lokalnej drużyny koszykówki, która osiąga wielkie sukcesy na szczeblu rozgrywek wojewódzkich oraz ogólnopolskich.</span>
            </div>
        </div>
        <br></br>
        <div className="grid-container" style={{float: 'right', width:'100%'}}>
            <div className="grid-container" style={{float: 'left', width:'50%',textAlign:'center'}}>
                <img src={require('./cars/13-09318132d4c0478d49ce91b335e19.jpg')} alt="Wyścigi samochodowe" width={500} height={300} style={{marginLeft:40,marginRight:'auto',textAlign:'center', borderRadius: 15}}></img>
                <br></br>
                <span style={{marginTop:320,marginLeft:-500}}>Bierzemy udział w wielu festiwalach oraz wystawach, aby zaprezentować uczestnikom część naszej floty pojazdów i przy tym zachęcić jak najwięcej osób do skorzystania z naszej oferty.</span>
            </div>
            <div className="grid-container" style={{float: 'right', width:'50%',textAlign:'center'}}>
                <img src={require('./cars/szlachetna_paczka_720.png')} alt="Wyścigi samochodowe" width={500} height={300} style={{marginLeft:50,marginRight:'auto',textAlign:'center', borderRadius: 15}}></img>
                <br></br>
                <span style={{marginTop:320,marginLeft:-500}}>Systematycznie wspieramy materialnie rodziny i osoby, które znajdują się w trudnej sytucji życiowej przekazując pieniądze na rzecz Szlachetnej Paczki.</span>
            </div>
        </div>
      <br></br>
       
    </div>
    <br></br>
    <div style={{marginTop:800}}><Footer></Footer></div>
    
    
</div>
  
}