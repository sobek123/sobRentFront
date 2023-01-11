import { Stack, Typography,Box,Slider } from "@mui/material"
import { useContext } from "react"
import CartContext from "../../CartContext"

export function CustomRangeInput( {children, form, field }){
  const { name, value } = field;
  const { setFieldValue } = form;
  const {updateNumberOfSeats} = useContext(CartContext)
  
    return <Box><Typography id="input-slider" gutterBottom>
        <span style={{color:'gray'}}>Liczba miejsc</span>
      </Typography>
     <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
    <span style={{marginRight: 10,color:'gray'}}>2</span>
  <Slider aria-label="numberOfSeats" onChange={e => {
          setFieldValue(name, e.target.value);
          updateNumberOfSeats(e.target.value)
        }} 
        min={2} max={5}/>
  <span style={{marginRight: 10,color:'gray'}}>5</span>
</Stack></Box>
}