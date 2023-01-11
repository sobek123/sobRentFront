
import ReactSelect, { Select } from 'react-select';
import { useField } from 'formik';
import React from "react";
import { useContext } from 'react';
import CartContext from '../../CartContext';
export default function SelectField(props) {
  const {updateAdditionals} = useContext(CartContext)
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  const onChange = (value) => {
    setValue(value);
    console.log(value)
    updateAdditionals(value)
  };

  return (
    <div style={{width: 500}}>
    <ReactSelect
    {...props}
    value={state?.value}
    isMulti
    onChange={onChange}
    onBlur={setTouched}
    defaultValue=""
    placeholder='Wybierz dodatkowe opcje'
    ></ReactSelect>
    </div>
  );
}