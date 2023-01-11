import { PropaneSharp } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useContext } from "react";
import { useState } from "react";
import CartContext from "../../CartContext";

const format = (name) => {
    
    if(name == 'transmission'){
        return "skrzynia biegów"
    }else if(name == 'petrol'){
        return "rodzaj paliwa"
    }else if(name == 'year'){
        return "rok produkcji"
    }else if(name == 'category'){
        return 'kategoria'
    }else if(name == 'brand'){
        return 'marka'
    }else if(name == 'model'){
        return 'model'
    }else if(name == 'rentPlace'){
      return 'miejsce wypożyczenia'
    }else if(name == 'backPlace'){
      return 'miejsce zwrotu'
    }
}
export function CustomTextFields({ children, form, field }){
    const { name, value } = field;
    const { setFieldValue } = form;
 
    return (
      <Select
        name={name}
        value={value}
        onChange={e => {
          setFieldValue(name, e.target.value);

        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={format(name)}
        defaultValue=''
        
      >
        {children}
      </Select>
    );
  };