import React, { Component } from "react";
import Clock from "./Clock";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { deadline: "December, 25, 2022" };
  }
  render() {
    return (
      <div className="App">
        <Clock deadline={this.state.deadline} />
      </div>
    );
  }
}
export default App;