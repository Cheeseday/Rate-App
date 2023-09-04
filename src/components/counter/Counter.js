import React, { useContext } from "react";
import './counter.scss'
import { RateContext } from "../../context/RateContext";
import { Button } from "../button/Button";

export const Counter = () => {
  const { state, inputValueHandler, currencyValueHandler, calculatorHandler } = useContext(RateContext);

  return(
    <div className="calc_head">
      <div>
        <h4>
          I want to convert:
        </h4>
      </div>

      <div className="operation">
        <span>
          <input type="number" 
                 value={state.inputValue}
                 onChange={inputValueHandler}/>&nbsp; USD
        </span>

        <select onChange={currencyValueHandler}>
          {Object.keys(state.currency).map((item, index) => {
            return(
              <option key={item}>
                {item}
              </option>
            )
          })}
        </select>

        {/* <button onClick={() => calculatorHandler(state.currencyValue)}>Calculate</button> */}
        <Button text = 'Calculate' click={calculatorHandler} arg={state.currencyValue}/>
      </div>
    </div>

  )
}