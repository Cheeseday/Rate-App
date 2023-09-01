import React from "react";
import './navbar.scss';

export const Navbar = () => {

  return(
    <nav>
      <ul>
        <li><a href='/'>Home</a></li>
        <li><a href='/calc'>Calculator</a></li>
        <li><a href='/sample'>Selections</a></li>
        <li><a href='/info'>Information</a></li>
      </ul>
    </nav>
  )
}