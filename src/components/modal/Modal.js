import React, { Fragment, useState, useContext } from 'react';
import './modal.scss';
import { Login } from '../login/Login';
import { Register } from '../register/Register';
import { RateContext } from '../../context/RateContext';

export const Modal = () => {
  const {state, hideModalHandler} = useContext(RateContext);
  const [value, setValue] = useState('login');
  const links = [
    {name: 'Sign in', id: 'login'}, 
    {name: 'Sign up', id: 'register'},
  ];
  const cls = ['modal'];

  const windowHandler = (id) => {
    setValue(id);
  }

  if(state.showModal) {
    cls.push('modal_show');
  }

  return(
    <div className={cls.join(' ')}>
      <Fragment>
        <div className='modal_head'>
          <ul>
            {links.map((item, index) => {
              return (
                <li key={index} onClick={() => windowHandler(item.id)} style={{fontWeight: item.id === value ? '600' : '400'}}>
                  {item.name}
                </li>
              )
            })}
          </ul>
          <i className='fa fa-times' aria-hidden='true' onClick={hideModalHandler}/>
        </div>
        <hr/>
      </Fragment>

      {value === 'register' ? <Register/> : <Login/>}
    </div>
  )
}