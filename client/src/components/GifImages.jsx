import React from 'react';
import GphApiClient from 'giphy-js-sdk-core';
import Config from '../Config.js';
import { Image, Header, Grid, Segment, Button } from 'semantic-ui-react';


class GifImages extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isWaiting: true,
        isLoaded: false,
        Gifs: {},
        phrase: '',
        phraseStore: [],
        gifStore: []
      };
    }
    handleStore(prevState) {
      if(prevState.phrase !== this.state.phrase){
        this.state.phraseStore.push(this.state.phrase)
        this.state.gifStore.push(this.state.Gifs.images.downsized.gif_url)
      }
    }
    setGifs(prevState) {
      if(prevState.phrase !== this.state.phrase){
      const gifPhrases = this.state.phraseStore.map((phrase, i) => {
          return {
            text: phrase,
            url: this.state.gifStore[i]
          }
      })
      this.setState({
        gifPhrases
      })
    }
  }
    componentDidUpdate(prevProps, prevState) {
      if(prevProps.phrase !== this.state.phrase) {
        const client = GphApiClient(Config)
      client.translate('gifs', {"s": this.props.phrase})
        .then(res =>  {
            this.setState({
              isLoaded: true,
              isWaiting: false,
              Gifs: res.data,
              phrase: this.props.phrase,
            })
            this.handleStore(prevState)
            this.setGifs(prevState)
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            })
          }
        )
    }
  }
    render() {
      const {phrase, Gifs,error, isLoaded, isWaiting, gifPhrases  } = this.state;
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
          // <Grid.Row columns={4}>
          // {gifPhrases.map((gif, i) => (
          //   <Grid.Column 
          //   key={i}
          //   as={Segment}
          //   computer={4}
          //   compact={true}
          //   size='small'
          //   >
          //   <Header>{ gif.text }</Header>
          //     <Image 
          //     src={gif.url}
          //     alt={gif.text}
          //     centered
          //     verticalAlign='middle'
          //     bordered
          //     size='small'
          //     /> <br></br>
          //     <Button.Group attatched={"bottom"}>
          //         <Button primary compact >update</Button>
          //         <Button secondary compact >delete</Button>
          //     </Button.Group>
          //   </Grid.Column>
          //   ))}
          // </Grid.Row>
          // eslint-disable-next-line
            <Segment compact={true}>
              <Header> { phrase }</Header>
              <Image 
              src={Gifs.images.downsized.gif_url} 
              alt={Gifs.title}
              centered
              verticalAlign='middle'
              bordered
              size='large'
              />
            </Segment>
        );
            
         
          
     

      }
    }
  export default GifImages;