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
    }
}
export function CustomTextFieldsBrand({ children, form, field }){
    const { name, value } = field;
    const { setFieldValue } = form;
    const {updateBrand} = useContext(CartContext)
    
    return (
      <Select
        name={name}
        value={value}
        onChange={e => {
          setFieldValue(name, e.target.value);
          updateBrand(e.target.value)
        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={format(name)}
      >
        {children}
      </Select>
    );
  };