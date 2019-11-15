import React, {Component} from 'react';
import "../../Stylesheets/signIn&Up.scss";
import Canvas from "./canvas.jsx";

let canvas_size = {
  w: window.innerWidth,
  h: window.innerHeight
};

const colorArray = ['#2c3e50', '#e74c3c', '#ecf0f1', '#3498db', '#2980b9'];
let maxRadius = 40;
function Circle(x, y, dx, dy, radius, mouse) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.minRadius = radius;
  this.draw = function (context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false, );
    // context.strokeStyle = 'blue';
    // context.stroke();
    context.fillStyle = this.color;
    context.fill();
  };
  this.update = function (context) {
    if (this.x + this.radius > canvas_size.w || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canvas_size.h || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    //interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
      && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
    this.draw(context)
  }
}

function init(innerWidth, innerHeight, mouse) {
  let circleArray = [];
  for (let i = 0; i < 100; i ++) {
    let x = Math.random() * (innerWidth - maxRadius * 2) + maxRadius;
    let y = Math.random() * (innerHeight - maxRadius * 2) + maxRadius;
    let dx = (Math.random() - 0.5) * 4;
    let dy = (Math.random() - 0.5) * 4;
    let radius = Math.random() * 10 + 5;
    circleArray.push(new Circle(x, y, dx, dy, radius, mouse))
  }
  return circleArray
}

class Animation extends Component {
  constructor(props) {
    super(props);
    let mouse = {
      x: undefined,
      y: undefined
    };
    window.addEventListener('mousemove',
      function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
      });
    let circleArray = init(canvas_size.w, canvas_size.h, mouse);
    this.state = { circles: circleArray};
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  updateAnimationState() {
    this.setState({circles: this.state.circles});
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  render() {
    return <Canvas circles={this.state.circles} />;
  }
}

export default Animation;