import React, { Component } from 'react'
import './Scoreboard.css'

export default class Score extends Component {
  render() {
    return (
      <div className="Score">
        <h2>Points : {this.props.score}</h2>
      </div>
    )
  }
}
