import React from 'react';

const Display = (props) => {

  if (props.showDisplay === true) {


    const employeeGen = () => {
      let employeeContainer = [];
  
      let result = [];
      result.push(
        <tr>
          <td>ID</td>
          <td>First Name</td>
          <td>Middle Initial</td>
          <td>Last Name</td>
          <td>Date of Birth</td>
          <td>Date of Employment</td>
          <td>Status</td>
        </tr>
      )

      props.employees.map(employee => {
        if(employee.Status){
          if(employee.ID !== props.updateID){
            result.push(
              <tr>
                <td>{employee.ID}</td>
                <td>{employee.FirstName}</td>
                <td>{employee.MiddleInitial}</td>
                <td>{employee.LastName}</td>
                <td>{employee.DateOfBirth}</td>
                <td>{employee.DateOfEmployment}</td>
                <td>{employee.Status}</td>
                <td> 
                  <button onClick={() => props.setUpdateID(employee.ID)}>Update</button>
                </td>
                <td>
                  <button onClick={() => props.setInactive(employee.ID)}>Delete</button>
                </td>  
             </tr>
           );
          } else {
            result.push(
              // <form>
              //   <input type="text" onChange={(e) => props.updateInput(e)}>{employee.ID}</input>
              //   <input type="text" onChange={(e) => props.updateInput(e)}>{employee.FirstName}</input>
              //   <input type="text" onChange={(e) => props.updateInput(e)}>{employee.MiddleInitial}</input>
              //   <input type="text" onChange={(e) => props.updateInput(e)}>{employee.LastName}</input>
              //   <input type="text" onChange={(e) => props.updateInput(e)}>{employee.DateOfBirth}</input>
              //   <input type="text" onChange={(e) => props.updateInput(e)}>{employee.DateOfEmployment}</input>
              //   <input type="text" onChange={(e) => props.updateInput(e)}>{employee.Status}</input>
              //   <div> 
              //     <button onClick={() => props.setUpdateID(0)}>Update</button>
              //   </div>
              //   <div>
              //     <button>Delete</button>
              //   </div>  
              // </form>
            )
          }
        }
      })
      employeeContainer.push(<table>{result}</table>);
      return employeeContainer
    }
  
    return (
      <div className="display">
        <h1> Employees </h1>
        {employeeGen()}
      </div>
    )
  }

  return (
    <div className="display">
      <h1> Employees </h1>
    </div>
  )
}

export default Display;