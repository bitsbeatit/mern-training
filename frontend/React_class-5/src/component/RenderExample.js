import React, { Component } from 'react';

class RenderExapmle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'Loading...',
      count: 1,
    };
  }

  getData() {
    setTimeout(() => {
      console.log('Our data is fetched');
      this.setState({
        data: 'Data is fetched',
      });
    }, 1000);
  }

  increaseCounter() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <>
        <div>{this.state.data}</div>
        <button onClick={() => this.increaseCounter()}>Click me</button>
        <span>{this.state.count}</span>
      </>
    );
  }
}

export default RenderExapmle;
