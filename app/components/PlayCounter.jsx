import React from 'react';
import { arc } from 'd3';

import styles from './PlayerCounter.scss';

export default class PlayCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopped: true,
    };
    
    this.handleClick = this.handleClick.bind(this);
    this.tick = this.tick.bind(this);
  }
  
  componentDidMount() {
    this.setState({
      duration: this.props.duration
    });
  }
  
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  
  handleClick() {
    const { stopped } = this.state;
    if (stopped) {
      this.intervalId = setInterval(this.tick, 1000);
    } else {
      clearInterval(this.intervalId);
    }
    this.setState({ stopped: !this.state.stopped });
  }

  tick() {
    this.setState({duration: this.state.duration - 1 });
    if (this.state.duration <= 0) {
      clearInterval(this.intervalId);
      this.setState({
        stopped: true,
        duration: this.props.duration
      });
    }
  }
  
  getPlayIcon(height, width) {
    return (<div className={styles.icon}>
      <g>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 512 512">
          <path d="M96 64l320 192-320 192z"></path>
        </svg>
      </g>
    </div>);
  }
  
  getDuration() {
    const { duration } = this.state;
    const { height } = this.props;
    
    return (<div style={{fontSize: "20px"}}>
      {duration}
    </div>);
  }
  
  render() {
    const { duration, stopped } = this.state;
    const { height, width } = this.props;
    
    const arcGenerator = arc()
      .innerRadius(width/2 - 2)
      .outerRadius(width/2)
      .startAngle(0);
    
    return (
      <div className={styles.container} style={{ height, width }}>
        <div className={styles.progressBar}>
          <svg width={width} height={height}>
            <g transform={`translate(${width/2},${height/2}) scale(-1, 1)`}>
              <path
                d={arcGenerator({endAngle: 2*Math.PI*(duration/this.props.duration || 0)})}
                fill="orange">
              </path>
            </g>
          </svg>
        </div>
        <div className={styles.button} onClick={this.handleClick}>
          {stopped ? this.getPlayIcon(height*0.6, width) : this.getDuration()}
        </div>
      </div>
    );
  }
}

PlayCounter.defaultProps = {
  height: 46,
  width: 46,
};
