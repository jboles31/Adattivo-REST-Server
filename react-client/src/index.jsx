import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import EmpID from './components/EmpID.jsx'
import Create from './components/Create.jsx'
import Delete from './components/Delete.jsx'
import Update from './components/Update.jsx'
import AllEmps from './components/AllEmps.jsx'

class App extends React.Component {
  constructor (props)  {
    super(props);
    this.state = {
      employee: {},
      employees: [],
    }

    this.searchByID = this.searchByID.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  searchByID(param) {
    $.ajax({
      method: 'GET',
      url: `/ID/${param}`, 
      success: (data) => {
        this.setState({
          employee: {
            ID: data.ID,
            FirstName: data.FirstName,
            MiddleInitial: data.MiddleInitial,
            LastName: data.MiddleInitial,
            DateOfBirth: data.DateOfBirth,
            DateOfEmployement: data.DateOfEmployment,
            Status: data.Status
          }
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

  render () {
    return (
      <div className="app-wrapper">
        <EmpID getAll={this.getAll} />
        <Create />
        <Update />
        <Delete />
        <AllEmps />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));