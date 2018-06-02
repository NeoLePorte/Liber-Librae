import React from 'react';
import GphApiClient from 'giphy-js-sdk-core';
import Config from '../Config.js';
import { Card, Icon, Image } from 'semantic-ui-react';


class GifImages extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isWaiting: true,
        isLoaded: false,
        Gifs: {},
        phrase: ''
      };
    }
    componentDidUpdate(prevProps) {
      if(prevProps.phrase !== this.state.phrase) {
        const client = GphApiClient(Config)
      client.translate('gifs', {"s": this.props.phrase})
        .then(res =>  {
            this.setState({
              isLoaded: true,
              isWaiting: false,
              Gifs: res.data,
              phrase: this.props.phrase
            })
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
        console.log(this.state.phrase)
    }
  }
    render() {
      const {phrase, error, isLoaded, Gifs, isWaiting } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (this.state.phrase === undefined) {
        return <div>Press Start</div>;
      } else if (isWaiting) {
        return <div className='waiting'>Waiting...</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } 
        return (

          <Card>
          <Image src={Gifs.images.downsized.gif_url} alt={Gifs.title} />
          <Card.Content>
            <Card.Header>
              Speak in Gifs!
            </Card.Header>
            <Card.Meta>
              <span className='date'>
                Joined in 2015
              </span>
            </Card.Meta>
            <Card.Description>
              { phrase }
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              22 Friends
            </a>
          </Card.Content>
        </Card>
        );
      }
    }
  export default GifImages;