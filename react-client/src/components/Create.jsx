import React from 'react';

const Create = (props) => (
  <div>
    <h3>New Employee</h3>
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
      <button onClick={() => props.createEmp()}>Add</button>
    </form>
  </div>
)

export default Create;