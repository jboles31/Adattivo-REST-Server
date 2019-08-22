import React from 'react';

const AllEmps = (props) => (
  <div>
    <button onClick={() => {props.getAll()}}>Get All Employees</button>
  </div>
)

export default AllEmps;