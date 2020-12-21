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
      <RenderExample></RenderExample>
      <ClassClock />
      <FunctionClock />
    </>
  );
}

export default App;
