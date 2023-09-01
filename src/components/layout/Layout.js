import React, {Fragment} from "react";
import { AddClass } from "../../hoc/AddClass";
import './layout.scss';
import { Header } from "../header/Header";
import { Home } from "../../pages/home/Home";
import { Sidebar } from "../sidebar/Sidebar";

const Layout = () => {
  return(
    <Fragment>
      <Header/>
  
      <div className='content'>
        <div className='routes'>
          <Home/>
        </div>

        <Sidebar/>
      </div>
    </Fragment>
  )
}

export default AddClass(Layout, 'layout');