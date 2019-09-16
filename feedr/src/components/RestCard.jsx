import React, { Component } from 'react';
import StartButton from './StartButton';

class RestCard extends Component {

  constructor(props){
    super(props);
    this.state = {
      displayed: true
    }
  }

  changeCardClass(){
    this.setState({
      displayed: false
    })
    {this.props.noThanks()}
  }

  cardClass(){
    if (this.state.displayed){
      return 'restCardContainer'
    }
    return 'restCardDisplayNone'
  }

  render() {
    return (
      <div>
        <div className={this.cardClass()} style={{zIndex:'999'}}>
        <div className="cardImgContainer">
        <img className='cardImg' src={this.props.restImg} alt='swipe-demo' />
        </div>
        <div className='ourChoice'>OUR CHOICE:</div>
          <div className='cardTitle'>{this.props.restName}</div>
          <div className="ourChoice address">{this.props.restAddr}</div>
          <div className='restCardButtonContainer'>
            <button className="containedButton" onClick={()=>this.changeCardClass()} style={{backgroundColor:'rgba(234, 72, 72, .8)'}}>
              <img className='containedButtonImg' src='/img/close.png' />
            </button>
            <button className="containedButton" onClick={this.props.yesPlese} style={{backgroundColor:'rgba(64, 229, 119, .8)'}}>
              <img className='containedButtonImg' src='/img/check.png' />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RestCard;
