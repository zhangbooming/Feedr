import React, { Component } from 'react';
//import StartButton from './StartButton';
import RestCard from './RestCard';
import Autocomplete from 'react-google-autocomplete';

class HomeCard extends Component {

  constructor(props){
    super(props);
    console.log(this.props.firstTime);
    this.clickFunc = this.clickFunc.bind(this);

  }

  generateText(){
    if (this.props.firstTime){
      return 'SEE OUR CHOICES'
    }
    return 'RESTART'
  }

  generateTitleText(){
    if (this.props.firstTime){
      return 'feedr.'
    }
    return 'Uh oh...'
  }

  generateSubtitleText(){
    if (this.props.firstTime){
      return <div dangerouslySetInnerHTML={{__html:"find food fast.<br/><br/>"}}></div>
    }
    return 'Looks like you\'re all out of restaurants! Click below to start over.'
  }

  clickFunc() {
    this.props.sendRequest()
    setTimeout(() => {
      this.props.generateCards()
    }, 4000);  }

  render() {
      return (
        <div className='cardContainer'>
          <div className='cardTitle homecardTitle'>{this.generateTitleText()}</div>
          <img style={{width: '40%'}} src='img/feedr.png' />
          <div className='cardSubtitle homeCardSubtitle'>{this.generateSubtitleText()}</div>


          {this.props.firstTime === true ? <div>
          <Autocomplete className="location" onChange={this.props.setLocation} style={{width: '90%'}} onPlaceSelected={this.props.setAutocompleteLocation} componentRestrictions={{country: "us"}}/>
          </div> :null}


          <button className='button2' onClick={this.clickFunc}>{this.generateText()}</button>
        </div>
        )
  }
}

export default HomeCard;
