import React from 'react';

const Update = (props) => {
  
  let ids = []
  
  props.employees.map(employee => {
    ids.push(employee.ID)
  })

  let optionsGen = () => {
    let optionsContainer = []
    let result = []
    
    ids.map(id => {
      result.push(<option>{id}</option>)
    })
    
    optionsContainer.push(<select onChange={(e) => props.setUpdateID(event.target.value)}>{result}</select>)
    return optionsContainer
  }

  return (
    <div>
      {optionsGen()}
      <form>
        First Name:
        <input name='firstname' onChange={(e) => props.handleChange(e)} ></input>
        Middle Initial:
        <input name='middleinitial' onChange={(e) => props.handleChange(e)} ></input>
        Last Name:
        <input name='lastname' onChange={(e) => props.handleChange(e)} ></input>
        Date of Birth:
        <input name='DOB' onChange={(e) => props.handleChange(e)} ></input>
        Date of Employment:
        <input name='DOE' onChange={(e) => props.handleChange(e)} ></input>
        <button onClick={() => props.updateEmp()}>Update</button>
      </form>
    </div>
  )
}

export default Update;