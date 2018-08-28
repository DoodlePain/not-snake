import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Circle } from 'react-konva';
import keydown from 'react-keydown';
class App extends Component {
  constructor(props){
    super()
    this.state = {
      Xhead: 500,
      Yhead: 500,
      currentCount:100,
      direction:true
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({Xhead: this.state.Xhead-10})
    }, 500);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  shouldComponentUpdate(nextProps,nextState){
    
    if(this.state.Xhead !== nextState.Xhead) {return true}
    else if(this.state.Yhead !== nextState.Yhead) {return true}
    else if(this.state.direction === nextState.direction) {return false}
    return false
  }

    timer = () => {
      // if(this.state.direction==='up'){
      //   this.setState({ 
      //      Yhead:this.state.Yhead-10
      //   });
      // } else if (this.state.direction==='left') {
      //   this.setState({ 
      //       Xhead:this.state.Xhead-10
      //   });
      // } else if (this.state.direction==='down') {
      //   this.setState({ 
      //       Yhead:this.state.Yhead+10
      //   });
      // } else if (this.state.direction==='right') {
      //   this.setState({ 
      //       Xhead:this.state.Xhead+10
      //   });
      // }
    }
    componentWillReceiveProps( { keydown } ) {
      if ( keydown.event ) {
        // inspect the keydown event and decide what to do
        console.log( keydown.event.which );
      }
    }
  render() {
    // document.addEventListener('keypress', (e) => { 
    //     var key = e.which || e.keyCode;      
    //     if(key === 119 || key === 87){
    //       this.setState({
    //           direction:'up'
    //         })}
    //     if(key === 97 || key === 65){
    //       this.setState({  
    //         direction:'left'
    //       })
    //     }
    //     if(key === 115 || key === 83){
    //       this.setState({  
    //         direction:'down'
    //       })
    //     }
    //     if(key === 100 || key === 68){
    //       this.setState({  
    //         direction:'right'
    //       })
    //     }
    // })
 

    
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Some text on canvas" fontSize={15} />
          <Rect
            x={this.state.Xhead}
            y={this.state.Yhead}
            width={15}
            height={15}
            fill="black"
          />

          <Circle x={200} y={100} radius={7.5} fill="red" />
        </Layer>
      </Stage>
    );
  }
}

export default App;