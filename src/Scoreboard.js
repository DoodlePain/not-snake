import React, { Component } from 'react'
import firebase from 'firebase';
import './Scoreboard.css'
import DBConf from './DBConf'

export default class Scoreboard extends Component {
    state = {
        score:{}
    }
    componentWillMount () {
        firebase.initializeApp(DBConf);
        var query = firebase.database().ref('scoreboard').orderByChild("score");
        query.once('value', snapshot=>{
            if (snapshot ){
                this.setState({score:snapshot.val()})
            }
            else {
                console.log("Snapshot error");
            }
        });
    }

    shouldComponentUpdate(nextProps,nextState){
        if(this.state.score !== nextState.score){return true}
        return false
    }

    render() {
        var score = this.state.score
        var scoreboard = []
        var scoreboardJSX = []
        if(this.state.score !== {}){
            score = this.state.score
            Object.keys(score).map(function(objectKey, index) {
                scoreboard = [...scoreboard, {username:objectKey,score:score[objectKey].score}]
                scoreboard = scoreboard.sort(function (a, b) {
                    return a.score - b.score;
                  }).reverse()
            });
            scoreboard = scoreboard.slice(0, 10)
            scoreboard.forEach((element,index) => {
                scoreboardJSX = [...scoreboardJSX,(<h1 className="Score" key={index}>{element.username} - {element.score}</h1>)]
            });
        }
        return (
        <div>
            <div className="Title-scoreboard">
                Scoreboard
            </div>
            {scoreboardJSX}
        </div>
        )
  }
}
