import React, { Component } from 'react'

export default class Score extends Component {
  render() {
    return (
      <div>
        <h2>Points : {this.props.score}</h2>
      </div>
    )
  }
}
