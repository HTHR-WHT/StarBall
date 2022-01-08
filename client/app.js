import React from "react";
import ReactDOM from "react-dom";
import Sketch from "react-p5";
//
let ball;
let face;
let bg;
let clouds;
let SCENE_W = 2000;
let SCENE_H = 10000;

class App extends React.Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div>
        <h1>STARBALL</h1>
        {/* <Sketch setup={this.setup} draw={this.draw} /> */}
      </div>
    );
  }
}

/*
export default class App extends Component {
  x = 50
  y = 50

  setup = (p5, parent) => {
    p5.createCanvas(500, 500).parent(parent)
  }
  draw = p5 => {
    p5.background(0)
    p5.ellipse(this.x, this.y, 70, 70)
    this.x++
  }

  render() {
    return <Sketch setup={this.setup} draw={this.draw} />
  }
}
*/

ReactDOM.render(<App />, document.getElementById("app"));
