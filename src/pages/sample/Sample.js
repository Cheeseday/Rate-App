import React, { useContext } from "react";
import './sample.scss';
import { RateContext } from "../../context/RateContext";
import { Button } from "../../components/button/Button";


export const Sample = () => {
  const { state } = useContext(RateContext);

  return(
    <div className="sample">
      <div className="sample_container">

        <div>
          <h3>
            Get a course: &nbsp;

            <select>
              {Object.keys(state.currency).map((item, index) => {
                return(
                  <option key={item}>{item}</option>
                )
              })}
            </select>
            &nbsp;&nbsp; to &nbsp;&nbsp;
            <select>
              {Object.keys(state.currency).map((item, index) => {
                return(
                  <option key={item}>{item}</option>
                )
              })}
            </select>
          </h3>
        </div>

        <div className="sample_head">
          <span>
            Date: 
            <input type="date"/>
          </span>
          <Button text='Get course'/>
        </div>

        <div className="sample_result">
          <ul>

          </ul>
        </div>
      </div>
    </div>
  )
}
