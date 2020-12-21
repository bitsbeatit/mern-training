import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Demo1 from './DemoFunctional';
import Demo2 from './DemoClass';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';

//STORE -> Globalized state

//Action increment
const increment = () => {
  return {
    type: 'INCREMENT',
  };
};

const decrement = () => {
  return {
    type: 'DECREMENT',
  };
};

//Reducer
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
  }
};

//Display in in console
let store = createStore(counter);
store.subscribe(() => console.log(store.getState()));

//dispatch
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());

ReactDOM.render(
  <React.StrictMode>
    <h1>Hello Nepal Army</h1>
    {/* <App /> */}
    {/* <Demo1 name={'test'} show={true} />
    <Demo1 name={'test2'} />
    <Demo2 /> */}
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
