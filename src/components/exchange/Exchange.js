import React, {useContext} from "react";
import './exchange.scss';
import { RateContext } from "../../context/RateContext";

export const Exchange = () => {

  const {state} = useContext(RateContext);

  const currency = {...state.currency}

  return(
    <div className='exchange'>
      <div className='exchangeContainer'>
        
        <div className='exchangeContent'>
          <div>
            <p>
              Base currency: &nbsp; &nbsp; Date: {}
            </p>
          </div>
          <ul>
            {
              Object.keys(currency).map((item, index) => {
                return(
                  <li key={item}>
                    <span>
                      <img src={currency[item].flag} alt={currency[item].name}/>
                        {item}
                    </span>
                    <span>
                      {`1 ${state.base} = ${currency[item].course} ${item}`}
                    </span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  ) 
}