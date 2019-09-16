//npm install --save react-google-maps

import React from 'react';
import ReactDOM from 'react-dom';
const { compose, withProps, lifecycle } = require("recompose");
const {withScriptjs,withGoogleMap,GoogleMap,DirectionsRenderer,} = require("react-google-maps");

class GoogleMap1 extends React.Component{

    render(){

        const MapWithADirectionsRenderer = compose(
            withProps({
              googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBc3bsKQXVsZ-P-MRqPQyIiW1xwi_HEGZw&v=3.exp&libraries=geometry,drawing,places",
              loadingElement: <div style={{ height: `100%` }} />,
              containerElement: <div style={{ height: `600px` }} />,
              mapElement: <div style={{ height: `100%` }} />,
            }),
            withScriptjs,
            withGoogleMap,
            lifecycle({
              componentDidMount() {                
                const DirectionsService = new window.google.maps.DirectionsService();    
                const userLat=this.props.userLat
                const userLng=this.props.userLng
                const restLat = this.props.restLat
                const restLng = this.props.restLng
                console.log(userLat+"sssss")
                console.log(userLng+"sssss")
                console.log(restLat+"sssss")
                console.log(restLng+"sssss")

                const a = this.props.lat
                DirectionsService.route({
                //   origin: new window.google.maps.LatLng(42.057903, -87.675849),
                //   destination: new window.google.maps.LatLng(42.0445084, -87.6846137),
                origin: new window.google.maps.LatLng(userLat,userLng),
                destination: new window.google.maps.LatLng(restLat, restLng),
                  travelMode: window.google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                  if (status === window.google.maps.DirectionsStatus.OK) {
                    this.setState({
                      directions: result,
                      haha:this.props.haha
                    });
                  } else {
                    console.error(`error fetching directions ${result}`);
                  }
                });
              }
            })
          )(props =>
              <div>
            <GoogleMap
              defaultZoom={7}
              defaultCenter={new window.google.maps.LatLng(41.8507300, -87.6512600)}
            >
              {props.directions && <DirectionsRenderer directions={props.directions} />}
            </GoogleMap>
            </div>
          );
          return(
            <div>
                <button onClick={this.props.mapClose}>close Map</button>
            <MapWithADirectionsRenderer restLat={this.props.restLat} restLng={this.props.restLng} userLat={this.props.userLat} userLng={this.props.userLng}></MapWithADirectionsRenderer>
            </div>
      )
    }
   
}

export default GoogleMap1;





