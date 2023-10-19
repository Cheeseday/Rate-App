import React from "react";
import './input.scss';

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && touched && shouldValidate;
}

export const Input = (props) => {
  const cls = ['modal_input'];
  const inputType = props.type || 'text';
  const htmlFor = `${props.type} - ${Math.random}`;

  return(
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>
        {props.label}&nbsp;
        <span>*</span>
      </label>
      <input  type={inputType} 
              id={htmlFor}
              value={props.value}
              placeholder={props.placeholder}
              onChange={props.onChange}>
      </input>
      {isInvalid(props) ? <span>{props.errorMessage || 'Enter a correct value'}</span> : null} 
    </div>
  )
}