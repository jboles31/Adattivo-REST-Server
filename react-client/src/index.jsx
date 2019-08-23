import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import EmpID from './components/EmpID.jsx'
import Create from './components/Create.jsx'
import Update from './components/Update.jsx'
import AllEmps from './components/AllEmps.jsx'
import Display from './components/Display.jsx'

class App extends React.Component {
  constructor (props)  {
    super(props);
    this.state = {
      input: '',
      displayEmployees: [],
      allEmployees: [],
      updateEmp: {},
      updateID: 0,
      showDisplay: false,
      newEmp: {},
      firstname: '',
      middleinitial: '',
      lastname: '',
      DOB: '',
      DOE: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.setDisplay = this.setDisplay.bind(this);
    this.setUpdateID = this.setUpdateID.bind(this);
    this.searchByID = this.searchByID.bind(this);
    this.getAll = this.getAll.bind(this);
    this.update = this.update.bind(this);
    this.setInactive = this.setInactive.bind(this);
    this.createEmp = this.createEmp.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  
  handleUpdate(param) {
    this.setState({updateID: param});
  }
  
  setDisplay() {
    this.setState({
      showDisplay: true
    })
  }

  setUpdateID(id) {
    this.setState({
      updateID: id
    })
  }

  searchByID() {
    event.preventDefault()
    $.ajax({
      method: 'GET',
      url: `/ID/${this.state.input}`, 
      success: (data) => {
        this.setState({
          displayEmployees: data,
          showDisplay: true,
      })
      },
      error: (err) => {
        console.log('error on Client', err);
      }
    });
  }

  getAll() {
    $.ajax({
      method: 'GET',
      url: '/getAll',
      success: (data) => {
        this.setState({
          displayEmployees: data,
          allEmployees: data
        })
      },
      error: (err) => {
        console.log('error with getAll on Client', err);
      }
    })
  }

  update() {
    event.preventDefault()

    let data = {
      ID: `${this.state.updateID}`,
      FirstName: `${this.state.firstname}`,
      MiddleInitial: `${this.state.middleinitial}`,
      LastName: `${this.state.lastname}`,
      DateOfBirth: `${this.state.DOB}`,
      DateOfEmployment: `${this.state.DOE}`,
      Status: 'ACTIVE'
    }
    let json = JSON.stringify(data)

    $.ajax({
      method: "POST",
      url: "/update",
      contentType: "application/json",
      data: json,
      }).done(() => {
        this.getAll()
      })
  }

  setInactive(id) {

    $.ajax({
      method: "GET",
      url: `/setInactive/${id}`,
      })
      .done(() => {
        this.getAll();
    })
  }

  createEmp() {
    event.preventDefault()
    let data = {
      ID: `${this.state.allEmployees[this.state.allEmployees.length - 1].ID + 1}`,
      FirstName: `${this.state.firstname}`,
      MiddleInitial: `${this.state.middleinitial}`,
      LastName: `${this.state.lastname}`,
      DateOfBirth: `${this.state.DOB}`,
      DateOfEmployment: `${this.state.DOE}`,
      Status: 'ACTIVE'
    }
    let json = JSON.stringify(data)

    $.ajax({
      method: "POST",
      url: "/create",
      contentType: "application/json",
      data: json,
      }).done(
        this.getAll()
      )
  }

  componentDidMount() {
    this.getAll();
  }

  render () {
    return (
      <div className="app-wrapper">
        <EmpID search={this.searchByID} updateInput={this.handleChange}/>
        <Create employees={this.state.allEmployees} createEmp={this.createEmp} handleChange={this.handleChange}/>
        <Update handleChange={this.handleChange} employees={this.state.allEmployees} setUpdateID={this.setUpdateID} updateID={this.state.updateID} updateEmp={this.update} />
        <AllEmps getAll={this.getAll} setDisplay={this.setDisplay}/>
        <Display employees={this.state.displayEmployees} showDisplay={this.state.showDisplay} updateID={this.state.updateID} setUpdateID={this.setUpdateID} setInactive={this.setInactive} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));