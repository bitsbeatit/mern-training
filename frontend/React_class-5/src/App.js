import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './component/Nav';
import Tweets from './component/Tweets';
import RenderExample from './component/RenderExample';
import ClassClock from './component/ClassClock';
import FunctionClock from './component/FunctionClock';
function App() {
  return (
    <>
      <div className="home">
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        <Nav />
        {/* <Tweets /> */}
      </div>
      <RenderExample></RenderExample>
      <ClassClock />
      <FunctionClock />
    </>
  );
}

export default App;
