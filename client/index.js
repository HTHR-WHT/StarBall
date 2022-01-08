import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return <h3>howdy partner!</h3>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
