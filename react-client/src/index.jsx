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
      employees: [],
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

    this.searchByID = this.searchByID.bind(this);
    this.getAll = this.getAll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.setDisplay = this.setDisplay.bind(this);
    this.setUpdateID = this.setUpdateID.bind(this);
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

  setNewEmp(info) {
    this.setState({
      newEmp: {

      }
    })
  }

  searchByID() {
    event.preventDefault()
    $.ajax({
      method: 'GET',
      url: `/ID/${this.state.input}`, 
      success: (data) => {
        this.setState({
          employees: data,
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
          employees: data
        })
      },
      error: (err) => {
        console.log('error with getAll on Client', err);
      }
    })
  }

  update() {
    $.ajax({
      method: "POST",
      url: "/update",
      data: this.state.updateEmp
      })
      .done(() => {
        this.getAll();
      })
  }

  setInactive(id) {
    console.log('delete clicked! id: ', id);
    $.ajax({
      method: "GET",
      url: `/setInactive/${id}`,
      })
      .done(() => {
        this.getAll();
    })
  }

  createEmp() {
    console.log('createEmp ran')
    event.preventDefault()
    let data = {
      ID: `${this.state.employees[this.state.employees.length - 1].ID + 1}`,
      FirstName: `${this.state.firstname}`,
      MiddleInitial: `${this.state.middleinitial}`,
      LastName: `${this.state.lastname}`,
      DateOfBirth: `${this.state.DOB}`,
      DateOfEmplyment: `${this.state.DOE}`,
      Status: 'Active'
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
        <Create employees={this.state.employees} createEmp={this.createEmp} handleChange={this.handleChange}/>
        <Update handleUpdate={this.handleUpdate} getAll={this.getAll} />
        <AllEmps getAll={this.getAll} setDisplay={this.setDisplay}/>
        <Display employees={this.state.employees} showDisplay={this.state.showDisplay} updateID={this.state.updateID} setUpdateID={this.setUpdateID} setInactive={this.setInactive} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));