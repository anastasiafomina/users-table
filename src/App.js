import React, { Component } from 'react'
import './styles/App.css'


class App extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      users: [],
      selectedUser: {},
      loading: false
    }
  }

  componentDidMount() {
    this.getData()
  }
  
  getData = () => {
    this.setState({
      loading: true
    }, () => {
      fetch('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
      .then((result) => {
        return result.json()
      })
      .then((data) => {
        this.setState({
          loading: false,
          users: data
        })
      })
    })
  }

  selectUser = (item) => {
    this.setState({ 
      selectedUser: item
    })
  }
  
  renderRow = (item) => {
    const { id, firstName, lastName, email, phone } = item

    return (
      <tr 
        key={item.id + item.firstName + item.lastName} 
        onClick={() => this.selectUser(item)}
      >
        <td>{id}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{phone}</td>
      </tr>
    )
  }

  renderSelected = () => {
    const { selectedUser } = this.state

    if (!selectedUser.id) {
      return null
    }

    return (
      <div>
        <p>Выбран пользователь 
          <b> {selectedUser.firstName + ', ' + selectedUser.lastName} 
          </b>
          <br/>Описание:
          <br/>{selectedUser.description}
          <br/>Адрес проживания: <b> {selectedUser.address.streetAddress}</b>
          <br/>Город: <b>{selectedUser.address.city}</b>
          <br/>Провинция/штат: <b>{selectedUser.address.state}</b>
          <br/>Индекс: <b>{selectedUser.address.zip}</b>
        </p>
      </div>
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
        {this.state.loading && <p>Loading...</p>}
      {this.renderSelected()}
      </div>
    )
  }
}

export default App;
