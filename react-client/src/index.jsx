import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import EmpID from './components/EmpID.jsx'
import Create from './components/Create.jsx'
import Delete from './components/Delete.jsx'
import Update from './components/Update.jsx'
import AllEmps from './components/AllEmps.jsx'
import Display from './components/Display.jsx'
import { runInThisContext } from 'vm';

class App extends React.Component {
  constructor (props)  {
    super(props);
    this.state = {
      input: '',
      employees: [],
      updateEmp: {},
      updateID: 0,
      showDisplay: false,
    }

    this.searchByID = this.searchByID.bind(this);
    this.getAll = this.getAll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.setDisplay = this.setDisplay.bind(this);
    this.setUpdateID = this.setUpdateID.bind(this);
    this.setInactive = this.setInactive.bind(this);
  }

  handleChange(event) {
    this.setState({input: event.target.value});
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

  componentDidMount() {
    this.getAll();
  }

  render () {
    return (
      <div className="app-wrapper">
        <EmpID search={this.searchByID} updateInput={this.handleChange}/>
        <Create />
        <Update handleUpdate={this.handleUpdate} getAll={this.getAll} />
        <AllEmps getAll={this.getAll} setDisplay={this.setDisplay}/>
        <Display employees={this.state.employees} showDisplay={this.state.showDisplay} updateID={this.state.updateID} setUpdateID={this.setUpdateID} setInactive={this.setInactive} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));