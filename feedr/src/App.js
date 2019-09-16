import React, { Component } from 'react';
import './App.css';
import Headbar from './components/Headbar';
import HomeCard from './components/HomeCard';
import RestCard from './components/RestCard';
import RestProfile from './components/RestProfile';
import Swipeable from 'react-swipeable';
import Loading from './components/Loading';

// import axios from 'axios';
import Draggable from 'react-draggable';
// import YelpApi from 'v3-yelp-api';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      firstTime: true,
      cardsGenerated: false,
      restChosen: false,
      numCards: 0,
      chosenRestIndex: 0,
      locationTest:'Evanston',
      restIDList:[],
      tempList:[],
      imgList:[],
      descList:[],
      addrList:[],
      isClosedList:[],
      phoneList:[],
      priceList:[],
      ratingList:[],
      coordinates_latitude_List:[],
      coordinates_longitude_List:[],
      mapStatus : false,
      loading: false,
      chosenRestImages:[],
      user_location_lat:42.057903,
      user_location_lng:-87.675849
    }
    this.childList = [];
    for (let i=0; i<20; i++){
      this.childList.push(React.createRef());
    }
  }

  sendRequest(){
        this.setState({
          loading: true
        })
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        var url = proxyurl + 'https://api.yelp.com/v3/businesses/search?location=' + this.state.locationTest;
        var bearer_token = "h-92ctgESgaQnU1snhIDjHp997zk4U0YAP13T1fps98DT14y4AlTW3bmUoqf1A1HHPDjH2-snhdttnUUF1gupBtFDDP8CF7KRcYb1s2qzKb5Y32EirPW69uVMwLaW3Yx"
        var bearer = 'Bearer '+ bearer_token;
        var obj = {
          method: 'GET',
          // withCredentials: true,
          // credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Authorization': bearer,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true'
          }
        }

        this.GetRestaurants(url, obj)
      }

  GetRestaurants(url, obj) {
    fetch(url, obj)
      .then(results => {
        return results.json()
      }).then(data => {
        console.log(data.businesses)
        data.businesses.map((restaurant) => {
          this.state.restIDList.push(restaurant.id)
          this.state.tempList.push(restaurant.name)
          this.state.imgList.push(restaurant.image_url)
          this.state.descList.push(restaurant.name)
          this.state.addrList.push(restaurant.location.display_address[0]+ ", "+restaurant.location.display_address[1])
          this.state.isClosedList.push(restaurant.is_closed)
          this.state.phoneList.push(restaurant.phone)
          this.state.priceList.push(restaurant.price)
          this.state.ratingList.push(restaurant.rating)
          this.state.coordinates_latitude_List.push(restaurant.coordinates.latitude)
          this.state.coordinates_longitude_List.push(restaurant.coordinates.longitude)
        })
      });
  }

  GetRestaurantDetails(restID){
    this.setState({
      loading: true
    })
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url = proxyurl + 'https://api.yelp.com/v3/businesses/'+restID;
    var bearer_token = "h-92ctgESgaQnU1snhIDjHp997zk4U0YAP13T1fps98DT14y4AlTW3bmUoqf1A1HHPDjH2-snhdttnUUF1gupBtFDDP8CF7KRcYb1s2qzKb5Y32EirPW69uVMwLaW3Yx"
    var bearer = 'Bearer '+ bearer_token;
    var obj = {
      method: 'GET',
      // withCredentials: true,
      // credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Authorization': bearer,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'
      }
    }

    this.FetchRestaurantDetails(url, obj)
  }

  FetchRestaurantDetails(url, obj) {
    fetch(url, obj)
      .then(results => {
        return results.json()
      }).then(data => {
          this.state.chosenRestImages = data.photos
          console.log("Chosen Image URLs", this.state.chosenRestImages)
      });
  }

  generateCards() {
    console.log('generateCards');
//    this.GetRestaurants(this.url, this.obj);
    this.setState({
      firstTime: false,
      cardsGenerated: true,
      numCards: this.state.tempList.length,
      loading: false
    });
  }

