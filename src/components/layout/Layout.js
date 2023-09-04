import React, {Fragment} from "react";
import { Route, Routes } from 'react-router-dom';
import { AddClass } from "../../hoc/AddClass";
import './layout.scss';
import { Header } from "../header/Header";
import { Home } from "../../pages/home/Home";
import { Sidebar } from "../sidebar/Sidebar";
import { Info } from "../../pages/info/Info";
import { Sample } from "../../pages/sample/Sample";
import { Calc } from "../../pages/calc/Calc";

const Layout = () => {
  return(
    <Fragment>
      <Header/>
  
      <div className='content'>
        <div className='routes'>
          <Routes>
            <Route path="/" exact element={<Home />}/> 
            <Route path="/calc" element={<Calc />}/> 
            <Route path="/sample" element={<Sample />}/> 
            <Route path="/info" element={<Info />}/> 
          </Routes>
        </div>

        <Sidebar/>
      </div>
    </Fragment>
  )
}

export default AddClass(Layout, 'layout');