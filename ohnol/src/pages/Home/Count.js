import React, { Component } from "react";
import Clock from "./Clock";

class App extends Component {
  constructor(props) {
    //this.state = { deadline: "December, 24, 2022" };

    /*3초 설정*/
    super(props);
    const now = new Date();
    now.setSeconds(now.getSeconds()+3);
    this.state = { deadline: now };
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