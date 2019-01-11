import React, { Component } from 'react'
import './styles/App.css'

const links = {
  small: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
  large: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
}

class App extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      users: [],
      selectedUser: {},
      loading: false,
      link: 'small'
    }
  }

  componentDidMount() {
    this.getData()
  }
  
  getData = () => {
    this.setState({
      loading: true,
      users: [],
      selectedUser: {}
    }, () => {
      fetch(links[this.state.link])
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
    }, () => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      })
    })
  }
  
  renderRow = (item) => {
    const { id, firstName, lastName, email, phone } = item

    return (
      <tr 
        key={item.id + item.firstName + item.lastName} 
        onClick={() => this.selectUser(item)}
        className={ (item.id === this.state.selectedUser.id && item.firstName === this.state.selectedUser.firstName) ? 'selected' : '' }
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

  chooseSmall = () => {
    this.setState ({
      link: 'small'
    }, () => 
      this.getData()
    )
  }

  chooseLarge = () => {
    this.setState ({
      link: 'large'
    }, () => 
      this.getData()
    )
  }

  render() {
    const rows = this.state.users.map(this.renderRow)

    return (
      <div>

        <p>Выберете набор данных:</p>
        
        <input 
          type="radio" 
          name="dataVolume" 
          id="smallData" 
          onChange={this.chooseSmall} 
          checked={this.state.link === 'small'} 
          disabled={this.state.loading} 
        />
        <label htmlFor="smallData"> Маленький </label>
        <input 
          type="radio" 
          name="dataVolume" 
          id="largeData" 
          onChange={this.chooseLarge} 
          checked={this.state.link === 'large'} 
          disabled={this.state.loading} 
        />
        <label htmlFor="largeData"> Большой </label> 
      

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
