import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SimpleLoginForm from './class3';
import SimpleForm from './class3/SimpleForms';
import FetchApiExample from './class4';
import BasicRouting from './class6/basicRoute';
import NestedRouting from './class6/nestedRouting';



import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <NestedRouting />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
