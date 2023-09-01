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
        USD: {name: 'US dollar', flag: USD, course: '999'},
        CHF: {name: 'Swiss franc', flag: CHF, course: '999'},
        CNY: {name: 'Chinese yuan', flag: CNY, course: '999'},
        EUR: {name: 'Euro', flag: EUR, course: '999'},
        GBP: {name: 'British pound', flag: GBP, course: '999'},
        JPY: {name: 'Japanese yen', flag: JPY, course: '999'},
        RUB: {name: 'Russian ruble', flag: RUB, course: '999'},
      }
    }
  }
  
  render() {
    return(
      <RateContext.Provider value ={{state: this.state}}>
        <Layout/>
      </RateContext.Provider>
    )
  }
}

export default App;