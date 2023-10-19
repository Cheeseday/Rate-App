import React from 'react';
import './App.scss';
import Layout from './components/layout/Layout';
import { RateContext } from './context/RateContext';
import axios from 'axios';
import { flushSync } from 'react-dom';
import { Input } from './components/input/Input';
import { Dark } from './components/dark/Dark';
import { Modal } from './components/modal/Modal';

import CHF from './image/CHF.png';
import CNY from './image/CNY.png';
import EUR from './image/EUR.png';
import GBP from './image/GBP.png';
import JPY from './image/JPY.png';
import USD from './image/USD.png';
import PLN from './image/PLN.png';

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

class App extends React.Component {
  constructor(props) {
    
    super(props);
    this.state = {
      formControls: {
        email: {
          value: '',
          type: 'email',
          label: 'Email',
          errorMessage: 'Enter a correct email',
          placeholder: 'email@address.com',
          valid: false,
          touched: false,
          isRequired: true,
          validation: {
            required: true,
            email: true,
          },
        },
        password: {
          value: '',
          type: 'password',
          label: 'Password',
          errorMessage: 'Enter a correct password',
          placeholder: 'Must have at least 8 characters',
          valid: false,
          touched: false,
          isRequired: true,
          validation: {
            required: true,
            minLength: 8,
          }
        },
      },

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

      //sample
      sample: {
        exchangedValue: 'USD',
        desiredValue: 'PLN',
        course: '',
        date: '',
      },
      sampleList: '',

      showModal: false,
    }
  }

  showModalHandler = () => {
    this.setState({showModal: true})
  }

  hideModalHandler = () => {
    this.setState({showModal: false})
  }

  validateControl(value, validation) {
    if(!validation) {
      return true;
    }
    let isValid = true;
    if(validation.required) {
      isValid = isValid && value.trim() !== ''; 
    }
    if(validation.email) {
      isValid = isValid && validateEmail(value);
    }
    if(validation.minLength) {
      isValid = isValid && value.length >= validation.minLength;
    }
    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({formControls});
  } 

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          placeholder={control.placeholder}
          errorMessage={control.errorMessage}
          shouldValidate={true}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  exchangedValueHandler = (event) => {
    this.setState({
      sample: {...this.state.sample, exchangedValue: event.target.value}
    });
  }

  desiredValueHandler = (event) => {
    this.setState({
      sample: {...this.state.sample, desiredValue: event.target.value}
    });
  }

  sampleDateHandler = (event) => {
    this.setState({
      sample: {...this.state.sample, date: event.target.value}
    });
  }

  writeData = async () => {

    const host = 'api.frankfurter.app';
    await fetch(`https://${host}/${this.state.sample.date}?amount=1&from=${this.state.sample.exchangedValue}&to=${this.state.sample.desiredValue}`)
    .then((response) => response.json())
    .then((response) => {
      flushSync(() => {
        this.setState({sample: {...this.state.sample, course: response.rates[this.state.sample.desiredValue]}});
      })
    })

    await axios.post('https://rateapp-78b2b-default-rtdb.europe-west1.firebasedatabase.app/sample.json', this.state.sample)
    .then((response) => {
      return('');
    })

    await axios('https://rateapp-78b2b-default-rtdb.europe-west1.firebasedatabase.app/sample.json')
    .then((response) => {
      this.setState({sampleList: response.data});
    })
  }

  sampleRemove = async (id) => {
    let sampleList = {...this.state.sampleList};
    delete sampleList[id];
    this.setState({
      sampleList
    })

    await axios.delete(`https://rateapp-78b2b-default-rtdb.europe-west1.firebasedatabase.app/sample/${id}.json`)
  }



  exchangedCurrencyHandler = (event) => {
    this.setState({
      base: event.target.value,
      result: null
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
      })
      .catch((error) => {
        if(error instanceof TypeError) {
          result = this.state.inputValue;
        } else {
          throw error;
        }
      })
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

    axios('https://rateapp-78b2b-default-rtdb.europe-west1.firebasedatabase.app/sample.json')
    .then((response) => {
      this.setState({sampleList: response.data});
    })
      

  }
  
  render() {
    return(
      <RateContext.Provider value ={{ state: this.state, 
                                      inputValueHandler: this.inputValueHandler,
                                      currencyValueHandler: this.currencyValueHandler,
                                      calculatorHandler: this.calculatorHandler,
                                      exchangedCurrencyHandler: this.exchangedCurrencyHandler, 
                                      exchangedValueHandler: this.exchangedValueHandler,
                                      desiredValueHandler: this.desiredValueHandler,
                                      sampleDateHandler: this.sampleDateHandler,
                                      writeData: this.writeData,
                                      sampleRemove: this.sampleRemove,
                                      renderInputs: this.renderInputs,
                                      showModalHandler: this.showModalHandler,
                                      hideModalHandler: this.hideModalHandler,
                                    }}>
        <Dark showModal={this.state.showModal} hideModalHandler={this.hideModalHandler}/>
        <Modal/>
        <Layout/>
      </RateContext.Provider>
    )
  }
}

export default App;