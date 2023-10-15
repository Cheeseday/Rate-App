import React from 'react';
import './App.scss';
import Layout from './components/layout/Layout';
import { RateContext } from './context/RateContext';

import CHF from './image/CHF.png';
import CNY from './image/CNY.png';
import EUR from './image/EUR.png';
import GBP from './image/GBP.png';
import JPY from './image/JPY.png';
import USD from './image/USD.png';
import PLN from './image/PLN.png';

class App extends React.Component {
  constructor(props) {
    
    super(props);
    this.state = {
      base: 'USD',
      rate: '',
      date: '',
      currency: {
        EUR: {name: 'Euro', flag: EUR, course: ''},
        USD: {name: 'US dollar', flag: USD, course: ''},
        CHF: {name: 'Swiss franc', flag: CHF, course: ''},
        CNY: {name: 'Chinese yuan', flag: CNY, course: ''},
        GBP: {name: 'British pound', flag: GBP, course: ''},
        JPY: {name: 'Japanese yen', flag: JPY, course: ''},
        PLN: {name: 'Polish zloty', flag: PLN, course: ''},
      },

      //calculator
      inputValue: 100,
      currencyValue: 'EUR',
      result: null,
    }
  }
  exchangedCurrencyHandler = (event) => {
    this.setState({
      base: event.target.value
    })
  }

  inputValueHandler = (event) => {
    this.setState({
      inputValue: event.target.value,
      result: null
    });
  }

  currencyValueHandler = (event) => {
    this.setState({
      currencyValue: event.target.value,
      result: null
    });
  }

  calculatorHandler = async (value) => {
    let result;
    const host = 'api.frankfurter.app';
    const origin = `https://${host}`;

    await fetch(`${origin}/latest?amount=${this.state.inputValue}&from=${this.state.base}&to=${this.state.currencyValue}`)
      .then((response) => response.json())
      .then((response) => {
        result = response.rates[value].toFixed(2);
      });
    this.setState({
      result
    });
  }

  componentDidMount() {
    const host = 'api.frankfurter.app';
    const origin = `https://${host}`;

    fetch(`${origin}/latest?from=${this.state.base}`)
    .then(response => response.json())
      .then(response => {
        const rateArr = ['USD', 'CNY', 'EUR', 'CHF', 'GBP', 'JPY', 'PLN'];
        const currency = {...this.state.currency};
        for(let i = 0; i < rateArr.length; i++){
          if(response.rates[rateArr[i]]) {
            currency[rateArr[i]].course = response.rates[rateArr[i]].toFixed(4);
          }
          else if(rateArr[i] === this.state.base) {
            currency[rateArr[i]].course = '1.0000';
          }
        }

        this.setState({
            rate: response.rates,
            date: response.date,
            currency
        });
      })

  }
  
  render() {
    return(
      <RateContext.Provider value ={{ state: this.state, 
                                      inputValueHandler: this.inputValueHandler,
                                      currencyValueHandler: this.currencyValueHandler,
                                      calculatorHandler: this.calculatorHandler,
                                      exchangedCurrencyHandler: this.exchangedCurrencyHandler, 
                                    }}>
        <Layout/>
      </RateContext.Provider>
    )
  }
}

export default App;