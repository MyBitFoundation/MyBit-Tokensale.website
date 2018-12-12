import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { Button } from 'antd';
import stylesheet from './countdown.scss'
import { countdownInfo } from '../constants'
import { InputForm } from '../inputForm/input-form';

const tokensalePhaseStartDate = countdownInfo.finalDate;//month starts with 0
const millisecondsInOneDay = 86400000;
const millisecondsInOneHour = 1000 * 60 * 60;
const millisecondsInOneMinute = 1000 * 60;
const millisecondsInOneSeconds = 1000;

class Timer extends Component {
  constructor(){
    super();

    this.state = { currentCountdown: this.getCountdown() }
    this.intervalId = null;

  }

  getCountdown = () => {
    var today = new Date();
    var difference = tokensalePhaseStartDate.getTime() - today.getTime();

    if(difference < 0){
      clearInterval(this.intervalId);
      return;
    }

    var daysUntil = Math.floor(difference / millisecondsInOneDay);

    var hourMilliseconds = difference - (daysUntil * millisecondsInOneDay);
    var hours = Math.floor(hourMilliseconds / millisecondsInOneHour);

    var minutesMilliseconds = difference - (daysUntil * millisecondsInOneDay) - (hours *  millisecondsInOneHour);
    var minutes = Math.floor(minutesMilliseconds / millisecondsInOneMinute);

    var secondsMillisecons = difference - (daysUntil * millisecondsInOneDay) - (hours * millisecondsInOneHour) - (minutes * millisecondsInOneMinute);
    var seconds = Math.floor(secondsMillisecons / millisecondsInOneSeconds);

    return {days: daysUntil, hours: hours, minutes: minutes, seconds: seconds};
  }

  startCountdown = () => {
    this.setState({currentCountdown: this.getCountdown() });
    this.intervalId = setInterval(() =>{
      this.setState({currentCountdown: this.getCountdown() });
    }, 1000);
  }

  componentDidMount = () => {
    this.startCountdown();
  }

  componentWillUnmount = () =>{
    clearInterval(this.intervalId);
  }

  render(){
    const { day, hour, minut, second } = countdownInfo.parts;
    const { days, hours, minutes, seconds } = this.state.currentCountdown;

    return (
      <div className={
          classNames({
            'Timer': true
          })
      }>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className={
              classNames({
                'Timer__time-unit': true
              })
            }>
            <div className={
                  classNames({
                    'Timer__header': true
                  })
                }>{day}</div>
            <div className={
                  classNames({
                    'Timer__value': true
                  })
                }>{days}</div>
        </div>
        <div className={
              classNames({
                'Timer__time-unit': true
              })
            }>
            <div className={
                  classNames({
                    'Timer__header': true
                  })
                }>{ hour }</div>
            <div className={
                  classNames({
                    'Timer__value': true
                  })
                }>{ hours }</div>
        </div>
        <div className={
              classNames({
                'Timer__time-unit': true
              })
            }>
            <div className={
                  classNames({
                    'Timer__header': true
                  })
                }>{ minut }</div>
            <div className={
                  classNames({
                    'Timer__value': true
                  })
                }>{ minutes }</div>
        </div>
        <div className={
              classNames({
                'Timer__time-unit': true
              })
            }>
            <div className={
                  classNames({
                    'Timer__header': true
                  })
                }>{ second }</div>
            <div className={
                  classNames({
                    'Timer__value': true
                  })
                }>{ seconds }</div>
        </div>
      </div>
    )
 }
}

const Countdown = ({ renderTokenSaleDetails }) => {
    const formButtonTitle = "Sign Up";
    return(
      <Fragment>
        <div className={
              classNames({
                'Countdown': true
              })
            }>
          <div className={
              classNames({
                'Banner__title': true
              })
            }>{countdownInfo.title}</div>
            <Timer
              renderTokenSaleDetails={renderTokenSaleDetails}
            />
            <div className="Countdown__contribute">
              <span className="Countdown__pre-contributions-txt">Pre contributions now open</span>
              <a href="/dashboard">
               <Button
                  type="primary"
                  className="Countdown__btn"
                >
                  Contribute
                </Button>
              </a>
            </div>
        </div>
      </Fragment>
    )
}

export default Countdown;
