import React from 'react';
import keydown from 'react-keydown';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import Score from './Score'
import ModalComponent from './Modal'
import firebase from 'firebase';
import DBConf from './DBConf'
import './App.css'

@keydown
class App2 extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      Xhead: 500,
      Yhead: 500,
      Xpoint: 207.5,
      Ypoint: 207.5,
      currentCount:100,
      direction:null,
      points:0,
      history:[],
      blocks:[],
      visible: false,
      confirmLoading: false,
      ModalText: 'Content of the modal',
      username:''
    }
  }

  componentDidMount = () => {
    this.interval = setInterval(()=>{
      if(this.state.direction)this.timer();
      this.checkPos();
    },100)
  }

  componentWillReceiveProps( nextProps ) {
    const { keydown: { event } } = nextProps;
    if ( event ) {
      this.setState( { key: event.which } );
      let key = event.which
      if((key === 119 || key === 87) && this.state.direction !== 'down'){
        this.setState({
            direction:'up'
        })
      }
      if((key === 97 || key === 65) && this.state.direction !== 'right'){
        this.setState({  
          direction:'left'
        })
      }
      if((key === 115 || key === 83) && this.state.direction !== 'up'){
        this.setState({  
          direction:'down'
        })
      }
      if((key === 100 || key === 68) && this.state.direction !== 'left'){
        this.setState({  
          direction:'right'
        })
      }
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timer = () => {
    if(this.state.direction==='up'){
      this.setState({ 
        Yhead:this.state.Yhead-20
      });
    } else if (this.state.direction==='left') {
      this.setState({ 
        Xhead:this.state.Xhead-20
      });
    } else if (this.state.direction==='down') {
      this.setState({ 
        Yhead:this.state.Yhead+20
      });
    } else if (this.state.direction==='right') {
      this.setState({ 
        Xhead:this.state.Xhead+20
      });
    }
  }

  generateRandom() {
    const x = (( Math.floor(Math.random() * 40) + 1  )*20)+7.5;
    const y = (( Math.floor(Math.random() * 25) + 1  )*20)+7.5;
    const history = [...this.state.history];
    history.forEach(element => {
      if(element.Xpoint === x && element.Ypoint === y) {return this.generateRandom()}
    });
    return {x:x,y:y}
  }

  checkPos = () => {
    if(this.state.Xhead === (this.state.Xpoint-7.5) && this.state.Yhead === (this.state.Ypoint-7.5)){
      const newPos = this.generateRandom()
      const XPoint = this.state.Xhead
      const YPoint = this.state.Yhead
      const Direction = this.state.direction
      this.setState({
        Xpoint:newPos.x,
        Ypoint:newPos.y,
        points: this.state.points+1,
        history:[...this.state.history,{Xpoint:XPoint,Ypoint:YPoint,direction:Direction}],
        blocks:[...this.state.blocks, <Rect key={this.state.points+1} x={this.state.Xhead} y={this.state.Yhead} width={15} height={15} fill="black" />]
      })
      console.log("Catch");
    }else {
      const XPoint = this.state.Xhead
      const YPoint = this.state.Yhead
      const history = this.state.history
      history.forEach(element => {
        if(element.Xpoint === XPoint && element.Ypoint === YPoint){
          clearInterval(this.interval);
          console.log("Lose");
          this.showModal()
        }
      });
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }    

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    firebase.initializeApp(DBConf);
    var db = firebase.database().ref('scoreboard/'+this.state.username)
    console.log(db);
    db.set({
        score:this.state.points
    }) 
    setTimeout(() => {
      console.log('Closing');
      
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  changeUsername = (username) => {
    this.setState({
      username: username
    })
  }

  render() {
    return (
      <div className="App App-title">
        <ModalComponent 
          visible={this.state.visible} 
          confirmLoading={this.state.confirmLoading} 
          ModalText={this.state.ModalText} 
          handleCancel={this.handleCancel} 
          handleOk={this.handleOk}
          changeUsername={this.changeUsername}
          />
        <Score score={this.state.points}/>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {this.state.blocks}
            <Rect
              x={this.state.Xhead}
              y={this.state.Yhead}
              width={15}
              height={15}
              fill="black"
            />
            <Circle x={this.state.Xpoint} y={this.state.Ypoint} radius={5} fill="red" />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default App2;