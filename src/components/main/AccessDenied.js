import { Link } from "react-router-dom"
import { Footer } from "./Footer"


export function AccessDenied(){
    return <div style={{marginTop:120}}>
        <h3 style={{marginLeft: 'auto', marginRight: 'auto', textAlign:'center'}}>Nie posiadasz odpowiednich uprawnień, aby wyświetlić zawartość</h3>
        <div style={{textAlign: 'center', marginLeft: 'auto', marginRight: 'auto'}}><img alt="Nie masz dostępu" src={require('./cars/403-error.png')} width="1000" height="600" style={{borderRadius: 15}}></img></div>
        <br></br>
        <div style={{textAlign: 'center', marginLeft: 'auto', marginRight: 'auto'}}><Link to="/" >Przejdź do strony głównej</Link></div>
        <br></br>
        <Footer></Footer>
    </div>
    
}