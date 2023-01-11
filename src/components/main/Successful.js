import { Link,useNavigate } from "react-router-dom";

export function Successful(){

  const navigaye = useNavigate()
  setTimeout( () => 
    navigaye("/logowanie")
    ,5000);
    return <div style={{marginTop:100}}>
        <h3 style={{marginLeft: 'auto', marginRight: 'auto', textAlign:'center'}}>Gratulacje!! Twoje konto zostało poprawnie zweryfikowane</h3>
      <div style={{textAlign: 'center', marginLeft: 'auto', marginRight: 'auto'}}><Link to="/logowanie" >Kliknij tutaj aby się zalogować</Link></div>
      
    </div>
}