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
      link: 'small',
      error: '',
      sortedBy: '',
      sortDirection: ''
    }
  }

  componentDidMount() {
    this.getData()
  }
  
  getData = () => {
    this.setState({
      loading: true,
      users: [],
      selectedUser: {},
      error: '',
      sortedBy: '',
      sortDirection: ''
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
      .catch((e) =>{
        this.setState({
          error: e.message,
          loading: false
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

  sortByField = (field) => {
    const direction = this.getSortDirection(field) === 'up' ? 1 : -1

    this.setState({
      users: [...this.state.users].sort((a, b) => {
        if (a[field] === b[field]) { return 0 }
        return a[field] > b[field] ? direction : direction * -1
      }),
      sortedBy: field,
      sortDirection: this.getSortDirection(field)
    })
  }

  getSortDirection = (field) => {
    if (this.state.sortedBy !== field) { 
      return 'up' 
    }
    return this.state.sortDirection === 'up' ? 'down' : 'up'
  }

  renderTab = (tab) => {
    return (
      <th onClick={() => this.sortByField(tab)}>
        {tab}
        <img   
          src={require('./assets/down-arrow.png')}
          alt="arrow"
          className={`arrowDown${this.state.sortedBy === tab && this.state.sortDirection === 'down' ? ' active' : ''}`}
        />
        <img 
          src={require('./assets/down-arrow.png')}
          alt="arrow"
          className={`arrowUp${this.state.sortedBy === tab && this.state.sortDirection === 'up' ? ' active' : ''}`}
        />
      </th>
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
              {this.renderTab("id")}
              {this.renderTab("firstName")}
              {this.renderTab("lastName")}
              {this.renderTab("email")}
              {this.renderTab("phone")}
            </tr>
          {rows}
          </tbody>
        </table>
        
        {this.state.loading && <p>Loading...</p>}

        {this.renderSelected()}

        {this.state.error.length > 0 && <p className="errorCatched">Error: {this.state.error}</p>}
      </div>
    )
  }
}

export default App;
