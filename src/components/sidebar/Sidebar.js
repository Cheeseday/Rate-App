import React, {useContext} from "react";
import './sidebar.scss';
import { RateContext } from "../../context/RateContext";

export const Sidebar = () => {

  const {state} = useContext(RateContext);

  return(
    <div className='sidebar'>
      <div className='sidebar_head'>
        <h3>All currency</h3>
      </div>
      <div className='sidebar_content'>
        <ul>
          {
            Object.keys(state.currency).map((item, index) => {
              return(
                <li key={index}>
                  <p>
                    <span>
                      <img src={state.currency[item].flag} alt={item}/> &nbsp;{item}
                    </span>&nbsp; {state.currency[item].name} 
                  </p>
                </li>
              )
            })
          }
          <li></li>
        </ul>
      </div>
    </div>
  )
}