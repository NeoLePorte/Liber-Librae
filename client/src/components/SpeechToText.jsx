import React, { Component } from 'react';
import GifImages from './GifImages'
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';
import { Transition, Button, Segment, Grid } from 'semantic-ui-react'



class SpeechToText extends Component {
  constructor() {
    super()
    this.state = {}
    this.onListenClick = this.onListenClick.bind(this)
    this.SimpleAction = this.SimpleAction.bind(this)
  }

  SimpleAction = (event) => {
    this.props.SimpleAction();
   }
  onListenClick() {
    fetch('http://localhost:3001/api/speech-to-text/token')
      .then(function(response) {
          return response.text();
      }).then((token) => {
        var stream = recognizeMic({
            token: token,
            objectMode: true, // send objects instead of text
            extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
            format: false // optional - performs basic formatting on the results such as capitals an periods
        });
        stream.on('data', (data) => {
          this.setState({
            text: data.alternatives[0].transcript
          })
        });
        stream.on('error', function(err) {
            console.log(err);
        });
        document.querySelector('#stop').onclick = stream.stop.bind(stream);
      }).catch(function(error) {
          console.log(error);
      });
  }
  render() {
    return (
      <React.Fragment>
        <Segment
        textAlign='center'
        vertical
        >
        <Button 
        style={{background: 'orangered', marginBottom: '2em'}} 
        primary 
        onClick={this.SimpleAction}>Press to Start
        </Button>
        
        <Transition.Group
          as={Grid}
          duration={400}
          divided
          size='small'
          animation='fade'
          textAlign='center'
          >
            <GifImages phrase={this.state.text} />
        </Transition.Group>
        </Segment>
      </React.Fragment>
    );
  }
}

export default SpeechToText;