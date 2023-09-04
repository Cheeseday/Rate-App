import React from 'react';
import './App.scss';
import Layout from './components/layout/Layout';
import { RateContext } from './context/RateContext';

import CHF from './image/CHF.png';
import CNY from './image/CNY.png';
import EUR from './image/EUR.png';
import GBP from './image/GBP.png';
import JPY from './image/JPY.png';
import RUB from './image/RUB.png';
import USD from './image/USD.png';

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
        RUB: {name: 'Russian ruble', flag: RUB, course: ''},
      },

      //calculator
      inputValue: 100,
      currencyValue: 'EUR',
      result: null,
    }
  }

  inputValueHandler = (event) => {
    this.setState({
      inputValue: event.target.value,
      result: null
    })
  }

  currencyValueHandler = (event) => {
    this.setState({
      currencyValue: event.target.value,
      result: null
    })
  }

  calculatorHandler = async (value) => {
    let result;

    await fetch(`https://openexchangerates.org/api/latest.json?app_id=46a87715010d4ee5853fcf260fb319bc `)
      .then((response) => response.json())
      .then((response) => {
        result = (response.rates[value] * this.state.inputValue).toFixed(2);
      })
    this.setState({
      result
    })
    console.log(result);
  }

  componentDidMount() {
    fetch(`https://openexchangerates.org/api/latest.json?app_id=46a87715010d4ee5853fcf260fb319bc`)
    .then((response) => response.json())
    .then((response) => {
      const rateArr = ['USD','CNY', 'EUR', 'CHF', 'GBP', 'JPY', 'RUB'];
      const currency = {...this.state.currency};
      for(let i = 0; i < rateArr.length; i++){
        currency[rateArr[i]].course = response.rates[rateArr[i]];
      }

      this.setState({
        rate: response.rates,
        date: new Date(response.timestamp * 1000).toLocaleString(),
        currency
      })
    })

  }
  
  render() {
    return(
      <RateContext.Provider value ={{ state: this.state, 
                                      inputValueHandler: this.inputValueHandler,
                                      currencyValueHandler: this.currencyValueHandler,
                                      calculatorHandler: this.calculatorHandler,
                                    }}>
        <Layout/>
      </RateContext.Provider>
    )
  }
}

export default App;