changeMapStatus(){
  console.log("changeMapStatus is executed")
  this.setState({
    showStatus:true
  },function(){
  console.log("mapStatus:::"+this.state.mapStatus)
  })
}

 setLocation(event){
    console.log('setLocation method execute!!');
      this.setState({
        locationTest:event.target.value
      },function(){
        console.log(this.state.locationTest);
       // this.SendRequest();
      })
  }

  setAutocompleteLocation(strLocation){
     console.log('setLocation method execute!!');
       this.setState({
         locationTest:strLocation.formatted_address
       },function(){
         console.log(this.state.locationTest);
        // this.SendRequest();
       })
   }

  noThanks(){
    this.setState({
      numCards: this.state.numCards-1
    })
  }

  closeRestProfile(){
    this.setState({
      restChosen: false
    });
    this.noThanks();
  }

  swiping(e, deltaX, deltaY, absX, absY, velocity) {
    console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
  }

  swipingLeft(e, absX) {
    console.log("You're Swiping to the Left...", e, absX)
  }

  swiped(e, deltaX, deltaY, isFlick, velocity) {
    console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity)
  }

  swipedUp(e, deltaY, isFlick) {
    console.log("You Swiped Up...", e, deltaY, isFlick)
  }

  onSwiped(direction, index) {
    console.log('ryan just swiped ',direction)
    if(direction==='LEFT'){
      this.noThanks();
    }
    if(direction==='RIGHT'){
      // this.GetRestaurantDetails(this.state.restIDList[this.state.chosenRestIndex])

      this.setState({
        restChosen: true,
        chosenRestIndex: index,
        locationTest:''
      });
    }
    this.childList[index].current.changeCardClass();
  }

  renderLoading(){
    if (this.state.loading){
      return <Loading/>
    }
  }

  render() {
    var cardStack = []

    if (this.state.cardsGenerated){
      cardStack = this.state.tempList.map((rest,i)=>{
        return(
          <div>
          <Swipeable
            onSwiping={this.swiping}
            onSwipingLeft={this.swipingLeft}
            onSwiped={this.swiped}
            onSwipedUp={this.swipedUp}
            trackMouse
            preventDefaultTouchmoveEvent
            onSwipedLeft={() => this.onSwiped('LEFT', i)}
            onSwipedRight={() => this.onSwiped('RIGHT', i)} >
              <Draggable>
                <div>
                  <RestCard ref={this.childList[i]} key={i} restName={rest} restDescription={this.state.descList[i]} restImg={this.state.imgList[i]} restAddr = {this.state.addrList[i]} noThanks={()=>this.noThanks()} yesPlese={() => this.onSwiped('RIGHT', i)}/>
                </div>
              </Draggable>
          </Swipeable>
          </div>
          )
      })
    }


    if (this.state.numCards === 0){
      cardStack = [];
    }

    var c = this.state.chosenRestIndex
    console.log("state before render", this.state.chosenRestImages)

    return (
      <div className="full-container">
      <div className="fakeCardBack"></div>

        <div className="back-circle"></div>
        <HomeCard firstTime={this.state.firstTime} sendRequest={this.sendRequest.bind(this)}  setLocation={this.setLocation.bind(this)} generateCards={this.generateCards.bind(this)} setAutocompleteLocation={this.setAutocompleteLocation.bind(this)} />
        {cardStack}
        <RestProfile displayed = {this.state.restChosen}
          restName = {this.state.tempList[c]}
          restDescription = {this.state.descList[c]}
          restImg = {this.state.imgList[c]}
          restAddr = {this.state.addrList[c]}
          restIsClosed = {this.state.isClosedList[c]}
          restPhone = {this.state.phoneList[c]}
          restPrice = {this.state.priceList[c]}
          restRating = {this.state.ratingList[c]}
          restLat={this.state.coordinates_latitude_List[c]}
          restLng={this.state.coordinates_longitude_List[c]}
          userLat={this.state.user_location_lat}
          userLng={this.state.user_location_lng}
          changeMapStatus={this.changeMapStatus.bind(this)}
          closeRestProfile = {()=>this.closeRestProfile()} />
        {this.renderLoading()}
      </div>
    );
  }
}

export default App;

class SwipeComponent extends React.Component {

  swiping(e, deltaX, deltaY, absX, absY, velocity) {
    console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
  }

  swipingLeft(e, absX) {
    console.log("You're Swiping to the Left...", e, absX)
  }

  swiped(e, deltaX, deltaY, isFlick, velocity) {
    console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity)
  }

  swipedUp(e, deltaY, isFlick) {
    console.log("You Swiped Up...", e, deltaY, isFlick)
  }



  render() {
    return (
      <Swipeable
        onSwiping={this.swiping}
        onSwipingLeft={this.swipingLeft}
        onSwiped={this.swiped}
        onSwipedUp={this.swipedUp} >
          You can swipe here!
      </Swipeable>
    )
  }
}
