import React from 'react';
import GphApiClient from 'giphy-js-sdk-core';
import Config from '../Config.js';
import { Image, Header } from 'semantic-ui-react';


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
    }
  }
    render() {
      const {phrase, error, isLoaded, Gifs, isWaiting } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (this.state.phrase === undefined) {
        return <div>Waiting for Speech</div>;
      } else if (isWaiting) {
        return <div className='waiting'>Waiting...</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } 
        return (

          <React.Fragment>
            <Header> { phrase }</Header>
            <Image 
            src={Gifs.images.downsized.gif_url} 
            alt={Gifs.title}
            centered
            verticalAlign='middle'
            bordered
            size='large'
            />
          </React.Fragment>
     
        );
      }
    }
  export default GifImages;