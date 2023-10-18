import React, { useContext } from "react";
import './sample.scss';
import { RateContext } from "../../context/RateContext";
import { Button } from "../../components/button/Button";


export const Sample = () => {
  const { state, exchangedValueHandler, desiredValueHandler, sampleDateHandler, writeData, sampleRemove } = useContext(RateContext);

  return(
    <div className="sample">
      <div className="sample_container">

        <div>
          <h3>
            Get a course: &nbsp;

            <select onChange={exchangedValueHandler} value={state.sample.exchangedValue}>
              {Object.keys(state.currency).map((item, index) => {
                return(
                  <option key={index} value={item}>{item}</option>
                )
              })}
            </select>
            &nbsp;&nbsp; to &nbsp;&nbsp;
            <select onChange={desiredValueHandler} value={state.sample.desiredValue}>
              {Object.keys(state.currency).map((item, index) => {
                return(
                  <option key={index} value={item}>{item}</option>
                )
              })}
            </select>
          </h3>
        </div>

        <div className="sample_head">
          <span>
            Date: 
            <input type="date" onChange={sampleDateHandler}/>
          </span>
          <Button text='Get course' click={writeData}/>
        </div>

        <div className="sample_result">
          <ul>
              {Object.keys(state.sampleList).map((item) => {
                return (
                  <li key={item}>
                    <span>1 {state.sampleList[item].exchangedValue} &nbsp;<img src={state.currency[state.sampleList[item].exchangedValue].flag} alt={item}/></span>
                    =
                    <span>{`${state.sampleList[item].course} ${state.sampleList[item].desiredValue}`}&nbsp;<img src={state.currency[state.sampleList[item].desiredValue].flag} alt={item}/></span>
                    <span>{state.sampleList[item].date}</span>
                    <button onClick={() => sampleRemove(item)}><i className="fa fa-times"/></button>
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    </div>
  )
}
