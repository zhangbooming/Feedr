import React, { Component } from 'react';
import GoogleMap1 from './GoogleMap';

class RestProfile extends Component {

  constructor(props){
    super(props);
    this.state = {
      displayed: false,
      mapShowStatus : false
    }

  }

  changeCardClass(){
    this.setState({
      displayed: false
    })
     {this.props.closeRestProfile()}
  }

  mapShow(){
    this.setState({
      mapShowStatus : true
    },function(){
      console.log(this.state.mapShowStatus)
    })
  }

  mapClose(){
    this.setState({
      mapShowStatus : false
    },function(){
      console.log(this.state.mapShowStatus)
    })
  }

  cardClass(){
    if (this.props.displayed){
      return 'restProfileContainer'
    }
    return 'restProfileDisplayNone'
  }

  isClosed(){
  	if (this.props.restIsClosed){
  		return "Closed"
  	}
  	else{
  		return "Open"
  	}
  }

  getPhoneNumber(){
    return "tel:"+this.props.restPhone
  }

  render() {

    var mapText = String(this.props.restAddr)
    var mapWithSpaces = mapText.replace(/ /g, "+");
    var mapURL = 'https://www.google.com/maps/place/' + mapWithSpaces

    if(this.state.mapShowStatus === false){
      console.log(this.state.mapShowStatus)

    return (
      <div className="rest-profile-container">
        <div className={this.cardClass()} style={{zIndex:'999'}}>
        <div className='yourChoice'>YOUR CHOICE:</div>
        <div className='profcardTitle'>{this.props.restName}</div>
        <div className="restcardImgContainer">
          <img className='restcardImg' src={this.props.restImg} alt='swipe-demo' />
          </div>
          <table className="restInfoTable">
          <tbody>
          <tr>
          <td className="restInfoTableHeader">Location</td>
          <td> {this.props.restAddr} </td>
          </tr>
          <tr>
          <td className="restInfoTableHeader">Price </td>
          <td> {this.props.restPrice} </td>
          </tr>
          <tr>
          <td className="restInfoTableHeader">Rating</td>
          <td>{this.props.restRating} / 5 stars</td>
          </tr>
          </tbody>
          </table>
          <div className='buttonContainer'>
            <button className="containedButton" onClick={()=>this.changeCardClass()} style={{backgroundColor:'rgba(234, 72, 72, .8)'}}>
              <img className='containedButtonImg' src='/img/back.png' />
            </button>
            <a href={mapURL} target='_blank'><button className='containedButton' style={{backgroundColor:'rgba(66, 134, 244, .8)'}}>
              <img className='containedButtonImg' src='/img/directions.png' />
            </button></a>
          <a href={this.getPhoneNumber()}><button className="containedButton" style={{backgroundColor:'rgba(64, 229, 119, .8)'}}>
              <img className='containedButtonImg' src='/img/phone.png' />
            </button></a>
          </div>
        </div>
      </div>
    );
    }

    return(
      <div>
      <GoogleMap1 mapClose={this.mapClose.bind(this)} userLat={this.props.userLat} userLng={this.props.userLng} restLat={this.props.restLat} restLng={this.props.restLng}></GoogleMap1>
      </div>
    )

  }
}

export default RestProfile;
