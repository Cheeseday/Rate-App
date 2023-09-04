import React, { useContext } from "react";
import './countResult.scss';
import { RateContext } from "../../context/RateContext";

export const CountResult = () => {

  const { state } = useContext(RateContext)

  return(
    <div className="calcResult">
      <ul>

        {state.result ? 
          <li>
            <p>
              <span>{state.inputValue} USD</span>
              &nbsp;=&nbsp;
              <span>{state.result} {state.currencyValue}</span>
            </p>
          </li>
          : null
        }
      </ul>
    </div>
  )
}