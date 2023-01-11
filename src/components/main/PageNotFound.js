import { Link } from "react-router-dom"
import { Footer } from "./Footer"

export function PageNotFound(){
    return <div style={{marginTop:100}}>
        <h3 style={{marginLeft: 'auto', marginRight: 'auto', textAlign:'center'}}>Ups. Coś poszło nie tak</h3>
      <div style={{textAlign: 'center', marginLeft: 'auto', marginRight: 'auto'}}><img alt="Coś poszło nie tak" src={require('./cars/404.png')} width="800" height="600"></img></div>
      <div style={{textAlign: 'center', marginLeft: 'auto', marginRight: 'auto'}}><Link to="/" >Przejdź do strony głównej</Link></div>
<br></br>
<Footer></Footer>
    </div>
}