import React, { Fragment, useContext } from 'react';
import './login.scss';
import { Button } from '../button/Button';
import { RateContext } from '../../context/RateContext';

export const Login = () => {
  const {renderInputs} = useContext(RateContext);

  return(
    <Fragment>
      <div className='modal_form'>
        {renderInputs()}
      </div>
      <div className='modal_button'>
        <Button text='Sign in'></Button>
      </div>
    </Fragment>
  )
}