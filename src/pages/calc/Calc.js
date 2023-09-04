import React from "react";
import './calc.scss';
import { Counter } from "../../components/counter/Counter";
import { CountResult } from "../../components/countResult/CountResult";


export const Calc = () => {

    return(
      <div className="calculator">
        <div className="calc_container">
          <Counter />
          <CountResult/>
        </div>
      </div>
    )
}
