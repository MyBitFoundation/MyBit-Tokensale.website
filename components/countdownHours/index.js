import React from 'react';

class CountdownHours extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      secondsToGo: this.props.time,
    };
  }

  componentDidMount(){
    this.updateCountdownInterval = setInterval(() => this.setState((prevState) => {
      return {
        secondsToGo: prevState.secondsToGo - 1,
      }
    }), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.updateCountdownInterval);
  }

  render(){
    let { secondsToGo } = this.state;
    let hours = Math.floor(secondsToGo / 3600);
    hours = hours < 10 ? '0' + hours : hours;
    secondsToGo = secondsToGo % 3600;
    let minutes = Math.floor(secondsToGo / 60);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let seconds = secondsToGo % 60
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return(
      <span>{`00:${hours}:${minutes}:${seconds}`}</span>
    )
  }
}

export default CountdownHours;
