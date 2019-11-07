import React, {Component} from 'react';
import "../../Stylesheets/signIn&Up.scss";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    const { circles } = this.props;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    for (let i=0; i < circles.length; i++){
      circles[i].update(ctx);
    }
    ctx.restore();
  }
  render() {
    return (<canvas
      id = "canvasConfig"
      ref={this.canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />);
  }
}

export default Canvas;