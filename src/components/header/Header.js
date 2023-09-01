import React from "react";
import './header.scss';
import { Navbar } from "../navbar/Navbar";

export const Header = () => {
  
  return(
    <header className='header'>
      <div className="headerWrap">
        <div className='logo'>
          <a href='/'>
            <h2>
              Rate App
            </h2>
          </a>
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