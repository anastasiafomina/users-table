import React, { Component } from 'react'
import './styles/App.css'


class App extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.getData()
  }
  
  getData = () => {
    fetch('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
    .then((result) => {
      return result.json()
    })
    .then((data) => {
      this.setState({
        users: data
      })
    })
  }
  
 renderRow = (item) => {
  const { id, firstName, lastName, email, phone } = item

  return (
    <tr>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{phone}</td>
    </tr>
   )
 }

  render() {
    const rows = this.state.users.map(this.renderRow)

    return (
      <div>
       <table>
        <tbody>
          <tr>
            <th>id</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>email</th>
            <th>phone</th>
          </tr>
          {rows}
        </tbody>
       </table>
      </div>
    )
  }
}

export default App;
