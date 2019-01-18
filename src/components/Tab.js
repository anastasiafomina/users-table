import React, { Component } from 'react'

const arrow = require('../assets/down-arrow.png')

export default class Tab extends Component {
  render() {
    const { tab, sortedBy, sortDirection } = this.props

    return (
      <th onClick={this.sort}>
        {tab}
        <img   
          src={arrow}
          alt="arrow"
          className={`arrowDown${sortedBy === tab && sortDirection === 'down' ? ' active' : ''}`}
        />
        <img 
          src={arrow}
          alt="arrow"
          className={`arrowUp${sortedBy === tab && sortDirection === 'up' ? ' active' : ''}`}
        />
      </th>
    )
  }

  sort = () => {
    this.props.sortByField(this.props.tab)
  }
}
