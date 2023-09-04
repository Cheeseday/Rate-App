import React from "react";
import { NavLink } from "react-router-dom";
import './header.scss';
import { Navbar } from "../navbar/Navbar";

export const Header = () => {
  
  return(
    <header className='header'>
      <div className="headerWrap">
        <div className='logo'>
          <NavLink to='/'>
            <h2>
              Rate App
            </h2>
          </NavLink>
        </div>

        <Navbar/>

        <div className='person'>
          <i className='fa fa-user' aria-hidden='true'/>
        </div>
      </div>
      <hr/>
    </header>
  )
}