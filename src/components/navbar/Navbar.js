import React from "react";
import { NavLink } from "react-router-dom";
import './navbar.scss';

export const Navbar = () => {

  return(
    <nav>
      <ul>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/calc'>Calculator</NavLink></li>
        <li><NavLink to='/sample'>Selections</NavLink></li>
        <li><NavLink to='/info'>Information</NavLink></li>
      </ul>
    </nav>
  )
}