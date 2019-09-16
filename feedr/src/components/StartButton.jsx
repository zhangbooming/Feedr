import React, { Component } from 'react';

class StartButton extends Component {

  generateText(){
    if (this.props.firstTime){
      return 'SEE OUR CHOICES'
    }
    return 'RESTART'
  }

  render() {
    return (
      <button className='button1' onClick={this.props.generateCards}>
        {this.generateText()}
      </button>
    );
  }
}

export default StartButton;
