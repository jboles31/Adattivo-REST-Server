import React from 'react';

const AllEmps = (props) => (
  <div>
    <button onClick={() => {props.getAll(); props.setDisplay()}}>Get All Employees</button>
  </div>
)

export default AllEmps;